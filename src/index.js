import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './App.css';
import './index.css';

import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';

let nextId = 0;

////// Action
const Action = {
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

////// Reducers
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

////// Store
const realStore = Redux.createStore(Redux.combineReducers({
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

/* Created before ReactRedux.connect */
// class ReduxObserver extends React.Component {
// 	static contextTypes = {
// 		store: PropTypes.object
// 	}

// 	componentDidMount() {
// 		this.unsubscribe = this.context.store.subscribe(() => {
// 			// console.warn('calling forceUpdate...')
// 			this.forceUpdate();
// 		});
// 	}

// 	componentWillUnmount() {
// 		this.unsubscribe()
// 	}
// }

const FilterChange = ReactRedux.connect(
	/*  (state, ownProps)  */
	({ filter: currentFilter }, { filter }) => ({
		active: currentFilter === filter
	}),
	/*  (dispatch, ownProps)  */
	(dispatch, { filter }) => ({
		onClick: () => dispatch(Action.setVisibilityFilter(filter))
	})
)(Link);

/* Ultra mega anonymous way */
// const FilterChange = ReactRedux.connect(
// 	/*  (state, ownProps)  */
// 	({ filter: currentFilter }, { filter }) => ({
// 		active: currentFilter === filter
// 	}),
// 	/*  (dispatch, ownProps)  */
// 	(dispatch, { filter }) => ({
// 		onClick: () => dispatch({
// 					type: 'SET_VISIBILITY_FILTER',
// 					filter
// 				})
// 	})
// )(
//   /* Link component */ 
// 	({ active, onClick, children }) => (
// 		active ? <span>{ children }</span> :
// 		<a href="" onClick={e => {
// 			e.preventDefault();
// 			onClick(e);
// 		}}>{children}</a>
// 	)
// );


/* Class way */
// class FilterChange extends ReduxObserver {
// 	static contextTypes = {
// 		store: PropTypes.object
// 	}

// 	render() {
// 		const { filter, children } = this.props;
// 		const { filter: currentFilter } = this.context.store.getState();
// 		return (
// 			<Link active={ filter === currentFilter }
// 				onClick={() => this.context.store.dispatch({
// 					type: 'SET_VISIBILITY_FILTER',
// 					filter
// 				})}>
// 				{children}
// 			</Link>
// 		)
// 	}
// }

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

/* Não refatorado pelo uso do state */
class AddTodoForm extends React.Component {
	static contextTypes = {
		store: PropTypes.object
	}

	constructor(props) {
		super(props);

		this.state = {
			text: ''
		}
	}

	onAddTodoSubmit(e) {
		e.preventDefault();
		const { text } = this.state;
		this.context.store.dispatch(Action.addTodo(text))
		// this.props.addTodo(nextId, text)
		this.setState({ text: '' });
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

/* traditional way */
const mapStateToProps = state => ({
	todos: filterTodos(state.todos, state.filter)
});

const mapDispatchToProps = dispatch => ({
	onClickTodo: todo => dispatch(Action.toogleTodo(todo))
});

const VisibleTodoList = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(TodoList);

/*
Chamar o connect() sem argumentos resulta em:
connect(null, dispatch => { dispatch })
 */

/* anonymous function way */
// const VisibleTodoList = ReactRedux.connect(
// 	state => ({ todos: filterTodos(state.todos, state.filter) }),
// 	dispatch => ({ onClickTodo: todo => dispatch({ type: 'TOOGLE_TODO', todo }) }),
// )(TodoList);

/* class way */
// class VisibleTodoList extends ReduxObserver {
// 	static contextTypes = {
// 		store: PropTypes.object
// 	}

// 	toogleTodo(todo) {
// 		this.context.store.dispatch({ type: 'TOOGLE_TODO', todo })
// 	}

// 	render() {
// 		const { todos, filter } = this.context.store.getState();
// 		const visibleTodos = filterTodos(todos, filter);

// 		return (
// 			<TodoList todos={visibleTodos}
// 				onClickTodo={todo => this.toogleTodo(todo)}  />
// 		);
// 	}
// }

class TodoApp extends React.Component {
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

// class StoreProvider extends React.Component {
// 	static childContextTypes = {
// 		store: PropTypes.object
// 	}

// 	getChildContext() {
// 		return {
// 			store: this.props.store
// 		}
// 		// This works? I think is slower 'couse 
// 		// we're cloning the object store to pass
// 		// const { store } = this.props;
// 		// return {
// 		// 	store
// 		// };
// 	}

// 	render() {
// 		return this.props.children;
// 	}
// }

ReactDOM.render(
	<ReactRedux.Provider store={realStore}>
		<TodoApp />
	</ReactRedux.Provider>,
	document.getElementById('root')
)

realStore.subscribe(_ => console.log('[REDUX]', realStore.getState()))
// store.subscribe(_ => console.log.bind(5, '[REDUX]')(store.getState())) // =)