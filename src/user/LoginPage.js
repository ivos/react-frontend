import React from 'react'
import {Form, FormMessages, TextField, PasswordField} from 'react-forms-ui'
import {Panel, FormGroup, Button} from 'react-bootstrap'
import {processValidationError} from '../api'
import {loggedIn} from '../local-storage'

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
				<Panel header={<h3>Login</h3>}>
					<TextField id="username" label="Username" classes={fieldClasses}/>
					<PasswordField id="password" label="Password" classes={fieldClasses}/>

					<FormGroup>
						<div className={buttonsClass}>
							<Button type="submit" bsStyle="primary">
								<span className="fa fa-check"> </span> Login
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
		fetch('/api/sessions', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		})
			.then(this.handleResponse)
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
		if (404 === response.status) {
			const messages = {username: ['This username was not found.']}
			this.setState({messages}, this.refs.form.focusError)
			throw new Error('User not found.')
		}
		return processValidationError(this, this.convertFieldError, response)
	},

	convertFieldError(field, fieldErrors) {
		if ('password' === field && 'invalid' === fieldErrors[0]) {
			return 'Invalid password.'
		}
	},
})

LoginPage.contextTypes = {
	router: React.PropTypes.object,
}

export default LoginPage