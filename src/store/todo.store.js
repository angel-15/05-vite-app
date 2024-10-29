import { Todo } from "../todos/models/todo.model";

export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}


const state = {
    todos: [
        new Todo('piedra de la mente'),
        new Todo('piedra de la realidad'),
        new Todo('piedra del alma'),
        new Todo('piedra del espacio'),
        new Todo('piedra del poder'),
        new Todo('piedra del tiempo'),
    ],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
    console.log('InitStore aguacate');
}

const loadStore = () => {
    if( !localStorage.getItem('state') ) return; // si no hay nada, detente. es lo que quiere decir este codigo

    const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem('state') );
    state.todos = todos;
    state.filter = filter;
}

// para guardar la informacion del todo en un localhost
// asi la informacion de nuevos todo o la eliminacion de alguno pueda permanencer en el tiempo
const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state) );
}



const getTodos = ( filter = Filters.All ) => {
    switch( filter ) {
        case Filters.All:
            return [...state.todos];

        case Filters.Completed:
            return state.todos.filter( todo => todo.done);

            case Filters.Pending:
            return state.todos.filter( todo => !todo.done);

            default:
                throw new Error(`Option ${ filter } is not valid`);
    }
}

/**
 * 
 * @param {String} description
 */
const addTodo = ( description ) => {
    if ( !description ) throw new Error('Description is required');
    state.todos.push( new Todo(description) );

    saveStateToLocalStorage();
}

/**
 * 
 * @param {String} todo identifier
 */
const toggleTodo = ( todoId ) => {
    
    state.todos = state.todos.map( todo => {

        if( todo.id === todoId ) {
            todo.done = !todo.done;
        }
        return todo;
    });

    saveStateToLocalStorage();
}


const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId );

    saveStateToLocalStorage();
}


const deleteCompleted = (  ) => {
    state.todos = state.todos.filter( todo => !todo.done );

    saveStateToLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All ) => {
    state.filter = newFilter;

    saveStateToLocalStorage();
}

const gerCurrentFilter = () => {
    return state.filter;
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    gerCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}