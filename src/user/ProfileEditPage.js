import React from 'react'
import {Form, TextField, FormMessages} from 'react-forms-ui'
import {Panel, FormGroup} from 'react-bootstrap'
import {LinkBack, SaveButton} from '../ui/buttons'
import Loading from '../ui/Loading'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)
import {getSession, loggedIn} from '../local-storage'
import wrapPage from '../wrapPage'
import {userRead, userUpdate} from '../api/user'

const validations = {
	username: {
		required: true,
		maxLength: 100,
		pattern: /^[a-z0-9_]*$/,
		autoSuccess: false,
	},
	email: {
		required: true,
		maxLength: 100,
		pattern: /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/,
		autoSuccess: false,
	},
	name: {
		required: true,
		maxLength: 100,
	},
}

const ProfileEditPage = React.createClass({
	getInitialState() {
		return {}
	},

	getPageTitle() {
		return t('editProfile.title')
	},

	render() {
		const {loading} = this.state
		const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'
		const buttonsClass = 'col-sm-offset-2 col-sm-10'
		return (
			<Form ref="form" state={this.state} setState={this.setState.bind(this)} validations={validations}
			      onSubmit={this.onSubmit}>
				<Panel header={<h3>{t('editProfile.title')} <Loading loading={loading}/></h3>}>
					<TextField id="username" label={t('user.username.label')} classes={fieldClasses}/>
					<TextField id="email" label={t('user.email.label')} classes={fieldClasses}/>
					<TextField id="name" label={t('user.name')} classes={fieldClasses}/>

					<FormGroup>
						<div className={buttonsClass}>
							<SaveButton/>
							<LinkBack to="/profile"/>
						</div>
					</FormGroup>

					<FormMessages className={buttonsClass}/>
				</Panel>
			</Form>
		)
	},

	componentDidMount() {
		this.setState({loading: true})

		userRead(this,
			(values, version) => {
				const {username} = values
				this.setState({values, version, originalUsername: username, loading: false})
			})
	},

	onSubmit() {
		const {setSaving} = this.props
		setSaving()
		const {version, values, originalUsername} = this.state
		const {username, email, name} = values

		userUpdate(this, originalUsername, version,
			{username, email, name},
			this.handleUpdated)
	},

	convertFieldError(field, fieldErrors) {
		if ('username' === field && 'duplicate' === fieldErrors[0]) {
			return t('user.username.msg.duplicate')
		}
		if ('email' === field && 'duplicate' === fieldErrors[0]) {
			return t('user.email.msg.duplicate')
		}
	},

	handleUpdated() {
		const {values} = this.state
		const {username, email, name} = values
		const session = getSession()
		session.user = {...session.user, ...{username, email, name}}
		loggedIn(session)

		const {router, setSaved} = this.props
		setSaved()
		router.push('/profile')
	},
})

export default wrapPage(ProfileEditPage)
