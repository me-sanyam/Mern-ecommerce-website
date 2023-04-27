import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UPDATE_USER_RESET } from '../constants/UserConstants'
import { UpdateUser, LoadUser } from '../actions/UserAction'
import { toast } from 'react-toastify'

export default function UpdateUserProfile() {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const navigate = useNavigate()
    const disptach = useDispatch()
    const { error, IsUpdated } = useSelector(state => state.UpdatedUser)

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        if (IsUpdated) {
            disptach(LoadUser());
            navigate('/');

            disptach({
                type: UPDATE_USER_RESET
            })
        }
    }, [disptach, error, IsUpdated, navigate])

    const handleUpdations = (e) => {
        e.preventDefault();
        disptach(UpdateUser(name, email))
        toast.success('Username and email updated successfully');
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
                            <h5 className='mb-3'>UPDATE CREDENTIALS</h5>
                        </div>
                        <form
                            className='d-flex flex-column justify-content-center align-items-center'
                            onSubmit={handleUpdations}
                        >

                            <div class="col-sm-10 col-11 form-floating px-3 mb-3">
                                <input
                                    type="text"
                                    class="form-control CustomInput"
                                    id="floatingInput"
                                    placeholder="set username"
                                    value={name}
                                    onChange={(e) => { setname(e.target.value) }}
                                    required
                                />
                                <label className="mx-3" for="floatingInput">New Username</label>
                            </div>

                            <div class="col-sm-10 col-11 form-floating px-3 mb-3">
                                <input
                                    type="email"
                                    class="form-control CustomInput"
                                    id="floatingInput"
                                    placeholder="set Email"
                                    value={email}
                                    onChange={(e) => { setemail(e.target.value) }}
                                    required
                                />
                                <label className="mx-3" for="floatingInput">New email address</label>
                            </div>

                            <div className="col-sm-10 col-11 px-3 mb-1">
                                <button type='submit' className='btn btn-primary w-100' style={{ height: "50px" }}>UPDATE</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}