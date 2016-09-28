import React from 'react'
import {Router, Route, Redirect, useRouterHistory} from 'react-router'
import {createHashHistory} from 'history'
import App from './layout/App'
import RegisterPage from './user/RegisterPage'
import LoginPage from './user/LoginPage'

const appHistory = useRouterHistory(createHashHistory)({queryKey: false})

const AppRouter = () => (
	<Router history={appHistory}>
		<Route path="/" component={App}>
			<Route path="/register" component={RegisterPage}/>
			<Route path="/login" component={LoginPage}/>
			<Redirect from="*" to="/"/>
		</Route>
	</Router>
)

export default AppRouter
