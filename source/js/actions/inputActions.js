let addInput = function() {
	return {
		type: 'ADD_INPUT',
		id: new Date().getUTCMilliseconds()
	}
}

let removeInput = function(id) {
	return {
		type: 'REMOVE_INPUT',
		id
	}
}

let updateInput = function(input) {
	return {
		type: 'UPDATE_INPUT',
		input: input
	}
}

export {
	addInput,
	removeInput,
	updateInput
}