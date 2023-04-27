import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOrder, getAllOrders } from '../actions/orderaction';
import { MDBDataTable } from 'mdbreact';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { DELETE_ORDER_RESET } from '../constants/orderConstants'

export default function AllOrdersList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { orders } = useSelector(state => state.AllOrders)
    const { DeletionError, IsDeleted } = useSelector(state => state.DeleteOrder)

    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

    const HandleDeleteOrder = (id) => {
        dispatch(DeleteOrder(id));
    }

    if (IsDeleted) {
        toast.success('Order deleted succesfully.')
        navigate('/admin/dashboard');
        dispatch({ type: DELETE_ORDER_RESET })
    }
    if (DeletionError) {
        toast.error(DeletionError)
    }

    const SetAllOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'No. of items',
                    field: 'numofitems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: []
        }


        orders.forEach(element => {

            let Num = 0;
            element.ordereditem.forEach(item => {
                Num = Num + Number(item.quantity);
            });


            data.rows.push({
                id: element._id,
                numofitems: Num,
                amount: <p>&#8377; {element.totalprice}</p>,
                status: element.orderstatus && String(element.orderstatus).includes('Delivered')
                    ? <p style={{ color: "green" }}>{element.orderstatus}</p>
                    : <p style={{ color: "red" }}>{element.orderstatus}</p>,
                actions:
                    <>
                        <Link to={`/admin/process/${element._id}`} className='btn btn-primary m-1'><AiFillEdit size={20} /></Link>
                        <button onClick={() => HandleDeleteOrder(element._id)} className='btn btn-danger m-1'><AiFillDelete size={20} /></button>
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
                    <h1 class="my-4">Dashboard / All Orders</h1>
                    <div class="row pr-4">

                        {(orders.length > 0) ?
                            <div className="col-12">
                                <MDBDataTable
                                    data={SetAllOrders()}
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
