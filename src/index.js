import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import 'select2/select2.css'
import 'react-forms-ui/lib/react-forms-ui.css'
import {initialize} from 'react-forms-ui'

initialize()

import './index.css'

import AppRouter from './AppRouter'

ReactDOM.render(
	<AppRouter/>,
	document.getElementById('root')
)
