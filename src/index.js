import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { Router, Route, HashHistory} from 'react-router-dom';
// import { hashHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';

import './App.css';
import './index.css';

import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';

import Action from './actions';
import todosReducer from './reducers/todosReducer';
// foi para o router
// import visibilityFilterReducer from './reducers/visibilityFilterReducer';

import Link from './components/Link'
import TodoList from './components/TodoList'
import AddTodoForm from './components/AddTodoForm'

// import { devToolsEnhancer } from 'redux-devtools-extension';
import { composeWithDevTools } from 'redux-devtools-extension';


// import { loadState, saveState } from './localStorage';

// import todosAPI from './backend/todos';

// todosAPI('ALL').then(console.log)

////// Store
const realStore = Redux.createStore(Redux.combineReducers({
	todos: todosReducer
	// filter: visibilityFilterReducer, // agora isso fica no router
}), composeWithDevTools(
	Redux.applyMiddleware()
)) // loadState()
// console.log(loadState());

// realStore.subscribe(() => saveState({
// 	todos: realStore.getState().todos // salvando apenas o state releante, não os filtros que são apenas de UI
// }))

////// Components

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
		// active: currentFilter === filter,
		filter
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

// const filterTodos = (todos = [], filter) => {
// 	switch (filter) {
// 		case 'ACTIVE':
// 			return todos.filter(todo => !todo.done);
// 		case 'COMPLETED':
// 			return todos.filter(todo => todo.done);
// 		case 'ALL':
// 		default:
// 			return todos;
// 	}
// }

// const getAllTodos = state => state.todos.allIds.map(id => state.todos.byId[id]);

/* esses getters podem ficar no mesmo arquivo do reducer que trata o 
state correspondente a ele. A ideia é que você possa alterar o shape
do seu state sem se preoupar com outros arquivos ou dependências,
encapsulando cada ramo do state em um único módulo.
Eles receberiam, no caso, apenas a parte de todos, não sendo necessário
acessar por state.todos, mas apenas por state, uma vez que o state
daquela módulo serão os todos */
const getVisibleTodos = (state, filter) => {
	const ids = state.todos.idsByFilter[filter].ids;
	return ids.map(id => state.todos.byId[id])
}

const getIsFetching = (state, filter) => {
	return state.todos.idsByFilter[filter].isFetching
}

/* traditional way */
const mapStateToProps = (state, ownProps) => ({
	todos: getVisibleTodos(state, ownProps.filter),
	isFetching: getIsFetching(state, ownProps.filter)
	// todos: filterTodos(getAllTodos(state), ownProps.filter)
});

// const mapDispatchToProps = dispatch => ({
// 	onClickTodo: todo => dispatch(Action.toogleTodo(todo))
// });

/*
Pode-se passar um objeto no mapDispatchToProps quando os parâmetros da
função match exatamente o que você chama para criar sua action,
{ propsQueVoceQuerPassar: actionCreatorCujoResultadoIraParaODispatch }
 */
// const mapDispatchToProps = Action;
const mapDispatchToProps = {
	onClickTodo: Action.toogleTodo,
	receiveTodos: Action.receiveTodos,
	requestTodos: Action.requestTodos
}

const VisibleTodoList = ReactRedux.connect(
	// null,
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
				<h1>{ JSON.stringify(this.props.match.params) }</h1>
				<AddTodoForm />
				<TodosFilterSettings filters={filters} />
				<VisibleTodoList filter={this.props.match.params.filter}/>
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
		<BrowserRouter>
			<Switch>
				<Route path="/:filter?" exact component={TodoApp} />
			</Switch>
		</BrowserRouter>
	</ReactRedux.Provider>,
	document.getElementById('root')
)

// realStore.subscribe(_ => console.log('[REDUX]', realStore.getState()))
// store.subscribe(_ => console.log.bind(5, '[REDUX]')(store.getState())) // =)