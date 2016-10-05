import React from 'react'
import {Router, Route, Redirect, useRouterHistory} from 'react-router'
import {createHashHistory} from 'history'
import App from './layout/App'

import RegisterPage from './user/RegisterPage'
import LoginPage from './user/LoginPage'
import ProfileDetailPage from './user/ProfileDetailPage'
import ProfileEditPage from './user/ProfileEditPage'

const history = useRouterHistory(createHashHistory)({queryKey: false})

const AppRouter = () => (
	<Router history={history}>
		<Route path="/" component={App}>
			<Route path="/register" component={RegisterPage}/>
			<Route path="/login" component={LoginPage}/>
			<Route path="/profile" component={ProfileDetailPage}/>
			<Route path="/profile/edit" component={ProfileEditPage}/>

			<Redirect from="*" to="/"/>
		</Route>
	</Router>
)

export default AppRouter
