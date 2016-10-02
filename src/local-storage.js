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

export const storeLocale = (locale) => {
	window.localStorage.ReactFrontendLocale = locale
}

export const getStoredLocale = () => window.localStorage.ReactFrontendLocale
