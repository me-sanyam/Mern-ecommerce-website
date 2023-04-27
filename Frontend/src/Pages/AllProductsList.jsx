import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { DeleteProduct, getadminproducts } from '../actions/productActions';
import { PRODUCT_DELETE_RESET } from '../constants/productconst';
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.AdminProducts);
    const { isDeleted, DeletionError } = useSelector(state => state.AdminProductCredential);

    useEffect(() => {
        dispatch(getadminproducts());
    }, [dispatch]);

    const HandleDeletion = (ID) => {
        dispatch(DeleteProduct(ID));
    }

    if (isDeleted) {
        toast.success('Product Deleted Succesfully.')
        dispatch({ type: PRODUCT_DELETE_RESET })
        navigate('/admin/dashboard');
    }
    if (DeletionError) {
        toast.error(DeletionError)
    }

    const setproducts = () => {
        const data = {
            columns: [
                {
                    label: 'Product ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions'
                }
            ],
            rows: []
        }



        products.forEach(element => {

            data.rows.push({
                id: element._id,
                name: element.name,
                price: <p>&#8377; {element.price}</p>,
                stock: element.stock,
                actions:
                    <>
                        <Link to={`/admin/product/${element._id}`} className='btn btn-primary m-1'><AiFillEdit size={20} /></Link>
                        <button onClick={() => HandleDeletion(element._id)} className='btn btn-danger m-1'><AiFillDelete size={20} /></button>
                    </>
            })
        });
        return data;
    }




    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-2 col-md-2">
                    <Sidebar />
                </div>

                <div class="col-10 col-md-10">
                    <h1 class="my-4">Dashboard / All Products</h1>
                    <div class="row pr-4">

                        {(products.length > 0) ?
                            <div className="col-12">
                                <MDBDataTable
                                    data={setproducts()}
                                    className='px-3'
                                    bordered
                                    striped
                                    responsive
                                    paging={true}
                                />
                            </div>
                            :
                            <div className="col-12 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#ebf0f4", height: "85vh" }}>
                                <h5>OOP's Something went wrong</h5>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}
