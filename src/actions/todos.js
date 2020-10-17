export const ADD_TODO_ACTION_TYPE = 'ADD_TODO'

export const addTodo = todo => ({
    type: ADD_TODO_ACTION_TYPE,
    payload: {
        todo
    },
});