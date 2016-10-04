import React from "react";

let InputMarkup = function(props) {

	function renderMarkup() {
		return `<input ${renderMarkupAttrs()} />`;
	}

	function renderMarkupAttrs() {
		let attrs = '';

		for(var propName in props) {
			if(props[propName]) {
				attrs += propName + '="' + props[propName] + '" ';
			}
		}

		return attrs;
	}

	return React.createElement('code', null, renderMarkup());
}

export default InputMarkup;