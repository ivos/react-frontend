import React from 'react'
import {Panel} from 'react-bootstrap'
import i18n from '../i18n'
import {getSession} from '../local-storage'
const t = i18n.t.bind(i18n)
import wrapPage from '../wrapPage'
import moment from 'moment'

const HomePage = React.createClass({
	getPageTitle() {
		return t('home.title')
	},

	render() {
		const session = getSession()
		return (
			<Panel header={<h3>{t('home.title')}</h3>}>
				<p><strong>{t('home.welcome')}</strong></p>
				{session &&
				<p>{t('home.loggedInAs') + ' '} <code>{session.user.username}</code>
					{' '}
					<abbr title={moment(session.created).format('l, LTS')}>{moment(session.created).fromNow()}</abbr>.</p>
				}
				{!session &&
				<p>{t('home.logIn')}</p>}
			</Panel>
		)
	},
})

export default wrapPage(HomePage)
