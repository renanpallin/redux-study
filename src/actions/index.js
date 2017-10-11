let nextId = 0;

export default {
	setVisibilityFilter: filter => ({
		type: 'SET_VISIBILITY_FILTER',
		filter
	}),
	addTodo: text => ({ 
		type: 'ADD_TODO',
		id: ++nextId,
		text
	}),
	toogleTodo: todo => ({
		type: 'TOOGLE_TODO',
		todo
	})
}