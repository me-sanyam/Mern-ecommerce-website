import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'
export default function Contact() {
    const [email, setemail] = useState('')
    const [phone, setphone] = useState('')
    const [message, setmessage] = useState('')


    const handleresponse = async (e) => {
        try {
            e.preventDefault()
            console.log(email, phone, message)

            var phoneNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            const valid = phone.match(phoneNum);
            if ((phone.length !== 10) || !valid) {

                toast.error("Invalid phone number!");

            } else {
                const config = {
                    Headers: {
                        'Content-Type': 'application/json'
                    }
                }
                const { data } = await axios.post('/api/contact/query', { email, phone, message }, config);
                toast.success(data.message)
                setemail('')
                setphone('')
                setmessage('')
            }

        } catch (err) {
            toast.error(err);
        }
    }

    return (
        <div className="container-fluid my-2">
            <div className="row">
                <div className="col-lg-8">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1801.6496185499116!2d74.87209656275309!3d31.62862066928563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391965e16e6ec7ad%3A0x68df4e9b2fe03e7e!2sDAV%20COLLEGE!5e0!3m2!1sen!2sin!4v1679548874949!5m2!1sen!2sin"
                        height="620"
                        title='location'
                        style={{ border: "none", width: "100%" }}
                        allowfullscreen="true"
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
                <div
                    className="col-lg-4 d-flex flex-column justify-content-center"
                    style={{ backgroundColor: "whitesmoke", height: "620px" }}
                >
                    <h1 className='mt-2 ms-1 text-dark'>GET IN TOUCH</h1>
                    <div className="mb-3">
                        <h4 className='my-1 ms-1 text-dark'>Visit Us:</h4>
                        <h6 className='m-0 ms-1 text-dark'>Dav College, Hathi Gate, Katra Ahluwalia, Amritsar, Punjab</h6>
                    </div>

                    <div className="">
                        <p className='m-0 ms-1'>For issues related to products, shipping, damage
                            <br />
                            Or
                            <br />
                            Want to sell online with us ?
                            Write a response !
                        </p>
                    </div>

                    <form className='mt-3' onSubmit={handleresponse}>

                        <div class="col-12 form-floating px-3 mb-2">
                            <input
                                type="email"
                                class="form-control CustomInput"
                                id="floatingInput"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                required
                            />
                            <label className="mx-3" for="floatingInput">Email Address</label>
                        </div>

                        <div class="col-12 form-floating px-3 mb-2">
                            <input
                                type="text"
                                class="form-control CustomInput"
                                id="floatingInput"
                                placeholder="Mobile"
                                value={phone}
                                onChange={(e) => setphone(e.target.value)}
                                required
                            />
                            <label className="mx-3" for="floatingInput">Phone.no</label>
                        </div>

                        <div class="col-12 form-floating px-3 mb-2">
                            <textarea
                                class="form-control CustomInput"
                                placeholder="Leave a comment here"
                                id="floatingTextarea"
                                value={message}
                                onChange={(e) => setmessage(e.target.value)}
                                style={{ height: "150px" }}
                            >
                            </textarea>
                            <label for="floatingTextarea" className='mx-3'>Message</label>
                        </div>
                        <div class="col-12 form-floating px-3 mb-2">
                            <button className='btn btn-primary' type='submit'>SEND RESPONSE</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}