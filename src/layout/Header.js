import React from "react"
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from "react-bootstrap"
import {getSession, loggedOut} from '../local-storage'
import md5 from 'md5'
import {Base64} from 'js-base64'
import './Header.css'

const handleLogout = (router, {token}) => () => {
	fetch('/api/sessions', {
		method: 'delete',
		headers: {
			'Authorization': 'Basic ' + Base64.encode(token),
		},
	})
		.then(() => {
			loggedOut()
			router.push('/login')
		})
		.catch(
			err => console.error(err)
		)
}

const Header = ({active}, {router}) => {
	const session = getSession()
	return (
		<Navbar fixedTop fluid>
			<Navbar.Header>
				<Navbar.Brand>
					<a href="/app/#">React Frontend</a>
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
				<Nav>
					<NavItem eventKey={1} href="#home" active={('home' === active)}>Home</NavItem>
				</Nav>
				{!session &&
				<Nav pullRight>
					<NavItem eventKey={2} href="#register" active={('register' === active)}>Register</NavItem>
					<NavItem eventKey={3} href="#login" active={('login' === active)}>Login</NavItem>
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
						<MenuItem eventKey={4.1} onClick={handleLogout(router, session)}>
							<span className="fa fa-sign-out fa-fw"/> Log out
						</MenuItem>
					</NavDropdown>
				</Nav>
				}
			</Navbar.Collapse>
		</Navbar>
	)
}

Header.contextTypes = {
	router: React.PropTypes.object,
}

export default Header
