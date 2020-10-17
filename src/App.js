import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addIngredient } from './actions/ingredients';
import { fetchRecipes } from './actions/recipes';
import './App.css';
import Ingredients from './components/ingredients';
import Recipes from './components/recipes';

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

      <Ingredients />
      <Recipes />
    </div>
  );
}

const mapDispatchToProps = {
  addIngredient,
  fetchRecipes
}

export default connect(null, mapDispatchToProps)(App);
