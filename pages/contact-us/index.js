import Head from "next/head";
import Layout from "../../Components/Layout";
import React from "react";
import {useForm} from "react-hook-form";
import Error from "../../Components/Error";

const ContactUs = () => {

    const {register, handleSubmit, errors} = useForm();

    const contactHandler = async data => {
        console.log(data);
    }

    return <Layout headerContent={<h1 className="m-0">Contact Us</h1>} headerClass="contact-us-banner explore-banner">
        <Head>
            <title>Contact Us | Laspark</title>
        </Head>

        <section className="services explore-parks">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center">Send us a Message</h2>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <img src="/images/map-location.png" alt="" className="img-fluid"/>
                    </div>

                    <div className="col-md-6">
                        <form className="contact-form" onSubmit={handleSubmit(contactHandler)}>
                            <label>Your Name (required)</label>
                            <input type="text" name="name" ref={register({required: 'This field is required'})}/>
                            {errors.name && <Error>{errors.name.message}</Error>}

                            <label>Your Email (required)</label>
                            <input type="email" name="email" ref={register({required: 'This field is required'})}/>
                            {errors.email && <Error>{errors.email.message}</Error>}

                            <label>Your Phone Number (required)</label>
                            <input type="number" name="phone" ref={register({required: 'This field is required'})}/>
                            {errors.phone && <Error>{errors.phone.message}</Error>}

                            <label>Subject</label>
                            <input type="text" name="subject" ref={register}/>

                            <textarea name="message" id="message" cols="30" rows="10"/>

                            <button type="submit" className="btn btn-full-width mt-5">Send Message
                            </button>
                        </form>

                    </div>

                </div>
            </div>


        </section>
    </Layout>
}

export default ContactUs;