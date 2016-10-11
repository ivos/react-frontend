const label = {
	app: {
		title: 'React Frontend',
	},
	msg: {
		saving: 'Saving...',
		saved: 'Saved.',
		conflict: 'The data was modified by another user in the meantime. Please refresh the data and apply your changes again.',
		loggedOut: 'You have been logged out. Please log in again.',
		forbidden: 'You are not authorized to perform the requested action.',
		systemError: 'There was an error while communicating with the server. Please repeat your action later.',
	},
	button: {
		register: 'Register',
		login: 'Login',
		create: 'Create',
		edit: 'Edit',
		save: 'Save',
		back: 'Back',
		changePassword: 'Change password',
	},
	user: {
		username: {
			label: 'Username',
			help: 'Only lower-case letters, numbers and underscores.',
			helpLogin: 'Enter your username or e-mail.',
			msg: {
				duplicate: 'This username is already taken.',
				notFound: 'This username was not found.',
			},
		},
		email: {
			label: 'E-mail',
			msg: {
				duplicate: 'This e-mail is already registered. If you forgot your password, please contact the system administrator.',
			},
		},
		name: 'Name',
		password: {
			label: 'Password',
			help: 'At least 6 characters.',
			msg: {
				invalid: 'Invalid password.',
			},
		},
		status: {
			label: 'Status',
			values: {
				active: 'Active',
				disabled: 'Disabled',
			},
		},
		roles: {
			label: 'Roles',
			values: {
				user: 'User',
				admin: 'Administrator',
			},
		},
	},
	project: {
		code: {
			label: 'Code',
			msg: {
				duplicate: 'You already have a project with this code.',
			},
		},
		name: 'Name',
		visibility: {
			label: 'Visibility',
			values: {
				public: 'Public',
				private: 'Private',
			},
		},
		description: 'Description',
		start: 'Start',
		duration: 'Duration',
		budget: 'Budget',
		dailyMeetingAt: 'Daily meeting at',
		kickOff: 'Kick-off',
		created: 'Created',
	},
	home: {
		title: 'Home',
		welcome: 'Welcome to React Frontend application.',
		loggedInAs: 'You have logged in as user',
		logIn: 'Please log in.',
	},
	register: {
		title: 'Register',
	},
	login: {
		title: 'Login',
		msg: {
			success: 'Logged in.',
		},
	},
	logout: {
		title: 'Log out',
	},
	profile: {
		title: 'My profile',
	},
	editProfile: {
		title: 'Edit profile',
	},
	changePassword: {
		title: 'Change password',
	},
	projectList: {
		title: 'Projects',
	},
	projectDetail: {
		title: 'Project',
	},
	projectCreate: {
		title: 'New project',
	},
	projectEdit: {
		title: 'Edit project',
	},
}

export default {label}
