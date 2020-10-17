export const ADD_INGREDIENT_ACTION_TYPE = 'ADD_INGREDIENT'

export const addIngredient = ingredient => ({
    type: ADD_INGREDIENT_ACTION_TYPE,
    payload: {
        ingredient
    },
});