import React from 'react'
import ReactDOM from 'react-dom'
import {Form, TextField, CustomField} from 'react-forms-ui'
import {Panel, Label, FormGroup, Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {LinkBack} from '../ui/buttons'
import Loading from '../ui/Loading'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)
import wrapPage from '../wrapPage'
import {userRead} from '../api/user'

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

	getPageTitle() {
		return t('profile.title')
	},

	render() {
		const {loading} = this.state
		const {values = {}} = this.state
		const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'
		const buttonsClass = 'col-sm-offset-2 col-sm-10'
		return (
			<Form state={this.state} setState={this.setState.bind(this)}>
				<Panel header={<h3>{t('profile.title')} <Loading loading={loading}/></h3>}>
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
							<LinkContainer to="/profile/edit">
								<Button ref="edit" className="spaced">
									<span className="fa fa-edit"> </span> {t('button.edit')}
								</Button>
							</LinkContainer>
							<LinkContainer to="/profile/change-password">
								<Button className="spaced">
									<span className="fa fa-unlock-alt"> </span> {t('button.changePassword')}
								</Button>
							</LinkContainer>
							<LinkBack to="/"/>
						</div>
					</FormGroup>
				</Panel>
			</Form>
		)
	},

	componentDidMount() {
		this.setState({loading: true})
		ReactDOM.findDOMNode(this.refs.edit).focus()

		userRead(this,
			values => {
				this.setState({values, loading: false})
			})
	},
})

export default wrapPage(ProfileDetailPage)
