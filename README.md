# This project was created as a dev guide for my personal tech talk called "Redux 101".

<<<<<<< Updated upstream
## Available Scripts
=======
# Installing and setting up redux
>>>>>>> Stashed changes

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

<<<<<<< Updated upstream
Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.
=======
# Create a basic project
>>>>>>> Stashed changes

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

<<<<<<< Updated upstream
This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
=======
export const addTodo = todo => ({
    type: ADD_TODO_ACTION_TYPE,
    payload: {
        todo
    },
});
```

And this within the reducer:

```
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
```

5. Change the app css styles to:

```
.App {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
```

6. Change the `App.js` file content to:

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
      <button onClick={onSubmit} disabled={inputValue.trim() === ''}>Add todo</button>
    </div>
  );
}

export default App;
```

7. Now we have to connect our component to redux store

```
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from './actions/todos';
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
      props.addTodo(trimmedValue)
      setInputValue('')
    }
  }

  return (
    <div className="App">
      <input type="text" onChange={onInputValueChange} value={inputValue} />
      <button onClick={onSubmit} disabled={inputValue.trim() === ''}>Add todo</button>

      <ul className="todo-list">
        {props.todos.map(todo => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { todos } = state;

  return {
    todos: todos.todos,
  }
}

const mapDispatchToProps = {
  addTodo
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

3. Rename all files to ingredients

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
>>>>>>> Stashed changes
