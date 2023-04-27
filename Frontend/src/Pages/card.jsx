import React from 'react';
import { FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Card(props) {
    const Stars = Array(5).fill(0);
    return (
        <div class="col-md-5 col-lg-3 mb-4">
            <Link to={`/shop/${props.id}`} className="text-decoration-none text-dark">
                <div class="card ProductCard">
                    <img
                        src="https://res.cloudinary.com/dqxozrie1/image/upload/v1678272680/Web.%20Images/pngwing.com_2_ivz3jq.png"
                        alt="Sale.png"
                        style={{ height: "auto", width: "70px" }}
                    />
                    <div className="d-flex justify-content-center align-items-center" style={{ height: "240px" }}>
                        <img src={props.src} class="card-img-top" alt="Laptop" style={{ height: "auto", width: "10rem" }} />
                    </div>
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <p class="small">{props.seller}</p>
                            <p class="small text-danger"><s>&#8377;{props.price + 999}</s></p>
                        </div>

                        <div class="d-flex justify-content-between mb-3">
                            <h5 class="mb-0 me-3" style={{ fontSize: "1rem" }}>{props.name}</h5>
                            <h5 class="text-dark mb-0">&#8377;{props.price}</h5>
                        </div>

                        <div class="d-flex justify-content-between mb-2">
                            <p class="mb-0">Available: <span class="fw-bold">{props.stock}</span></p>
                            <div class="ms-auto text-warning">
                                {Stars.map((item, index) => {
                                    return (
                                        <FaStar
                                            key={index}
                                            color={(props.ratings) > index ? 'orange' : '#000'}
                                            size="18px"
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}