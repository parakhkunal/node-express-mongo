import React, { Component }from 'react';


export default class TextBox extends Component {

	render() {
		return <input onChange={this.onInputChange} />;	
	}

	onInputChange(event) {
		console.log(event.target.value);
	}
}