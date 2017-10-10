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
const Link = ({
	active,
	onClick = _ => 0,
	children,
}) => (
	active ? <span>{ children }</span> :
	<a href="" onClick={e => {
		e.preventDefault();
		onClick(e);
	}}>{children}</a>
)

class ReduxObserver extends React.Component {
	componentDidMount() {
		this.unsubscribe = store.subscribe(() => {
			// console.warn('calling forceUpdate...')
			this.forceUpdate();
		});
	}

	componentWillUnmount() {
		this.unsubscribe()
	}
}

class FilterChange extends ReduxObserver {
	render() {
		const { filter, children } = this.props;
		const { filter: currentFilter } = store.getState();
		return (
			<Link active={ filter === currentFilter }
				onClick={() => store.dispatch({
					type: 'SET_VISIBILITY_FILTER',
					filter
				})}>
				{children}
			</Link>
		)
	}
}

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

class AddTodoForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			text: '',
			nextId: 0,
		}
	}

	onAddTodoSubmit(e) {
		e.preventDefault();
		const { nextId: id, text } = this.state;
		store.dispatch({ 
			type: 'ADD_TODO',
			id, text
		})
		// this.props.addTodo(nextId, text)
		this.setState({ text: '', nextId: id + 1 });
	}

	onChange({target: {name, value}}) {
		this.setState({
			[name]: value
		});
	}

	render() {
		return (
			<div className="bar">
				<form onSubmit={e => this.onAddTodoSubmit(e)}>
					<input
						name="text" 
						value={this.state.text}
						onChange={e => this.onChange(e)} />
					<button>+</button>
				</form>
			</div>
		)	
	}
}

const TodosFilterSettings = ({
	filters
}) => (
	<div className="filters">
		{filters.map(({
			label,
			value
		}, i) => [
			<FilterChange key={i}
				filter={label}>
					{ value }
			</FilterChange>,
			' '
			]
		)}
	</div>
)

class VisibleTodoList extends ReduxObserver {
	filterTodos(todos = [], filter) {
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

	toogleTodo(todo) {
		store.dispatch({ type: 'TOOGLE_TODO', todo })
	}

	render() {
		const { todos, filter } = store.getState();
		const visibleTodos = this.filterTodos(todos, filter);

		return (
			<TodoList todos={visibleTodos}
				onClickTodo={todo => this.toogleTodo(todo)}  />
		);
	}
}

class TodoApp extends React.Component {
	static defaultProps = {
		todos: []
	}

	render() {
		/* Poderia ficar no próprio TodosFilterSettings, mas acho que tem amis a ver com a aplicação */
		const filters = [
			{ label: 'ALL', value: 'All' },
			{ label: 'ACTIVE', value: 'Active' },
			{ label: 'COMPLETED', value: 'Completed' },
		];

		return (
			<div className="App">
				<AddTodoForm />
				<TodosFilterSettings filters={filters} />
				<VisibleTodoList />
			</div>
		);
	}
}

ReactDOM.render(
	<TodoApp />,
	document.getElementById('root')
)

store.subscribe(_ => console.log('[REDUX]', store.getState()))
// store.subscribe(_ => console.log.bind(5, '[REDUX]')(store.getState())) // =)