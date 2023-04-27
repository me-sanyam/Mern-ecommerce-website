import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getmyorders, ClearErrors } from '../actions/orderaction';
import { toast } from 'react-toastify';
import { MDBDataTable } from 'mdbreact';
import { FaEye } from 'react-icons/fa'

export default function MyOrders() {
    const dispatch = useDispatch();
    const { orders, error } = useSelector(state => state.MyOrders)

    useEffect(() => {
        dispatch(getmyorders())
        if (error) {
            toast.error(error);
            dispatch(ClearErrors);
        }
    }, [dispatch, error])

    const setorders = () => {
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
            rows: [

            ]
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
                actions: <Link to={`/myorders/${element._id}`} className='btn btn-primary'><FaEye size={20} /></Link>
            })
        });

        return data;
    }

    return (
        <>
            {(orders.length > 0) ?
                <div className="container-md">
                    <MDBDataTable
                        data={setorders()}
                        className='px-3 my-5'
                        bordered
                        striped
                        responsive
                    />
                </div>
                :
                <div className="container-fluid d-flex justify-content-center align-items-center" style={{ backgroundColor: "#ebf0f4", height: "85vh" }}>
                    <h5>You haven't ordered any item yet ! Order some to get list</h5>
                </div>
            }
        </>
    );
}