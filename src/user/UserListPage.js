import React from 'react'
import ReactDOM from 'react-dom'
import {Form} from 'react-forms-ui'
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import Loading from '../ui/Loading'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)
import wrapPage from '../wrapPage'
import {userList} from '../api/user'

const UserListPage = React.createClass({
	getInitialState() {
		return {}
	},

	getPageTitle() {
		return t('userList.title')
	},

	render() {
		const {data, loading} = this.state
		return (
			<Form ref="form" state={this.state} setState={this.setState.bind(this)}>
				<Panel header={<h3>{t('userList.title')} <Loading loading={loading}/></h3>}>
					<ListGroup fill>
						{data && data.map(function (model, index) {
							return (
								<LinkContainer key={model.uri} to={`/users/${model.username}`}>
									<ListGroupItem ref={`item${index}`} className="list-group-item">
										<span style={{marginRight: 20}}>{model.name}</span>
										<code>{model.username}</code>
									</ListGroupItem>
								</LinkContainer>
							)
						})}
					</ListGroup>
				</Panel>
			</Form>
		)
	},

	componentDidMount() {
		this.setState({loading: true})

		const {values} = this.state
		userList(this, values || {},
			data => {
				this.setState({data, loading: false}, this.focusFirstItem)
			})
	},

	focusFirstItem() {
		const {item0} = this.refs
		if (item0) {
			ReactDOM.findDOMNode(item0).focus()
		}
	},
})

export default wrapPage(UserListPage)
