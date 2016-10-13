import {processResponse, acceptJsonHeader, jsonContentHeader, authorizationHeader, ifMatchHeader} from './common'
import {getSession} from '../local-storage'

export const userList = (form, params, handler) => {
	fetch('/api/users', {
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

export const userRead = (form, username, handler) => {
	let version
	fetch(`/api/users/${username}`, {
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

export const userReadCurrent = (form, handler) => {
	const {user: {username}} = getSession()
	userRead(form, username, handler)
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

export const userDisable = (form, username, version, handler) => {
	fetch(`/api/users/${username}/actions/disable`, {
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

export const userActivate = (form, username, version, handler) => {
	fetch(`/api/users/${username}/actions/activate`, {
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

export const userSwitchTo = (form, username, handler) => {
	fetch(`/api/users/${username}/actions/switch-to`, {
		method: 'post',
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
