import React from 'react'
import {Grid} from 'react-bootstrap'
import Header from './Header'
import {SystemMessage} from 'react-forms-ui'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)

const App = React.createClass({

	getInitialState() {
		return {}
	},

	getChildContext() {
		return {
			setSystemMessage: this.setSystemMessage,
			setSaved: () => this.setSystemMessage({type: 'success', text: t('msg.saved')}),
			setAfterLogin: afterLogin => this.setState({afterLogin}),
			getAfterLogin: () => this.state.afterLogin,
		}
	},

	setSystemMessage(systemMessage) {
		const {msg} = this.refs
		this.setState({systemMessage}, () => {
			if (msg) {
				msg.restore()
			}
		})
	},

	render() {
		const {children, location: {pathname}} = this.props
		const {systemMessage} = this.state
		const active = pathname.split('/')[1] || 'home'
		return (
			<Grid fluid>
				<Header active={active}/>
				<SystemMessage ref="msg" message={systemMessage}/>
				<div>{children}</div>
			</Grid>
		)
	},
})

App.childContextTypes = {
	setSystemMessage: React.PropTypes.func,
	setSaved: React.PropTypes.func,
	setAfterLogin: React.PropTypes.func,
	getAfterLogin: React.PropTypes.func,
}

export default App
