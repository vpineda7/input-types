import React from "react";

let Controls = function(props) {
	
	let addInputButton = React.createElement('button', 
		{ 
			className: 'button',
			onClick: props.addInputClick 
		},
		'Add an Input');

	return React.createElement('div', 
		{
			className: 'controls'
		}, 
		addInputButton);
};

export default Controls;