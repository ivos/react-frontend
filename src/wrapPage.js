import React from 'react'
import {routerShape} from 'react-router/lib/PropTypes'
import hoistStatics from 'hoist-non-react-statics'

const getDisplayName = WrappedComponent => {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

const wrapPage = WrappedComponent => {
	const WrapPage = React.createClass({
		contextTypes: {
			router: routerShape,
			setSystemMessage: React.PropTypes.func,
			setSaved: React.PropTypes.func,
			setAfterLogin: React.PropTypes.func,
			afterLogin: React.PropTypes.func,
		},
		propTypes: {
			router: routerShape,
			setSystemMessage: React.PropTypes.func,
			setSaved: React.PropTypes.func,
			setAfterLogin: React.PropTypes.func,
			afterLogin: React.PropTypes.func,
		},

		render() {
			const router = this.props.router || this.context.router
			const setSystemMessage = this.props.setSystemMessage || this.context.setSystemMessage
			const setSaved = this.props.setSaved || this.context.setSaved
			const setAfterLogin = this.props.setAfterLogin || this.context.setAfterLogin
			const afterLogin = this.props.afterLogin || this.context.afterLogin
			const props = {...this.props, router, setSystemMessage, setSaved, setAfterLogin, afterLogin,}
			return <WrappedComponent {...props} />
		}
	})

	WrapPage.displayName = `wrapPage(${getDisplayName(WrappedComponent)})`
	WrapPage.WrappedComponent = WrappedComponent

	return hoistStatics(WrapPage, WrappedComponent)
}

export default wrapPage
