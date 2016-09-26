import React from 'react'
import {Router, Route, Redirect, useRouterHistory} from 'react-router'
import {createHashHistory} from 'history'
import App from './layout/App'
import RegisterPage from './user/RegisterPage'

const appHistory = useRouterHistory(createHashHistory)({queryKey: false})

const AppRouter = () => (
	<Router history={appHistory}>
		<Route path="/" component={App}>
			<Route path="/register" component={RegisterPage}/>
			<Redirect from="*" to="/"/>
		</Route>
	</Router>
)

export default AppRouter
