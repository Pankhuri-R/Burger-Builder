import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, burgerData)=>{
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId : id,
        orderData: burgerData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart =() =>{
    return {
        type : actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (burgerData) =>{
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json', burgerData)
        .then(response => {
            console.log(response.data);
            dispatch(purchaseBurgerSuccess(response.data.name,burgerData))
        })
        .catch(error=>{
            dispatch(purchaseBurgerFail(error))
        })
    }
}