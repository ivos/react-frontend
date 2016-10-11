import React from 'react'
import {Router, Route, IndexRoute, Redirect, useRouterHistory} from 'react-router'
import {createHashHistory} from 'history'
import App from './layout/App'

import HomePage from './home/HomePage'

import RegisterPage from './user/RegisterPage'
import LoginPage from './user/LoginPage'
import ProfileDetailPage from './user/ProfileDetailPage'
import ProfileEditPage from './user/ProfileEditPage'
import ChangePasswordPage from './user/ChangePasswordPage'

import UserListPage from './user/UserListPage'
import UserDetailPage from './user/UserDetailPage'

import ProjectListPage from './project/ProjectListPage'
import ProjectDetailPage from './project/ProjectDetailPage'
import ProjectEditPage from './project/ProjectEditPage'

const history = useRouterHistory(createHashHistory)({queryKey: false})

const AppRouter = () => (
	<Router history={history}>
		<Route path="/" component={App}>
			<IndexRoute component={HomePage}/>

			<Route path="/register" component={RegisterPage}/>
			<Route path="/login" component={LoginPage}/>
			<Route path="/profile" component={ProfileDetailPage}/>
			<Route path="/profile/edit" component={ProfileEditPage}/>
			<Route path="/profile/change-password" component={ChangePasswordPage}/>

			<Route path="/users" component={UserListPage}/>
			<Route path="/users/:username" component={UserDetailPage}/>

			<Route path="/projects" component={ProjectListPage}/>
			<Route path="/projects/new" component={ProjectEditPage}/>
			<Route path="/projects/:code" component={ProjectDetailPage}/>
			<Route path="/projects/:code/edit" component={ProjectEditPage}/>

			<Redirect from="*" to="/"/>
		</Route>
	</Router>
)

export default AppRouter
