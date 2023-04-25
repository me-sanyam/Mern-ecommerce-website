import axios from "axios";

import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCTS_DETAIL_REQUEST,
    PRODUCTS_DETAIL_FAIL,
    PRODUCTS_DETAIL_SUCCESS,
    RANDOM_PRODUCT_REQUEST,
    RANDOM_PRODUCT_SUCCESS,
    RANDOM_PRODUCT_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,

    ALL_ADMIN_PRODUCTS_REQUEST,
    ALL_ADMIN_PRODUCTS_SUCCESS,
    ALL_ADMIN_PRODUCTS_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    CLEAR_ERRORS,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL
} from "../constants/productconst";

export const getproducts = (CurrentPage = 1, keyword = "", MinPrice, MaxPrice, Category = "", Ratings = '5') => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCTS_REQUEST })
        let link = `/api/products?page=${CurrentPage}&keyword=${keyword}&price[gte]=${MinPrice}&price[lte]=${MaxPrice}&ratings[lte]=${Ratings}`
        if (Category !== "") {
            link = `/api/products?page=${CurrentPage}&keyword=${keyword}&price[gte]=${MinPrice}&price[lte]=${MaxPrice}&ratings[lte]=${Ratings}&category=${Category}`
        }
        const { data } = await axios.get(link);
        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getproductdetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCTS_DETAIL_REQUEST })
        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type: PRODUCTS_DETAIL_SUCCESS,
            payload: data.product
        })

    } catch (error) {
        dispatch({
            type: PRODUCTS_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const gethomeproducts = (Category = "") => async (dispatch) => {
    try {
        dispatch({ type: RANDOM_PRODUCT_REQUEST })
        let link;
        if (Category !== "") {
            link = `/api/products/aggregate?filter=${Category}`
        }
        else {
            link = `/api/products/aggregate`
        }
        const { data } = await axios.get(link);

        dispatch({
            type: RANDOM_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: RANDOM_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const CreateReview = (review) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST })

        const config = {
            headers: { 'Content_Type': 'application/json' }
        }

        const { data } = await axios.put('/api/review', review, config);

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

export const ClearErrors = async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}


export const getadminproducts = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_ADMIN_PRODUCTS_REQUEST })

        const { data } = await axios.get('/api/admin/products');

        dispatch({
            type: ALL_ADMIN_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const CreateProduct = (product) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST })

        const config = {
            headers: { 'Content_Type': 'application/json' }
        }

        const { data } = await axios.post('/api/product/new', product, config);

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}


export const UpdateProduct = (id, product) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST })

        const config = {
            headers: { 'Content_Type': 'application/json' }
        }
        const { data } = await axios.put(`/api/products/${id}`, product, config);

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const DeleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REQUEST })

        const { data } = await axios.delete(`/api/products/${id}`);

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response.data.message
        })
    }
}