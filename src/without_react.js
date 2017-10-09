/**
 * Just import this file and remove ReactDOM.render to use
 */
import { createStore } from 'redux';

const counterReducer = (state = 0, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return ++state;
		case 'DECREMENT':
			return --state;
		default:
			return state;
	}
}

const store = createStore(counterReducer);
const render = _ => document.body.innerText = store.getState();
render()
store.subscribe(render);

document.addEventListener('click', e => store.dispatch({ type: 'INCREMENT' }))