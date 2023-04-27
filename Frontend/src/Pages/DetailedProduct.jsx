import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ClearErrors, getproductdetails, CreateReview } from "../actions/productActions";
import { AddItemToCart } from "../actions/cartaction";
import ProductDetailGallery from './ProductImageGallary';
import { FaStar } from "react-icons/fa"
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
import Loader from './Loader';
import Card from "./card";
import { toast } from 'react-toastify';
import { NEW_REVIEW_RESET } from '../constants/productconst'

export default function DetailedProduct() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, product, error } = useSelector(state => state.productdetails)
    const { randomProducts } = useSelector(state => state.HomeProducts)
    const [Quantity, SetQuantity] = useState(1);
    const Stars = Array(5).fill(0);
    const [CurrentValue, SetCurrentValue] = useState(0);
    const [HoverValue, SetHoverValue] = useState(undefined);
    const [ReviewDescription, SetReviewDescription] = useState('');

    const addtocart = () => {
        if (product.stock > 0) {
            dispatch(AddItemToCart(id, Quantity,));
            toast.success('Product added to cart')
        } else {
            toast.error('Product out of Stock')
            dispatch(ClearErrors)
        }
        // localStorage.clear();
    }

    const SubmitReview = () => {
        console.log(CurrentValue, ReviewDescription)
        const review = {
            ratings: CurrentValue,
            comments: ReviewDescription,
            productid: id
        }
        dispatch(CreateReview(review))
        SetCurrentValue(0)
        SetReviewDescription('')
        toast.success('Review given successfully');
        dispatch({ type: NEW_REVIEW_RESET })
    }

    useEffect(() => {
        dispatch(getproductdetails(id));
        if (error) {
            toast.error(error)
        }
    }, [dispatch, id, error])

    return (
        <>

            <div class="modal" id="myModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Add Reviews</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div>
                                {Stars.map((e, index) => {
                                    return (
                                        <FaStar
                                            key={index}
                                            size="30px"
                                            style={{ cursor: "pointer" }}
                                            color={(CurrentValue || HoverValue) > index ? "orange" : "black"}
                                            onClick={() => { SetCurrentValue(index + 1) }}
                                            onMouseOver={() => { SetHoverValue(index + 1) }}
                                            onMouseLeave={() => { SetHoverValue("undefined") }}
                                        />
                                    )
                                })}
                            </div>
                            <textarea
                                className="form-control mt-3"
                                placeholder="Write a review"
                                value={ReviewDescription}
                                onChange={(e) => SetReviewDescription(e.target.value)}
                            />
                        </div>
                        <div class="modal-footer">
                            <button
                                className="btn btn-primary rounded-0 my-1 py-1"
                                data-bs-dismiss="modal"
                                onClick={SubmitReview}
                            >Submit Reviews</button>
                        </div>
                    </div>
                </div>
            </div>

            {
                loading
                    ?
                    <Loader />
                    :
                    <div className="container-lg py-3">
                        <div className="row">

                            <ProductDetailGallery images={product.images} />

                            <div className="col-lg-6 py-3 px-md-3">
                                <h1 className="m-0" style={{ fontSize: "2rem" }}>{product.name}</h1>
                                <div className="my-2">
                                    {Stars.map((item, index) => {
                                        return (
                                            <FaStar
                                                key={index}
                                                color={(product.ratings) > index ? 'orange' : '#000'}
                                                size="18px"
                                            />
                                        )
                                    })}
                                </div>
                                <p className="my-1 text-justify">{product.description}</p>
                                <div class="d-flex flex-row align-items-center my-3">
                                    <h2 class="mb-1 me-1">&#8377;{product.price}</h2>
                                    <span class="text-danger"><s>&#8377;{product.price + 999}</s></span>
                                </div>
                                {product && product.size && (product.size.length !== 0) ?
                                    <div className="mb-3">
                                        <p className="m-0 d-inline me-1" style={{ fontSize: "1.1rem" }}>Size:</p>
                                        {product.size.map((object, index) => {
                                            return (
                                                <input
                                                    type="text"
                                                    key={index}
                                                    readOnly
                                                    value={object.value}
                                                    className="form-control text-center d-inline m-1"
                                                    style={{ width: "50px" }}
                                                />
                                            )
                                        })}
                                    </div>
                                    :
                                    ""
                                }
                                <div className="d-flex mb-4">
                                    <AiOutlineMinus
                                        size={"30px"}
                                        id="AiOutlinePlus"
                                        onClick={() => { (Quantity > 1) ? SetQuantity(Quantity - 1) : SetQuantity(1) }}
                                        style={{ cursor: "pointer", color: "black", background: "#e9ecef", padding: "8px" }}
                                    />
                                    <div
                                        style={
                                            {
                                                width: "50px",
                                                border: "2px solid #e9ecef",
                                                fontSize: "small",
                                                display: "inline-flex",
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }
                                        }
                                    >{Quantity}</div>
                                    <AiOutlinePlus
                                        size={"30px"}
                                        id="AiOutlineMinus"
                                        onClick={() => {
                                            if (product.stock === 0) {
                                                SetQuantity(1);
                                            } else {
                                                (Quantity === product.stock) ? SetQuantity(product.stock) : SetQuantity(Quantity + 1)
                                            }
                                        }}
                                        style={{ cursor: "pointer", color: "black", background: "#e9ecef", padding: "8px" }}
                                    />
                                </div>
                                <button
                                    className="btn btn-primary rounded-0"
                                    onClick={addtocart}
                                >ADD TO CART</button>
                                <button
                                    className="btn btn-primary rounded-0 ms-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#myModal"
                                >ADD REVIEW</button>
                            </div>
                        </div>
                    </div>
            }
            {product.numofreviews > 0 ?
                <div className="container-md" style={{ backgroundColor: "#fff" }}>
                    <h4 className="text-dark" style={{ fontWeight: "600" }}>ALL REVIEWS</h4>
                    <hr />
                    {product.reviews.map((review) => {
                        return (
                            <>
                                <div className="my-2">
                                    <div
                                        className="d-inline-flex justify-content-center align-items-center me-2"
                                        style={{
                                            width: "35px",
                                            height: "35px",
                                            backgroundColor: "#62CDFF",
                                            borderRadius: "50%"
                                        }}>
                                        {String(review.name).substring(0, 1)}
                                    </div>
                                    {review.name}
                                    <div className="my-1 ms-2">
                                        {Stars.map((item, index) => {
                                            return (
                                                <FaStar
                                                    key={index}
                                                    color={(review.ratings) > index ? 'orange' : '#000'}
                                                    size="18px"
                                                />
                                            )
                                        })}
                                    </div>
                                    <p className="ms-2 my-0">{review.comment}</p>
                                </div>
                                <hr />
                            </>
                        );
                    })}
                </div>
                :
                <div class="alert alert-secondary text-center" role="alert">
                    No reviews available on product ! Add Yours
                </div>
            }

            <div className="container py-5">
                <div className="row">
                    <div className="col-md-4">
                        <h4 className="text-dark" style={{ fontWeight: "600" }}>MORE PRODUCT</h4>
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
                    <div className="col-12 text-center">
                        <Link to="/shop" className="btn btn-primary">VIEW MORE</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
