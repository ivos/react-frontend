import React from 'react'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import {getSession, loggedOut} from '../local-storage'
import {authorizationHeader} from '../api'
import md5 from 'md5'
import './Header.css'
import flagCs from './flag-cs.jpg'
import flagEn from './flag-en.jpg'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)
import {storeLocale} from '../local-storage'

const handleLoggedOut = router => () => {
	loggedOut()
	router.push('/login')
}

const handleLogout = router => () => {
	fetch('/api/sessions', {
		method: 'delete',
		headers: authorizationHeader(),
	})
		.then(handleLoggedOut(router))
		.catch(
			err => console.error(err)
		)
}

const setLocale = locale => event => {
	event.preventDefault()
	storeLocale(locale)
	window.location.reload()
}

const Header = ({active}, {router}) => {
	const session = getSession()
	const locale = i18n.language
	const localeLabels = {
		en: <span><img src={flagEn} height="14" width="23" alt="English"/> English</span>,
		cs: <span><img src={flagCs} height="14" width="21" alt="Česky"/> Česky</span>,
	}
	const currentLocaleLabel = localeLabels[locale]
	return (
		<Navbar fixedTop fluid>
			<Navbar.Header>
				<Navbar.Brand>
					<a href="#/">React Frontend</a>
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
				<Nav>
					<NavItem eventKey={1} href="#home" active={('home' === active)}>{t('home.title')}</NavItem>
				</Nav>
				{!session &&
				<Nav pullRight>
					<NavItem eventKey={2} href="#register" active={('register' === active)}>
						{t('register.title')}</NavItem>
					<NavItem eventKey={3} href="#login" active={('login' === active)}>{t('login.title')}</NavItem>
				</Nav>
				}
				{session &&
				<Nav pullRight>
					<NavDropdown eventKey={4} id="nav-logged-in-user-dropdown" title={
						<img src={`//www.gravatar.com/avatar/${md5(session.user.email)}?s=30&d=mm`} className="gravatar"
						     alt="User gravatar"/>
					}>
						<MenuItem eventKey={4.1} disabled>
							<span className="fa fa-user fa-fw"/>
							{' '}
							{session.user.name}
						</MenuItem>
						<MenuItem divider/>
						<MenuItem eventKey={4.2} href="#/profile">
							<span className="fa fa-cog fa-fw"/> {t('profile.title')}
						</MenuItem>
						<MenuItem divider/>
						<MenuItem eventKey={4.3} onClick={handleLogout(router)}>
							<span className="fa fa-sign-out fa-fw"/> {t('logout.title')}
						</MenuItem>
					</NavDropdown>
				</Nav>
				}
				<Nav pullRight>
					<NavDropdown eventKey={5} title={currentLocaleLabel} id="nav-language-dropdown">
						{'en' !== locale &&
						<MenuItem eventKey={5.1} onClick={setLocale('en')}>
							{localeLabels.en}
						</MenuItem>
						}
						{'cs' !== locale &&
						<MenuItem eventKey={5.1} onClick={setLocale('cs')}>
							{localeLabels.cs}
						</MenuItem>
						}
					</NavDropdown>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

Header.contextTypes = {
	router: React.PropTypes.object,
}

export default Header
