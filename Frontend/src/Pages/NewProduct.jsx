import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux'
import { NEW_PRODUCT_RESET } from '../constants/productconst'
import { ClearErrors, CreateProduct } from '../actions/productActions'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function NewProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading, success } = useSelector(state => state.NewProduct)
    const [name, setname] = useState('');
    const [price, setprice] = useState('');
    const [description, setdescription] = useState('');
    const [category, setcategory] = useState('');
    const [stock, setstock] = useState(0);
    const [seller, setseller] = useState('');
    const [images, SetImages] = useState([]);
    const [preview, setpreview] = useState([]);

    const HandleCreateProduct = (e) => {
        e.preventDefault();
        const Product = {
            name,
            price,
            description,
            category,
            stock,
            seller,
            images
        }
        dispatch(CreateProduct(Product));
    }

    if (!loading && success) {
        navigate('/admin/products');
        toast.success('Product Created Successfully.');
        dispatch({ type: NEW_PRODUCT_RESET })
    }
    if (error) {
        toast.error(error);
        dispatch(ClearErrors);
    }

    const onchange = (e) => {
        const files = Array.from(e.target.files);
        SetImages([]);
        setpreview([]);
        files.forEach(element => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setpreview(oldarray => [...oldarray, reader.result])
                    SetImages(oldarray => [...oldarray, reader.result])
                }
            }
            reader.readAsDataURL(element)
        });
    }


    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-2 col-md-2">
                    <Sidebar />
                </div>

                <div class="col-10 col-md-10">
                    <h1 class="my-4">Dashboard / Add Product</h1>
                    <div class="row d-flex justify-content-center mb-5">
                        <div className="col-lg-7 col-md-8 py-4 rounded-3 NewProductFormBoxShadow">
                            <form onSubmit={HandleCreateProduct}>

                                <div className="col-12 px-3 mb-3">
                                    <label className="">Name</label>
                                    <input
                                        type="text"
                                        className="form-control CustomInput"
                                        required
                                        value={name}
                                        onChange={(e) => setname(e.target.value)}
                                    />
                                </div>

                                <div className="col-12 px-3 mb-3">
                                    <label className="">Price</label>
                                    <input
                                        type="text"
                                        className="form-control CustomInput"
                                        required
                                        value={price}
                                        onChange={(e) => setprice(e.target.value)}
                                    />
                                </div>

                                <div className="col-12 px-3 mb-3">
                                    <label className="">Description</label>
                                    <textarea
                                        className='form-control CustomInput'
                                        rows={6}
                                        value={description}
                                        onChange={(e) => setdescription(e.target.value)}
                                    >
                                    </textarea>
                                </div>

                                <div className="col-12 px-3 mb-3">
                                    <select class="form-select CustomInput" onChange={(e) => setcategory(e.target.value)}>
                                        <option value='0'>Category</option>
                                        <option value="mens">Mens</option>
                                        <option value="womens">Womens</option>
                                        <option value="smartwatch">Smartwatch</option>
                                        <option value="shoes">Shoes</option>
                                        <option value="mobiles">Mobiles & Tablets</option>
                                        <option value="laptops">Laptops</option>
                                        <option value="kids">Kids</option>
                                        <option value="toys">Toys</option>
                                        <option value="handbags">Handbags</option>
                                        <option value="bagpacks">Bagpacks</option>
                                        <option value="headphones">Headphones</option>
                                        <option value="accessories">Accessories</option>
                                    </select>
                                </div>

                                <div className="col-12 px-3 mb-3">
                                    <label className="">Stock</label>
                                    <input
                                        type="text"
                                        className="form-control CustomInput"
                                        required
                                        value={stock}
                                        onChange={(e) => setstock(e.target.value)}
                                    />
                                </div>

                                <div className="col-12 px-3 mb-3">
                                    <label className="">Seller/Brand Name</label>
                                    <input
                                        type="text"
                                        className="form-control CustomInput"
                                        required
                                        value={seller}
                                        onChange={(e) => setseller(e.target.value)}
                                    />
                                </div>


                                <div className="col-12 px-3 mb-3">
                                    <input
                                        type="file"
                                        className="form-control CustomInput"
                                        required
                                        onChange={onchange}
                                        multiple
                                    />
                                </div>

                                <div className="col-12 px-3 mb-3">
                                    {preview.map(img => (
                                        <img src={img} key={img} height={50} width={50} alt='preview' />
                                    ))}
                                </div>

                                <div className="col-12 px-3 mt-4">
                                    <button type='submit' className="btn btn-primary w-100">Add Product</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}
