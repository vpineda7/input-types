import React from "react";
import ControlsContainer from "./controlsContainer";
import InputListContainer from "./inputListContainer";

let App = function(props) {

	let controlsInst = React.createElement(ControlsContainer);

	let inputListInst = React.createElement(InputListContainer);

	return React.createElement('div', null, controlsInst, inputListInst);
};

export default App;