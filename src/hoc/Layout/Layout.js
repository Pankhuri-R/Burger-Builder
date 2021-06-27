import React, { Component } from 'react';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';

class layout extends Component {

    state={
        showSideDrawer: false
    }

    closeSideDrawerHandler=()=>{
        this.setState({showSideDrawer:false});
    }

    updateSideDrawerHandler=()=>{
        const updatedToggle= !this.state.showSideDrawer
        this.setState({showSideDrawer: updatedToggle});
    }

    render() {
        return (
            <Auxiliary>
                <Toolbar toggleClicked={this.updateSideDrawerHandler}/>
                <SideDrawer open={this.state.showSideDrawer} close={this.closeSideDrawerHandler}/>
                <div>sidebar and backdrop</div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
}

export default layout;