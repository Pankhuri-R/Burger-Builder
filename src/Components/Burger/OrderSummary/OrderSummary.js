import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    //this can be a functional component, does not have to be class component
    // componentWillUpdate () {
    //     console.log('[OrderSummary] WillComponentUpdate');
    // }
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return <li>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}: </span>
                    {this.props.ingredients[igKey]}
                </li>
            });
        return (
            <Auxiliary>
                <h3>Your order</h3>
                <p>A delicious burger with following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>TOTAL PRICE: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.cancel}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.continue}>Continue</Button>

            </Auxiliary>
        )
    }
}


export default OrderSummary;