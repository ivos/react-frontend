import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import 'select2/select2.css'
import 'react-forms-ui/lib/react-forms-ui.css'
import {initialize, ReactFormsUiOptions} from 'react-forms-ui'
import i18n, {getLocale} from './i18n'
import moment from 'moment'
import numeral from 'numeral'
import numeralCs from 'numeral/languages/cs'
numeral.language('cs', numeralCs)
require('core-js/es7/array')

initialize()

ReactFormsUiOptions.translate = i18n.t.bind(i18n)
const locale = getLocale()
moment.locale(locale)
numeral.language(locale)

import './index.css'
import AppRouter from './AppRouter'

i18n.changeLanguage(locale, () => {
	ReactDOM.render(
		<AppRouter/>,
		document.getElementById('root')
	)
})
