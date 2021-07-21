import React, { Component } from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

import { connect } from 'react-redux';

class Checkout extends Component{
    
    // state={
    //     ingredients:null,
    //     totalPrice:0
    // }

    // componentWillMount() {
    //     const query= new URLSearchParams(this.props.location.search);
    //     const ingredients={};
    //     let price=0;
    //     for(let param of query.entries()){
    //         if(param[0]=='price'){
    //             price=param[1];
    //         }else{
    //             ingredients[param[0]]= +param[1];
    //         }
    //     }
    //     this.setState({ingredients:ingredients , totalPrice: price});
    // }

    checkoutCancelHandler=()=>{
        this.props.history.goBack();
    }

    checkoutContdHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            summary = (
                <div>
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        cancelCheckout={this.checkoutCancelHandler}
                        continueCheckout={this.checkoutContdHandler} />
                    <Route path={this.props.match.path + '/contact-data'}
                        //  render= {(props)=>(<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)}
                        component={ContactData}
                    />
                </div>
            );
        }
        return (
            <div>
                {summary}
                
            </div>
        )
    }
}

const mapStateToProps= state =>{
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice
    }
}


export default connect(mapStateToProps)(Checkout);