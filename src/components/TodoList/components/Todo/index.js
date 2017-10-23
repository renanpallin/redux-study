import React from 'react';

const Todo = ({
	onClick,
	todo
}) => (
	<li className={`todo ${todo.done ? 'done' : ''}`}
		onClick={e => onClick(todo.id)}>
		{`[${todo.id}] ${todo.text}`}
	</li>
)

export default Todo