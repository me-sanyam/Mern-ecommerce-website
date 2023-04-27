import React from "react";
import { FaStar } from "react-icons/fa"
import { Link } from "react-router-dom";

export default function Product(props) {
    const Stars = Array(5).fill(0);

    return (
        <div class="row justify-content-center mb-3">
            <div class="col-md-12">
                <div class="card shadow-0 border rounded-3">
                    <div class="card-body">
                        <div class="row g-0">
                            <div class="col-xl-3 col-md-4 d-flex justify-content-center">
                                <img src={props.src} alt={props.name} style={{ width: "10rem", height: "auto" }} />
                            </div>
                            <div class="col-xl-7 col-md-6 col-sm-7">
                                <h5 style={{ color: "#000000" }}>{props.name}</h5>
                                <div class="d-flex flex-row text-warning my-1">
                                    {Stars.map((item, index) => {
                                        return (
                                            <FaStar
                                                key={index}
                                                color={(props.ratings) > index ? 'orange' : '#000'}
                                                size="18px"
                                            />
                                        )
                                    })}
                                    {(props.ratings > 0)
                                        ?
                                        <span class="ms-1">
                                            {props.ratings}
                                        </span>
                                        :
                                        ""
                                    }

                                </div>

                                <p class="text mb-4 mb-md-0">
                                    {props.description.slice(0, 210)}...
                                </p>
                            </div>
                            <div class="col-xl-2 col-md-2 col-sm-5">
                                <div class="d-flex flex-row align-items-center mb-1">
                                    <h4 class="mb-1 me-1">&#8377;{props.price}</h4>
                                    <span class="text-danger"><s>&#8377;{props.price + 999}</s></span>
                                </div>
                                <h6 class="" style={{ color: "#379237" }}>Free shipping</h6>
                                <Link to={`/shop/${props.id}`} class="btn btn-primary btn-sm shadow-0 px-4" type="button">Buy this</Link>
                                <div class="mt-4">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}