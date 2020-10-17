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
      <button onClick={onSubmit} disabled={inputValue.trim() === ''}>Add todo</button>

      <ul className="ingredient-list">
        {props.ingredients.map(ingredient => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { ingredients } = state;

  return {
    ingredients: ingredients.ingredients,
  }
}

const mapDispatchToProps = {
  addIngredient
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
