import { combineReducers } from 'redux';

const todoReducer = (state = {}, action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return {
				id: action.id,
				text: action.text,
				done: false
			};
		case 'TOOGLE_TODO':
			// console.log('toogle todo>>>', state, action)
			if (state.id !== action.id)
				return state;
			return {
				...state,
				done: !state.done
			}
		default:
			return state;
	}
}

const byId = (state = {}, action) => {
	switch (action.type) {
		case 'ADD_TODO':
		case 'TOOGLE_TODO':
			// return state.map(todo => todoReducer(todo, action));
			// console.log('on byid:', state, action);
			return {
				...state,
				[action.id]: todoReducer(state[action.id], action)
			};
		// case 'RECEIVE_TODOS':
		// 	console.log('heeh')
		// 	return action.response
			// console.log(action)
		default:
			return state;
	}
}

const allIds = (state = [], action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return [...state, action.id];
		// case 'RECEIVE_TODOS':
		// 	console.log('heeh')
		// 	return action.response
		// 	// console.log(action)
		default:
			return state;
	}
}

const todosReducer = combineReducers({
	byId,
	allIds
})

export default todosReducer