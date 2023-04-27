import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from "react-redux"
import { ForgotPassword } from "../actions/UserAction"

export default function Forgotpasswordcomponent() {
    const [email, setemail] = useState('');
    const dispatch = useDispatch();
    const { error, message } = useSelector(state => state.ForgotPassword)

    useEffect(() => {
        if (error) {
            toast.error(error);
        }

        if (message) {
            toast.success(message);
        }
    }, [dispatch, error, message])

    const submitForgotPasswordHandler = (e) => {
        e.preventDefault();
        dispatch(ForgotPassword(email))
    }

    return (
        <div
            style={{ height: "88vh", width: "100%", zIndex: "1", backgroundColor: "#ebf0f4" }}
            className="container-fluid"
        >
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-xl-4 col-lg-6 col-md-7 col-sm-8 col-11 py-4 rounded-3" style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", backgroundColor: "#fff" }}>
                    <div className="row">
                        <div className='col-12 text-center'>
                            <h5 className='mb-3'>GENERATE RESET LINK</h5>
                        </div>
                        <form
                            className='d-flex flex-column justify-content-center align-items-center'
                            onSubmit={submitForgotPasswordHandler}
                        >
                            <div className="col-sm-10 col-11 px-3 mb-1">
                                <p>Enter the email address associated with your account and we will send you a link to reset your password.</p>
                            </div>

                            <div class="col-sm-10 col-11 form-floating px-3 mb-4">
                                <input
                                    type="email"
                                    class="form-control CustomInput"
                                    id="floatingInput"
                                    value={email}
                                    onChange={(e) => setemail(e.target.value)}
                                    placeholder="Email"
                                    required
                                />
                                <label className="mx-3" for="floatingInput">Email Address</label>
                            </div>

                            <div className="col-sm-10 col-11 px-3 mb-1">
                                <button type='submit' className='btn btn-primary w-100' style={{ height: "50px" }}>SEND EMAIL</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}