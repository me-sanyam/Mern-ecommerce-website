import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { NewPassword } from '../actions/UserAction'
import { toast } from 'react-toastify'


export default function ResetPasswordComponent() {
    let { token } = useParams();
    const [NewEnteredPassword, SetNewEnteredPassword] = useState('');
    const [ConfirmedPassword, SetConfirmedPassword] = useState('');
    const [Check, setCheck] = useState(false);
    const navigate = useNavigate()
    const disptach = useDispatch();
    const { error, success } = useSelector(state => state.ForgotPassword)

    useEffect(() => {
        if (error) {
            toast.error(error)
        }
        if (success) {
            toast.success('Password Reset Successfully');
            navigate('/account/login');
        }
    }, [disptach, error, success, navigate])

    const handlePasswordUpdation = (e) => {
        e.preventDefault();
        disptach(NewPassword(token, NewEnteredPassword, ConfirmedPassword))
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
                            <h5 className='mb-3'>RESET PASSWORD</h5>
                        </div>
                        <form
                            className='d-flex flex-column justify-content-center align-items-center'
                            onSubmit={handlePasswordUpdation}
                        >

                            <div class="col-sm-10 col-11 form-floating px-3 mb-3">
                                <input
                                    type={Check ? "text" : "password"}
                                    class="form-control CustomInput"
                                    id="floatingInput"
                                    placeholder="set password"
                                    value={NewEnteredPassword}
                                    onChange={(e) => SetNewEnteredPassword(e.target.value)}
                                    autoComplete={"on"}
                                    required
                                />
                                <label className="mx-3" for="floatingInput">SET STRONG PASSWORD</label>
                            </div>

                            <div class="col-sm-10 col-11 form-floating px-3 mb-3">
                                <input
                                    type={Check ? "text" : "password"}
                                    class="form-control CustomInput"
                                    id="floatingInput"
                                    placeholder="confirm password"
                                    value={ConfirmedPassword}
                                    onChange={(e) => SetConfirmedPassword(e.target.value)}
                                    autoComplete={"on"}
                                    required
                                />
                                <label className="mx-3" for="floatingInput">CONFIRM PASSWORD</label>
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

                            <div className="col-sm-10 col-11 px-3 mb-1">
                                <button type='submit' className='btn btn-primary w-100' style={{ height: "50px" }}>RESET</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}