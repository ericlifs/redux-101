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