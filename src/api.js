import {getSession} from './local-storage'
import {Base64} from 'js-base64'

const convertBackendValidationErrors = (convertFieldError, errors) => {
	return Object.keys(errors).reduce((previous, current) => {
		const fieldErrors = errors[current]
		previous[current] = fieldErrors.map(
			fieldError => convertFieldError(current, fieldError) || 'Invalid value.'
		)
		return previous
	}, {})
}

export const processValidationError = (form, convertFieldError, response) => {
	if (422 === response.status) {
		response.json()
			.then(errors => {
				console.log('Backend validation error', errors)
				return errors
			})
			.then(errors => convertBackendValidationErrors(convertFieldError, errors))
			.then(messages => form.setState({messages}))
			.then(form.refs.form.focusError)
		throw new Error('Backend validation error.')
	} else if (response.status >= 300) {
		console.error('Unknown server error.')
	}
	return response
}

export const authorizationHeader = () => {
	const {token} = getSession()
	return {
		Authorization: 'Basic ' + Base64.encode(token),
	}
}

export const jsonContentHeader = () => ({
	'Content-Type': 'application/json',
})
