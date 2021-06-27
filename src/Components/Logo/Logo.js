import React from 'react';
import burgerLogo from '../../assests/Images/burger-logo.png';
import classes from './Logo.module.css';

const logo=(props)=>(
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="Burger logo" />
    </div>
);


export default logo;