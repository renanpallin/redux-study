import { v4 } from 'uuid';

export default {
	setVisibilityFilter: filter => ({
		type: 'SET_VISIBILITY_FILTER',
		filter
	}),
	addTodo: text => ({ 
		type: 'ADD_TODO',
		id: v4(),
		text
	}),
	toogleTodo: id => ({
		type: 'TOOGLE_TODO',
		id
	}),
	receiveTodos: (filter, response) => ({
		type: 'RECEIVE_TODOS',
		filter,
		response
	})
}