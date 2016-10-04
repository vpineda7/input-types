import React from "react";

let TextboxField = React.createClass({

	

	render: function() {

		let textboxEl = React.createElement('input', 
			{
				id: this.props.id,
				type: this.props.type ? this.props.type : 'text',
				name: this.props.name,
				defaultValue: this.props.defaultValue,
				required: this.props.required,
				pattern: this.props.pattern,
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
			labelEl, textboxEl);
	}
});

export default TextboxField;