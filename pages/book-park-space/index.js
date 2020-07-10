import Layout from "../../Components/Layout";
import Head from "next/head";
import React from "react";
import Error from "../../Components/Error";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {showNotifier} from "../../store/actions/notifier";
import Router from "next/router";
import Token from "../../Utils/Token";
import {auth} from "../../Components/hoc/auth";
import {User} from "../../Utils/User";

const Services = ({isLoggedIn}) => {

    const {register, errors, handleSubmit} = useForm();

    const dispatch = useDispatch();

    const bookHandler = async data => {
        const handler = PaystackPop.setup({
            key: 'pk_test_128d82585adfc879f77acfeaf7b3d0412a03aeb4',
            email: User().email,
            amount: 100000,
            currency: 'NGN',
            firstname: 'Olaide',
            reference: 'The reference',
            callback: function(response) {
                // const reference = response.reference;
                // alert('Payment complete! Reference: ' + reference);
                dispatch(showNotifier('Space Booked'));
                Router.push('/');
            },
            onClose: function() {
                // alert('Transaction was not completed, window closed.');
            },
        });
        handler.openIframe();
    }

    return <Layout hasHeader={false}>
        <Head>
            <title>Book Park Space | Laspark</title>
            <script src="https://js.paystack.co/v1/inline.js"/>
        </Head>

        <section className="our-services">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2 className="text-center mb-5">Book Park Space</h2>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-8 offset-md-2 text-center mb-5">
                        <img src="/images/parks/badagry.jpg" alt=""/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <form className="contact-form" onSubmit={handleSubmit(bookHandler)}>
                            <input type="text" name="park_name" placeholder="Park Name*" />
                            <input type="text" name="space" placeholder="Park Space*" />
                            <input type="text" name="capacity" placeholder="Park Capacity*" />
                            <input type="number" name="price" placeholder="Price" />
                            <input type="date" name="date" placeholder="Date" />

                            <button type="submit" className="btn btn-full-width mt-5">Book
                            </button>
                        </form>

                    </div>

                </div>
            </div>

        </section>
    </Layout>
}

export default auth(Services);