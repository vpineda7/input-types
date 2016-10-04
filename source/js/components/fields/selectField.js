import React from "react";

let SelectField = React.createClass({

	renderOptions: function() {
		return this.props.options.map(function(option) {
			return React.createElement('option', { value: option.value }, option.label );
		});
	},

	render: function() {



		let selectEl = React.createElement('select', 
			{
				id: this.props.id,
				name: this.props.name,
				defaultValue: this.props.defaultValue,
				onChange: this.props.onChange
			},
			this.renderOptions());

		let labelEl = React.createElement('label', 
			{
				htmlFor: this.props.id
			}, 
			this.props.label);

		return React.createElement('div', 
			{
				className: "field" 
			}, 
			labelEl, selectEl);
	}
});

export default SelectField;