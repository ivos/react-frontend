import React from 'react'
import {Form, FormMessages, TextField, PasswordField} from 'react-forms-ui'
import {Panel, FormGroup, Button, HelpBlock} from 'react-bootstrap'
import {processResponse, jsonContentHeader} from '../api'
import {loggedIn} from '../local-storage'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)
import wrapPage from '../wrapPage'

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

	render() {
		const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'
		const buttonsClass = 'col-sm-offset-2 col-sm-10'
		return (
			<Form ref="form" state={this.state} setState={this.setState.bind(this)} validations={validations}
			      onSubmit={this.onSubmit}>
				<Panel header={<h3>{t('login.title')}</h3>}>
					<TextField id="username" label={t('login.username.label')} classes={fieldClasses}>
						<HelpBlock>{t('login.username.help')}</HelpBlock>
					</TextField>
					<PasswordField id="password" label={t('login.password.label')} classes={fieldClasses}/>

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
		fetch('/api/sessions', {
			method: 'post',
			headers: jsonContentHeader(),
			body: JSON.stringify(values),
		})
			.then(this.handleResponse)
			.then(response => response.json())
			.then(this.handleLoggedIn)
			.catch(
				err => console.error(err)
			)
	},

	handleResponse(response) {
		if (404 === response.status) {
			const messages = {username: [t('login.username.msg.notFound')]}
			this.setState({messages}, this.refs.form.focusError)
			throw new Error('User not found.')
		}
		return processResponse(response, this)
	},

	convertFieldError(field, fieldErrors) {
		if ('password' === field && 'invalid' === fieldErrors[0]) {
			return t('login.password.msg.invalid')
		}
	},

	handleLoggedIn(session) {
		const {router, afterLogin, setSystemMessage} = this.props
		loggedIn(session)
		router.push(afterLogin() || '/home')
		setSystemMessage({type: 'success', text: t('login.msg.success')})
	},
})

export default wrapPage(LoginPage)
