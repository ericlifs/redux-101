import { combineReducers } from 'redux';
import ingredients from './ingredients';
import recipes from './recipes';

const rootReducer = combineReducers({
  ingredients,
  recipes,
});

export default rootReducer;
