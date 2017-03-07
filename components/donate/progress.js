import React from 'react';

const Progress = React.createClass({
	render() {
		let section = this.props.section + 1;
		let progress = 100 / 3 * section;
		let status = {width: `${progress}%`};

		return (
			<div className="pro-bar">
				<div className="pro-bar__status" style={status}></div>
			</div>
		)
	}
});