import React from "react";
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Loader from './Loader'

export default function MyAccount() {
    const { user, loading } = useSelector(state => state.user)

    return (
        <>
            {
                loading
                    ?
                    <Loader />
                    :
                    <section style={{ backgroundColor: "#e9ecef", height: "100%" }} className="py-5">
                        <div class="container py-5 h-100">
                            <div class="row d-flex justify-content-center align-items-center">
                                <div class="col col-lg-6 mb-4 mb-lg-0">
                                    <div class="card">
                                        <div class="row">
                                            <div className="col-md-4">
                                                <div class="gradient-custom text-center text-white h-100">
                                                    <img src="https://res.cloudinary.com/dqxozrie1/image/upload/v1678099191/Web.%20Images/pngegg_1_mzkftd.png"
                                                        alt="Avatar" class="img-fluid my-md-5 my-3" style={{ width: "80px" }} />
                                                    <h5>{user.name}</h5>
                                                    <p>{user.role}</p>
                                                    <i class="far fa-edit mb-5"></i>
                                                </div>
                                            </div>
                                            <div class="col-md-8">
                                                <div class="card-body p-4">
                                                    <h6>Information</h6>
                                                    <hr class="mt-0 mb-2" />
                                                    <div class="row pt-1">
                                                        <div class="col-12 mb-1">
                                                            <h6>Email</h6>
                                                            <p class="text-muted">{user.email}</p>
                                                        </div>
                                                        <div class="col-12 mb-1">
                                                            <h6>Created at</h6>
                                                            <p class="text-muted">{String(user.createdAt).substring(0, 10)}</p>
                                                        </div>
                                                    </div>
                                                    <h6>Edit</h6>
                                                    <hr class="mt-0 mb-2" />
                                                    <div class="row pt-1">
                                                        <div class="col-12">
                                                            <Link to="/myprofile/update"><p>Update credentials</p></Link>
                                                            <Link to="/myprofile/password/update"><p>Change password</p></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
            }
        </>
    );
}