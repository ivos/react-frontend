import React from 'react'
import ReactDOM from 'react-dom'
import {Form} from 'react-forms-ui'
import {Panel, ListGroup, ListGroupItem, Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import Loading from '../ui/Loading'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)
import wrapPage from '../wrapPage'
import {projectList} from '../api/project'

const ProjectListPage = React.createClass({
	getInitialState() {
		return {}
	},

	getPageTitle() {
		return t('projectList.title')
	},

	render() {
		const {data, loading} = this.state
		return (
			<Form ref="form" state={this.state} setState={this.setState.bind(this)}>
				<Panel header={<h3>{t('projectList.title')} <Loading loading={loading}/></h3>}>
					<ListGroup fill>
						{data && data.map(function (model, index) {
							return (
								<LinkContainer key={model.uri} to={`/projects/${model.code}`}>
									<ListGroupItem ref={`item${index}`} className="list-group-item">
										<span style={{marginRight: 20}}>{model.name}</span>
										<code>{model.code}</code>
									</ListGroupItem>
								</LinkContainer>
							)
						})}
					</ListGroup>
				</Panel>

				<LinkContainer to="/projects/new">
					<Button ref="create">
						<span className="fa fa-plus"> </span> {t('button.create')}
					</Button>
				</LinkContainer>
			</Form>
		)
	},

	componentDidMount() {
		this.setState({loading: true})

		const {values} = this.state
		projectList(this, values || {},
			data => {
				this.setState({data, loading: false}, this.focusFirstItem)
			})
	},

	focusFirstItem() {
		ReactDOM.findDOMNode(this.refs.item0 || this.refs.create).focus()
	},
})

export default wrapPage(ProjectListPage)
