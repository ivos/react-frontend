import React from "react";
import {Grid} from "react-bootstrap";
import Header from "./Header";

const App = ({children, location: {pathname}}) => {
	const active = pathname.split('/')[1] || 'home'
	return (
		<Grid fluid>
			<Header active={active}/>
			<div>{children}</div>
		</Grid>
	)
}

export default App
