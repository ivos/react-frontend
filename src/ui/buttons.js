import React from 'react'
import {Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)

export const LinkBack = ({to}) => (
	<LinkContainer to={to}>
		<Button bsStyle="link" className="pull-right">
			<span className="fa fa-chevron-left"> </span> {t('button.back')}
		</Button>
	</LinkContainer>
)

LinkBack.propTypes = {
	to: React.PropTypes.string.isRequired,
}

export const SaveButton = () => (
	<Button type="submit" bsStyle="primary">
		<span className="fa fa-check"> </span> {t('button.save')}
	</Button>
)
