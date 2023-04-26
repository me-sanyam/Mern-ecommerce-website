import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ALL_ORDER_REQUEST,
    ALL_ORDER_SUCCESS,
    ALL_ORDER_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_RESET,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    DELETE_ORDER_RESET,

    CLEAR_ERRORS
} from '../constants/orderConstants'

export const NewOrderReducer = (state = {}, action) => {
    switch (action.type) {

        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const MyOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {

        case MY_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case MY_ORDER_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case MY_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const OrdersDetailsReducer = (state = { order: {} }, action) => {
    switch (action.type) {

        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const AllOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {

        case ALL_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ALL_ORDER_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                success: action.payload.success,
                totalamount: action.payload.totalamt
            }
        case ALL_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const ProcessOrderReducer = (state = {}, action) => {
    switch (action.type) {

        case UPDATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                IsUpdated: action.payload,
            }
        case UPDATE_ORDER_FAIL:
            return {
                loading: false,
                UpdationError: 'Order processing failed.'
            }
        case UPDATE_ORDER_RESET:
            return {
                loading: false,
                IsUpdated: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                UpdationError: null
            }
        default:
            return state
    }
}

export const DeleteOrderReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                IsDeleted: action.payload,
            }
        case DELETE_ORDER_FAIL:
            return {
                loading: false,
                DeletionError: action.payload
            }
        case DELETE_ORDER_RESET:
            return {
                loading: false,
                IsDeleted: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                DeletionError: null
            }
        default:
            return state
    }
}