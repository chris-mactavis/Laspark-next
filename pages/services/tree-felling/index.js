import Layout from "../../../Components/Layout";
import Head from "next/head";
import React from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {loader} from "../../../store/actions/loader";
import {showNotifier} from "../../../store/actions/notifier";
import Error from "../../../Components/Error";
import Router from "next/router";
import axiosInstance from "../../../config/axios";
import Token from "../../../Utils/Token";

const TreeFelling = ({localGovernment}) => {
    const dispatch = useDispatch();
    const {errors, register, handleSubmit} = useForm();

    const serviceRequestHandler = async data => {

        const formData = new FormData();
        Object.keys(data).forEach(key => {
            // if (key === 'request_letter') {
            //     formData.append('request_letter', data[key][0]);
            // } else
            if (key === 'tree_pictures') {
                Array.from(data[key]).forEach((tp, index) => formData.append('pictures[]', data[key][index]));
            } else {
                formData.append(key, data[key])
            }
        });

        dispatch(loader());

        try {
            const {data: response} = await axiosInstance.post(`services/1/book`, formData, {
                headers: {Authorization: `Bearer ${Token()}`}
            })
            console.log(response);
            dispatch(loader());
            dispatch(showNotifier('Request sent!'));
            Router.push('/services');
        } catch (e) {
            console.log(e);
            dispatch(loader());
            dispatch(showNotifier(e.response.data.message, 'danger'));
        }
    }

    return <Layout hasHeader={false}>
        <Head>
            <title>Tree felling | Laspark</title>
        </Head>

        <section className="single-service">
            <div className="container-fluid">
                <div className="row bg-row">
                    <div className="col-md-6 p-0">
                        <div className="bg"/>
                    </div>

                    <div className="col-md-6 d-flex align-items-center">
                        <form className="account-create w-100" onSubmit={handleSubmit(serviceRequestHandler)}>
                            <h1>Tree Felling</h1>

                            <select ref={register({required: 'This field is required'})} name="local_government_id">
                                <option value="">Select Local Government</option>
                                {
                                    localGovernment.map(lg => <option value={lg.id} key={lg.id}>{lg.name}</option>)
                                }
                            </select>
                            {errors.local_government_id && <Error>{errors.local_government_id.message}</Error>}

                            <input ref={register({required: 'This field is required'})} type="text" name="street_name"
                                   placeholder="Street name*"/>
                            {errors.street_name && <Error>{errors.street_name.message}</Error>}

                            <input ref={register({required: 'This field is required'})} type="text" name="house_number"
                                   placeholder="House Number*"/>
                            {errors.house_number && <Error>{errors.house_number.message}</Error>}

                            <input ref={register({required: 'This field is required'})} type="number" name="no_of_trees"
                                   id="cname" placeholder="Number of trees to be felled*"/>
                            {errors.no_of_trees && <Error>{errors.no_of_trees.message}</Error>}

                            <select ref={register({required: 'This field is required'})} name="purpose">
                                <option value="">Purpose for Felling*</option>
                                <option value="weak">Weak</option>
                                <option value="old">Old</option>
                                <option value="disturbance">Disturbance</option>
                                <option value="obstruction">Obstruction</option>
                                <option value="threat to the environment">Threat to the environment</option>
                                <option value="obstruct pathway">Obstruct pathway</option>
                                <option value="others">Others</option>
                            </select>
                            {errors.purpose && <Error>{errors.purpose.message}</Error>}

                            <textarea ref={register} rows="3" name="request_letter"
                                   placeholder="Request letter"/>
                            {errors.request_letter && <Error>{errors.request_letter.message}</Error>}


                            <div className="text-left">
                                <label className="text-left">Tree Pictures*</label>
                                <input ref={register({required: 'This field is required'})} type="file" multiple
                                       name="tree_pictures" placeholder="Tree Pictures*"/>
                                {errors.purpose && <Error>{errors.tree_pictures.message}</Error>}
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
                        <a className="service" onClick={() => Router.push('/services/tree-planting')}>
                            <img className="img-fluid" src="/images/services/tree-planting.jpg"/>

                            <div className="content">
                                <h5>Tree Planting</h5>

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

TreeFelling.getInitialProps = async () => {
    const {data} = await axiosInstance.get('local-governments');

    return {
        localGovernment: data
    }
}

export default TreeFelling;