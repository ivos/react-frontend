import React from "react"
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from "react-bootstrap"
import {getSession, loggedOut} from '../local-storage'

const handleLogout = router => () => {
	loggedOut()
	router.push('/login')
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
					<NavDropdown eventKey={4} title="User" id="nav-logged-in-user-dropdown">
						<MenuItem eventKey={4.1} disabled>
							<span className="fa fa-user fa-fw"/>
							{' '}
							{session.user.name}
						</MenuItem>
						<MenuItem divider/>
						<MenuItem eventKey={4.1} onClick={handleLogout(router)}>
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
