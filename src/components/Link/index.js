import React from 'react';

import { NavLink } from 'react-router-dom';

const Link = ({
	children,
	filter
}) => (
	<NavLink to={filter} activeStyle={{color: 'blue'}}>
		{children}
	</NavLink>
)

export default Link;