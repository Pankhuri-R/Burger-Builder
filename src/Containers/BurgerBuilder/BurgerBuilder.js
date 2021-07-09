import React, { Component } from 'react';
import axios from '../../axios-orders';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import errorHandling from '../../hoc/ErrorHandling/ErrorHandling';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';


class BurgerBuilder extends Component {

    state = {
        purchase:false
    }

    componentDidMount (){
         console.log(this.props);
         this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        const sum= Object.keys(ingredients)
        .map(igKey=>{
            return ingredients[igKey]
        })
        .reduce((sum,el)=>{
            return sum+el
        },0);
        return sum>0;
    }

    purchaseHandler=()=>{
        this.setState({purchase:true});
    }

    purchaseCancel=()=>{
        this.setState({purchase:false});
    }

    purchaseContinue=()=>{
        
        const queryParams=[];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+ this.state.totalPrice);
        const queryString= queryParams.join('&');

        this.props.history.push({
            pathname:"/checkout",
            search:"?"+ queryString
        });

    }

    render() {

        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary=null;

        let burger= this.props.error?<p>Ingredients could not be loaded!!</p> : <Spinner />;

        if(this.props.ings){
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price} />
                </Auxiliary>
            );
            orderSummary = <OrderSummary
            ingredients={this.props.ings}
            cancel={this.purchaseCancel}
            continue={this.purchaseContinue}
            price={this.props.price} />
        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchase} hideModal={this.purchaseCancel}>
                   {orderSummary} 
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps= state =>{
    return {
        ings: state.ingredients,
        price :state.totalPrice,
        error: state.error
    };
}

const mapDispatchToProps= dispatch =>{
    return {
        onIngredientAdded : (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved : (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(errorHandling(BurgerBuilder, axios));