import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { getadminproducts } from '../actions/productActions';
import { getAllOrders } from '../actions/orderaction';
import { getallusers } from '../actions/UserAction';
import { Link } from "react-router-dom";

export default function Dashboard() {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.AdminProducts);
    const { orders, totalamount } = useSelector(state => state.AllOrders)
    const { users } = useSelector(state => state.AllUsers)

    let OutOfStock = 0;
    products.forEach(element => {
        if (element.stock < 1) {
            OutOfStock += 1;
        }
    });

    useEffect(() => {
        dispatch(getadminproducts());
        dispatch(getAllOrders());
        dispatch(getallusers());
    }, [dispatch])

    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-2 col-md-2">
                    <Sidebar />
                </div>

                <div class="col-10 col-md-10">
                    <h1 class="my-4">Dashboard</h1>
                    <div class="row pr-4">
                        <div class="col-xl-12 col-sm-12 mb-3">
                            <div class="card text-white bg-primary o-hidden h-100">
                                <div class="card-body">
                                    <div class="text-center card-font-size">Total Amount<br /> <b>&#8377; {totalamount}</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row pr-4">
                        <div class="col-xl-3 col-sm-6 mb-3">
                            <div class="card text-white bg-success o-hidden h-100">
                                <div class="card-body">
                                    <div class="text-center card-font-size">Products<br /> <b>{products.length}</b></div>
                                </div>
                                <Link class="card-footer text-white clearfix small z-1" to="/admin/products">
                                    <span class="float-left">View Details</span>
                                    <span class="float-right">
                                        <i class="fa fa-angle-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>


                        <div class="col-xl-3 col-sm-6 mb-3">
                            <div class="card text-white bg-danger o-hidden h-100">
                                <div class="card-body">
                                    <div class="text-center card-font-size">Orders<br /> <b>{orders.length}</b></div>
                                </div>
                                <Link class="card-footer text-white clearfix small z-1" to="/admin/orders">
                                    <span class="float-left">View Details</span>
                                    <span class="float-right">
                                        <i class="fa fa-angle-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>


                        <div class="col-xl-3 col-sm-6 mb-3">
                            <div class="card text-white bg-info o-hidden h-100">
                                <div class="card-body">
                                    <div class="text-center card-font-size">Users<br /> <b>{users.length}</b></div>
                                </div>
                                <Link class="card-footer text-white clearfix small z-1" to="/admin/users">
                                    <span class="float-left">View Details</span>
                                    <span class="float-right">
                                        <i class="fa fa-angle-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>


                        <div class="col-xl-3 col-sm-6 mb-3">
                            <div class="card text-white bg-warning o-hidden h-100">
                                <div class="card-body">
                                    <div class="text-center card-font-size">Out of Stock<br /> <b>{OutOfStock}</b></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
