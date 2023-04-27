import React from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';

export default function Footer() {
    const navigate = useNavigate();
    const ClickHandler = (category) => {
        navigate('/shop', { state: { keyword: '', category: category } })
    }

    return (
        <div
            className="text-center text-lg-start text-dark"
            style={{ backgroundColor: "#fff", fontSize: "small" }}
        >
            <div className="container p-4 pb-0">
                <section className="">
                    <div className="row">
                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto">
                            <h4 className='my-3 BrandPin'>Only Exclusives</h4>

                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget erat tempus est dictum ultrices in non ante. Aliquam rhoncus commodo facilisis.
                            </p>
                        </div>

                        <hr className="w-100 clearfix d-md-none" />

                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4" style={{ fontWeight: "bold" }}>Products</h6>
                            <p
                                className="text-dark"
                                style={{ cursor: "pointer" }}
                                onClick={() => ClickHandler("mens")}
                            >
                                Mens Fashion
                            </p>
                            <p
                                className="text-dark"
                                style={{ cursor: "pointer" }}
                                onClick={() => ClickHandler("laptops")}
                            >
                                Laptops
                            </p>
                            <p
                                className="text-dark"
                                style={{ cursor: "pointer" }}
                                onClick={() => ClickHandler("smartwatch")}
                            >
                                SmartWatches
                            </p>
                            <p
                                className="text-dark"
                                style={{ cursor: "pointer" }}
                                onClick={() => ClickHandler("handbags")}
                            >
                                Handbags
                            </p>
                        </div>

                        <hr className="w-100 d-md-none" />

                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4" style={{ fontWeight: "bold" }}>
                                Useful links
                            </h6>
                            <p>
                                <Link to="/shop" className="text-dark text-decoration-none">Shop</Link>
                            </p>
                            <p>
                                <Link to="/cart" className="text-dark text-decoration-none">Cart</Link>
                            </p>
                            <p>
                                <Link to="/account" className="text-dark text-decoration-none">My Account</Link>
                            </p>
                            <p>
                                <Link to="/contact" className="text-dark text-decoration-none">Help</Link>
                            </p>
                        </div>

                        <hr className="w-100 d-md-none" />

                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4" style={{ fontWeight: "bold" }}>Contact</h6>
                            <p>New York, NY 10012, US</p>
                            <p>support@onlyexclusives.Store</p>
                            <p>+ 01 234 567 88</p>
                            <p>+ 01 234 567 89</p>
                        </div>
                    </div>
                </section>

                <hr className="my-3" />

                <section className="p-3 pt-0">
                    <div className="row d-flex align-items-center">

                        <div className="col-md-7 col-lg-8 text-center text-md-start">
                            <div className="p-3">
                                © 2023 Copyright: @www.onlyexclusives.store
                            </div>
                        </div>

                        <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
                            <FaFacebookF size={25} className="m-2" />
                            <FaLinkedinIn size={25} className="m-2" />
                            <FaInstagram size={25} className="m-2" />
                            <FaTwitter size={25} className="m-2" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
