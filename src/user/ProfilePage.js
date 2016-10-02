import React from 'react'
import {Form, TextField, PlainField} from 'react-forms-ui'
import {Panel, FormControl, Label, FormGroup, Button} from 'react-bootstrap'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)
import {getSession} from '../local-storage'
import {authorizationHeader} from '../api'

const statusStyle = status => {
	switch (status) {
		case 'active':
			return 'success'
		default:
			return null
	}
}

const ProfilePage = React.createClass({
	getInitialState() {
		return {}
	},

	render() {
		const {values = {}} = this.state
		const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'
		const buttonsClass = 'col-sm-offset-2 col-sm-10'
		return (
			<Form state={this.state} setState={this.setState.bind(this)}>
				<Panel header={<h3>{t('profile.title')}</h3>}>
					<PlainField id="username" label={t('profile.username')} classes={fieldClasses} readonly>
						<FormControl.Static>
							<code>{values.username}</code>
						</FormControl.Static>
					</PlainField>
					<TextField id="name" label={t('profile.name')} classes={fieldClasses} readonly/>
					<PlainField id="email" label={t('profile.email')} classes={fieldClasses} readonly>
						<FormControl.Static>
							<a href={'mailto:' + values.email}>{values.email}</a>
						</FormControl.Static>
					</PlainField>
					<PlainField id="status" label={t('profile.status')} classes={fieldClasses} readonly>
						<FormControl.Static>
							<Label bsStyle={statusStyle(values.status)}>
								{t('enum.user.status.' + values.status)}</Label>
						</FormControl.Static>
					</PlainField>
					<PlainField id="roles" label={t('profile.roles')} classes={fieldClasses} readonly>
						<FormControl.Static>
							{values.roles ?
								values.roles.split(',').map(role =>
									<Label key={role} bsStyle="primary" className="spaced">
										{t('enum.user.role.' + role)}</Label>
								) : ''}
						</FormControl.Static>
					</PlainField>

					<FormGroup>
						<div className={buttonsClass}>
							<Button>
								<span className="fa fa-edit"> </span> {t('button.edit')}
							</Button>
						</div>
					</FormGroup>
				</Panel>
			</Form>
		)
	},

	componentDidMount() {
		const {user: {username}} = getSession()
		fetch(`/api/users/${username}`, {
			headers: authorizationHeader(),
		})
			.then(response => response.json())
			.then(values => {
				this.setState({values})
			})
			.catch(
				err => console.error(err)
			)
	},
})

export default ProfilePage
