import React from 'react'
// import Header from './Header'

const App = ({children}) => {
	return (
		<div>
			{/*<Header active={active}/>*/}
			<div>{children}</div>
		</div>
	)
}
export default App
