import Head from "next/head";
import Layout from "../../Components/Layout";
import React from "react";
import {useForm} from "react-hook-form";
import Error from "../../Components/Error";
import {useDispatch} from "react-redux";
import {loader} from "../../store/actions/loader";
import {showNotifier} from "../../store/actions/notifier";
import {User} from "../../Utils/User";

const ContactUs = () => {

    const dispatch = useDispatch();

    const {register, handleSubmit, errors} = useForm();

    const user = User();

    const contactHandler = async data => {

        dispatch(loader());
        console.log(data);
        setTimeout(() => {
            dispatch(loader());
            dispatch(showNotifier('Message Sent'));
        }, 2000);
    }

    return <Layout mainClass="bg contact">
        <Head>
            <title>Contact Us | Laspark</title>
        </Head>

        <section className="login" id="myLogin">
            <div className="container">
                <div className="row">

                    <div className="col-md-6 mx-auto">
                        <div className="sign-up-form login-form bg-white text-center">
                            <div className="heading">
                                <h3>Get In Touch</h3>
                                <p className="mb-5">Do you have any enquries? Please send us a message.</p>
                            </div>

                            <form className="account-create" onSubmit={handleSubmit(contactHandler)}>
                                <input type="text" name="name" ref={register({required: 'This field is required'})}
                                       defaultValue={user ? user.full_name : ''} placeholder="Full Name*"/>
                                {errors.name && <Error>{errors.name.message}</Error>}

                                <input type="text" name="company_name" id="cname" defaultValue={user ? user.company_name : ''} placeholder="Company name"/>


                                <input type="email" name="email" ref={register({required: 'This field is required'})}
                                       defaultValue={user ? user.email : ''} placeholder="Email address*"/>
                                {errors.email && <Error>{errors.email.message}</Error>}

                                <input type="number" name="phone" ref={register({required: 'This field is required'})}
                                       defaultValue={user ? user.phone : ''} placeholder="Phone number*"/>
                                {errors.phone && <Error>{errors.phone.message}</Error>}

                                <textarea name="message" rows="3" placeholder="Message"/>
                                <button className="btn green thin wide" type="submit">SEND</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </Layout>
}

export default ContactUs;