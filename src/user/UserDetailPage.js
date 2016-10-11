import React from 'react'
import {Form} from 'react-forms-ui'
import {Panel, FormGroup, Button} from 'react-bootstrap'
import {LinkBack} from '../ui/buttons'
import Loading from '../ui/Loading'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)
import wrapPage from '../wrapPage'
import {userRead, userDisable, userActivate} from '../api/user'
import UserDetail from './UserDetail'

const UserDetailPage = React.createClass({
	getInitialState() {
		return {}
	},

	getPageTitle() {
		return t('userDetail.title')
	},

	render() {
		const {loading, values = {}} = this.state
		const buttonsClass = 'col-sm-offset-2 col-sm-10'
		return (
			<Form ref="form" state={this.state} setState={this.setState.bind(this)}>
				<Panel header={
					<h3>
						<span className="text-muted">{t('userDetail.title')}</span> <strong>{values.name}</strong>
						<Loading loading={loading}/>
					</h3>
				}>
					<UserDetail values={values}/>

					<FormGroup>
						<div id="form-buttons" className={buttonsClass}>
							<Button bsStyle="warning" className="spaced" onClick={this.handleAction(userDisable)}
							        disabled={'active' !== values.status}>
								<span className="fa fa-times"> </span> {t('button.disable')}
							</Button>
							<Button bsStyle="warning" className="spaced" onClick={this.handleAction(userActivate)}
							        disabled={'disabled' !== values.status}>
								<span className="fa fa-check"> </span> {t('button.activate')}
							</Button>
							<LinkBack to="/users"/>
						</div>
					</FormGroup>
				</Panel>
			</Form>
		)
	},

	reload() {
		this.setState({loading: true})
		const {username} = this.props.params
		userRead(this, username,
			(values, version) => {
				this.setState({values, version, loading: false},
					() => {
						document.querySelector('#form-buttons button:not([disabled]), #form-buttons a').focus()
					})
			})
	},

	componentDidMount() {
		this.reload()
	},

	handleAction(api) {
		return () => {
			const {setSaving, setSaved} = this.props
			setSaving()
			const {values:{username}, version} = this.state
			api(this, username, version,
				() => {
					setSaved()
					this.reload()
				})
		}
	},
})

export default wrapPage(UserDetailPage)
