import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import 'select2/select2.css'
import 'react-forms-ui/lib/react-forms-ui.css'
import {initialize} from 'react-forms-ui'

initialize()

import App from './App'
import './index.css'

ReactDOM.render(
	<App />,
	document.getElementById('root')
)
