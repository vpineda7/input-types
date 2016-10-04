import React from "react";
import TextboxField from "./fields/textboxField";
import SelectField from "./fields/selectField";
import CheckboxField from "./fields/checkboxField";
import InputMarkup from "./inputMarkup";

let InputItem = function(props) {

	function onChange(e) {
		let updateObj = {
			id: props.id
		};
		let value;

		switch(e.target.type) {
			case "checkbox":
				value = e.target.checked;
				break;
			default:
				value = e.target.value;
				break;
		}

		updateObj[e.target.name] = value;

		props.update(updateObj);
	}

	function getTypeOptions() {
		return [
			{
				label: 'Text',
				value: 'text'
			},
			{
				label: 'Email',
				value: 'email'
			}
		];
	}

	function getPatternOptions() {
		return [
			{
				label: 'No Pattern',
				value: ''
			},
			{
				label: 'Numbers only - [0-9]*',
				value: '[0-9]*'
			}
		];
	}

	function render() {
		let inputField = React.createElement(TextboxField, 
			{
				id: 'input-' + props.id,
				name: 'type',
				label: 'Input',
				type: props.type,
				pattern: props.pattern,
				required: props.required
			});

		let typeField = React.createElement(SelectField, 
			{
				id: 'type-' + props.id,
				name: 'type',
				defaultValue: props.type,
				label: 'Type',
				onChange: onChange,
				options: getTypeOptions()
			});

		let patternField = React.createElement(SelectField,
			{
				id: 'pattern-' + props.id,
				name: 'pattern',
				defaultValue: props.pattern,
				label: 'Pattern',
				onChange: onChange,
				options: getPatternOptions()
			});

		let requiredField = React.createElement(CheckboxField, 
			{
				id: 'required-' + props.id,
				name: 'required',
				label: 'Make this input required',
				checked: props.required,
				onChange: onChange
			});

		let removeButton = React.createElement('button', 
			{
				onClick: props.removeClick
			}, 
			'Remove');

		let inputMarkup = React.createElement(InputMarkup,
			{
				type: props.type,
				pattern: props.pattern,
				required: props.required
			});


		return React.createElement('div', 
			{
				className: 'input-section'
			}, 
			inputField, 
			inputMarkup,
			typeField, 
			patternField,
			requiredField, 
			removeButton);
	}

	return render();

}

export default InputItem;