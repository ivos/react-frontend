export const loggedIn = (session) => {
	window.localStorage.ReactFrontendSession = JSON.stringify(session)
}

export const loggedOut = () => {
	window.localStorage.ReactFrontendSession = ''
}

export const getSession = () => {
	const session = window.localStorage.ReactFrontendSession
	return session ? JSON.parse(session) : null
}
