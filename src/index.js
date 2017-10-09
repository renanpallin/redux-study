import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import './index.css';

import * as Redux from 'redux';

class Reducer {
	constructor(data) {
		this.data = data
	}

	get(prop, d) {
		return this.data[prop] || d;
	}
}

const reducer = (state = 0, { type }) => new Reducer({
   'INCREMENT': () => ++state,
   'DECREMENT': () => --state,
}).get(type, () => state)()


// const reducer = (state = 0, action) => {
// 	console.log(state, action);
// 	switch (action.type) {
// 		case 'INCREMENT':
// 			return ++state;
// 		case 'DECREMENT':
// 			return --state;
// 		default:
// 			return state;
// 	}
// }

const store = Redux.createStore(reducer)
const App = props => (
	<div className="App">
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<h1 className="App-title">{ props.value }</h1>

			<div className="actions">
				<button onClick={props.onClickInc}>+</button>
				<button onClick={props.onClickDec}>-</button>
			</div>
		</header>
	</div>
);

const render = () => ReactDOM.render(
	<App value={store.getState()}
		onClickInc={e => store.dispatch({ type : 'INCREMENT' })}
		onClickDec={e => store.dispatch({ type : 'DECREMENT' })} />,
	document.getElementById('root')
)
render()
store.subscribe(render)
// registerServiceWorker();
