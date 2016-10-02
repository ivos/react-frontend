const label = {
	enum: {
		user: {
			status: {
				active: 'Active',
				disabled: 'Disabled',
			},
			role: {
				user: 'User',
				admin: 'Administrator',
			},
		},
	},
	button: {
		register: 'Register',
		login: 'Login',
		edit: 'Edit',
	},
	menu: {
		logout: 'Log out',
	},
	home: {
		title: 'Home',
	},
	register: {
		title: 'Register',
		username: {
			label: 'Username',
			help: 'Only lower-case letters, numbers and underscores.',
			msg: {
				duplicate: 'This username is already taken.',
			},
		},
		email: {
			label: 'E-mail',
			msg: {
				duplicate: 'This e-mail is already registered.' +
				' If you forgot your password, please contact the system administrator.',
			},
		},
		name: 'Name',
		password: {
			label: 'Password',
			help: 'At least 6 characters.',
		},
	},
	login: {
		title: 'Login',
		username: {
			label: 'Username',
			help: 'Enter your username or e-mail.',
			msg: {
				notFound: 'This username was not found.',
			},
		},
		password: {
			label: 'Password',
			msg: {
				invalid: 'Invalid password.',
			},
		},
	},
	profile: {
		title: 'My profile',
		username: 'Username',
		name: 'Name',
		email: 'E-mail',
		status: 'Status',
		roles: 'Roles',
	},
}

export default {label}
