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
