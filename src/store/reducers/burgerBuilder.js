import * as  actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
    salad: 0.2,
    meat: 0.5,
    bacon: 0.5,
    cheese: 0.4
}

const initialState={
    ingredients:null,
    totalPrice: 4,
    error : false
}

const reducer= (state= initialState,action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                }, 
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                }
            };
        case actionTypes.SET_INGREDIENTS :
            return{
                ...state,
                ingredients: action.ingredients,
                error: false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                error: true
            }
        default:
            return state;
    }
};

export default reducer;