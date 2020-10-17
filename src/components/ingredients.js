import React from 'react';
import { connect } from 'react-redux';
import { getIngredients } from '../selectors/ingredients';

const Ingredients = (props) => {
    return (
        <section className="ingredients">
            <h1>Ingredients</h1>
            <ul>
                {props.ingredients.map(ingredient => (
                    <li key={ingredient}>{ingredient}</li>
                ))}
            </ul>
        </section>
    )
}

const mapStateToProps = (state) => ({
    ingredients: getIngredients(state)
})

export default connect(mapStateToProps)(Ingredients);