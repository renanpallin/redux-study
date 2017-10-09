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

const store = Redux.createStore(Redux.combineReducers({
	todos: todosReducer
}))

class TodoApp extends React.Component {
	static defaultProps = {
		todos: [{ todo: 'aa' }]
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
		const { todos, toogleTodo } = this.props;

		return (
			<div className="App">
				<div className="bar">
					<form onSubmit={e => this.onAddTodoSubmit(e)}>
						<input
							name="todo" 
							value={this.state.todo}
							onChange={e => this.onChange(e)} />
						<button>+</button>
					</form>
					<ul className="todos">
						{todos.map(todo => (
							<li key={todo.id}
								className={`todo ${todo.done ? 'done' : ''}`}
								onClick={e => toogleTodo(todo)}>
								{`[${todo.id}] ${todo.text}`}
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	}
}

const render = () => ReactDOM.render(
	<TodoApp onSubmit={e => console.log('submetendooo!')}
		todos={store.getState().todos}
		addTodo={(id, text) => store.dispatch({ type: 'ADD_TODO', id, text })}
		toogleTodo={todo => store.dispatch({ type: 'TOOGLE_TODO', todo })}
		/>,
	document.getElementById('root')
)
render()
store.subscribe(render)
store.subscribe(_ => console.log('[REDUX]', store.getState()))
