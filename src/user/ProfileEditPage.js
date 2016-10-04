import React from 'react'
import {Form, TextField} from 'react-forms-ui'
import {Panel, FormGroup, Button} from 'react-bootstrap'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)
import {getSession, loggedIn} from '../local-storage'
import {processResponse, jsonContentHeader, authorizationHeader, ifMatchHeader} from '../api'

const validations = {
	username: {
		required: true,
		maxLength: 100,
		pattern: /^[a-z0-9_]*$/,
		autoSuccess: false,
	},
	email: {
		required: true,
		maxLength: 100,
		pattern: /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/,
		autoSuccess: false,
	},
	name: {
		required: true,
		maxLength: 100,
	},
}

const ProfileEditPage = React.createClass({
	getInitialState() {
		return {}
	},

	render() {
		const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'
		const buttonsClass = 'col-sm-offset-2 col-sm-10'
		return (
			<Form ref="form" state={this.state} setState={this.setState.bind(this)} validations={validations}
			      onSubmit={this.onSubmit}>
				<Panel header={<h3>{t('profile.title')}</h3>}>
					<TextField id="username" label={t('profile.username')} classes={fieldClasses}/>
					<TextField id="email" label={t('profile.email')} classes={fieldClasses}/>
					<TextField id="name" label={t('profile.name')} classes={fieldClasses}/>

					<FormGroup>
						<div className={buttonsClass}>
							<Button type="submit" bsStyle="primary">
								<span className="fa fa-check"> </span> {t('button.save')}
							</Button>
							<Button bsStyle="link" className="pull-right" href="#/profile">
								<span className="fa fa-chevron-left"> </span> {t('button.back')}
							</Button>
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
			.then(this.handleResponse)
			.then(response => {
				version = response.headers.get('ETag')
				return response
			})
			.then(response => response.json())
			.then(values => {
				const {username} = values
				this.setState({version, values, originalUsername: username})
			})
			.catch(
				err => console.error(err)
			)
	},

	onSubmit() {
		const {version, values, originalUsername} = this.state
		const {username, email, name} = values
		fetch('/api/users/' + originalUsername, {
			method: 'put',
			headers: {
				...jsonContentHeader(),
				...authorizationHeader(),
				...ifMatchHeader(version),
			},
			body: JSON.stringify({username, email, name}),
		})
			.then(this.handleResponse)
			.then(this.handleUpdated)
			.catch(
				err => console.error(err)
			)
	},

	handleResponse(response) {
		const {setSystemMessage} = this.context
		return processResponse(response, setSystemMessage, this.convertFieldError, this)
	},

	convertFieldError(field, fieldErrors) {
		if ('username' === field && 'duplicate' === fieldErrors[0]) {
			return t('register.username.msg.duplicate')
		}
		if ('email' === field && 'duplicate' === fieldErrors[0]) {
			return t('register.email.msg.duplicate')
		}
	},

	handleUpdated() {
		const {values} = this.state
		const {username, email, name} = values
		const session = getSession()
		session.user = {...session.user, ...{username, email, name}}
		loggedIn(session)

		const {router, setSaved} = this.context
		setSaved()
		router.push('/profile')
	},
})

ProfileEditPage.contextTypes = {
	router: React.PropTypes.object,
	setSystemMessage: React.PropTypes.func,
	setSaved: React.PropTypes.func,
}

export default ProfileEditPage
