import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { Link } from "react-router-dom";
import { getallusers, DeleteUser } from '../actions/UserAction'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { DELETE_USER_RESET } from '../constants/UserConstants';

export default function AllUsersList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { users } = useSelector(state => state.AllUsers)
    const { deletionError, IsDeleted } = useSelector(state => state.DeleteUser)

    useEffect(() => {
        dispatch(getallusers())
    }, [dispatch]);

    const HandleDeleteUSer = (id) => {
        dispatch(DeleteUser(id));
    }

    if (IsDeleted) {
        toast.success('User Deleted Successfully.');
        navigate('/admin/dashboard');
        dispatch({ type: DELETE_USER_RESET });
    }
    if (deletionError) {
        toast.error(deletionError);
    }

    const SetAllOrders = () => {
        const data = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Joined',
                    field: 'joined',
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


        users.forEach(element => {

            data.rows.push({
                id: element._id,
                name: element.name,
                email: element.email,
                role: element.role,
                joined: String(element.createdAt).substring(0, 10),
                actions:
                    <>
                        <Link to={`/admin/user/${element._id}`} className='btn btn-primary m-1'><AiFillEdit size={20} /></Link>
                        <button onClick={() => HandleDeleteUSer(element._id)} className='btn btn-danger m-1'><AiFillDelete size={20} /></button>
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
                    <h1 class="my-4">Dashboard / All Users</h1>
                    <div class="row pr-4">

                        {(users.length > 0) ?
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
