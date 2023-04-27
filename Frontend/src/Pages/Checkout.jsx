import React, { useState } from 'react';
import { getNames } from 'country-list';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import { toast } from 'react-toastify';
import axios from 'axios';
import { createOrder } from '../actions/orderaction'
import { RemoveItemFromCart } from '../actions/cartaction';

export default function Checkout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user)
    const { cartItems } = useSelector(state => state.cart)
    const [Address, SetAddress] = useState('');
    const [City, SetCity] = useState('');
    const [Number, SetNumber] = useState('');
    const [PostalCode, SetPostalCode] = useState('');
    const [Country, SetCountry] = useState('');
    const countrylist = getNames();

    const UserCartItems = cartItems.filter(cartitem => cartitem.owner === user._id);
    let Subtotal = 0, Tax;
    UserCartItems.forEach(Item => {
        Subtotal += (Item.price * Item.quantity);
        Tax = Math.ceil(Subtotal * 0.05);
    });

    const stripe = useStripe();
    const elements = useElements();
    // const dispatch = useDispatch();
    const options = {
        style: {
            base: {
                fontSize: "16px",
            },
            invalid: {
                color: "red"
            }
        }
    }

    const paymentData = {
        amount: Math.round((Subtotal + Tax) * 100)
    }

    const Handlepaymnets = async (e) => {
        e.preventDefault();

        document.querySelector(".paymentbtn").disabled = true
        let res;

        try {

            const config = {
                headers: { "Content_Type": "application/json" }
            }

            res = await axios.post('/api/payment/process', paymentData, config)
            const ClientSecret = res.data.client_secret

            if (!stripe || !elements) {
                return;
            }

            const result = await stripe.confirmCardPayment(ClientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            })

            if (result.error) {
                document.querySelector(".paymentbtn").disabled = true
                toast.error(result.error)
            } else {

                if (result.paymentIntent.status === 'succeeded') {

                    // to create an order
                    const order = {
                        ordereditem: UserCartItems,
                        shippinginfo: {
                            address: Address,
                            city: City,
                            phoneno: Number,
                            postalCode: PostalCode,
                            country: Country
                        },
                        itemprice: Subtotal,
                        shipcost: 0,
                        tax: Tax,
                        totalprice: Subtotal + Tax,
                        paymentinfo: 'paid'
                    }

                    dispatch(createOrder(order))
                    UserCartItems.forEach(Item => {
                        dispatch(RemoveItemFromCart(Item.product));
                    });
                    navigate('/myorders');

                } else {
                    toast.error('Payment failed please try again after some time.')
                }
            }

        } catch (error) {
            document.querySelector(".paymentbtn").disabled = false
            toast.error(error);
        }





    }
    return (
        <div className="container-fluid py-4" style={{ backgroundColor: "#ebf0f4" }} >
            <div className="row py-4 d-flex flex-column flex-md-row justify-content-center align-items-start">
                <div className="col-md-9 col-lg-7 col-xl-6">
                    <div className="row d-flex flex-column justify-content-center align-items-center">

                        <div className="col-11 mb-4 px-5 py-2" style={{ backgroundColor: "#fff", borderRadius: "20px" }}>
                            <h5 className='mt-3'>{user.name}</h5>
                            <h6 className="my-2">
                                Paying:
                                <strong> &#8377;{Subtotal + Tax}</strong>
                            </h6>
                            <p
                                className='px-3 py-1 mt-1 rounded-3 d-inline-flex'
                                style={{ fontSize: "small", backgroundColor: "#EAFFF7", color: "#00FFAB" }}
                            ><strong>Free Delivery</strong></p>
                        </div>

                        <div className="col-11 p-5" style={{ backgroundColor: "#fff", borderRadius: "20px" }}>
                            <form
                                classname="col-10"
                                onSubmit={Handlepaymnets}
                            >
                                <div className="row">
                                    <h5 className='mb-4'>Shipping Information</h5>
                                    <div className="col-12 form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control CustomInput"
                                            id="floatingInput"
                                            placeholder="address"
                                            required
                                            value={Address}
                                            onChange={(e) => SetAddress(e.target.value)}
                                        />
                                        <label for="floatingInput" className='px-4'>Address</label>
                                    </div>

                                    <div className="col-lg-6 form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control CustomInput"
                                            id="floatingPassword"
                                            placeholder="city"
                                            required
                                            value={City}
                                            onChange={(e) => SetCity(e.target.value)}
                                        />
                                        <label for="floatingPassword" className='px-4'>City</label>
                                    </div>

                                    <div className="col-lg-6 mb-3 form-floating">
                                        <input
                                            type="text"
                                            className="form-control CustomInput"
                                            id="floatingnumber"
                                            required
                                            placeholder="Number"
                                            value={Number}
                                            onChange={(e) => SetNumber(e.target.value)}
                                        />
                                        <label for="floatingnumber" className='px-4'>Phone no.</label>
                                    </div>

                                    <div className="col-lg-6 mb-3 form-floating">
                                        <input
                                            type="text"
                                            className="form-control CustomInput"
                                            id="floatingcode"
                                            required
                                            placeholder="postalcode"
                                            value={PostalCode}
                                            onChange={(e) => SetPostalCode(e.target.value)}
                                        />
                                        <label for="floatingcode" className='px-4'>Postal Code</label>
                                    </div>

                                    <div className="col-lg-6">
                                        <select
                                            className="form-select CustomInput"
                                            style={{ height: "58px" }}
                                            id='floatingselect'
                                            value={Country}
                                            required
                                            onChange={(e) => SetCountry(e.target.value)}
                                        >
                                            <option value=''>
                                                Select Country
                                            </option>
                                            {countrylist.map(country => {
                                                return (
                                                    <option
                                                        style={{ fontSize: "smaller" }}
                                                        key={country}
                                                        value={country}
                                                    >
                                                        {country}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>

                                    <h5 className='mt-5 mt-lg-4'>Payments</h5>
                                    <div className="col-10 mb-3">
                                        <img
                                            src="https://res.cloudinary.com/dqxozrie1/image/upload/v1680162787/Web.%20Images/icons8-visa-96_ygpi7o.png"
                                            alt="..."
                                            style={{ width: "50px", height: "auto" }}
                                            className='me-2'
                                        />
                                        <img
                                            src='https://res.cloudinary.com/dqxozrie1/image/upload/v1680266706/Web.%20Images/icons8-paypal-an-online-payments-system-operating-worldwide-96_gi5p5n.png'
                                            alt="..."
                                            style={{ width: "50px", height: "auto" }}
                                            className='me-2'
                                        />
                                        <img
                                            src='https://res.cloudinary.com/dqxozrie1/image/upload/v1680162787/Web.%20Images/icons8-mastercard-logo-96_lo5ulo.png'
                                            alt="..."
                                            style={{ width: "50px", height: "auto" }}
                                            className='me-2'
                                        />
                                        <img
                                            src='https://res.cloudinary.com/dqxozrie1/image/upload/v1680266411/Web.%20Images/icons8-american-express-96_tkwbzo.png'
                                            alt="..."
                                            style={{ width: "50px", height: "auto" }}
                                            className='me-2'
                                        />
                                    </div>

                                    <div className="col-12 mb-3">
                                        <label className='text-dark' style={{ fontWeight: "bold" }}>Card Number</label>
                                        <CardNumberElement
                                            type="text"
                                            className="form-control CustomInput mt-1 py-3"
                                            required
                                            options={options}
                                        />
                                    </div>

                                    <div className="col-12 mb-3">
                                        <label className='text-dark' style={{ fontWeight: "bold" }}>Card Expiry</label>
                                        <CardExpiryElement
                                            type="text"
                                            className="form-control CustomInput mt-1 py-3"
                                            required
                                            options={options}
                                        />
                                    </div>

                                    <div className="col-12 mb-3">
                                        <label className='text-dark' style={{ fontWeight: "bold" }}>Card CVC</label>
                                        <CardCvcElement
                                            type="text"
                                            className="form-control CustomInput mt-1 py-3"
                                            required
                                            options={options}
                                        />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <button className='btn btn-primary w-100 py-2 paymentbtn'>Pay</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}