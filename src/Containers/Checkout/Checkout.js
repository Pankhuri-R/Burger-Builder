import React, { Component } from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
    
    state={
        ingredients:{
            bacon:'1',
        meat: '1',
        salad: '1',
        cheese: '2'
        }
    }

    componentDidMount() {
        const query= new URLSearchParams(this.props.location.search);
        const ingredients={};
        for(let param of query.entries()){
            ingredients[param[0]]= +param[1]
        }
        this.setState({ingredients:ingredients});
    }

    checkoutCancelHandler=()=>{
        this.props.history.goBack();
    }

    checkoutContdHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return (
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients}
                 cancelCheckout={this.checkoutCancelHandler}
                 continueCheckout={this.checkoutContdHandler} />
                 <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>
        )
    }
}

export default Checkout;