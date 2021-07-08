import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';
import errorHandling from '../../hoc/ErrorHandling/ErrorHandling';
import { connect } from 'react-redux';
// import * as actionTypes from '../../store/actions/actionTypes';
import * as burgerBuilderActions from '../../store/actions/index';

// const INGREDIENT_PRICES = {
//     salad: 0.2,
//     meat: 0.5,
//     bacon: 0.5,
//     cheese: 0.4
// }

class BurgerBuilder extends Component {

    state = {
        purchase:false,
        loading:false,
        error:false
    }

    componentDidMount (){
        // console.log(this.props);
        // axios.get('https://react-my-burger-ab063-default-rtdb.firebaseio.com/ingredients.json')
        // .then(response=>{
        //     this.setState({ingredients:response.data});
        // })
        // .catch(error=>{
        //     this.setState({error:true});
        // })
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
    
    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const newCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = newCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount > 0) {
    //         const newCount = oldCount - 1;
    //         const updatedIngredients = {
    //             ...this.state.ingredients
    //         };
    //         updatedIngredients[type] = newCount;
    //         const deducedPrice = INGREDIENT_PRICES[type];
    //         const oldPrice = this.state.totalPrice;
    //         const newPrice = oldPrice - deducedPrice;
    //         this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //         this.updatePurchaseState(updatedIngredients);
    //     } else {
    //         return;
    //     }
    // }

    purchaseHandler=()=>{
        this.setState({purchase:true});
    }

    purchaseCancel=()=>{
        this.setState({purchase:false});
    }

    purchaseContinue=()=>{
        // this.setState({loading:true});
        // const data={
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer:{
        //         name:'Rose',
        //         address:{
        //             street:'4th',
        //             locality:'New Town',
        //             pincode:'876098',
        //             Country:'India'
        //         },
        //         email:'test@abc.com',
        //     },
        //     delivery:'fastest'
        // }
        // axios.post('/orders.json',data)
        // .then(response=>{
        //     this.setState({loading:false , purchase: false});
        // }).catch(error=>{
        //     this.setState({loading:false, purchase:false});
        // });
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

        

        let burger= this.state.error?<p>Ingredients could not be loaded!!</p> : <Spinner />;

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
        if(this.state.loading){
            orderSummary= <Spinner />
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
        price :state.totalPrice
    };
}

const mapDispatchToProps= dispatch =>{
    return {
        onIngredientAdded : (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved : (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(errorHandling(BurgerBuilder, axios));