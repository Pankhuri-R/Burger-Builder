import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.module.css';

class ContactData extends Component {
    state={
        name:'',
        address: {
            street: '',
            pincode: ''
        },
        email: '',
    }

    render(){
        return (
            <div className={classes.ContactData}>
                <h4>Enter your details below.</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                    <input className={classes.Input} type="text" name="street" placeholder="Street" />
                    <input className={classes.Input} type="text" name="pin" placeholder="Your Pincode" />
                    <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
                    <Button btnType="Success">ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;