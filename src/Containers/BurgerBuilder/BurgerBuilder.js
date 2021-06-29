import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';
import errorHandling from '../../hoc/ErrorHandling/ErrorHandling';

const INGREDIENT_PRICES = {
    salad: 0.2,
    meat: 0.5,
    bacon: 0.5,
    cheese: 0.4
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            bacon: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchase:false,
        loading:false
    }

    updatePurchaseState(ingredients) {
        const sum= Object.keys(ingredients)
        .map(igKey=>{
            return ingredients[igKey]
        })
        .reduce((sum,el)=>{
            return sum+el
        },0);
        this.state.purchasable=sum>0;
    }
    
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount > 0) {
            const newCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = newCount;
            const deducedPrice = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - deducedPrice;
            this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
            this.updatePurchaseState(updatedIngredients);
        } else {
            return;
        }
    }

    purchaseHandler=()=>{
        this.setState({purchase:true});
    }

    purchaseCancel=()=>{
        this.setState({purchase:false});
    }

    purchaseContinue=()=>{
        this.setState({loading:true});
        const data={
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer:{
                name:'Rose',
                address:{
                    street:'4th',
                    locality:'New Town',
                    pincode:'876098',
                    Country:'India'
                },
                email:'test@abc.com',
            },
            delivery:'fastest'
        }
        axios.post('/orders.json',data)
        .then(response=>{
            this.setState({loading:false , purchase: false});
        }).catch(error=>{
            this.setState({loading:false, purchase:false});
        });
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            cancel={this.purchaseCancel}
            continue={this.purchaseContinue}
            price={this.state.totalPrice} />

        if(this.state.loading){
            orderSummary= <Spinner />
        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchase} hideModal={this.purchaseCancel}>
                   {orderSummary} 
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice} />
            </Auxiliary>
        );
    }
}

export default errorHandling(BurgerBuilder, axios);