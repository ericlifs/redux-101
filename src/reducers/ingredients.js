import { ADD_INGREDIENT_ACTION_TYPE } from '../actions/ingredients';

const defaultState = {
    ingredients: []
}

const ingredientsReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case ADD_INGREDIENT_ACTION_TYPE:
            return {
                ...state,
                ingredients: [...state.ingredients, payload.ingredient]
            };
    
        default:
            return state;
    }
}

export default ingredientsReducer;