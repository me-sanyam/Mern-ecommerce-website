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
    NEW_REVIEW_RESET,

    ALL_ADMIN_PRODUCTS_REQUEST,
    ALL_ADMIN_PRODUCTS_SUCCESS,
    ALL_ADMIN_PRODUCTS_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_RESET,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_RESET,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_RESET,

    CLEAR_ERRORS
} from "../constants/productconst";

export const productreducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: []
            }
        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                Count: action.payload.Count,
                TotalCount: action.payload.TotalProducts,
                PageLimit: action.payload.PageLimit
            }
        case ALL_PRODUCTS_FAIL:
            return {
                loading: false,
                error: "404: Error Occured"
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const productdetailsreducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCTS_DETAIL_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PRODUCTS_DETAIL_SUCCESS:
            return {
                product: action.payload,
                loading: false
            }
        case PRODUCTS_DETAIL_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const NewReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                Success: action.payload
            }
        case NEW_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case NEW_REVIEW_RESET:
            return {
                ...state,
                Success: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const HomeProductsreducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case RANDOM_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            }
        case RANDOM_PRODUCT_SUCCESS:
            return {
                loading: false,
                randomProducts: action.payload.products,
            }
        case RANDOM_PRODUCT_FAIL:
            return {
                loading: false,
                error: "404: Error Occured"
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}


export const Adminproductreducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_ADMIN_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: []
            }
        case ALL_ADMIN_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products
            }
        case ALL_ADMIN_PRODUCTS_FAIL:
            return {
                loading: false,
                error: "404: Error Occured"
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const NewProductreducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NEW_PRODUCT_SUCCESS:
            return {
                success: action.payload.success,
                product: action.payload.product,
                loading: false
            }
        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const AdminProductReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PRODUCT_DELETE_SUCCESS:
            return {
                isDeleted: action.payload,
                loading: false
            }
        case UPDATE_PRODUCT_SUCCESS:
            return {
                isUpdated: action.payload.success,
                loading: false
            }
        case PRODUCT_DELETE_FAIL:
            return {
                ...state,
                DeletionError: action.payload
            }
        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                Updationerror: action.payload
            }
        case PRODUCT_DELETE_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case UPDATE_PRODUCT_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                DeletionError: null
            }
        default:
            return state;
    }
}