import React from 'react'

const Loading = ({loading}) => {
	if (loading) {
		return (<span className="pull-right fa fa-refresh fa-lg fa-spin"/>)
	} else {
		return (<span/>)
	}
}

export default Loading
