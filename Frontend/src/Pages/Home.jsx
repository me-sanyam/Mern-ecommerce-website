import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gethomeproducts, ClearErrors } from '../actions/productActions';
import { useNavigate } from 'react-router-dom'
import { BsTruck, BsClockHistory } from 'react-icons/bs'
import { RiSecurePaymentLine } from 'react-icons/ri'
import { BiSupport } from 'react-icons/bi'
import Card from './card';
import Countdown from 'react-countdown';
import { toast } from 'react-toastify';


export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { randomProducts, error } = useSelector(state => state.HomeProducts)
    const [HomeProducts, setHomeProducts] = useState('')

    if (error) {
        toast.error(error);
        dispatch(ClearErrors)
    }
    useEffect(() => {
        dispatch(gethomeproducts(HomeProducts))
    }, [dispatch, HomeProducts])

    const HandleClick = (cate) => {
        setHomeProducts(cate);
    }

    const HandlePageChange = (category) => {
        navigate('/shop', { state: { keyword: '', category: category } })
    }


    return (
        <>

            <div className="container-fluid pt-2">
                <div className="row d-flex flex-column flex-lg-row">
                    <div className="col-lg-6 d-flex flex-column justify-content-center ps-5 MainBanner">
                        <h1 className="MainBannerContent">Womens Fashion</h1>
                        <p className="text-secondary text-justify me-5">Sitamet, consectetur adipiscing elit, sed do eiusmod tempor incidid-unt labore edolore magna aliquapendisse ultrices gravida.</p>
                        <button className="btn CustomBtn" style={{ width: "125px" }} onClick={() => HandlePageChange('womens')}>SHOP NOW</button>
                    </div>
                    <div className="col-lg-6">
                        <div className="row">
                            <div className="col-sm-6 flex-column SecondaryBanner" style={{ height: "319px" }}>
                                <h4 className="my-3">Mens Fashion</h4>
                                <button className="btn CustomBtn" onClick={() => HandlePageChange('mens')}>SHOP NOW</button>

                            </div>
                            <div className="col-sm-6 flex-column SecondaryBanner" style={{ height: "319px" }}>
                                <h4 className="my-3">Kids Fashion</h4>
                                <button className="btn CustomBtn" onClick={() => HandlePageChange('kids')}>SHOP NOW</button>

                            </div>
                            <div className="col-sm-6 flex-column SecondaryBanner" style={{ height: "319px" }}>
                                <h4 className="my-3">Accessories</h4>
                                <button className="btn CustomBtn" onClick={() => HandlePageChange('accessories')}>SHOP NOW</button>

                            </div>
                            <div className="col-sm-6 flex-column SecondaryBanner" style={{ height: "319px" }}>
                                <h4 className="my-3">Handbags</h4>
                                <button className="btn CustomBtn" onClick={() => HandlePageChange('handbags')}>SHOP NOW</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-md py-4 my-2" style={{ height: "100%" }}>
                <div className="row h-100 d-flex flex-wrap align-items-center justify-content-evenly">
                    <div className="col-3 m-1" style={{ width: "240px" }}>
                        <BsTruck className="me-2" size={25} style={{ color: "orangered" }} />
                        FREE DELIVERY
                    </div>
                    <div className="col-3 m-1" style={{ width: "240px" }}>
                        <BiSupport className="me-2" size={25} style={{ color: "orangered" }} />
                        24/7 SUPPORT
                    </div>
                    <div className="col-3 m-1" style={{ width: "240px" }}>
                        <BsClockHistory className="me-2" size={25} style={{ color: "orangered" }} />
                        14 DAYS RETURN
                    </div>
                    <div className="col-3 m-1" style={{ width: "240px" }}>
                        <RiSecurePaymentLine className="me-2" size={25} style={{ color: "orangered" }} />
                        SECURE PAYMENTS
                    </div>
                </div>
            </div>
            {/* src="https://res.cloudinary.com/dqxozrie1/image/upload/v1675673009/Web.%20Images/HomeModel-min_kyi6dz_b4wx5t.jpg" */}

            <div className="container-md mt-1">
                <div className="row" style={{ backgroundColor: "#ebf0f4" }}>
                    <div className="col-lg-6 col-12 p-0">
                        <img
                            src="https://res.cloudinary.com/dqxozrie1/image/upload/v1679566123/Web.%20Images/full-length-portrait-happy-excited-girl-bright-colorful-clothes-holding-shopping-bags-while-standing-showing-peace-gesture-isolated_ixvnua.jpg"
                            alt="..."
                            style={{ width: "100%", height: "100%" }}
                        />
                    </div>
                    <div className="col-lg-6 col-12 d-flex flex-column justify-content-center align-items-center py-5" style={{ backgroundColor: "#f4f0f1" }}>
                        <div
                            className="d-flex flex-column justify-content-center align-items-center"
                            style={{
                                backgroundColor: "#fff",
                                borderRadius: "50%",
                                height: "200px",
                                width: "200px",
                                overflow: "visible"
                            }}
                        >
                            <p className="mb-0"><strong style={{ color: "orangered" }}>50% </strong> off</p>
                            <h3
                                className="my-1"
                                style={{
                                    color: "orangered",
                                    fontFamily: 'Dancing Script',
                                    fontSize: "3rem",
                                    width: "280px"
                                }}>Summer 2023</h3>
                            <p className="mb-0">Sale ends</p>
                        </div>
                        <div className="my-2" style={{ fontSize: "2rem", color: "orangered" }}>
                            <Countdown
                                date={Date.now() + 2592000000}
                            />
                        </div>
                        <button className="btn CustomBtn" style={{ width: "75px" }} onClick={() => navigate("/shop")}>SHOP</button>

                    </div>
                </div>
            </div>

            <div className="container py-5">
                <div className="row">
                    <div className="col-md-4">
                        <h4 className="text-dark" style={{ fontWeight: "600" }}>NEW PRODUCT</h4>
                    </div>
                    <div className="col-md-8 d-flex justify-content-md-end">
                        <ul className="d-flex flex-wrap p-0 HomeProductList" style={{ listStyle: "none" }}>
                            <li className="mx-2" onClick={() => HandleClick('')} style={(HomeProducts === '') ? { borderBottom: "3px solid orangered" } : { borderBottom: "3px solid white" }}>All</li>
                            <li className="mx-2" onClick={() => HandleClick('mobiles')} style={(HomeProducts === 'mobiles') ? { borderBottom: "3px solid orangered" } : { borderBottom: "3px solid white" }}>Mobiles & Tablets</li>
                            <li className="mx-2" onClick={() => HandleClick('headphones')} style={(HomeProducts === 'headphones') ? { borderBottom: "3px solid orangered" } : { borderBottom: "3px solid white" }}>Headphones</li>
                            <li className="mx-2" onClick={() => HandleClick('smartwatch')} style={(HomeProducts === 'smartwatch') ? { borderBottom: "3px solid orangered" } : { borderBottom: "3px solid white" }}>Smartwatches</li>
                            <li className="mx-2" onClick={() => HandleClick('laptops')} style={(HomeProducts === 'laptops') ? { borderBottom: "3px solid orangered" } : { borderBottom: "3px solid white" }}>Laptops</li>
                        </ul>
                    </div>
                    <div className="col-12 mt-md-5">
                        <div className="row justify-content-center align-items-center">
                            {randomProducts && randomProducts.map((product) =>
                            (
                                <Card
                                    key={product._id}
                                    id={product._id}
                                    src={product.images[0].url}
                                    ratings={product.ratings}
                                    name={product.name}
                                    price={product.price}
                                    stock={product.stock}
                                    seller={product.seller}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid pt-3" style={{ backgroundColor: "#000" }}>
                <div className="row">
                    <div className="col-md-6 pt-5 text-light d-flex text-center flex-column justify-content-center align-items-center">
                        <h1 style={{ fontSize: "4rem" }}>iPhone 14 Pro</h1>
                        <h4 style={{ fontSize: "2rem" }}>Pro Beyond</h4>
                        <h4 style={{ fontSize: "2rem" }}>A huge leap in battery life</h4>
                        <h4 style={{ fontSize: "2rem", color: "#62417F" }}>Now in Deep Purple</h4>
                        <button
                            onClick={() => navigate('/shop', { state: { keyword: 'Apple iPhone 14Pro', category: '' } })}
                            className="btn btn-outline-light my-2"
                        >
                            SHOP
                        </button>
                    </div>
                    <div className="col-md-6 text-light d-flex justify-content-end align-items-center FirstImage">

                    </div>
                </div>
            </div>
        </>
    );

}