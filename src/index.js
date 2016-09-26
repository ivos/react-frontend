import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import 'select2/select2.css'
import 'react-forms-ui/lib/react-forms-ui.css'
import {initialize} from 'react-forms-ui'

initialize()

import RegisterPage from './user/RegisterPage'
import './index.css'

ReactDOM.render(
	<RegisterPage/>,
	document.getElementById('root')
)
