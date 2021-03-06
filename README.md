# This project was created as a dev guide for my personal tech talk called "Redux 101".

# Create a CRA project

Run the following command:

```
npx create-react-app my-app
```

# Installing and setting up redux

1. Install our key libraries by running:

```
yarn add redux react-redux
```

2. Create three folders within `src`: `actions`, `reducers`, and `store`

3. Within the `store` folder create a `index.js` file with this content:

```
import { createStore } from 'redux';
import reducers from '../reducers';

export default createStore(reducers);
```

4. Now we have to create our main reducer file by creating an `index.js` file within the `reducers` folder:

```
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  // ... What should we write in here?
});

export default rootReducer;
```

5. Import the provider and use it within `src/index.js` just by wrapping our app

```
import { Provider } from 'redux'
import store from './store'

<Provider store={store}>
  <App />
</Provider>
```

# Create a basic project

1. Lets start by importing a new `ingredients` reducer and combining it within the `reducers` file:

```
import { combineReducers } from 'redux';
import ingredients from './ingredients';

const rootReducer = combineReducers({
  ingredients
});

export default rootReducer;
```

2. Lets create the `actions` file for our ingredients reducer:

```
export const ADD_INGREDIENT_ACTION_TYPE = 'ADD_INGREDIENT'

export const addIngredient = ingredient => ({
    type: ADD_INGREDIENT_ACTION_TYPE,
    payload: {
        ingredient
    },
});
```

3. Lets create the `ingredients` reducer itself:

```
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
                data: [...state.data, payload.todo]
            };

        default:
            return state;
    }
}

export default todosReducer;
```

4. Change the app css styles to:

```
.App {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
```

5. Change the `App.js` file content to:

```
import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');

  const onInputValueChange = ev => {
    const { value } = ev.target;

    setInputValue(value)
  }

  const onSubmit = () => {
    if (inputValue.trim()) {
        // How do we call our actions?
    }
  }

  return (
    <div className="App">
      <input type="text" onChange={onInputValueChange} value={inputValue} />
      <button onClick={onSubmit} disabled={inputValue.trim() === ''}>Add ingredient</button>
    </div>
  );
}

export default App;
```

6. Now we have to connect our component to redux store

```
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addIngredient } from './actions/ingredients';
import './App.css';

function App(props) {
  const [inputValue, setInputValue] = useState('');

  const onInputValueChange = ev => {
    const { value } = ev.target;

    setInputValue(value)
  }

  const onSubmit = () => {
    const trimmedValue = inputValue.trim();

    if (trimmedValue) {
      props.addIngredient(trimmedValue)
      setInputValue('')
    }
  }

  return (
    <div className="App">
      <input type="text" onChange={onInputValueChange} value={inputValue} />
      <button onClick={onSubmit} disabled={inputValue.trim() === ''}>Add ingredient</button>

      <ul className="todo-list">
        {props.ingredients.map(ingredient => (
          <li key={ingredient}>{tingredientodo}</li>
        ))}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { ingredients } = state;

  return {
    ingredients: ingredients.data,
  }
}

const mapDispatchToProps = {
  addIngredient
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
```

8. Add the redux dev tools for better dev experience:

Change the store content to:

```
import { applyMiddleware, compose, createStore } from 'redux';
import reducers from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(applyMiddleware());

export default createStore(reducers, enhancer);
```

# Adding redux thunk

1. Lets start by adding the dependency

```
yarn add redux-thunk
```

2. Import the middleware and apply it to our store creator

```
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(applyMiddleware(thunk));

export default createStore(reducers, enhancer);
```

# Using async actions

1. Create a new `recipes` reducer with some empty state:

```
const defaultState = {
    data: [],
    isFetching: false,
    error: null,
}

const recipesReducer = (state = defaultState, action) => {
    const { type } = action;

    switch (type) {
        default:
            return state;
    }
}

export default recipesReducer;
```

2. Create an empty `recipes` actions file with the action scaffolding:

```
export const fetchRecipes = () => {
    return async (dispatch) => {
        // Dispatch an initial action

        try {
            // Do the fetch itself
            await fetch(`http://www.recipepuppy.com/api/?i=${ingredients.join(',')}`);

            // Dispatch successful action
        } catch(err) {
            // Dispatch error action
        }
    }
}
```

3. This should be the final version of the actions:

```
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

export const fetchRecipes = () => {
    return async (dispatch, getState) => {
        const { ingredients } = getState();
        dispatch(fetchRecipesStart());

        try {
            const res = await fetch(`http://www.recipepuppy.com/api/?i=${ingredients.data.join(',')}`);
            const jsonRes = await res.json();

            dispatch(fetchRecipesSuccess(jsonRes.results));
        } catch(err) {
            dispatch(fetchRecipesError(err));
        }
    }
}
```

4. Go step by step completing the reducer until you have this as the content:

```
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
```

5. Add the reducer to the combineReducer call:

```
const rootReducer = combineReducers({
  ingredients,
  recipes,
});
```

6. Change the returned JSX element from the app to the following and start pluging things together:

```
return (
    <div className="App">
      <input type="text" onChange={onInputValueChange} value={inputValue} />
      <button onClick={onSubmit} disabled={inputValue.trim() === ''}>Add ingredient</button>

      <section className="ingredients">
        <h1>Ingredients</h1>
        <ul>
          {props.ingredients.data.map(ingredient => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      </section>

      <section className="recipes">
        <h1>Recipes</h1>
        <button onClick={onFetchRecipesClick} disabled={!props.ingredients.data.length}>Search recipes</button>
        <ul>
          {props.recipes.data.map(recipe => (
            <li key={recipe.title}>{recipe.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
```

# Using reselect

1. Create the `recipe` component and copy paste the content:

```
import React from 'react';
import { connect } from 'react-redux';
import { fetchRecipes } from '../actions/recipes';

const Recipes = (props) => {
    return (
        <section className="recipes">
            <h1>Recipes</h1>
            <button onClick={props.fetchRecipes}>Search recipes</button>
            <ul>
                {props.recipes.data.map(recipe => (
                    <li key={recipe.title}>{recipe.title}</li>
                ))}
            </ul>
        </section>
    )
}

const mapStateToProps = (state) => {
    const { recipes } = state;

    return {
        recipes
    }
}

const mapDispatchToProps = {
    fetchRecipes
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
```

2. Create the `ingredients` component and copy paste the content:

```
import React from 'react';
import { connect } from 'react-redux';

const Ingredients = (props) => {
    return (
        <section className="ingredients">
            <h1>Ingredients</h1>
            <ul>
                {props.ingredients.data.map(ingredient => (
                    <li key={ingredient}>{ingredient}</li>
                ))}
            </ul>
        </section>
    )
}

const mapStateToProps = (state) => {
    const { ingredients } = state;

    return {
        ingredients
    }
}

export default connect(mapStateToProps)(Ingredients);
```

3. Create a dummy selector without reselect within the Ingredients component and show how this function gets called everytime that any field from the state changes (even when the recipes are fetched):

```
const transformIngredientsToUpperCase = ingredients => {
    console.log('Transforms the ingredients lists');

    return ingredients.data.map(ingredient => ingredient.toUpperCase().substring(0, 7))
}

const mapStateToProps = (state) => {
    const { ingredients } = state;

    return {
        ingredients: transformIngredientsToUpperCase(ingredients)
    }
}
```

4. Install react-reselect:

```
yarn add reselect
```

5. Create a `ingredients.js` within a new `selectors` folder:

```
import { createSelector } from 'reselect';

const ingredientsSelector = state => state.ingredients.data

export const getIngredients = createSelector(
    [ingredientsSelector],
    ingredients => {
        console.log('Recalculates and maps the ingredients', );

        return ingredients.map(ingredient => ingredient.toUpperCase().substring(0, 7))
    }
)
```
