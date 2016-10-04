let defaultInputs = [
	createInput()
];

function createInput() {
	return {
		id: new Date().getUTCMilliseconds(),
		type: 'text'
	};
}

function addInput(state) {
	return state.slice().concat(createInput());
}

function removeInput(state, id) {
	let index = state.findIndex(function(input) {
		return input.id == id;
	});

	if(index >= 0) {
		let newState = state.slice();
		newState.splice(index, 1);
		return newState;
	} 

	return state;
}

function updateInput(state, updatedInput) {
	let index = state.findIndex(function(input) {
		return input.id == updatedInput.id;
	});


	if(index >= 0) {
		let newState = state.slice();
		newState[index] = Object.assign({}, newState[index], updatedInput);
		console.log(newState);
		return newState;
	}

	return state;
}

let inputs = function(state = defaultInputs, action) {

	console.log(action);
	console.log(state);

	switch(action.type) {
		case "ADD_INPUT": 
			return addInput(state);
		case "REMOVE_INPUT":
			return removeInput(state, action.id);
		case "UPDATE_INPUT":
			return updateInput(state, action.input);
	}

	return state;
}

export default inputs;