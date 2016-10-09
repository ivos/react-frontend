const label = {
	app: {
		title: 'React Frontend',
	},
	msg: {
		saving: 'Ukládá se...',
		saved: 'Uloženo.',
		conflict: 'Data mezitím změnil jiný uživatel. Prosím obnovte si data a proveďte Vaši změnu znovu.',
		loggedOut: 'Byl(a) jste odhlášen(a). Prosím přihlašte se znovu.',
		forbidden: 'Pro požadovanou akci nemáte oprávnění.',
		systemError: 'Došlo k chybě při komunikaci se serverem. Prosím opakujte Vaši akci později.',
	},
	button: {
		register: 'Zaregistrovat se',
		login: 'Přihlásit se',
		edit: 'Editovat',
		save: 'Uložit',
		back: 'Zpět',
		changePassword: 'Změnit heslo',
	},
	user: {
		username: {
			label: 'Uživatelské jméno',
			help: 'Pouze malá písmena bez háčků a čárek, číslice a podtržítka.',
			helpLogin: 'Zadejte Vaše uživatelské jméno nebo e-mail.',
			msg: {
				duplicate: 'Toto uživatelské jméno je již použito.',
				notFound: 'Toto uživatelské jméno není zaregistrováno.',
			},
		},
		email: {
			label: 'E-mail',
			msg: {
				duplicate: 'Tento e-mail je již zaregistrován. Pokud jste zapomněli svoje heslo, kontaktuje prosím administrátora systému.',
			},
		},
		name: 'Jméno',
		password: {
			label: 'Heslo',
			help: 'Alespoň 6 znaků.',
			msg: {
				invalid: 'Chybné heslo.',
			},
		},
		status: {
			label: 'Status',
			values: {
				active: 'Platný',
				disabled: 'Zrušený',
			},
		},
		roles: {
			label: 'Role',
			values: {
				user: 'Uživatel',
				admin: 'Administrátor',
			},
		},
	},
	home: {
		title: 'Úvod',
	},
	register: {
		title: 'Registrace',
	},
	login: {
		title: 'Přihlášení',
		msg: {
			success: 'Přihlášen.',
		},
	},
	logout: {
		title: 'Odhlásit se',
	},
	profile: {
		title: 'Můj profil',
	},
	editProfile: {
		title: 'Editace profilu',
	},
	changePassword: {
		title: 'Změna hesla',
	},
}

export default {label}
