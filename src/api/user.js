import {processResponse, jsonContentHeader, authorizationHeader, ifMatchHeader} from './common'
import {getSession} from '../local-storage'

export const userCreate = (form, values, handler) => {
	fetch('/api/users', {
		method: 'post',
		headers: jsonContentHeader(),
		body: JSON.stringify(values),
	})
		.then(processResponse(form))
		.then(handler)
		.catch(
			err => console.error(err)
		)
}

export const userRead = (form, handler) => {
	const {user: {username}} = getSession()
	let version
	fetch(`/api/users/${username}`, {
		headers: authorizationHeader(),
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

export const userUpdate = (form, username, version, values, handler) => {
	fetch(`/api/users/${username}`, {
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
