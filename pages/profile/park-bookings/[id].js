import axiosInstance from "../../../config/axios";
import Layout from "../../../Components/Layout";
import Head from "next/head";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {loader} from "../../../store/actions/loader";
import Token from "../../../Utils/Token";
import {showNotifier} from "../../../store/actions/notifier";
import Cookies from "js-cookie";
import Router from "next/router";

export default function ({booking, messages: parkMessages, spaceBookingId}) {

    const createMarkup = (content) => ({__html: content});
    const {register, handleSubmit, reset} = useForm();
    const dispatch = useDispatch();
    const [messages, setMessages] = useState(parkMessages || []);

    useEffect(() => {
        dispatch(loader());

        if (!Token()) {
            dispatch(loader());
            Cookies.set('redirectIntended', `/profile/park-bookings/${spaceBookingId}`)
            Router.push('/login');
        } else {
            dispatch(loader());

            async function fetchData() {
                const {data: {messages}} = await axiosInstance.get(`my-booked-spaces/${spaceBookingId}`);
                setMessages(messages);
            }

            fetchData();
        }
    }, [])

    const replyHandler = async data => {
        dispatch(loader());
        const formData = new FormData();
        formData.append('message', data.message);
        Array.from(data.attachments).forEach(attachment => formData.append('attachments[]', attachment));
        try {
            const {data: response} = await axiosInstance.post('park-space-bookings-messages/' + booking.id, formData, {
                headers: {Authorization: `Bearer ${Token()}`}
            });
            console.log(response);
            dispatch(loader());
            setMessages(message => [response.data, ...message]);
            reset();
            dispatch(showNotifier('Reply sent!'));
        } catch (e) {
            console.log(e);
            dispatch(loader());
            dispatch(showNotifier(e.response.data.message, 'danger'));
        }
        console.log(data);
    }

    return <Layout hasHeader={false}>
        <Head>
            <title>Park Booking Detail | Laspark</title>
        </Head>

        <section className="profile single-service-booking">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4 className="text-center mb-0">#{booking.order_number} ({booking.park.name})</h4>
                        <h5 className="text-center mb-5">{booking.park_space.space}</h5>
                    </div>
                </div>

                <div className="row">
                    <div className="col-8 mx-auto reply-container">
                        <div>
                            <h5>Reply</h5>
                        </div>

                        <div className="form">
                            <form className="account-create p-0" onSubmit={handleSubmit(replyHandler)}>
                                <textarea ref={register} name="message" placeholder="Compose your message..."/>
                                <label>Attach receipt here</label>
                                <input ref={register} name="attachments" type="file" multiple/>
                                <button className="btn green thin wide mx-auto" type="submit">Send</button>
                            </form>
                        </div>
                    </div>
                </div>

                {
                    messages.map(message => <div key={message.id} className="row">
                        <div className="col-8 mx-auto chats">
                            <div className="header d-flex flex-column">
                                <p className="mb-0">{message.user ? message.user.full_name : 'N/A'}</p>
                                <span>{message.user ? (message.user.role === 'admin' ? 'Staff' : 'Me') : 'N/A'}</span>
                            </div>
                            <div className="body">
                                {(message.message && message.message !== 'undefined') &&
                                <div dangerouslySetInnerHTML={createMarkup(message.message)}/>}
                                {
                                    message.attachments_decoded.length > 0 && <div className="attachment-section">
                                        <div className="d-flex flex-wrap flex-column mt-3">
                                            <a href="#" className="mb-1 text-dark">Attachment</a>
                                            {
                                                message.attachments_decoded.map((attachment, i) => <span key={i}
                                                                                                         className="d-block mb-2">
                                                <a target="_blank" className="attachment text-dark"
                                                   href={`http://104.131.93.134${attachment}`}>{attachment}</a>
                                            </span>)
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </section>
    </Layout>
}

export async function getStaticPaths(context) {
    const {data: response} = await axiosInstance.get('park-booking-slug');
    const ids = response.map(id => ({
        params: {
            id: id.id.toString()
        }
    }));
    return {
        paths: ids,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const id = context.params.id;
    const {data: {data: booking, messages}} = await axiosInstance.get(`my-booked-spaces/${id}`);
    // console.log(data);
    return {
        props: {
            booking,
            messages,
            spaceBookingId: id
        }
    }
}
