import {
	processResponse, acceptJsonHeader, jsonContentHeader, authorizationHeader,
	list, read, update, action,
} from './common'
import {getSession} from '../local-storage'

export const userList = (form, params, handler) =>
	list('/api/users', form, params, handler)

export const userRead = (form, username, handler) =>
	read(`/api/users/${username}`, form, handler)

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

export const userReadCurrent = (form, handler) => {
	const {user: {username}} = getSession()
	userRead(form, username, handler)
}

export const userUpdate = (form, username, version, values, handler) =>
	update(`/api/users/${username}`, form, version, values, handler)

export const userDisable = (form, username, version, handler) =>
	action(`/api/users/${username}/actions/disable`, form, version, handler)

export const userActivate = (form, username, version, handler) =>
	action(`/api/users/${username}/actions/activate`, form, version, handler)

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
