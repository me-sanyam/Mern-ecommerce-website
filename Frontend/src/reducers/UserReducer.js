import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_RESET,
    UPDATE_USER_PASSWORD_REQUEST,
    UPDATE_USER_PASSWORD_SUCCESS,
    UPDATE_USER_PASSWORD_FAIL,
    UPDATE_USER_PASSWORD_RESET,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,

    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL,
    USER_DETAIL_UPDATE_REQUEST,
    USER_DETAIL_UPDATE_SUCCESS,
    USER_DETAIL_UPDATE_FAIL,
    USER_DETAIL_UPDATE_RESET,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_RESET,

    CLEAR_ERRORS
} from "../constants/UserConstants";

export const UserReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }
        case LOGOUT_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                error: action.payload,
                user: null,
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

export const UpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {

        case UPDATE_USER_REQUEST:
        case UPDATE_USER_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_USER_SUCCESS:
        case UPDATE_USER_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                IsUpdated: action.payload
            }
        case UPDATE_USER_RESET:
        case UPDATE_USER_PASSWORD_RESET:
            return {
                ...state,
                IsUpdated: false
            }
        case UPDATE_USER_FAIL:
        case UPDATE_USER_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
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

export const ForgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {

        case FORGOT_PASSWORD_REQUEST:
        case NEW_PASSWORD_REQUEST:
            return {
                ...state,
                error: null
            }
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                message: action.payload
            }
        case NEW_PASSWORD_SUCCESS:
            return {
                ...state,
                success: action.payload
            }
        case NEW_PASSWORD_FAIL:
        case FORGOT_PASSWORD_FAIL:
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


export const AllUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {

        case ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ALL_USERS_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                users: action.payload.users
            }
        case ALL_USERS_FAIL:
            return {
                loading: false,
                error: 'Failed to get all users'
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

export const UserDetailsReducer = (state = {}, action) => {
    switch (action.type) {

        case USER_DETAIL_REQUEST:
            return {
                ...state,
                error: null
            }
        case USER_DETAIL_SUCCESS:
            return {
                success: action.payload.success,
                user: action.payload.user
            }
        case USER_DETAIL_FAIL:
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


export const UserUpdateReducer = (state = {}, action) => {
    switch (action.type) {

        case USER_DETAIL_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case USER_DETAIL_UPDATE_SUCCESS:
            return {
                loading: false,
                IsUpdated: action.payload
            }
        case USER_DETAIL_UPDATE_FAIL:
            return {
                loading: false,
                UpdationError: 'Failed to Update Role'
            }
        case USER_DETAIL_UPDATE_RESET:
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
            return state;
    }
}

export const UserdeleteReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case DELETE_USER_SUCCESS:
            return {
                loading: false,
                IsDeleted: true
            }
        case DELETE_USER_FAIL:
            return {
                loading: false,
                deletionError: 'Failed to Delete User.'
            }
        case DELETE_USER_RESET:
            return {
                loading: false,
                IsDeleted: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                deletionError: null
            }
        default:
            return state;
    }
}