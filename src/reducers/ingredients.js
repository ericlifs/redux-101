import { ADD_INGREDIENT_ACTION_TYPE } from '../actions/ingredients';

const defaultState = {
    data: []
}

const ingredientsReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case ADD_INGREDIENT_ACTION_TYPE:
            return {
                ...state,
                data: [...state.data, payload.ingredient]
            };
    
        default:
            return state;
    }
}

export default ingredientsReducer;