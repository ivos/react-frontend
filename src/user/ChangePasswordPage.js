import React from 'react'
import {Form, PasswordField} from 'react-forms-ui'
import {Panel, FormGroup, HelpBlock} from 'react-bootstrap'
import {LinkBack, SaveButton} from '../ui/buttons'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)
import {getSession} from '../local-storage'
import {processResponse, jsonContentHeader, authorizationHeader, ifMatchHeader} from '../api'
import wrapPage from '../wrapPage'

const validations = {
	password: {
		required: true,
		minLength: 6,
		maxLength: 100,
	},
}

const ChangePasswordPage = React.createClass({
	getInitialState() {
		return {}
	},

	render() {
		const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'
		const buttonsClass = 'col-sm-offset-2 col-sm-10'
		return (
			<Form ref="form" state={this.state} setState={this.setState.bind(this)} validations={validations}
			      onSubmit={this.onSubmit}>
				<Panel header={<h3>{t('changePassword.title')}</h3>}>
					<PasswordField id="password" label={t('user.password.label')} classes={fieldClasses}>
						<HelpBlock>{t('user.password.help')}</HelpBlock>
					</PasswordField>

					<FormGroup>
						<div className={buttonsClass}>
							<SaveButton/>
							<LinkBack to="/profile"/>
						</div>
					</FormGroup>
				</Panel>
			</Form>
		)
	},

	componentDidMount() {
		const {user: {username}} = getSession()
		let version
		fetch(`/api/users/${username}`, {
			headers: authorizationHeader(),
		})
			.then(processResponse(this))
			.then(response => {
				version = response.headers.get('ETag')
				return response
			})
			.then(response => response.json())
			.then(values => {
				this.setState({version, values})
			})
			.catch(
				err => console.error(err)
			)
	},

	onSubmit() {
		const {version, values} = this.state
		const {username, email, name, password} = values
		fetch('/api/users/' + username, {
			method: 'put',
			headers: {
				...jsonContentHeader(),
				...authorizationHeader(),
				...ifMatchHeader(version),
			},
			body: JSON.stringify({username, email, name, password}),
		})
			.then(processResponse(this))
			.then(this.handleUpdated)
			.catch(
				err => console.error(err)
			)
	},

	handleUpdated() {
		const {router, setSaved} = this.props
		setSaved()
		router.push('/profile')
	},
})

export default wrapPage(ChangePasswordPage)
