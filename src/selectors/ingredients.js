import { createSelector } from 'reselect';

const ingredientsSelector = state => state.ingredients.data

export const getIngredients = createSelector(
    [ingredientsSelector],
    ingredients => {
        console.log('Recalculates and maps the ingredients');

        return ingredients.map(ingredient => ingredient.toUpperCase().substring(0, 7))
    }
)
