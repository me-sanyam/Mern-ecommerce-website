import React from "react";
import '../style.css'
import { useSelector } from 'react-redux';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { ImBin2 } from 'react-icons/im'
import { toast } from 'react-toastify'
import { AddItemToCart, RemoveItemFromCart } from '../actions/cartaction';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

export default function Cart() {
    const disptach = useDispatch();
    const { user } = useSelector(state => state.user)
    const { cartItems } = useSelector(state => state.cart)
    const UserCartItems = cartItems.filter(cartitem => cartitem.owner === user._id);
    let Subtotal = 0, Tax;

    const HandleIncrement = (OldQty, ProductID, stock) => {
        if (OldQty < stock) {
            let newQty = OldQty + 1;
            if (newQty <= stock) {
                disptach(AddItemToCart(ProductID, newQty));
            }
            else {
                newQty = stock;
                disptach(AddItemToCart(ProductID, newQty));
            }
        }
        else {
            toast.error('More Quantity not available')
        }
    }

    const HandleDecrement = (OldQty, ProductID) => {
        if (OldQty > 1) {
            let newQty = OldQty - 1;
            disptach(AddItemToCart(ProductID, newQty));
        }
        else {
            HandleRemoveCart(ProductID);
        }
    }

    const HandleRemoveCart = (id) => {
        disptach(RemoveItemFromCart(id));
        toast.success('Removed Successfully');
    }
    return (
        <>
            {(UserCartItems.length > 0) ?
                <div className="container-fluid" style={{ backgroundColor: "#fff", height: "100%" }}>
                    <div className="row d-flex flex-md-row flex-column justify-content-center align-items-enter" style={{ backgroundColor: "#fff" }}>
                        <div className="col-12 p-4 text-center">
                            <h5 className="m-0" style={{ fontWeight: "bold" }}>Shopping Cart</h5>
                        </div>
                        <div
                            className="col-12 col-md-7 d-flex flex-column justify-content-start align-items-center"
                            style={{ backgroundColor: "#fff" }}
                        >
                            {UserCartItems.map((Item) => {
                                Subtotal += (Item.price * Item.quantity);
                                Tax = Math.ceil(Subtotal * 0.05)
                                return (
                                    <div
                                        className="card col-12 col-lg-11 p-3 m-1 rounded-3"
                                        key={UserCartItems.product}
                                    >
                                        <div className="card-body  d-flex">
                                            <img src={Item.Image} alt={Item.name} style={{ width: "8rem", height: "auto" }} />
                                            <div className="ms-3 d-flex flex-column justify-content-center align-items-start">
                                                <h6 style={{ fontWeight: "bold" }}>{Item.name}</h6>
                                                <p className="my-0">&#8377;{Item.price * Item.quantity}</p>

                                                <div className="input-group my-2">
                                                    <AiOutlineMinus
                                                        size={"25px"}
                                                        onClick={() => HandleDecrement(Item.quantity, Item.product, Item.stock)}
                                                        style={
                                                            {
                                                                cursor: "pointer",
                                                                color: "black",
                                                                background: "#e9ecef",
                                                                padding: "6px",
                                                            }
                                                        }
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
                                                    >{Item.quantity}</div>
                                                    <AiOutlinePlus
                                                        size={"25px"}
                                                        onClick={() => HandleIncrement(Item.quantity, Item.product, Item.stock)}
                                                        style={
                                                            {
                                                                cursor: "pointer",
                                                                color: "black",
                                                                background: "#e9ecef",
                                                                padding: "6px",
                                                            }
                                                        }
                                                    />
                                                </div>
                                                <Link onClick={() => HandleRemoveCart(Item.product)} style={{ textDecoration: "none" }}>
                                                    <ImBin2 size={15} style={{ color: "red" }} />
                                                    <p className="d-inline position-relative mx-1" style={{ top: "4px", color: "red" }}>Remove</p>
                                                </Link>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })}
                        </div>
                        <div
                            className="col-12 col-md-5 col-xl-3 d-flex justify-content-center align-items-start"
                            style={{ backgroundColor: "#fff" }}
                        >
                            <div className="card col-12 col-lg-10 col-xl-12 m-1 rounded p-3"
                            >
                                <h5>Order Summary</h5>
                                <hr />
                                <div className="d-flex justify-content-between w-100 my-2">
                                    <span>Subtotal</span>
                                    <span>&#8377;{Subtotal}</span>
                                </div>
                                <div className="d-flex justify-content-between w-100 my-2">
                                    <span>Tax</span>
                                    <span>&#8377;{Tax}</span>
                                </div>
                                <div className="d-flex justify-content-between w-100 my-2">
                                    <span>Delivery Charges</span>
                                    <span>&#8377;0</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between w-100 my-3">
                                    <span style={{ fontSize: "1.2rem" }}>Total</span>
                                    <span style={{ fontSize: "1.1rem" }}>&#8377;{Tax + Subtotal}</span>
                                </div>
                                <Link to="/checkout" className="btn btn-primary ">Checkout</Link>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div
                    className="container-fluid d-flex flex-column justify-content-center align-items-center"
                    style={{ width: "100%", height: "83vh", backgroundColor: "#fff" }}
                >
                    <img
                        src="https://res.cloudinary.com/dqxozrie1/image/upload/v1677496060/Web.%20Images/empty-cart-2130356-1800917_huihpd.webp"
                        alt="Empty-Cart-img"
                        id="EmptyCartImage"
                    />
                </div>
            }
        </>

    );
}