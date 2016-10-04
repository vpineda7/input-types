import React from "react";

let CheckboxField = React.createClass({

	render: function() {
		let checkboxEl = React.createElement('input', 
			{
				type: 'checkbox',
				id: this.props.id,
				name: this.props.name,
				checked: this.props.checked,
				onChange: this.props.onChange
			});

		let labelEl = React.createElement('label', 
			{
				htmlFor: this.props.id
			}, 
			this.props.label);

		return React.createElement('div', 
			{
				className: "field" 
			}, 
			checkboxEl, labelEl);
	}
});

export default CheckboxField;