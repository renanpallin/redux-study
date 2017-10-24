import React from 'react';
import PropTypes from 'prop-types';

import Todo from './components/Todo';
import API from '../../backend/todos';

class TodoListWrapper extends React.Component {
	static contextTypes = {
		router: PropTypes.object
	}

	componentDidMount() {
		this.fetchData();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.filter !== this.currentFilter)
			this.fetchData();
	}

	get currentFilter() {
	    const {
			context: {
				router: {
					route: {
						match: {
							params: {
								filter
							}
						}
					}
				}
			}
		} = this;
		return filter;
	}

	fetchData() {
		this.props.requestTodos(this.currentFilter);
		API(this.currentFilter)
			.then(data => this.props.receiveTodos(this.currentFilter, data))
	}

	render() {
		return <TodoList {...this.props} />
	}
}


const TodoList = ({
	todos = [],
	onClickTodo,
	isFetching,
}) => (
	<ul className="todos">
		{
			todos.map(todo => (
			<Todo key={todo.id}
				onClick={onClickTodo}
				todo={todo}
			 />
		))}
		{
			isFetching ?
			<p>loading...</p>: ''
		}
	</ul>
)

export default TodoListWrapper;