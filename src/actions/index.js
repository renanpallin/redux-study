import api, * as API from '../backend/todos';
// import { v4 } from 'uuid';

export default {
	setVisibilityFilter: filter => ({
		type: 'SET_VISIBILITY_FILTER',
		filter
	}),
	addTodo: text => dispatch => API.addTodo(text).then(response => dispatch({
		type: 'ADD_TODO_SUCCESS',
		response
	})),
	toogleTodo: id => ({
		type: 'TOOGLE_TODO',
		id
	}),
	requestTodos(filter) {
		return {
			type: 'REQUEST_TODOS',
			filter
		}
	},
	receiveTodos: (filter, response) => ({
		type: 'RECEIVE_TODOS',
		filter,
		response
	})
}