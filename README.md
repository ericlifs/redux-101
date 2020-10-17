This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installing and setting up redux

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

## Create a basic project

1. Lets start by importing a new `todo` reducer and combining it within the `reducers` file:

```
import { combineReducers } from 'redux';
import todos from './todos';

const rootReducer = combineReducers({
  todos
});

export default rootReducer;
```

2. Lets create the `todos` reducer itself:

```
const defaultState = {
    todos: []
}

const todosReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'ADD_TODO':
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

3. Lets create the `actions` file for our todos reducer:

```
export const addTodo = todo => ({
    type: 'ADD_TODO',
    payload: {
        todo
    },
});
```

4. We can now extract our hardcoded `ADD_TODO` string into a const:

This will go into the actions file:

```
export const ADD_TODO_ACTION_TYPE = 'ADD_TODO'

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
