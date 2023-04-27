import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { updateUserRole, getuserbyid } from '../actions/UserAction';
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { USER_DETAIL_UPDATE_RESET } from '../constants/UserConstants';

export default function EditUser() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const [role, setrole] = useState('')
    const { user, success, error } = useSelector(state => state.UserDetails)
    const { IsUpdated, UpdationError } = useSelector(state => state.ChangedUser)

    if (!success && error) {
        toast.error(error);
    }

    useEffect(() => {
        dispatch(getuserbyid(id))
    }, [dispatch, id]);

    const HandleRoleChange = (e) => {
        e.preventDefault();
        dispatch(updateUserRole(id, role));
    }

    if (IsUpdated) {
        toast.success(`User id ${id} had role updated`)
        navigate('/admin/users');
        dispatch({ type: USER_DETAIL_UPDATE_RESET });
    }
    if (UpdationError) {
        toast.error(UpdationError)
    }

    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-2 col-md-2">
                    <Sidebar />
                </div>

                <div class="col-10 col-md-10">
                    <h1 class="my-4">Dashboard / Edit User</h1>
                    <div class="row pr-4 d-flex justify-content-center align-items-center mt-5">

                        {user &&
                            <div
                                className=" col-11 col-lg-7 col-xl-5 rounded-3 p-md-5 p-3"
                                style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
                            >
                                <div className="mb-3">
                                    <p className="m-0"><strong>User ID</strong></p>
                                    <h6>{user.id}</h6>
                                </div>
                                <div className="mb-3">
                                    <p className="m-0"><strong>Name</strong></p>
                                    <h6>{user.name}</h6>
                                </div>
                                <div className="mb-3">
                                    <p className="m-0"><strong>Email</strong></p>
                                    <h6>{user.email}</h6>
                                </div>
                                <div className="mb-3">
                                    <p className="m-0"><strong>Role</strong></p>
                                    <h6>{user.role}</h6>
                                </div>
                                <div>
                                    <form
                                        style={{ width: "200px" }}
                                        onSubmit={HandleRoleChange}
                                    >
                                        <select
                                            className="form-select my-1"
                                            onChange={(e) => setrole(e.target.value)}
                                        >
                                            <option value=''>Select Role</option>
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                        <button className="btn btn-primary mt-2 w-100">Update</button>
                                    </form>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}
