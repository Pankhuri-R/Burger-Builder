import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';
import { connect } from 'react-redux';
import errorHandling from '../../../hoc/ErrorHandling/ErrorHandling';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name"
                },
                value:"",
                validity: {
                    required: true,
                    minLength: 5,
                    maxLength: 15
                },
                valid: true
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Street"
                },
                value:"",
                validity: {
                    required: true,
                    minLength: 5,
                    maxLength: 15
                },
                valid: true
            },
            pincode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Pincode"
                },
                value:"",
                validity: {
                    required: true,
                    minLength: 5,
                    maxLength: 15
                },
                valid: true
        },
            Country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Country"
                },
                value:"",
                validity: {
                    required: true,
                    minLength: 5,
                    maxLength: 15
                },
                valid: true
        },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your email"
                },
                value:"",
                validity: {
                    required: true,
                    minLength: 5,
                    maxLength: 15
                },
                valid: true
        },
            delivery: {
                elementType: "select",
                elementConfig: {
                    options :[
                        {value:'fastest', displayValue: 'Fastest' },
                        {value:'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value:"",
                validity: {},
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler=(event)=> {
        event.preventDefault();
        const inputData={};
        for(let formElementIdentifier in this.state.orderForm){
            inputData[formElementIdentifier]= this.state.orderForm[formElementIdentifier].value;
        }
        const data={
            ingredients: this.props.ings,
            price: this.props.price,
            userInfo: inputData
        }

        this.props.onOrderBurger(data);
    }

    checkValidity=(value,rules)=>{
        let isValid= true;

        if(rules.required){
            isValid= (value.trim() !== '' && isValid);
        }

        if(rules.minLength){
            isValid= (value.length>= rules.minLength && isValid);
        }

        if(rules.maxLength){
            isValid= (value.length<= rules.maxLength && isValid);
        }

        return isValid;
    }

    inputChangeHandler=(event, inputIdentifier)=>{
        let updatedOrderForm={
            ...this.state.orderForm
        };
        const updatedOrderElement= {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedOrderElement.value= event.target.value;
        updatedOrderElement.valid= this.checkValidity(updatedOrderElement.value, updatedOrderElement.validity);
        updatedOrderForm[inputIdentifier]= updatedOrderElement;
        
        let isFormValid=true;
        for(let inputIdentifier in updatedOrderForm){
            isFormValid = updatedOrderForm[inputIdentifier].valid && isFormValid ;
        }

        this.setState({orderForm: updatedOrderForm , formIsValid: isFormValid});
    }

    render(){
        let formInput=[];
        for(let key in this.state.orderForm){
            formInput.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form=(
            <form onSubmit={this.orderHandler}>
                    {formInput.map(formElement=>(
                        <Input 
                            key= {formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validity}
                            value={formElement.config.value}
                            changed={(event)=> this.inputChangeHandler(event,formElement.id)} />
                    ))}
                    <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER</Button>
                </form>
        );
        if(this.props.loading){
            form= <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your details below.</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps= state =>{
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        loading : state.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(errorHandling((ContactData,axios)));