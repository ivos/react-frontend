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
		create: 'Vytvořit',
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
	project: {
		code: {
			label: 'Kód',
			msg: {
				duplicate: 'Projekt s tímto kódem již máte vytvořen.',
			},
		},
		name: 'Jméno',
		visibility: {
			label: 'Viditelnost',
			values: {
				public: 'Veřejný',
				private: 'Soukromý',
			},
		},
		description: 'Popis',
		start: 'Začátek',
		duration: 'Trvání',
		budget: 'Rozpočet',
		dailyMeetingAt: 'Denní schůzka v',
		kickOff: 'Zahájení',
		created: 'Vytvořeno',
	},
	home: {
		title: 'Úvod',
		welcome: 'Vítá Vás aplikace React Frontend.',
		loggedInAs: 'Přihlásil(a) jste se jako uživatel',
		logIn: 'Prosím přihlašte se.',
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
	projectList: {
		title: 'Projekty',
	},
	projectDetail: {
		title: 'Projekt',
	},
	projectCreate: {
		title: 'Nový projekt',
	},
	projectEdit: {
		title: 'Editace projektu',
	},
}

export default {label}
