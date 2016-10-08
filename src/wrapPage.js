import React from 'react'
import {routerShape} from 'react-router/lib/PropTypes'
import hoistStatics from 'hoist-non-react-statics'
import DocumentTitle from 'react-document-title'
import i18n from './i18n'
const t = i18n.t.bind(i18n)

const getDisplayName = WrappedComponent => {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

const getTitle = WrappedComponent => {
	const pageTitle = WrappedComponent.prototype.getPageTitle ? WrappedComponent.prototype.getPageTitle() : null
	return t('app.title') + (pageTitle ? ' - ' + pageTitle : '')
}

const wrapPage = WrappedComponent => {
	const WrapPage = React.createClass({
		contextTypes: {
			router: routerShape,
			setSystemMessage: React.PropTypes.func,
			setSaving: React.PropTypes.func,
			setSaved: React.PropTypes.func,
			setAfterLogin: React.PropTypes.func,
			getAfterLogin: React.PropTypes.func,
		},
		propTypes: {
			router: routerShape,
			setSystemMessage: React.PropTypes.func,
			setSaving: React.PropTypes.func,
			setSaved: React.PropTypes.func,
			setAfterLogin: React.PropTypes.func,
			getAfterLogin: React.PropTypes.func,
		},

		render() {
			const router = this.props.router || this.context.router
			const setSystemMessage = this.props.setSystemMessage || this.context.setSystemMessage
			const setSaving = this.props.setSaving || this.context.setSaving
			const setSaved = this.props.setSaved || this.context.setSaved
			const setAfterLogin = this.props.setAfterLogin || this.context.setAfterLogin
			const getAfterLogin = this.props.getAfterLogin || this.context.getAfterLogin
			const props = {...this.props, router, setSystemMessage, setSaving, setSaved, setAfterLogin, getAfterLogin,}
			const title = getTitle(WrappedComponent)
			return (
				<DocumentTitle title={title}>
					<WrappedComponent {...props} />
				</DocumentTitle>
			)
		}
	})

	WrapPage.displayName = `wrapPage(${getDisplayName(WrappedComponent)})`
	WrapPage.WrappedComponent = WrappedComponent

	return hoistStatics(WrapPage, WrappedComponent)
}

export default wrapPage
