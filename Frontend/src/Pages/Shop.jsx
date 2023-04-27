import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClearErrors, getproducts } from "../actions/productActions"
import Product from "./ProductComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa'

export default function Shop() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { TotalCount, Count, products, error } = useSelector(state => state.products)
    const [CurrentPage, SetCurrentPage] = useState(1)
    const [Keyword, SetKeyword] = useState('')
    const [MinPrice, SetMinPrice] = useState(0)
    const [MaxPrice, SetMaxPrice] = useState(25000)
    const [LowerValue, SetLowerValue] = useState(0)
    const [UpperValue, SetUpperValue] = useState(0)
    const [Category, SetCategory] = useState('')
    const [Ratings, SetRatings] = useState('5')

    const HandleClick = (category) => {
        SetCategory(category)
        SetKeyword('')
        SetMaxPrice(200000)
        SetRatings('5')
        SetCurrentPage(1)
    }

    useEffect(() => {
        if (location.state) {
            SetMaxPrice(200000)
            SetKeyword((location.state.keyword) ? `${location.state.keyword}` : "");
            SetCategory((location.state.category) ? `${location.state.category}` : "");
            delete location.state
        }
        if (error) {
            toast.error(error);
            dispatch(ClearErrors)
        }
        dispatch(getproducts(CurrentPage, Keyword, MinPrice, MaxPrice, Category, Ratings));
    }, [dispatch, CurrentPage, Keyword, Category, MinPrice, MaxPrice, Ratings, location, navigate, error])

    return (
        <section style={{ backgroundColor: "#fff" }}>
            <div className="container">
                <div className="row">

                    <div className="col-lg-3">

                        <button
                            className="btn btn-outline-primary my-3 w-100 d-lg-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#FilterContent"
                        >
                            <span>Filter Products</span>
                        </button>

                        <div className="collapse card d-lg-block my-4" id="FilterContent">

                            <div className="accordion" id="accordionPanelsStayOpenExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button
                                            className="accordion-button text-dark bg-light"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#panelsStayOpen-collapseOne"
                                            aria-expanded="true"
                                            aria-controls="panelsStayOpen-collapseOne"
                                        >
                                            Categories
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne">
                                        <div className="accordion-body">
                                            <ul className="list-group">
                                                <li
                                                    className=" list-group-item text-dark"
                                                    style={{ border: "none", padding: "5px", cursor: "pointer" }}
                                                    onClick={() => HandleClick("accessories")}
                                                >Accessories</li>
                                                <li
                                                    className=" list-group-item text-dark"
                                                    style={{ border: "none", padding: "5px", cursor: "pointer" }}
                                                    onClick={() => HandleClick("headphones")}
                                                >Headphones</li>
                                                <li
                                                    className=" list-group-item text-dark"
                                                    style={{ border: "none", padding: "5px", cursor: "pointer" }}
                                                    onClick={() => HandleClick("laptops")}
                                                >Laptops</li>
                                                <li
                                                    className=" list-group-item text-dark"
                                                    style={{ border: "none", padding: "5px", cursor: "pointer" }}
                                                    onClick={() => HandleClick("mobiles")}
                                                >Mobiles & Tablets</li>
                                                <li
                                                    className=" list-group-item text-dark"
                                                    style={{ border: "none", padding: "5px", cursor: "pointer" }}
                                                    onClick={() => HandleClick("smartwatch")}
                                                >Smartwatches</li>
                                                <li
                                                    className=" list-group-item text-dark"
                                                    style={{ border: "none", padding: "5px", cursor: "pointer" }}
                                                    onClick={() => HandleClick("bagpacks")}
                                                >Bagpacks</li>
                                                <li
                                                    className=" list-group-item text-dark"
                                                    style={{ border: "none", padding: "5px", cursor: "pointer" }}
                                                    onClick={() => HandleClick("handbags")}
                                                >Handbags</li>
                                                <li
                                                    className=" list-group-item text-dark"
                                                    style={{ border: "none", padding: "5px", cursor: "pointer" }}
                                                    onClick={() => HandleClick("shoes")}
                                                >Shoes</li>
                                                <li
                                                    className=" list-group-item text-dark"
                                                    style={{ border: "none", padding: "5px", cursor: "pointer" }}
                                                    onClick={() => HandleClick("mens")}
                                                >Mens</li>
                                                <li
                                                    className=" list-group-item text-dark"
                                                    style={{ border: "none", padding: "5px", cursor: "pointer" }}
                                                    onClick={() => HandleClick("womens")}
                                                >Womens</li>
                                                <li
                                                    className=" list-group-item text-dark"
                                                    style={{ border: "none", padding: "5px", cursor: "pointer" }}
                                                    onClick={() => HandleClick("kids")}
                                                >Kids</li>
                                                <li
                                                    className=" list-group-item text-dark"
                                                    style={{ border: "none", padding: "5px", cursor: "pointer" }}
                                                    onClick={() => HandleClick("toys")}
                                                >Toys</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button
                                            className="accordion-button text-dark bg-light"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#panelsStayOpen-collapseThree"
                                            aria-expanded="false"
                                            aria-controls="panelsStayOpen-collapseThree"
                                        >
                                            Price
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse show" aria-labelledby="headingThree">
                                        <div className="accordion-body">
                                            <div className="range">
                                                <input
                                                    type="range"
                                                    className="form-range"
                                                    min={0}
                                                    max={200000}
                                                    value={UpperValue}
                                                    onChange={(e) => SetUpperValue(e.target.value)}
                                                />
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-6">
                                                    <p className="mb-0">
                                                        MinPrice
                                                    </p>
                                                    <div className="form-outline">
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            value={LowerValue}
                                                            onChange={(e) => SetLowerValue(e.target.value)}
                                                        />
                                                        <label className="form-label mt-1" for="typeNumber">&#8377;{LowerValue}</label>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <p className="mb-0">
                                                        MaxPrice
                                                    </p>
                                                    <div className="form-outline">
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            value={UpperValue}
                                                            onChange={(e) => SetUpperValue(e.target.value)}
                                                        />
                                                        <label className="form-label mt-1" for="typeNumber">&#8377;{UpperValue}</label>
                                                    </div>
                                                </div>
                                                <button
                                                    className="btn btn-primary rounded-0"
                                                    onClick={() => {
                                                        SetMinPrice(LowerValue)
                                                        SetMaxPrice(UpperValue)
                                                        SetCurrentPage(1)
                                                    }}
                                                >Apply</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button
                                            className="accordion-button text-dark bg-light"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#panelsStayOpen-collapseFive"
                                            aria-expanded="false"
                                            aria-controls="panelsStayOpen-collapseFive"
                                        >
                                            Ratings
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseFive" className="accordion-collapse collapse show" aria-labelledby="headingThree">
                                        <div className="accordion-body">

                                            <div className="form-check">
                                                <input
                                                    readOnly
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value="5"
                                                    id="RatingsChecked1"
                                                    onClick={(e) => {
                                                        SetRatings(e.target.value);
                                                        SetCurrentPage(1)
                                                    }}
                                                    checked={(Ratings === '5') ? true : false}
                                                />
                                                <label className="form-check-label" for="RatingsChecked1">
                                                    <FaStar size={15} color={"orange"} />
                                                    <FaStar size={15} color={"orange"} />
                                                    <FaStar size={15} color={"orange"} />
                                                    <FaStar size={15} color={"orange"} />
                                                    <FaStar size={15} color={"orange"} />
                                                </label>
                                            </div>

                                            <div className="form-check">
                                                <input
                                                    readOnly
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value="4"
                                                    id="RatingsChecked2"
                                                    onClick={(e) => {
                                                        SetRatings(e.target.value);
                                                        SetCurrentPage(1)
                                                    }}
                                                    checked={(Ratings === '4') ? true : false}
                                                />
                                                <label className="form-check-label" for="RatingsChecked2">
                                                    <FaStar size={15} color={"orange"} />
                                                    <FaStar size={15} color={"orange"} />
                                                    <FaStar size={15} color={"orange"} />
                                                    <FaStar size={15} color={"orange"} />
                                                </label>
                                            </div>

                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    readOnly
                                                    type="checkbox"
                                                    value="3"
                                                    id="RatingsChecked3"
                                                    onClick={(e) => {
                                                        SetRatings(e.target.value);
                                                        SetCurrentPage(1)
                                                    }}
                                                    checked={(Ratings === '3') ? true : false}
                                                />
                                                <label className="form-check-label" for="RatingsChecked3">
                                                    <FaStar size={15} color={"orange"} />
                                                    <FaStar size={15} color={"orange"} />
                                                    <FaStar size={15} color={"orange"} />
                                                </label>
                                            </div>


                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value="2"
                                                    readOnly
                                                    id="RatingsChecked4"
                                                    onClick={(e) => {
                                                        SetRatings(e.target.value);
                                                        SetCurrentPage(1)
                                                    }}
                                                    checked={(Ratings === '2') ? true : false}
                                                />
                                                <label className="form-check-label" for="RatingsChecked4">
                                                    <FaStar size={15} color={"orange"} />
                                                    <FaStar size={15} color={"orange"} />
                                                </label>
                                            </div>

                                            <div className="form-check">
                                                <input
                                                    readOnly
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value="1"
                                                    id="flexCheckDefault"
                                                    onClick={(e) => {
                                                        SetRatings(e.target.value);
                                                        SetCurrentPage(1)
                                                    }}
                                                    checked={(Ratings === '1') ? true : false}
                                                />
                                                <label className="form-check-label" for="flexCheckDefault">
                                                    <FaStar size={15} color={"orange"} />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="col-lg-9">
                        {products && (Count !== 0)
                            ?
                            <>
                                <header className="d-sm-flex align-items-center border-bottom my-lg-4 pb-3">
                                    <strong className="d-block py-2">{TotalCount} Items found </strong>
                                </header>

                                {products && products.map((product) =>
                                (
                                    <Product
                                        key={product._id}
                                        src={product.images[0].url}
                                        ratings={product.ratings}
                                        id={product._id}
                                        description={product.description}
                                        name={product.name}
                                        category={product.category}
                                        image={product.image}
                                        price={product.price}
                                        seller={product.seller}
                                    />
                                ))}

                                <hr />

                                <nav aria-label="Page navigation example" className="d-flex justify-content-center mt-3">
                                    <ul className="pagination">
                                        <li
                                            className={(CurrentPage === 1) ? "page-item disabled" : "page-item"}
                                            style={{ cursor: "pointer" }}
                                            onClick={() => { return (CurrentPage > 1) ? SetCurrentPage(CurrentPage - 1) : "" }}
                                        >
                                            <span className="page-link">
                                                &laquo;
                                            </span>
                                        </li>
                                        <li className="page-item active"><span className="page-link">{CurrentPage}</span></li>
                                        <li
                                            className={((CurrentPage === Math.ceil(TotalCount / 6)) || (Count < 6)) ? "page-item disabled" : "page-item"}
                                            style={{ cursor: "pointer" }}
                                            onClick={() => { return ((CurrentPage === Math.ceil(TotalCount / 6)) || (Count < 6)) ? "" : SetCurrentPage(CurrentPage + 1) }}
                                        >
                                            <span className="page-link">
                                                &raquo;
                                            </span>
                                        </li>
                                    </ul>
                                </nav>
                            </>
                            :
                            <div className="mt-5"><strong>No results found...</strong></div>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}