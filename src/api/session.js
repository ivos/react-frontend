import {processResponse, jsonContentHeader, authorizationHeader} from './common'

export const sessionCreate = (form, values, userNotFoundHandler, handler) => {
	fetch('/api/sessions', {
		method: 'post',
		headers: jsonContentHeader(),
		body: JSON.stringify(values),
	})
		.then(response => {
			if (404 === response.status) {
				userNotFoundHandler()
				throw new Error('User not found.')
			}
			return processResponse(form)(response)
		})
		.then(response => response.json())
		.then(handler)
		.catch(
			err => console.error(err)
		)
}

export const sessionDelete = (handler) => {
	fetch('/api/sessions', {
		method: 'delete',
		headers: authorizationHeader(),
	})
		.then(handler)
		.catch(
			err => console.error(err)
		)
}
