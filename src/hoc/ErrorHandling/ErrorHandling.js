import React, { Component } from 'react';
import Modal from '../../Components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

const errorHandling= (WrappedComponent , axios)=>{
    return class extends Component{
        state={
            error: null
        }

        componentDidMount() {
            axios.interceptors.request.use(request=>{
                this.setState({error: null});
                return request;
            })

            axios.interceptors.response.use(res=>res, error =>{
                this.setState({error: error.message});
            })
        }

        clearErrorHandler=()=>{
            this.setState({error:null})
        }

        render(){
            return (
                <Auxiliary>
                    <Modal show={this.state.error} 
                    hideModal={this.clearErrorHandler}>
                        {this.state.error}</Modal>
                    <WrappedComponent {...this.props}/>
                </Auxiliary>
                
            );
        }
    } 
}

export default errorHandling;