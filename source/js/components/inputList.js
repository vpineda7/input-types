import React from "react";
import InputItem from "./inputItem";

let InputList = function(props) {

	function render() {
		let inputItems = props.inputs.map(function(item) {
			return React.createElement(InputItem, 
				{ 
					key: item.id,
					id: item.id,
					type: item.type,
					pattern: item.pattern,
					required: item.required,
					update: props.updateInput,
					removeClick: props.removeInputClick.bind(this, item.id)
				});
		}, this);

		return React.createElement('div', 
			{
				className: 'input-sections'
			}, 
			inputItems);
	}

	return render();

}

export default InputList;