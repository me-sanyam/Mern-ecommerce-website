import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { Login, ClearErrors } from "../actions/UserAction";
import Loader from "./Loader";
import '../style.css'
import { toast } from 'react-toastify';


export default function UserLogin() {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [Check, setCheck] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, error, loading } = useSelector(state => state.user)

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
        if (error) {
            toast.error(error);
            dispatch(ClearErrors)
        }
    }, [dispatch, isAuthenticated, error, navigate])

    const SubmitLoginHandler = (e) => {
        e.preventDefault()
        dispatch(Login(email, password))
    }

    return (
        <div
            style={{ height: "88vh", width: "100%", zIndex: "1", backgroundColor: "#ebf0f4" }}
            className="container-fluid"
        >
            {loading
                ?
                <Loader />
                :

                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-6 col-lg-7 col-md-9 col-11 py-4 rounded-3" style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", backgroundColor: "#fff" }}>
                        <div className="row">
                            <div className='col-12 text-center'>
                                <h5 className='mb-3'>LOGIN</h5>
                            </div>

                            <form
                                className='d-flex flex-column justify-content-center align-items-center'
                                onSubmit={SubmitLoginHandler}
                            >
                                <div className="col-sm-10 col-11 form-floating px-3 mb-3">
                                    <input
                                        type="email"
                                        className="form-control CustomInput"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => { setemail(e.target.value) }}
                                        required
                                    />
                                    <label className="mx-3" for="floatingInput">Email Address</label>
                                </div>

                                <div className="col-sm-10 col-11 form-floating px-3 mb-3">
                                    <input
                                        type={Check ? "text" : "password"}
                                        className="form-control CustomInput"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        required
                                        value={password}
                                        onChange={(e) => setpassword(e.target.value)}
                                        autoComplete={"on"}
                                    />
                                    <label className="mx-3">Password</label>
                                </div>

                                <div className="col-sm-10 col-11 px-3 mb-3">
                                    <Link to="/password/forgot" className='text-decoration-none'>Forgot Password?</Link>
                                </div>

                                <div className="col-sm-10 col-11 px-3 mb-3">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input CustomInput"
                                            type="checkbox"
                                            id="flexCheckDefault"
                                            style={{ accentColor: "red" }}
                                            value={Check}
                                            onChange={(e) => setCheck(!Check)}
                                        />
                                        <label className="form-check-label">
                                            Show Password
                                        </label>
                                    </div>
                                </div>

                                <div className="col-sm-10 col-11 px-3 mb-3">
                                    <button type='submit' className='btn btn-primary w-100' style={{ height: "50px" }}>LOGIN</button>
                                </div>


                                <div className="col-sm-10 col-11 px-3">
                                    <span>New To Fashion? </span>
                                    <Link to="/account/register" className='text-decoration-none'>Sign Up</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}