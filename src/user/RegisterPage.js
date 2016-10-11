import React from 'react'
import {Form, FormMessages, TextField, PasswordField} from 'react-forms-ui'
import {Panel, FormGroup, Button, HelpBlock} from 'react-bootstrap'
import {loggedIn} from '../local-storage'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)
import wrapPage from '../wrapPage'
import {userCreate} from '../api/user'
import {sessionCreate} from '../api/session'

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
	password: {
		required: true,
		minLength: 6,
		maxLength: 100,
	},
}

const RegisterPage = React.createClass({
	getInitialState() {
		return {}
	},

	getPageTitle() {
		return t('register.title')
	},

	render() {
		const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'
		const buttonsClass = 'col-sm-offset-2 col-sm-10'
		return (
			<Form ref="form" state={this.state} setState={this.setState.bind(this)} validations={validations}
			      onSubmit={this.onSubmit}>
				<Panel header={<h3>{t('register.title')}</h3>}>
					<TextField id="username" label={t('user.username.label')} classes={fieldClasses}>
						<HelpBlock>{t('user.username.help')}</HelpBlock>
					</TextField>
					<TextField id="email" label={t('user.email.label')} classes={fieldClasses}/>
					<TextField id="name" label={t('user.name')} classes={fieldClasses}/>
					<PasswordField id="password" label={t('user.password.label')} classes={fieldClasses}>
						<HelpBlock>{t('user.password.help')}</HelpBlock>
					</PasswordField>

					<FormGroup>
						<div className={buttonsClass}>
							<Button type="submit" bsStyle="success">
								<span className="fa fa-check"> </span> {t('button.register')}
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
		userCreate(this, values, this.login)
	},

	convertFieldError(field, fieldError) {
		if ('username' === field && 'duplicate' === fieldError[0]) {
			return t('user.username.msg.duplicate')
		}
		if ('email' === field && 'duplicate' === fieldError[0]) {
			return t('user.email.msg.duplicate')
		}
	},

	login() {
		const {values: {username, password}} = this.state
		sessionCreate(this, {username, password}, null, this.handleLoggedIn)
	},

	handleLoggedIn(session) {
		const {router, setSystemMessage} = this.props
		loggedIn(session)
		router.push('/')
		setSystemMessage({type: 'success', text: t('login.msg.success')})
	},
})

export default wrapPage(RegisterPage)
