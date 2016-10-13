import {getSession, loggedOut} from '../local-storage'
import {Base64} from 'js-base64'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)

const convertBackendValidationErrors = (convertFieldError, errors) => {
	return Object.keys(errors).reduce((previous, field) => {
		const fieldErrors = errors[field]
		const mappedErrors = fieldErrors.map(
			fieldError => {
				const convertedError = convertFieldError(field, fieldError) || 'Invalid value.'
				if (typeof convertedError === 'string') {
					const mapped = {}
					mapped[field] = convertedError
					return mapped
				}
				return convertedError
			}
		)
		mappedErrors.forEach(mappedError => {
			Object.keys(mappedError).forEach(mappedField => {
				if (!previous[mappedField]) {
					previous[mappedField] = [mappedError[mappedField]]
				} else {
					previous[mappedField].push(mappedError[mappedField])
				}
			})
		})
		return previous
	}, {})
}

export const processResponse = (form, options) => response => {
	const convertFieldError = (options && options.convertFieldError) ?
		options.convertFieldError :
		form.convertFieldError
	if (401 === response.status) { // Unauthorized
		console.error('Unauthorized.')
		loggedOut()
		form.props.setSystemMessage({text: t('msg.loggedOut')})
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
		form.props.setSystemMessage({text: t('msg.forbidden')})
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
		form.props.setSystemMessage(null)
		throw new Error('Backend validation error.')
	} else if (412 === response.status) { // Precondition failed (conflict)
		console.error('Conflict.')
		form.props.setSystemMessage({text: t('msg.conflict')})
		throw new Error('Precondition failed error.')
	} else if (response.status >= 300) {
		console.error('Unknown server error ' + response.status + '.')
		form.props.setSystemMessage({text: t('msg.systemError')})
		throw new Error('Server system error ' + response.status + '.')
	}
	return response
}

export const acceptJsonHeader = () => ({
	'Accept': 'application/json',
})

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

export const list = (url, form, params, handler) => {
	fetch(url, {
		headers: {
			...acceptJsonHeader(),
			...authorizationHeader(),
		},
	})
		.then(processResponse(form))
		.then(response => response.json())
		.then(handler)
		.catch(
			err => console.error(err)
		)
}

export const read = (url, form, handler) => {
	let version
	fetch(url, {
		headers: {
			...acceptJsonHeader(),
			...authorizationHeader(),
		},
	})
		.then(processResponse(form))
		.then(response => {
			version = response.headers.get('ETag')
			return response
		})
		.then(response => response.json())
		.then(values => handler(values, version))
		.catch(
			err => console.error(err)
		)
}

export const create = (url, form, values, handler) => {
	fetch(url, {
		method: 'post',
		headers: {
			...jsonContentHeader(),
			...authorizationHeader(),
		},
		body: JSON.stringify(values),
	})
		.then(processResponse(form))
		.then(handler)
		.catch(
			err => console.error(err)
		)
}

export const update = (url, form, version, values, handler) => {
	fetch(url, {
		method: 'put',
		headers: {
			...jsonContentHeader(),
			...authorizationHeader(),
			...ifMatchHeader(version),
		},
		body: JSON.stringify(values),
	})
		.then(processResponse(form))
		.then(handler)
		.catch(
			err => console.error(err)
		)
}

export const action = (url, form, version, handler) => {
	fetch(url, {
		method: 'put',
		headers: {
			...authorizationHeader(),
			...ifMatchHeader(version),
		},
	})
		.then(processResponse(form))
		.then(handler)
		.catch(
			err => console.error(err)
		)
}

export const delete_ = (url, form, version, handler) => {
	fetch(url, {
		method: 'delete',
		headers: {
			...authorizationHeader(),
			...ifMatchHeader(version),
		},
	})
		.then(processResponse(form))
		.then(handler)
		.catch(
			err => console.error(err)
		)
}
