import {list, read, create, update, delete_} from './common'

export const projectList = (form, params, handler) =>
	list('/api/projects', form, params, handler)

export const projectRead = (form, code, handler) =>
	read(`/api/projects/${code}`, form, handler)

export const projectCreate = (form, values, handler) =>
	create(`/api/projects`, form, values, handler)

export const projectUpdate = (form, code, version, values, handler) =>
	update(`/api/projects/${code}`, form, version, values, handler)

export const projectDelete = (form, code, version, handler) =>
	delete_(`/api/projects/${code}`, form, version, handler)
