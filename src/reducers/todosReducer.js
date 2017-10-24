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
			}, state);
		case 'ADD_TODO_SUCCESS':
			return {
				...state,
				[action.response.id]: action.response
			};

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

const createList = (filter) => {
	return combineReducers({
		ids: (state = [], action) => {
			if (action.type === 'RECEIVE_TODOS')
				return action.filter === filter ? 
					action.response.map(todo => todo.id) :
					state;
			if (action.type === 'ADD_TODO_SUCCESS')
				return action.filter !== 'completed' ?
					[...state, action.response.id]:
					state;
			return state;
		},
		isFetching: (state = false, action) => {
			if (action.filter !== filter)
				return state;
			if (action.type === 'REQUEST_TODOS')
				return true;
			if (action.type === 'RECEIVE_TODOS')
				return false;
			return state;
		}
	})
}

// const allIds = (state = [], action) => {
// 	if (action.filter !== 'ALL')
// 		return state;

// 	switch (action.type) {
// 		case 'RECEIVE_TODOS':
// 			return action.response.map(todo => todo.id);

// 		// case 'ADD_TODO':
// 		// 	return [...state, action.id];
// 		// case 'RECEIVE_TODOS':
// 		// 	console.log('heeh')
// 		// 	return action.response
// 		// 	// console.log(action)
// 		default:
// 			return state;
// 	}
// }

// const activeIds = (state = [], action) => {
// 	if (action.filter !== 'ACTIVE')
// 		return state;

// 	switch (action.type) {
// 		case 'RECEIVE_TODOS':
// 			return action.response.map(todo => todo.id);
// 		default:
// 			return state;
// 	}
// }

// const completedIds = (state = [], action) => {
// 	if (action.filter !== 'COMPLETED')
// 		return state;

// 	switch (action.type) {
// 		case 'RECEIVE_TODOS':
// 			return action.response.map(todo => todo.id);
// 		default:
// 			return state;
// 	}
// }

const todosReducer = combineReducers({
	byId,
	idsByFilter: combineReducers({
		ALL: createList('ALL'),
		ACTIVE: createList('ACTIVE'),
		COMPLETED: createList('COMPLETED'),
	})
})

export default todosReducer