import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addIngredient } from './actions/ingredients';
import { fetchRecipes } from './actions/recipes';
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

  const onFetchRecipesClick = () => {
    props.fetchRecipes(props.ingredients.data)
  }

  return (
    <div className="App">
      <input type="text" onChange={onInputValueChange} value={inputValue} />
      <button onClick={onSubmit} disabled={inputValue.trim() === ''}>Add todo</button>

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
}

const mapStateToProps = (state) => {
  const { ingredients, recipes } = state;

  return {
    ingredients,
    recipes
  }
}

const mapDispatchToProps = {
  addIngredient,
  fetchRecipes
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
