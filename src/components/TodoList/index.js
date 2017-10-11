import React from 'react';
import Todo from './components/Todo';

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

export default TodoList;