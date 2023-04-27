import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from './Loader';
import Sidebar from "./Sidebar";
import { getorderdetails, ProcessOrder, ClearErrors } from '../actions/orderaction';
import { UPDATE_ORDER_RESET } from '../constants/orderConstants';

export default function UpdateOrder() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { order, error, loading } = useSelector(state => state.Orderdetails)
    const { IsUpdated, UpdationError } = useSelector(state => state.ProcessOrder)
    const [status, setstatus] = useState('')

    useEffect(() => {
        dispatch(getorderdetails(id));
        if (error) {
            toast.error(error)
            dispatch(ClearErrors);
        }
    }, [dispatch, id, error])

    const UpdateOrder = (e) => {
        e.preventDefault();
        dispatch(ProcessOrder(order._id, status));
    }

    if (IsUpdated) {
        toast.success('Order proccessed successfully.')
        dispatch({ type: UPDATE_ORDER_RESET })
        navigate('/admin/orders');
    }
    if (UpdationError) {
        toast.error(UpdationError);
        dispatch(ClearErrors);
    }

    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-2 col-md-2">
                    <Sidebar />
                </div>

                <div class="col-10 col-md-10">
                    <h1 class="my-4">Dashboard / Order / Process</h1>
                    <div class="row pr-4">
                        {!loading && order.ordereditem ?
                            <div className="container-md">
                                <div className="row">
                                    <div className="col-md-7 col-lg-8 ">
                                        <div className="col-12 table-responsive">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th>Product</th>
                                                        <th>Name</th>
                                                        <th>Quatity</th>
                                                        <th>Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {order.ordereditem.map(item => {
                                                        return (
                                                            <tr>
                                                                <td>
                                                                    <img src={item.Image} style={{ width: "5rem", height: "auto" }} alt="..." />
                                                                </td>
                                                                <td className="">{item.name}</td>
                                                                <td className="">{item.quantity}</td>
                                                                <td className="">&#8377; {item.price}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="col-12 border border-1 rounded-3 p-3">
                                            <h4
                                                className="mb-0 d-inline-flex"
                                                style={{ borderBottom: '2px solid orangered' }}>
                                                Order Details
                                            </h4>
                                            <div className="col my-3">
                                                <p className="m-0"><strong>Order ID</strong></p>
                                                <h6>{order._id}</h6>
                                            </div>
                                            <div className="col my-3">
                                                <p className="m-0"><strong>Order Status</strong></p>
                                                {(order.orderstatus === 'Delivered') ?
                                                    <h6 style={{ color: "green" }}>{order.orderstatus}</h6>

                                                    :
                                                    <h6 style={{ color: "orangered" }}>{order.orderstatus}</h6>
                                                }
                                            </div>
                                            <div className="col my-3">
                                                <p className="m-0"><strong>Payment</strong></p>
                                                <h6>{String(order.paidat).substring(0, 10)}</h6>
                                            </div>
                                            <div className="col my-3">
                                                <p className="m-0"><strong>Amount after tax</strong></p>
                                                <h6>&#8377; {order.totalprice}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-5 col-lg-4">
                                        <div className="row p-3">
                                            <div className="col-12 border border-1 rounded-3 mb-3 py-3">
                                                <p className="m-0"><strong>Status Update</strong></p>
                                                <form onSubmit={UpdateOrder}>
                                                    <select
                                                        className="form-select my-1"
                                                        onChange={(e) => setstatus(e.target.value)}
                                                    >
                                                        <option value="Processing">Processing</option>
                                                        <option value="Shipped">Shipped</option>
                                                        <option value="Delivered">Delivered</option>
                                                    </select>
                                                    <button className="btn btn-primary mt-2 w-100">Update</button>
                                                </form>
                                            </div>
                                            <div className="col-12 border border-1 rounded-3 mb-3">
                                                <h4
                                                    className="mt-3 mb-0 d-inline-flex"
                                                    style={{ borderBottom: '2px solid orangered' }}>
                                                    User Information
                                                </h4>
                                                <div className="col my-3">
                                                    <p className="m-0"><strong>Name</strong></p>
                                                    <h6>{order.user.name}</h6>
                                                </div>
                                                <div className="col my-3">
                                                    <p className="m-0"><strong>Email</strong></p>
                                                    <h6>{order.user.email}</h6>
                                                </div>
                                                <div className="col my-3">
                                                    <p className="m-0"><strong>Phone no.</strong></p>
                                                    <h6>{order.shippinginfo.phoneno}</h6>
                                                </div>
                                            </div>

                                            <div className="col-12 border border-1 rounded-3">
                                                <h4
                                                    className="mt-3 mb-0 d-inline-flex"
                                                    style={{ borderBottom: '2px solid orangered' }}>
                                                    Shipping Details
                                                </h4>
                                                <div className="col my-3">
                                                    <p className="m-0"><strong>Address</strong></p>
                                                    <h6>{order.shippinginfo.address}</h6>
                                                </div>
                                                <div className="col my-3">
                                                    <p className="m-0"><strong>City</strong></p>
                                                    <h6>{order.shippinginfo.city}</h6>
                                                </div>
                                                <div className="col my-3">
                                                    <p className="m-0"><strong>Country</strong></p>
                                                    <h6>{order.shippinginfo.country}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <Loader />
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}