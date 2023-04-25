import { ADD_TO_CART, REMOVE_FROM_CART } from '../constants/cartConstants';
import axios from 'axios';

export const AddItemToCart = (id, quantity) => async (dispatch, getstate) => {

    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
        type: ADD_TO_CART,
        payload: {
            owner: getstate().user.user._id,
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            Image: data.product.images[0].url,
            stock: data.product.stock,
            quantity
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getstate().cart.cartItems));
}

export const RemoveItemFromCart = (id) => async (dispatch, getstate) => {

    dispatch({
        type: REMOVE_FROM_CART,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getstate().cart.cartItems));
}

// export const SaveShippingInfo = (data) => async (dispatch) => {

//     dispatch({
//         type: SAVE_SHIPPING_INFO,
//         payload: data
//     })

//     localStorage.setItem('shippingInfo', JSON.stringify(data));
// }