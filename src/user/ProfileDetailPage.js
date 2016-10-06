import React from 'react'
import ReactDOM from 'react-dom'
import {Form, TextField, CustomField} from 'react-forms-ui'
import {Panel, Label, FormGroup, Button} from 'react-bootstrap'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)
import {getSession} from '../local-storage'
import {processResponse, authorizationHeader} from '../api'
import wrapPage from '../wrapPage'

const statusStyle = status => {
	switch (status) {
		case 'active':
			return 'success'
		default:
			return null
	}
}

const ProfileDetailPage = React.createClass({
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
					<CustomField id="username" label={t('user.username.label')} classes={fieldClasses} readonly>
						<code>{values.username}</code>
					</CustomField>
					<CustomField id="email" label={t('user.email.label')} classes={fieldClasses} readonly>
						<a href={'mailto:' + values.email}>{values.email}</a>
					</CustomField>
					<TextField id="name" label={t('user.name')} classes={fieldClasses} readonly/>
					<CustomField id="status" label={t('user.status.label')} classes={fieldClasses} readonly>
						<Label bsStyle={statusStyle(values.status)}>
							{t('user.status.values.' + values.status)}</Label>
					</CustomField>
					<CustomField id="roles" label={t('user.roles.label')} classes={fieldClasses} readonly>
						{values.roles ?
							values.roles.split(',').map(role =>
								<Label key={role} bsStyle="primary" className="spaced">
									{t('user.roles.values.' + role)}</Label>
							) : ''}
					</CustomField>

					<FormGroup>
						<div className={buttonsClass}>
							<Button ref="edit" href="#/profile/edit" autoFocus>
								<span className="fa fa-edit"> </span> {t('button.edit')}
							</Button>
							<Button bsStyle="link" className="pull-right" href="#/">
								<span className="fa fa-chevron-left"> </span> {t('button.back')}
							</Button>
						</div>
					</FormGroup>
				</Panel>
			</Form>
		)
	},

	componentDidMount() {
		ReactDOM.findDOMNode(this.refs.edit).focus()

		const {user: {username}} = getSession()
		fetch(`/api/users/${username}`, {
			headers: authorizationHeader(),
		})
			.then(processResponse(this))
			.then(response => response.json())
			.then(values => {
				this.setState({values})
			})
			.catch(
				err => console.error(err)
			)
	},
})

export default wrapPage(ProfileDetailPage)
