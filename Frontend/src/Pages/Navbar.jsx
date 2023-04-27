import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BsBag } from "react-icons/bs";
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from "react-redux"
import { LogoutUser } from '../actions/UserAction'
import "../style.css"



export default function Navbar() {
    const [Keyword, SetKeyword] = useState('')
    const location = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user)

    useEffect(() => {
    }, [location]);

    const SearchHandler = (e) => {
        e.preventDefault();
        if (Keyword) {
            navigate('/shop', { state: { keyword: `${Keyword}` } })
        }
        SetKeyword('')
    }

    const LogoutHandler = () => {
        dispatch(LogoutUser());
        toast.success('Logged out successfully');
    }

    return (
        <>
            <nav
                className="navbar navbar-expand-lg navbar-light"
            >
                <div className="container-fluid">

                    <div className="navbar-brand ms-1 ms-lg-5">
                        <h4 className='my-3 BrandPin'>Only Exclusives</h4>
                    </div>

                    <button className="navbar-toggler mx-0 mx-md-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapsenavbar">
                        <span className="navbar-toggler-icon text-dark"></span>
                    </button>

                    <div className="collapse navbar-collapse pb-lg-0 pb-3" id="collapsenavbar">

                        <ul className='navbar-nav flex-grow-1 d-flex justify-content-center' style={{ fontSize: "0.9rem" }}>
                            <li className='nav-item mx-2'><Link className='nav-link text-dark' to="/">HOME</Link></li>
                            <li className='nav-item mx-2'><Link className='nav-link text-dark' to="/shop">SHOP</Link></li>
                            <li className='nav-item mx-2'><Link className='nav-link text-dark' to="/contact">CONTACT</Link></li>
                        </ul>

                        {user ?
                            <div className="btn-group me-3">
                                <button
                                    type="button"
                                    className="btn btn-sm text-dark dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    id='TogglerButton'
                                    style={{ fontSize: "0.9rem" }}
                                >
                                    {user.name}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-light" style={{ fontSize: "0.9rem" }}>
                                    <li><Link className="dropdown-item text-dark" to="/myprofile">My Account</Link></li>
                                    <li><Link className="dropdown-item text-dark" to="/myorders">My Orders</Link></li>
                                    {user && (user.role !== "user") ?
                                        <li><Link className="dropdown-item text-dark" to="/admin/dashboard">Dashboard</Link></li>
                                        :
                                        ''
                                    }
                                    <li><hr class="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item text-dark" onClick={LogoutHandler}>Logout</Link></li>
                                </ul>
                            </div>
                            :
                            <ul className='navbar-nav' style={{ fontSize: "0.9rem" }}>
                                <li className='nav-list'>
                                    <Link to="/" className='nav-link text-dark mx-2'>LOGIN / SIGN UP</Link>
                                </li>
                            </ul>
                        }

                        <form className="w-auto my-2" onSubmit={SearchHandler}>
                            <input
                                type="search"
                                className="form-control rounded navbar-input"
                                placeholder="Search"
                                style={{ minWidth: "250px" }}
                                value={Keyword}
                                onChange={(e) => SetKeyword(e.target.value)}
                                required
                            />
                        </form>

                        <ul className='navbar-nav'>
                            <li className='nav-list mx-2'>
                                <Link className="nav-link text-dark" to="/cart"><BsBag size={"18px"} /></Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </>

    );
}