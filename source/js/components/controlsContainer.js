import { connect } from 'react-redux';
import controls from './controls';
import { addInput } from 'actions/inputActions';


let mapStateToProps = function(state){
	return {};
}

let mapDispatchToProps = function(dispatch){
	return {
  		addInputClick: function() {
      		dispatch(addInput());
    	}
  	}
}

let ControlsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(controls);

export default ControlsContainer;
