import React from 'react';
import '../Dashboard.css';
import { MdDashboard } from 'react-icons/md'
import { FaClipboardList, FaPlus, FaUserAlt } from 'react-icons/fa'
import { BsBagCheckFill } from 'react-icons/bs'
import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <div class="row h-100">
            <div class="col-12 p-0">
                <div class="sidebar-wrapper">
                    <nav id="sidebar">
                        <ul class="list-unstyled components">

                            <li className='mt-4'>
                                <Link to="/admin/dashboard" className="ps-lg-3">
                                    <div className="d-flex">
                                        <MdDashboard size={20} className='me-lg-2' />
                                        <p className='mb-0 d-none d-lg-flex'>Dashboard</p>
                                    </div>
                                </Link>
                            </li>

                            <li>
                                <Link to="/admin/products" className="ps-lg-3">
                                    <div className="d-flex">
                                        <FaClipboardList size={20} className='me-lg-2' />
                                        <p className='mb-0 d-none d-lg-flex'>All Products</p>
                                    </div>
                                </Link>
                            </li>

                            <li>
                                <Link to="/admin/product/new" className="ps-lg-3">
                                    <div className="d-flex">
                                        <FaPlus size={20} className='me-lg-2' />
                                        <p className='mb-0 d-none d-lg-flex'>Add Product</p>
                                    </div>
                                </Link>
                            </li>

                            <li>
                                <Link to="/admin/orders" className="ps-lg-3">
                                    <div className="d-flex">
                                        <BsBagCheckFill size={20} className='me-lg-2' />
                                        <p className='mb-0 d-none d-lg-flex'>Orders</p>
                                    </div>
                                </Link>
                            </li>

                            <li>
                                <Link to="/admin/users" className="ps-lg-3">
                                    <div className="d-flex">
                                        <FaUserAlt size={20} className='me-lg-2' />
                                        <p className='mb-0 d-none d-lg-flex'>Users</p>
                                    </div>
                                </Link>
                            </li>

                        </ul>
                    </nav>
                </div>
            </div>
        </div >
    )
}

