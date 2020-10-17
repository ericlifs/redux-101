export const FETCH_RECIPES_START_ACTION_TYPE = 'FETCH_RECIPES_START';
export const FETCH_RECIPES_SUCCESS_ACTION_TYPE = 'FETCH_RECIPES_SUCCESS';
export const FETCH_RECIPES_ERROR_ACTION_TYPE = 'FETCH_RECIPES_ERROR';

const fetchRecipesStart = () => ({
    type: FETCH_RECIPES_START_ACTION_TYPE
})

const fetchRecipesSuccess = (results) => ({
    type: FETCH_RECIPES_SUCCESS_ACTION_TYPE,
    payload: { results }
})

const fetchRecipesError = (error) => ({
    type: FETCH_RECIPES_ERROR_ACTION_TYPE,
    payload: { error }
})

export const fetchRecipes = (ingredients) => {
    return async (dispatch) => {
        dispatch(fetchRecipesStart());
        
        try {
            const res = await fetch(`http://www.recipepuppy.com/api/?i=${ingredients.join(',')}`);
            const jsonRes = await res.json();

            console.log(jsonRes.results)

            dispatch(fetchRecipesSuccess(jsonRes.results));           
        } catch(err) {
            dispatch(fetchRecipesError(err));
        }
    }
}