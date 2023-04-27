import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import Loader from "./Loader";
import { Register, ClearErrors } from "../actions/UserAction";
import '../style.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserRegister() {
    const [Check, setCheck] = useState(false);
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, error, loading } = useSelector(state => state.user)
    const name = firstname + " " + lastname;
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
            toast.success('Registration successfull');
        }
        if (error) {
            toast.error(error)
            dispatch(ClearErrors);
        }

    }, [dispatch, error, isAuthenticated, navigate])

    const SubmitRegisterHandler = (e) => {
        e.preventDefault()
        dispatch(Register(name, email, password));
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
                                <h5 className='mb-3'>SIGN UP</h5>
                            </div>
                            <form
                                className='d-flex flex-column justify-content-center align-items-center'
                                onSubmit={SubmitRegisterHandler}
                            >
                                <div class="col-sm-10 col-11 form-floating px-3 mb-3">
                                    <input
                                        type="text"
                                        class="form-control CustomInput"
                                        id="floatingInput"
                                        placeholder="First Name"
                                        value={firstname}
                                        onChange={(e) => { setfirstname(e.target.value) }}
                                        required
                                    />
                                    <label className="mx-3" for="floatingInput">First Name</label>
                                </div>

                                <div class="col-sm-10 col-11 form-floating px-3 mb-3">
                                    <input
                                        type="text"
                                        class="form-control CustomInput"
                                        id="floatingInput"
                                        placeholder="Last Name"
                                        value={lastname}
                                        onChange={(e) => { setlastname(e.target.value) }}
                                        required
                                    />
                                    <label className="mx-3" for="floatingInput">Last Name</label>
                                </div>

                                <div class="col-sm-10 col-11 form-floating px-3 mb-3">
                                    <input
                                        type="email"
                                        class="form-control CustomInput"
                                        id="floatingInput"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => { setemail(e.target.value) }}
                                        required
                                    />
                                    <label className="mx-3" for="floatingInput">Email Address</label>
                                </div>

                                <div class="col-sm-10 col-11 form-floating px-3 mb-3">
                                    <input
                                        type={Check ? "text" : "password"}
                                        class="form-control CustomInput"
                                        id="floatingInput"
                                        placeholder="Password"
                                        required
                                        autoComplete={"on"}
                                        value={password}
                                        onChange={(e) => { setpassword(e.target.value) }}
                                    />
                                    <label className="mx-3" for="floatingInput">Password</label>
                                </div>

                                <div className="col-sm-10 col-11 px-3 mb-3">
                                    <div class="form-check">
                                        <input
                                            class="form-check-input CustomInput"
                                            type="checkbox"
                                            id="flexCheckDefault"
                                            value={Check}
                                            onChange={(e) => setCheck(!Check)}
                                        />
                                        <label class="form-check-label" for="flexCheckDefault">
                                            Show Password
                                        </label>
                                    </div>
                                </div>

                                <div className="col-sm-10 col-11 px-3 mb-3">
                                    <button type='submit' className='btn btn-primary w-100' style={{ height: "50px" }}>SIGN UP</button>
                                </div>

                                <div className="col-sm-10 col-11 px-3">
                                    <span>Already have an Account? </span>
                                    <Link to="/account/login" className='text-decoration-none'>Log In</Link>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}