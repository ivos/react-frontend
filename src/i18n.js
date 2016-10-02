import i18n from 'i18next'
import {I18nEn, I18nCs} from 'react-forms-ui'
import enApp from './i18n/en'
import csApp from './i18n/cs'
import {getStoredLocale} from './local-storage'

const resources = {
	en: Object.assign({}, I18nEn, enApp),
	cs: Object.assign({}, I18nCs, csApp)
}

i18n.init({
	defaultNS: 'label',
	lngWhitelist: ['en', 'cs'],
	fallbackLng: 'en',
	resources,
})

export default i18n

export const getLocale = () => {
	const supportedLocales = ['en', 'cs']
	const locale = getStoredLocale() || navigator.language.substr(0, 2)
	if (supportedLocales.indexOf(locale) === -1) {
		return 'en'
	}
	return locale
}
