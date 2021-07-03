import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name"
                },
                value:""
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Street"
                },
                value:""
            },
            pincode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Pincode"
                },
                value:""
        },
            Country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Country"
                },
                value:""
        },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your email"
                },
                value:""
        },
            delivery: {
                elementType: "select",
                elementConfig: {
                    options :[
                        {value:'fastest', displayValue: 'Fastest' },
                        {value:'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value:""
            }
        },
        loading: false
    }

    orderHandler=(event)=> {
        event.preventDefault();
        this.setState({loading:true});
        const inputData={};
        for(let formElementIdentifier in this.state.orderForm){
            inputData[formElementIdentifier]= this.state.orderForm[formElementIdentifier].value;
        }
        const data={
            ingredients: this.props.ingredients,
            price: this.props.price,
            userInfo: inputData
        }
        axios.post('/orders.json',data)
        .then(response=>{
            this.setState({loading:false });
            this.props.history.push('/');
        }).catch(error=>{
            this.setState({loading:false });
        });
    }

    inputChangeHandler=(event, inputIdentifier)=>{
        let updatedOrderForm={
            ...this.state.orderForm
        };
        const updatedOrderElement= {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedOrderElement.value= event.target.value;
        updatedOrderForm[inputIdentifier]= updatedOrderElement;
        this.setState({orderForm: updatedOrderForm});
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
                            value={formElement.config.value}
                            changed={(event)=> this.inputChangeHandler(event,formElement.id)} />
                    ))}
                    <Button btnType="Success" >ORDER</Button>
                </form>
        );
        if(this,this.state.loading){
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

export default ContactData;