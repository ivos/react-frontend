const label = {
	button: {
		register: 'Zaregistrovat se',
		login: 'Přihlásit se',
	},
	menu: {
		logout: 'Odhlásit se',
	},
	home: {
		title: 'Úvod',
	},
	register: {
		title: 'Registrace',
		username: {
			label: 'Uživatelské jméno',
			help: 'Pouze malá písmena bez háčků a čárek, číslice a podtržítka.',
			msg: {
				duplicate: 'Toto uživatelské jméno je již použito.',
			},
		},
		email: {
			label: 'E-mail',
			msg: {
				duplicate: 'Tento e-mail je již zaregistrován.' +
				' Pokud jste zapomněli svoje heslo, kontaktuje prosím administrátora systému.',
			},
		},
		name: 'Jméno',
		password: {
			label: 'Heslo',
			help: 'Alespoň 6 znaků.',
		},
	},
	login: {
		title: 'Přihlášení',
		username: {
			label: 'Uživatelské jméno',
			help: 'Zadejte Vaše uživatelské jméno nebo e-mail.',
			msg: {
				notFound: 'Toto uživatelské jméno není zaregistrováno.',
			},
		},
		password: {
			label: 'Heslo',
			msg: {
				invalid: 'Chybné heslo.',
			},
		},
	},
}

export default {label}
