import React from 'react'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import {Link} from 'react-router'
import {LinkContainer} from 'react-router-bootstrap'
import {storeLocale, getSession, loggedOut} from '../local-storage'
import md5 from 'md5'
import './Header.css'
import flagCs from './flag-cs.jpg'
import flagEn from './flag-en.jpg'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)
import {sessionDelete} from '../api/session'

const handleLogout = router => () => {
	sessionDelete(() => {
		loggedOut()
		router.push('/login')
	})
}

const setLocale = locale => event => {
	event.preventDefault()
	storeLocale(locale)
	window.location.reload()
}

const Header = ({active, pathname}, {router}) => {
	const session = getSession()
	const roles = session ? session.user.roles.split(',') : []
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
					<Link to="/">React Frontend</Link>
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
				<Nav>
					{session &&
					<NavItem eventKey={1} active={'home' === active} href="#/">
						{t('home.title')}
					</NavItem>
					}
					{roles.includes('user') &&
					<NavItem eventKey={2} active={'projects' === active} href="#/projects">
						{t('projectList.title')}
					</NavItem>
					}
					{roles.includes('admin') &&
					<NavItem eventKey={3} active={'users' === active} href="#/users">
						{t('userList.title')}
					</NavItem>
					}
				</Nav>
				{!session &&
				<Nav pullRight>
					<LinkContainer to="/register">
						<NavItem eventKey={100} active={('register' === active)}>
							{t('register.title')}</NavItem>
					</LinkContainer>
					<LinkContainer to="/login">
						<NavItem eventKey={101} active={('login' === active)}>{t('login.title')}</NavItem>
					</LinkContainer>
				</Nav>
				}
				{session &&
				<Nav pullRight>
					<NavDropdown eventKey={200} id="nav-logged-in-user-dropdown" title={
						<img src={`//www.gravatar.com/avatar/${md5(session.user.email)}?s=30&d=mm`} className="gravatar"
						     alt="User gravatar"/>
					}>
						<MenuItem eventKey={200.1} disabled>
							<span className="fa fa-user fa-fw"/>
							{' '}
							{session.user.name}
						</MenuItem>
						<MenuItem divider/>
						<LinkContainer to="/profile">
							<MenuItem eventKey={200.2} active={'/profile' === pathname}>
								<span className="fa fa-cog fa-fw"/> {t('profile.title')}
							</MenuItem>
						</LinkContainer>
						<LinkContainer to="/profile/change-password">
							<MenuItem eventKey={200.3} active={'/profile/change-password' === pathname}>
								<span className="fa fa-unlock-alt fa-fw"/> {t('changePassword.title')}
							</MenuItem>
						</LinkContainer>
						<MenuItem divider/>
						<MenuItem eventKey={200.4} onClick={handleLogout(router)}>
							<span className="fa fa-sign-out fa-fw"/> {t('logout.title')}
						</MenuItem>
					</NavDropdown>
				</Nav>
				}
				<Nav pullRight>
					<NavDropdown eventKey={210} title={currentLocaleLabel} id="nav-language-dropdown">
						{'en' !== locale &&
						<MenuItem eventKey={210.1} onClick={setLocale('en')}>
							{localeLabels.en}
						</MenuItem>
						}
						{'cs' !== locale &&
						<MenuItem eventKey={210.1} onClick={setLocale('cs')}>
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
