import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = (props) => {
    let updatedClasses= [classes.SideDrawer,classes.Close];

    if(props.open){
        updatedClasses=[classes.SideDrawer,classes.Open];
    }

    return (
        <Auxiliary>
            <Backdrop show={props.open}  hide={props.close}/>
            <div className={updatedClasses.join(' ')}>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
            <NavigationItems />
            </nav>    
        </div>
        </Auxiliary>
        
    );
}

export default sideDrawer;