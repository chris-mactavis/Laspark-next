import Layout from "../../../Components/Layout";
import Head from "next/head";
import React from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {loader} from "../../../store/actions/loader";
import {showNotifier} from "../../../store/actions/notifier";
import Error from "../../../Components/Error";
import Router from "next/router";

const TreePlanting = () => {
    const dispatch = useDispatch();
    const {errors, register, handleSubmit} = useForm();
    const serviceRequestHandler = async data => {
        dispatch(loader());
        setTimeout(() => {
            dispatch(loader());
            dispatch(showNotifier('Request Sent'));
        }, 1500);
    }
    return <Layout hasHeader={false}>
        <Head>
            <title>Tree planting | Laspark</title>
        </Head>

        <section className="single-service">
            <div className="container-fluid">
                <div className="row bg-row">
                    <div className="col-md-6 p-0">
                        <div className="bg planting"/>
                    </div>

                    <div className="col-md-6 d-flex align-items-center">
                        <form className="account-create w-100" onSubmit={handleSubmit(serviceRequestHandler)}>
                            <h1>Tree Planting</h1>
                            <input ref={register({required: 'This field is required'})} type="text" name="location"
                                   id="name" placeholder="Location of planting*"/>
                            {errors.location && <Error>{errors.location.message}</Error>}

                            <input ref={register({required: 'This field is required'})} type="text" name="no_of_trees"
                                   id="cname" placeholder="Number of trees to be planted (TPM)*"/>
                            {errors.no_of_trees && <Error>{errors.no_of_trees.message}</Error>}

                            <input ref={register({required: 'This field is required'})} type="text" name="purpose"
                                   id="text" placeholder="Purpose for Planting*"/>
                            {errors.purpose && <Error>{errors.purpose.message}</Error>}

                            <div className="text-left">
                                <label className="w-100">Request Letter*</label>
                                <input ref={register({required: 'This field is required'})} id="req-letter" type="file"
                                       name="request_letter" placeholder="Request letter*"/>
                                {errors.purpose && <Error>{errors.request_letter.message}</Error>}
                            </div>

                            <button className="btn green thin wide" type="submit">Submit Request</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="container py-5">
                <div className="row">
                    <div className="col">
                        <h2 className="text-center mb-5">Other Services</h2>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <a className="service" onClick={() => Router.push('/services/tree-pruning')}>
                            <img className="img-fluid" src="/images/services/tree-pruning.jpg"/>

                            <div className="content">
                                <h5>Tree Pruning</h5>

                                <div className="request">
                                    Request <img className="arrow-right" src="/images/icon/arrow-right-green.svg"/>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="col-md-4">
                        <a className="service" onClick={() => Router.push('/services/tree-felling')}>
                            <img className="img-fluid" src="/images/services/tree-felling.jpg"/>

                            <div className="content">
                                <h5>Tree Felling</h5>

                                <div className="request">
                                    Request <img className="arrow-right" src="/images/icon/arrow-right-green.svg"/>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="col-md-4">
                        <a className="service" onClick={() => Router.push('/services/adoption-of-open-space')}>
                            <img className="img-fluid" src="/images/services/open-space.jpg"/>

                            <div className="content">
                                <h5>Adoption of Open Space</h5>

                                <div className="request">
                                    Request <img className="arrow-right" src="/images/icon/arrow-right-green.svg"/>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
}

export default TreePlanting;