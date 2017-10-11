import React from 'react';

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

export default Link;