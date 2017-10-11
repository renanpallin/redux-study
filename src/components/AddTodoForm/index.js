import React from 'react';
import PropTypes from 'prop-types';
import Action from '../../actions';

/* Não refatorado pelo uso do state */
export default class AddTodoForm extends React.Component {
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