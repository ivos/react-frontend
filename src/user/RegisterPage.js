import React from 'react'
import {Form, FormMessages, TextField, PasswordField} from 'react-forms-ui'
import {Panel, FormGroup, Button, HelpBlock} from 'react-bootstrap'
import {processValidationError} from '../api'
import {loggedIn} from '../local-storage'

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
				<Panel header={<h3>Register</h3>}>
					<TextField id="username" label="Username" classes={fieldClasses}>
						<HelpBlock>Only lower-case letters, numbers and underscores.</HelpBlock>
					</TextField>
					<TextField id="email" label="E-mail" classes={fieldClasses}/>
					<TextField id="name" label="Name" classes={fieldClasses}/>
					<PasswordField id="password" label="Password" classes={fieldClasses}>
						<HelpBlock>At least 6 characters.</HelpBlock>
					</PasswordField>

					<FormGroup>
						<div className={buttonsClass}>
							<Button type="submit" bsStyle="primary">
								<span className="fa fa-check"> </span> Register
							</Button>
						</div>
					</FormGroup>

					<FormMessages className={buttonsClass}/>
				</Panel>
			</Form>
		)
	},

	onSubmit() {
		const {router} = this.context
		const {values} = this.state
		fetch('/api/users', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		})
			.then(this.handleResponse)
			.then(() => {
				const {username, password} = values
				return fetch('/api/sessions', {
					method: 'post',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({username, password}),
				})
			})
			.then(response => response.json())
			.then(session => {
				loggedIn(session)
				router.push('/home')
			})
			.catch(
				err => console.error(err)
			)
	},

	handleResponse(response) {
		return processValidationError(this, this.convertFieldError, response)
	},

	convertFieldError(field, fieldErrors) {
		if ('username' === field && 'duplicate' === fieldErrors[0]) {
			return 'This username is already taken.'
		}
		if ('email' === field && 'duplicate' === fieldErrors[0]) {
			return 'This e-mail is already registered.' +
				' If you forgot your password, please contact the system administrator.'
		}
	},
})

RegisterPage.contextTypes = {
	router: React.PropTypes.object,
}

export default RegisterPage
