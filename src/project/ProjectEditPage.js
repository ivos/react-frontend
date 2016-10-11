import React from 'react'
import i18n from '../i18n'
import {Form, TextField, DateField, NumberField, FormMessages} from 'react-forms-ui'
import {Panel, FormGroup} from 'react-bootstrap'
import {LinkBack, SaveButton} from '../ui/buttons'
import Loading from '../ui/Loading'
const t = i18n.t.bind(i18n)
import wrapPage from '../wrapPage'
import {projectRead, projectCreate, projectUpdate} from '../api/project'

const validations = {
	name: {
		required: true,
		maxLength: 100,
	},
	code: {
		required: true,
		maxLength: 100,
		pattern: /^[a-z0-9_]*$/,
		autoSuccess: false,
	},
	visibility: {
		required: true,
	},
	description: {
		maxLength: 500,
	},
	start: {},
	duration: {
		max: 9999,
	},
	budget: {
		max: 9999999,
	},
}

const ProjectEditPage = React.createClass({
	getInitialState() {
		return {}
	},

	getPageTitle() {
		const {params: {code}} = this.props
		return code ? t('projectEdit.title') : t('projectCreate.title')
	},

	render() {
		const {params: {code}} = this.props
		const {loading, values = {}} = this.state
		const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'
		const buttonsClass = 'col-sm-offset-2 col-sm-10'
		return (
			<Form ref="form" state={this.state} setState={this.setState.bind(this)} validations={validations}
			      onSubmit={this.onSubmit}>
				<Panel header={<h3>
					<span className="text-muted">{code ? t('projectEdit.title') : t('projectCreate.title')}</span>
					{' '}
					{code && <strong>{values.name}</strong>}
					<Loading loading={loading}/>
				</h3>}>
					<TextField id="name" label={t('project.name')} classes={fieldClasses}/>
					<TextField id="code" label={t('project.code.label')} classes={fieldClasses}/>
					<TextField id="visibility" label={t('project.visibility.label')} classes={fieldClasses}/>
					<TextField id="description" label={t('project.description')} classes={fieldClasses}/>
					<DateField id="start" label={t('project.start')} classes={fieldClasses}/>
					<NumberField id="duration" label={t('project.duration')} classes={fieldClasses}/>
					<NumberField id="budget" label={t('project.budget')} classes={fieldClasses}/>

					<FormGroup>
						<div className={buttonsClass}>
							<SaveButton/>
							<LinkBack to={code ? `/projects/${code}` : '/projects'}/>
						</div>
					</FormGroup>

					<FormMessages className={buttonsClass}/>
				</Panel>
			</Form>
		)
	},

	componentDidMount() {
		const {params: {code}} = this.props
		if (code) {
			this.setState({loading: true})
			projectRead(this, code,
				(values, version) => {
					this.setState({values, version, originalCode: code, loading: false})
				}
			)
		}
	},

	onSubmit() {
		const {setSaving, params} = this.props
		setSaving()
		const {version, values, originalCode} = this.state
		const {name, code, visibility, description, start, duration, budget, dailyMeetingAt, kickOff} = values
		const data = {name, code, visibility, description, start, duration, budget, dailyMeetingAt, kickOff}

		if (!params.code) {
			projectCreate(this,
				data,
				this.handleSaved)
		} else {
			projectUpdate(this, originalCode, version,
				data,
				this.handleSaved)
		}
	},

	convertFieldError(field, fieldErrors) {
		if ('code' === field && 'duplicate' === fieldErrors[0]) {
			return t('project.code.msg.duplicate')
		}
	},

	handleSaved() {
		const {router, setSaved} = this.props
		const {values: {code}} = this.state
		setSaved()
		router.push(`/projects/${code}`)
	},
})

export default wrapPage(ProjectEditPage)
