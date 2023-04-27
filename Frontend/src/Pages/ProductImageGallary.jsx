import React, { useState } from "react";

export default function DetailedProduct({ images = [{ url: '' }] }) {
    let [MainImage, SetMainImage] = useState(images[0])

    return (
        <div className="col-lg-6">
            <div className="row py-3 d-flex justify-content-center h-100">
                <div className="col-12 d-flex justify-content-center">
                    <div className="d-flex justify-content-center align-items-center">
                        < img
                            src={MainImage.url}
                            alt="Product-img.png"
                            id="MainImage"
                        />
                    </div>
                </div>
                < div className="col-12 d-flex flex-wrap justify-content-center" style={{ backgroundColor: "#fff" }}>
                    {
                        images.map((image, index) => {
                            return (
                                <div className="">
                                    <img
                                        key={index}
                                        src={image.url}
                                        className="m-1 img-thumbnail"
                                        alt="Product-img.png"
                                        id="SideImages"
                                        onClick={() => SetMainImage(image)}
                                    />
                                </div>
                            );
                        })
                    }
                </div >
            </div>
        </div>
    );
}