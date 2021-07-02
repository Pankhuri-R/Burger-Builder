import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';

class ContactData extends Component {
    state={
        name:'',
        address: {
            street: '',
            pincode: ''
        },
        email: '',
        loading: false
    }

    orderHandler=(event)=> {
        event.preventDefault();
        this.setState({loading:true});
        const data={
            ingredients: this.props.ingredients,
            price: this.props.price,
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
            this.setState({loading:false });
            this.props.history.push('/');
        }).catch(error=>{
            this.setState({loading:false });
        });
    }

    render(){
        let form=(
            <form>
                    <Input inputtype="input" type="text" name="name" placeholder="Your Name" />
                    <Input inputtype="input" type="text" name="street" placeholder="Street" />
                    <Input inputtype="input" type="text" name="pin" placeholder="Your Pincode" />
                    <Input inputtype="input" type="email" name="email" placeholder="Your Mail" />
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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