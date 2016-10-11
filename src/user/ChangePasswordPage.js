import React from 'react'
import {Form, PasswordField} from 'react-forms-ui'
import {Panel, FormGroup, HelpBlock} from 'react-bootstrap'
import {LinkBack, SaveButton} from '../ui/buttons'
import Loading from '../ui/Loading'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)
import wrapPage from '../wrapPage'
import {userReadCurrent, userUpdate} from '../api/user'

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

	getPageTitle() {
		return t('changePassword.title')
	},

	render() {
		const {loading} = this.state
		const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'
		const buttonsClass = 'col-sm-offset-2 col-sm-10'
		return (
			<Form ref="form" state={this.state} setState={this.setState.bind(this)} validations={validations}
			      onSubmit={this.onSubmit}>
				<Panel header={<h3>{t('changePassword.title')} <Loading loading={loading}/></h3>}>
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
		this.setState({loading: true})

		userReadCurrent(this,
			(values, version) => {
				this.setState({version, values, loading: false})
			})
	},

	onSubmit() {
		const {router, setSaving, setSaved} = this.props
		setSaving()
		const {version, values} = this.state
		const {username, email, name, password} = values

		userUpdate(this, username, version,
			{username, email, name, password},
			() => {
				setSaved()
				router.push('/profile')
			})
	},
})

export default wrapPage(ChangePasswordPage)
