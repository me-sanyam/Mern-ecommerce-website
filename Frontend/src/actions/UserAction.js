import axios from "axios";

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
    UPDATE_USER_PASSWORD_REQUEST,
    UPDATE_USER_PASSWORD_SUCCESS,
    UPDATE_USER_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,

    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL,
    USER_DETAIL_UPDATE_REQUEST,
    USER_DETAIL_UPDATE_SUCCESS,
    USER_DETAIL_UPDATE_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,

    CLEAR_ERRORS
} from "../constants/UserConstants";


export const Login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })
        const config = {
            Headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/login', { email, password }, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}


export const Register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST })

        const config = {
            Headers: {
                'Content-Type': 'application/json'

            }
        }
        const user = {
            name: name,
            email: email,
            password: password,
        }
        const { data } = await axios.post('/api/register', user, config)
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}


export const LoadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST })

        const { data } = await axios.get('/api/myprofile')
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}



export const UpdateUser = (name, email) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST })

        const config = {
            Headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put('/api/myprofile/update', { name, email }, config)
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}




export const UpdatePassword = (oldpassword, newpassword) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_PASSWORD_REQUEST })

        const config = {
            Headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put('/api/myprofile/password/reset', { oldpassword, newpassword }, config)
        dispatch({
            type: UPDATE_USER_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_USER_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}



export const ForgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST })

        const config = {
            Headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/password/forgot', { email }, config)
        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}


export const NewPassword = (token, password, confirmpassword) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PASSWORD_REQUEST })

        const config = {
            Headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/password/reset/${token}`, { password, confirmpassword }, config)
        dispatch({
            type: NEW_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getallusers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST })

        const { data } = await axios.get('/api/admin/users')

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getuserbyid = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAIL_REQUEST })

        const { data } = await axios.get(`/api/admin/user/${id}`);

        dispatch({
            type: USER_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateUserRole = (id, role) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAIL_UPDATE_REQUEST })

        const config = {
            Headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/admin/user/update/${id}`, { role }, config)
        dispatch({
            type: USER_DETAIL_UPDATE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: USER_DETAIL_UPDATE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const DeleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST })
        
        const { data } = await axios.delete(`/api/admin/user/remove/${id}`)
        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const LogoutUser = () => async (dispatch) => {
    try {
        await axios.get('/api/logout')
        dispatch({
            type: LOGOUT_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}


export const ClearErrors = async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}