import React from 'react'
import ReactDOM from 'react-dom'
import {Form, TextField, CustomField, DateField, NumberField} from 'react-forms-ui'
import {Panel, FormGroup, Button, Label} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {LinkBack} from '../ui/buttons'
import Loading from '../ui/Loading'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)
import wrapPage from '../wrapPage'
import {projectRead} from '../api/project'
import moment from 'moment'

const visibilityStyle = visibility => {
	switch (visibility) {
		case 'private':
			return 'primary'
		default:
			return 'success'
	}
}

const ProjectDetailPage = React.createClass({
	getInitialState() {
		return {}
	},

	getPageTitle() {
		return t('projectDetail.title')
	},

	render() {
		const {code} = this.props.params
		const {loading, values = {}} = this.state
		const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'
		const buttonsClass = 'col-sm-offset-2 col-sm-10'
		return (
			<Form state={this.state} setState={this.setState.bind(this)}>
				<Panel header={<h3>
					<span className="text-muted">{t('projectDetail.title')}</span> <strong>{values.name}</strong>
					<Loading loading={loading}/>
				</h3>}>
					<TextField id="name" label={t('project.name')} classes={fieldClasses} readonly/>
					<CustomField id="code" label={t('project.code.label')} classes={fieldClasses} readonly>
						<code>{values.code}</code>
					</CustomField>
					<CustomField id="visibility" label={t('project.visibility.label')} classes={fieldClasses} readonly>
						<Label bsStyle={visibilityStyle(values.visibility)}>
							{t('project.visibility.values.' + values.visibility)}</Label>
					</CustomField>
					<TextField id="description" label={t('project.description')} classes={fieldClasses} readonly/>
					<DateField id="start" label={t('project.start')} classes={fieldClasses} readonly/>
					<NumberField id="duration" label={t('project.duration')} classes={fieldClasses} readonly/>
					<NumberField id="budget" label={t('project.budget')} classes={fieldClasses} readonly/>
					<CustomField id="dailyMeetingAt" label={t('project.dailyMeetingAt')} classes={fieldClasses}
					             readonly>
						{values.dailyMeetingAt && moment(values.dailyMeetingAt, 'HH:mm:ss').format('LT')}
					</CustomField>
					<CustomField id="kickOff" label={t('project.kickOff')} classes={fieldClasses} readonly>
						{values.kickOff && moment(values.kickOff).format('l, LTS')}
					</CustomField>
					<CustomField id="created" label={t('project.created')} classes={fieldClasses} readonly>
						{moment(values.created).format('l, LTS.SSS')}
					</CustomField>

					<FormGroup>
						<div className={buttonsClass}>
							<LinkContainer to={`/projects/${code}/edit`}>
								<Button ref="edit" className="spaced">
									<span className="fa fa-edit"> </span> {t('button.edit')}
								</Button>
							</LinkContainer>
							<LinkBack to="/projects"/>
						</div>
					</FormGroup>
				</Panel>
			</Form>
		)
	},

	componentDidMount() {
		this.setState({loading: true})
		ReactDOM.findDOMNode(this.refs.edit).focus()

		const {code} = this.props.params
		projectRead(this, code,
			values => {
				this.setState({values, loading: false})
			}
		)
	},
})

export default wrapPage(ProjectDetailPage)
