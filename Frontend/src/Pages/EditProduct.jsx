import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getproductdetails, UpdateProduct } from "../actions/productActions";
import Sidebar from "./Sidebar";
import { toast } from 'react-toastify';
import { UPDATE_PRODUCT_RESET } from '../constants/productconst';

export default function EditProduct() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, product } = useSelector(state => state.productdetails)
    const { isUpdated, Updationerror } = useSelector(state => state.AdminProductCredential)
    const [name, setname] = useState('');
    const [price, setprice] = useState('');
    const [description, setdescription] = useState('');
    const [category, setcategory] = useState('');
    const [stock, setstock] = useState('');
    const [seller, setseller] = useState('');
    const [images, SetImages] = useState([]);
    const [OldImages, setOldImages] = useState([]);
    const [preview, setpreview] = useState([]);

    useEffect(() => {

        if (product && product._id !== id) {
            dispatch(getproductdetails(id));
        } else {
            setname(product.name);
            setprice(product.price);
            setdescription(product.description);
            setcategory(product.category);
            setstock(product.stock);
            setseller(product.seller);
            setOldImages(product.images);
        }

    }, [dispatch, id, product]);


    const onchange = (e) => {
        const files = Array.from(e.target.files);
        setOldImages([]);
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

    const HandleUpdateProduct = (e) => {
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
        dispatch(UpdateProduct(id, Product));
    }
    if (isUpdated) {
        toast.success(`Product ${id} updated.`)
        dispatch({ type: UPDATE_PRODUCT_RESET })
        navigate('/admin/dashboard');
    }
    if (Updationerror) {
        toast.error(Updationerror);
    }

    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-2 col-md-2">
                    <Sidebar />
                </div>

                <div class="col-10 col-md-10">
                    <h1 class="my-4">Dashboard / Edit Product</h1>
                    <div class="row d-flex justify-content-center mb-5">
                        {!loading && product &&
                            <div className="col-lg-7 col-md-8 py-4 rounded-3 NewProductFormBoxShadow">
                                <form onSubmit={HandleUpdateProduct}>
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
                                        <select
                                            class="form-select CustomInput"
                                            onChange={(e) => setcategory(e.target.value)}
                                        >
                                            <option value='0' selected={(category === '') ? true : false}>Category</option>
                                            <option value="mens" selected={(category === 'mens') ? true : false}>Mens</option>
                                            <option value="womens" selected={(category === 'womens') ? true : false}>Womens</option>
                                            <option value="smartwatch" selected={(category === 'smartwatch') ? true : false}>Smartwatch</option>
                                            <option value="shoes" selected={(category === 'shoes') ? true : false}>Shoes</option>
                                            <option value="mobiles" selected={(category === 'mobiles') ? true : false}>Mobiles & Tablets</option>
                                            <option value="laptops" selected={(category === 'laptops') ? true : false}>Laptops</option>
                                            <option value="kids" selected={(category === 'kids') ? true : false}>Kids</option>
                                            <option value="toys" selected={(category === 'toys') ? true : false}>Toys</option>
                                            <option value="handbags" selected={(category === 'handbags') ? true : false}>Handbags</option>
                                            <option value="bagpacks" selected={(category === 'bagpacks') ? true : false}>Bagpacks</option>
                                            <option value="headphones" selected={(category === 'headphones') ? true : false}>Headphones</option>
                                            <option value="accessories" selected={(category === 'accessories') ? true : false}>Accessories</option>
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
                                        {OldImages.map(img => (
                                            <img src={img.url} key={img.url} height={50} width={50} alt='preview' />
                                        ))}
                                    </div>

                                    <div className="col-12 px-3 mb-3">
                                        {preview.map(img => (
                                            <img src={img} key={img} height={50} width={50} alt='preview' />
                                        ))}
                                    </div>

                                    <div className="col-12 px-3 mt-4">
                                        <button type='submit' className="btn btn-primary w-100">update</button>
                                    </div>

                                </form>
                            </div>
                        }
                    </div>
                </div>
            </div >
        </div >);
}