import React from 'react'

export default function Loader() {
    return (
        <div className='container-fluid d-flex justify-content-center align-items-center' style={{ backgroundColor: "#e9ecef"}}>
            <div className="spinner-border text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>

    );
}