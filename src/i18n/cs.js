const label = {
	msg: {
		saved: 'Uloženo.',
		conflict: 'Data mezitím změnil jiný uživatel. Prosím obnovte si data a proveďte Vaši změnu znovu.',
		loggedOut: 'Byl(a) jste odhlášen(a). Prosím přihlašte se znovu.',
		forbidden: 'Pro požadovanou akci nemáte oprávnění.',
		systemError: 'Došlo k chybě při komunikaci se serverem. Prosím opakujte Vaši akci později.',
	},
	enum: {
		user: {
			status: {
				active: 'Platný',
				disabled: 'Zrušený',
			},
			role: {
				user: 'Uživatel',
				admin: 'Administrátor',
			},
		},
	},
	button: {
		register: 'Zaregistrovat se',
		login: 'Přihlásit se',
		edit: 'Editovat',
		save: 'Uložit',
		back: 'Zpět',
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
	profile: {
		title: 'Můj profil',
		username: 'Uživatelské jméno',
		name: 'Jméno',
		email: 'E-mail',
		status: 'Status',
		roles: 'Role',
	},
}

export default {label}
