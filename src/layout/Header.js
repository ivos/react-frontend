import React from "react";
import {Navbar, Nav, NavItem} from "react-bootstrap";

const Header = ({active}) => {
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
					<NavItem eventKey={2} href="#register" active={('register' === active)}>Register</NavItem>
					<NavItem eventKey={3} href="#login" active={('login' === active)}>Login</NavItem>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default Header
