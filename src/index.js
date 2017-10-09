import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import './index.css';

import * as Redux from 'redux';

const todosReducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return [...state, { todo: action.text }]
		default:
			return state;
	}
}

const store = Redux.createStore(todosReducer)

class TodoApp extends React.Component {
	static defaultProps = {
		todos: [{ todo: 'aa' }]
	}

	constructor(props) {
		super(props);

		this.state = {
			todo: ''
		}
	}

	onChange({target: {name, value}}) {
		this.setState({
			[name]: value
		});
	}

	onAddTodoSubmit(e) {
		e.preventDefault();
		this.props.addTodo(this.state.todo)
		this.setState({ todo: '' });
	}

	render() {
		const { onAdd, todos } = this.props;

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
						{todos.map(({todo}, i) => <li key={i}>{todo}</li>)}
					</ul>
				</div>
			</div>
		);
	}
}

const render = () => ReactDOM.render(
	<TodoApp onSubmit={e => console.log('submetendooo!')}
		todos={store.getState()}
		addTodo={text => store.dispatch({ type: 'ADD_TODO', text })}
		/>,
	document.getElementById('root')
)
render()
store.subscribe(render)
store.subscribe(_ => console.log('[REDUX]', store.getState()))
