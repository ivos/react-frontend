import {processResponse, jsonContentHeader, authorizationHeader, ifMatchHeader} from './common'

export const projectList = (form, params, handler) => {
	const url = new URL('http://localhost:3000/api/projects')
	Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
	fetch(url, {
		headers: authorizationHeader(),
	})
		.then(processResponse(form))
		.then(response => response.json())
		.then(handler)
		.catch(
			err => console.error(err)
		)
}

export const projectRead = (form, code, handler) => {
	let version
	fetch(`/api/projects/${code}`, {
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

export const projectCreate = (form, values, handler) => {
	fetch(`/api/projects`, {
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

export const projectUpdate = (form, code, version, values, handler) => {
	fetch(`/api/projects/${code}`, {
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
