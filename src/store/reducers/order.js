import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false 
};

const reducers= (state= initialState, action)=>{
    switch(action.type){
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder={
                ...action.OrderData,
                id: action.orderId
            };
            return {
                ...state,
                loading: false,
                orders : state.orders.concat(newOrder)
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            };
        default:
            return {};
    }
};

export default reducers;