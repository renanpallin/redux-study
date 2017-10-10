import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './index.css';

import * as Redux from 'redux';

const todoReducer = (state = {}, action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return {
				id: action.id,
				text: action.text,
				done: false
			};
		case 'TOOGLE_TODO':
			if (state.id !== action.todo.id)
				return state;
			return {
				...state,
				done: !state.done
			}
		default:
			return state;
	}
}

const todosReducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return [...state, todoReducer(null, action)];
		case 'TOOGLE_TODO':
			return state.map(todo => todoReducer(todo, action))
			// return state.map(todo => {
			// 	if (todo.id !== action.todo.id)
			// 		return todo;
			// 	return {...todo, done: !action.todo.done}
			// })
			
		// case 'REMOVE_TODO':
		// 	const our = state.findIndex(t => t.id === todo.id);
		// 	return [
		// 		...state.slice(0, our),
		// 		...state.slice(our + 1),
		// 	];
		default:
			return state;
	}
}

const visibilityReducer = (state = 'ALL', action) => {
	switch (action.type) {
		case 'SET_VISIBILITY_FILTER':
			return action.filter
		default:
			return state;
	}
}

const store = Redux.createStore(Redux.combineReducers({
	todos: todosReducer,
	filter: visibilityReducer,
}))


////// Components
const FilterChange = ({
	filter,
	currentFilter,
	children
}) => (filter === currentFilter ? 
	<span>{children}</span> : 
	<a href="" onClick={e => {
		e.preventDefault();
		store.dispatch({
			type: 'SET_VISIBILITY_FILTER',
			filter
		})
	}}>{children}</a>
)

const Todo = ({
	onClick,
	todo
}) => (
	<li className={`todo ${todo.done ? 'done' : ''}`}
		onClick={e => onClick(todo)}>
		{`[${todo.id}] ${todo.text}`}
	</li>
)

const TodoList = ({
	todos,
	onClickTodo,
}) => (
	<ul className="todos">
		{todos.map(todo => (
			<Todo key={todo.id}
				onClick={onClickTodo}
				todo={todo}
			 />
		))}
	</ul>
)

const AddTodoForm = ({
	value,
	onSubmit,
	onChange
}) => (
	<div className="bar">
		<form onSubmit={onSubmit}>
			<input
				name="todo" 
				value={value}
				onChange={onChange} />
			<button>+</button>
		</form>
	</div>
)

const TodosFilterSettings = ({
	filters,
	currentFilter
}) => (
	<div className="filters">
		{filters.map(({
			label,
			value
		}, i) => [
			<FilterChange key={i}
				filter={label}
				currentFilter={currentFilter}>
					{ value }
			</FilterChange>,
			' '
			]
		)}
	</div>
)

class TodoApp extends React.Component {
	static defaultProps = {
		todos: []
	}

	constructor(props) {
		super(props);

		this.state = {
			todo: '',
			nextId: 0,
		}
	}

	onChange({target: {name, value}}) {
		this.setState({
			[name]: value
		});
	}

	onAddTodoSubmit(e) {
		e.preventDefault();
		const { nextId, todo } = this.state;
		this.props.addTodo(nextId, todo)
		this.setState({ todo: '', nextId: nextId + 1 });
	}

	render() {
		const { todos, toogleTodo, filter } = this.props;

		const filters = [
			{ label: 'ALL', value: 'All' },
			{ label: 'ACTIVE', value: 'Active' },
			{ label: 'COMPLETED', value: 'Completed' },
		];
		return (
			<div className="App">
				<AddTodoForm 
					onSubmit={e => this.onAddTodoSubmit(e)}
					value={this.state.todo}
					onChange={e => this.onChange(e)} />
				<TodosFilterSettings filters={filters} currentFilter={filter} />
				<TodoList onClickTodo={todo => toogleTodo(todo)} todos={todos} />
			</div>
		);
	}
}

const filterTodos = (todos = [], filter) => {
	switch (filter) {
		case 'ACTIVE':
			return todos.filter(todo => !todo.done);
		case 'COMPLETED':
			return todos.filter(todo => todo.done);
		case 'ALL':
		default:
			return todos;
	}
}

const render = () => ReactDOM.render(
	<TodoApp onSubmit={e => console.log('submetendooo!')}
		todos={filterTodos(store.getState().todos, store.getState().filter)}
		addTodo={(id, text) => store.dispatch({ type: 'ADD_TODO', id, text })}
		toogleTodo={todo => store.dispatch({ type: 'TOOGLE_TODO', todo })}
		filter={store.getState().filter}
		/>,
	document.getElementById('root')
)
render()
store.subscribe(render)
store.subscribe(_ => console.log('[REDUX]', store.getState()))
