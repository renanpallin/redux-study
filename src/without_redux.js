const createStore = reducer => {
	let state;
	let observers = [];
	
	return {
		getState: () => state,
		subscribe: cb => {
			observers.push(cb);
			return () => observers = observers.filter(o => o !== cb)
 		},
 		dispatch: action => {
 			state = reducer(state, action);
 			observers.forEach(o => o());
 		}
	}	 
}

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