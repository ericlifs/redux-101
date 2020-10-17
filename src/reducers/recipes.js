import { FETCH_RECIPES_ERROR_ACTION_TYPE, FETCH_RECIPES_START_ACTION_TYPE, FETCH_RECIPES_SUCCESS_ACTION_TYPE } from '../actions/recipes';

const defaultState = {
    data: [],
    isFetching: false,
    error: null,
}

const recipesReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case FETCH_RECIPES_START_ACTION_TYPE:
            return {
                ...state,
                data: [],
                isFetching: true,
                error: null,
            }

        case FETCH_RECIPES_SUCCESS_ACTION_TYPE: 
            return {
                ...state,
                isFetching: false,
                data: payload.results
            }

        case FETCH_RECIPES_ERROR_ACTION_TYPE:
            return {
                ...state,
                isFetching: false,
                error: payload.error
            }

        default:
            return state;
    }
}

export default recipesReducer