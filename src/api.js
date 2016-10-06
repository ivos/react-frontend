import {getSession, loggedOut} from './local-storage'
import {Base64} from 'js-base64'
import i18n from './i18n'
const t = i18n.t.bind(i18n)

const convertBackendValidationErrors = (convertFieldError, errors) => {
	return Object.keys(errors).reduce((previous, current) => {
		const fieldErrors = errors[current]
		previous[current] = fieldErrors.map(
			fieldError => convertFieldError(current, fieldError) || 'Invalid value.'
		)
		return previous
	}, {})
}

export const processResponse = (response, setSystemMessage, convertFieldError, form) => {
	if (401 === response.status) { // Unauthorized
		console.error('Unauthorized.')
		loggedOut()
		setSystemMessage({text: t('msg.loggedOut')})
		const {router, setAfterLogin, location} = form.props
		if (router) {
			if (setAfterLogin && location) {
				setAfterLogin(location.pathname)
			}
			router.push('/login')
		}
		throw new Error('User not authenticated.')
	} else if (403 === response.status) { // Forbidden
		console.error('Forbidden.')
		setSystemMessage({text: t('msg.forbidden')})
		throw new Error('User not authorized (forbidden).')
	} else if (422 === response.status) { // Unprocessable entity
		response.json()
			.then(errors => {
				console.log('Backend validation error', errors)
				return errors
			})
			.then(errors => convertBackendValidationErrors(convertFieldError, errors))
			.then(messages => form.setState({messages}))
			.then(form.refs.form.focusError)
		throw new Error('Backend validation error.')
	} else if (412 === response.status) { // Precondition failed (conflict)
		console.error('Conflict.')
		setSystemMessage({text: t('msg.conflict')})
		throw new Error('Precondition failed error.')
	} else if (response.status >= 300) {
		console.error('Unknown server error ' + response.status + '.')
		setSystemMessage({text: t('msg.systemError')})
		throw new Error('Server system error ' + response.status + '.')
	}
	return response
}

export const jsonContentHeader = () => ({
	'Content-Type': 'application/json',
})

export const authorizationHeader = () => {
	const {token} = getSession()
	return {
		Authorization: 'Basic ' + Base64.encode(token),
	}
}

export const ifMatchHeader = (version) => ({
	'If-Match': version,
})
