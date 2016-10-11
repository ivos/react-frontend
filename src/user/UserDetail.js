import React from 'react'
import {TextField, CustomField} from 'react-forms-ui'
import {Label} from 'react-bootstrap'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)

const statusStyle = status => {
	switch (status) {
		case 'active':
			return 'success'
		case 'disabled':
			return 'default'
		default:
			return null
	}
}

const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'

export default ({values}) => (
	<div>
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
	</div>
)
