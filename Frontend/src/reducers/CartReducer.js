import { ADD_TO_CART, REMOVE_FROM_CART } from '../constants/cartConstants';

export const CartReducer = (state = { cartItems: [] }, action) => {
    const item = action.payload;

    switch (action.type) {
        case ADD_TO_CART:
            // check if item already exists in cart
            const isitemexist = state.cartItems.find(cartitem => {
                return (cartitem.product === item.product && cartitem.owner === item.owner)
            })
            if (isitemexist) {

                // if exists then map existing product with new details and return
                return {
                    ...state,
                    cartItems: state.cartItems.map(cartitem => cartitem.product === item.product ? item : cartitem)
                }
            } else {
                // if item doesnt already exist then add it to cart
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(cartitem => cartitem.product !== item)
            }

        default:
            return state;
    }
}