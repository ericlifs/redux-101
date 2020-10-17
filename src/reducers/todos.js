import { ADD_TODO_ACTION_TYPE } from '../actions/todos';

const defaultState = {
    todos: []
}

const todosReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case ADD_TODO_ACTION_TYPE:
            return {
                ...state,
                todos: [...state.todos, payload.todo]
            };
    
        default:
            return state;
    }
}

export default todosReducer;