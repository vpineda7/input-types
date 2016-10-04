import { connect } from 'react-redux';
import inputList from './inputList';
import { updateInput, removeInput } from 'actions/inputActions';


let mapStateToProps = function(state){
	return {
    	inputs: state
  	}
}

let mapDispatchToProps = function(dispatch){
	return {
    	removeInputClick: function(id) {
    		dispatch(removeInput(id));
    	},
    	updateInput: function(input) {
    		dispatch(updateInput(input));
    	}
  	}
}

let InputListContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(inputList);

export default InputListContainer;
