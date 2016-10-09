import React from 'react'
import {Form, FormMessages, TextField, PasswordField} from 'react-forms-ui'
import {Panel, FormGroup, Button, HelpBlock} from 'react-bootstrap'
import {loggedIn} from '../local-storage'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)
import wrapPage from '../wrapPage'
import {sessionCreate} from '../api/session'

const validations = {
	username: {
		required: true,
		autoSuccess: false,
	},
	password: {
		required: true,
		autoSuccess: false,
	},
}

const LoginPage = React.createClass({
	getInitialState() {
		return {}
	},

	getPageTitle() {
		return t('login.title')
	},

	render() {
		const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'
		const buttonsClass = 'col-sm-offset-2 col-sm-10'
		return (
			<Form ref="form" state={this.state} setState={this.setState.bind(this)} validations={validations}
			      onSubmit={this.onSubmit}>
				<Panel header={<h3>{t('login.title')}</h3>}>
					<TextField id="username" label={t('user.username.label')} classes={fieldClasses}>
						<HelpBlock>{t('user.username.helpLogin')}</HelpBlock>
					</TextField>
					<PasswordField id="password" label={t('user.password.label')} classes={fieldClasses}/>

					<FormGroup>
						<div className={buttonsClass}>
							<Button type="submit" bsStyle="primary">
								<span className="fa fa-check"> </span> {t('button.login')}
							</Button>
						</div>
					</FormGroup>

					<FormMessages className={buttonsClass}/>
				</Panel>
			</Form>
		)
	},

	onSubmit() {
		const {values} = this.state
		sessionCreate(this, values,
			this.handleUserNotFound,
			this.handleLoggedIn)
	},

	convertFieldError(field, fieldErrors) {
		if ('password' === field && 'invalid' === fieldErrors[0]) {
			return t('user.password.msg.invalid')
		}
	},

	handleUserNotFound() {
		const messages = {username: [t('user.username.msg.notFound')]}
		this.setState({messages}, this.refs.form.focusError)
	},

	handleLoggedIn(session) {
		const {router, getAfterLogin, setSystemMessage} = this.props
		loggedIn(session)
		router.push(getAfterLogin() || '/home')
		setSystemMessage({type: 'success', text: t('login.msg.success')})
	},
})

export default wrapPage(LoginPage)
