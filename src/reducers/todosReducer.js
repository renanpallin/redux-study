import { combineReducers } from 'redux';

// const todoReducer = (state = {}, action) => {
// 	switch (action.type) {
// 		case 'ADD_TODO':
// 			return {
// 				id: action.id,
// 				text: action.text,
// 				done: false
// 			};
// 		case 'TOOGLE_TODO':
// 			// console.log('toogle todo>>>', state, action)
// 			if (state.id !== action.id)
// 				return state;
// 			return {
// 				...state,
// 				done: !state.done
// 			}
// 		default:
// 			return state;
// 	}
// }

const byId = (state = {}, action) => {
	switch (action.type) {
		case 'RECEIVE_TODOS':
			return action.response.reduce((newState, todo) => {
				newState[todo.id] = todo;
				return newState;
			}, {});

		// case 'ADD_TODO':
		// case 'TOOGLE_TODO':
		// 	// return state.map(todo => todoReducer(todo, action));
		// 	// console.log('on byid:', state, action);
		// 	return {
		// 		...state,
		// 		[action.id]: todoReducer(state[action.id], action)
		// 	};
		// case 'RECEIVE_TODOS':
		// 	console.log('heeh')
		// 	return action.response
			// console.log(action)
		default:
			return state;
	}
}

const allIds = (state = [], action) => {
	if (action.filter !== 'ALL')
		return state;

	switch (action.type) {
		case 'RECEIVE_TODOS':
			return action.response.map(todo => todo.id);

		// case 'ADD_TODO':
		// 	return [...state, action.id];
		// case 'RECEIVE_TODOS':
		// 	console.log('heeh')
		// 	return action.response
		// 	// console.log(action)
		default:
			return state;
	}
}

const activeIds = (state = [], action) => {
	if (action.filter !== 'ACTIVE')
		return state;

	switch (action.type) {
		case 'RECEIVE_TODOS':
			return action.response.map(todo => todo.id);
		default:
			return state;
	}
}

const completedIds = (state = [], action) => {
	if (action.filter !== 'COMPLETED')
		return state;

	switch (action.type) {
		case 'RECEIVE_TODOS':
			return action.response.map(todo => todo.id);
		default:
			return state;
	}
}

const todosReducer = combineReducers({
	byId,
	idsByFilter: combineReducers({
		ALL: allIds,
		ACTIVE: activeIds,
		COMPLETED: completedIds,
	})
})

export default todosReducer