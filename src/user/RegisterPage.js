import React from 'react'
import {Form, FormMessages, TextField, PasswordField} from 'react-forms-ui'
import {Panel, FormGroup, Button, HelpBlock} from 'react-bootstrap'
import {processResponse, jsonContentHeader} from '../api'
import {loggedIn} from '../local-storage'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)

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

	render() {
		const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'
		const buttonsClass = 'col-sm-offset-2 col-sm-10'
		return (
			<Form ref="form" state={this.state} setState={this.setState.bind(this)} validations={validations}
			      onSubmit={this.onSubmit}>
				<Panel header={<h3>{t('register.title')}</h3>}>
					<TextField id="username" label={t('register.username.label')} classes={fieldClasses}>
						<HelpBlock>{t('register.username.help')}</HelpBlock>
					</TextField>
					<TextField id="email" label={t('register.email.label')} classes={fieldClasses}/>
					<TextField id="name" label={t('register.name')} classes={fieldClasses}/>
					<PasswordField id="password" label={t('register.password.label')} classes={fieldClasses}>
						<HelpBlock>{t('register.password.help')}</HelpBlock>
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
		fetch('/api/users', {
			method: 'post',
			headers: jsonContentHeader(),
			body: JSON.stringify(values),
		})
			.then(this.handleResponse)
			.then(this.login)
			.then(this.handleResponse)
			.then(response => response.json())
			.then(this.handleLoggedIn)
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

	login() {
		const {values: {username, password}} = this.state
		return fetch('/api/sessions', {
			method: 'post',
			headers: jsonContentHeader(),
			body: JSON.stringify({username, password}),
		})
	},

	handleLoggedIn(session) {
		const {router} = this.context
		loggedIn(session)
		router.push('/home')
	},
})

RegisterPage.contextTypes = {
	router: React.PropTypes.object,
	setSystemMessage: React.PropTypes.func,
}

export default RegisterPage
