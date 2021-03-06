import React, { Component } from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

class Modal extends Component {

    shouldComponentUpdate(nextProps,nextState){
        return (nextProps.show !== this.props.show || nextProps.children !== this.props.children) ;
    }

    componentWillUpdate(){
        console.log("[Modal] updated");
    }

    render() {
        return (
            <Auxiliary>
                <Backdrop show={this.props.show} hide={this.props.hideModal} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Auxiliary>
        )
    }
}

export default Modal;