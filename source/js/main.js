import React from "react";
import ReactDom from "react-dom";
import App from "components/app";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import inputsReducer from "reducers/inputsReducer";

let main = function() {

	let store = createStore(inputsReducer)

	let appInst = React.createElement(App);
	let appEl = document.querySelector('#app');

	let providerInst = React.createElement(Provider, {store: store}, appInst);


	ReactDom.render(providerInst, appEl);


};


export default main();


