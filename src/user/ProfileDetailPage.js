import React from 'react'
import ReactDOM from 'react-dom'
import {Form} from 'react-forms-ui'
import {Panel, FormGroup, Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {LinkBack} from '../ui/buttons'
import Loading from '../ui/Loading'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)
import wrapPage from '../wrapPage'
import {userReadCurrent} from '../api/user'
import UserDetail from './UserDetail'

const ProfileDetailPage = React.createClass({
	getInitialState() {
		return {}
	},

	getPageTitle() {
		return t('profile.title')
	},

	render() {
		const {loading, values = {}} = this.state
		const buttonsClass = 'col-sm-offset-2 col-sm-10'
		return (
			<Form state={this.state} setState={this.setState.bind(this)}>
				<Panel header={<h3>{t('profile.title')} <Loading loading={loading}/></h3>}>
					<UserDetail values={values}/>

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

		userReadCurrent(this,
			values => {
				this.setState({values, loading: false})
			})
	},
})

export default wrapPage(ProfileDetailPage)
