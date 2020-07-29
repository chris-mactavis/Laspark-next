import axiosInstance from "../../../config/axios";
import Layout from "../../../Components/Layout";
import Head from "next/head";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {loader} from "../../../store/actions/loader";
import Token from "../../../Utils/Token";
import {showNotifier} from "../../../store/actions/notifier";

export default function ServiceBookingDetail({booking, serviceMessages}) {

    const createMarkup = (content) => ({__html: content});

    const {register, handleSubmit, reset} = useForm();
    const dispatch = useDispatch();

    const [messages, setMessages] = useState(serviceMessages || []);

    const replyHandler = async data => {
        dispatch(loader());
        const formData = new FormData();
        formData.append('message', data.message);
        Array.from(data.attachments).forEach(attachment => formData.append('attachments[]', attachment));

        try {
            const {data: response} = await axiosInstance.post('service-bookings-messages/' + booking.id, formData, {
                headers: {Authorization: `Bearer ${Token()}`}
            });
            console.log(response);
            setMessages(message => [response.data, ...message]);
            reset();
            dispatch(loader());
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
            <title>Service Booking Detail | Laspark</title>
        </Head>

        <section className="profile single-service-booking">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2 className="text-center mb-5">#{booking.order_number} ({booking.service.service})</h2>
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

                                <input ref={register} name="attachments" type="file" multiple/>

                                <button className="btn green thin wide mx-auto" type="submit">Reply</button>
                            </form>
                        </div>
                    </div>
                </div>

                {
                    messages.map(message => <div key={message.id} className="row">
                        <div className="col-8 mx-auto chats">
                            <div className="header d-flex flex-column">
                                <p className="mb-0">{message.user.full_name}</p>
                                <span>{message.user.role === 'admin' ? 'Staff' : 'Me'}</span>
                            </div>
                            <div className="body">
                                <div dangerouslySetInnerHTML={createMarkup(message.message)}/>
                                <div className="attachment-section">
                                    <div className="d-flex flex-column mt-3">
                                        <a href="#" className="mb-1 text-dark">Attachments</a>
                                        {
                                            message.attachments_decoded.map((attachment, i) => <span key={i} className="d-block mb-2">
                                                <a target="_blank" className="text-dark" href={attachment}>{attachment}</a>
                                            </span>)
                                        }
                            </div>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </section>
    </Layout>
}

export async function getStaticPaths(context) {
    const {data: response} = await axiosInstance.get('service-booking-slug');
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
    const {data: {data: booking, messages}} = await axiosInstance.get(`my-booked-services/${id}`);

    return {
        props: {
            booking,
            serviceMessages: messages
        }
    }
}