import React from 'react';
import { BsArrowLeftCircleFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';

export default function NoRoute() {
    const navigate = useNavigate();
    return (
        <div className="container-fluid position-fixed w-100 h-100 top-0 p-5" style={{ backgroundColor: "#e9ecef" }}>
            <h1 style={{ color: "black" }}>OOPS!</h1>
            <p style={{ color: "black" }}>THE PAGE YOU ARE LOOKING FOR DOESN'T EXIST</p>
            <BsArrowLeftCircleFill
                size={"30px"}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
            />
            <p className="d-inline m-2 position-relative" style={{ color: "black", top: "2px" }}>GO BACK...</p>
        </div>
    );
}