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

const Adoption = () => {
    const dispatch = useDispatch();
    const {errors, register, handleSubmit} = useForm();
    const serviceRequestHandler = async data => {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'request_letter') {
                formData.append('request_letter', data[key][0]);
            } else if (key === 'tree_pictures') {
                Array.from(data[key]).forEach((tp, index) => formData.append('pictures[]', data[key][index]));
            } else {
                formData.append(key, data[key])
            }
        });

        dispatch(loader());

        try {
            const {data: response} = await axiosInstance.post(`services/4/book`, formData, {
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
            <title>Adoption of Open Space | Laspark</title>
        </Head>

        <section className="single-service">
            <div className="container-fluid">
                <div className="row bg-row">
                    <div className="col-md-6 p-0">
                        <div className="bg adoption"/>
                    </div>

                    <div className="col-md-6 d-flex align-items-center">
                        <form className="account-create w-100" onSubmit={handleSubmit(serviceRequestHandler)}>
                            <h1>Adoption of Open Space</h1>
                            <input ref={register({required: 'This field is required'})} type="text" name="location"
                                   id="name" placeholder="Location of space*"/>
                            {errors.location && <Error>{errors.location.message}</Error>}

                            <div className="radio text-left">
                                <label className="radio">Purpose of Adoption</label>
                                <div className="d-flex flex-column">
                                    <label><input defaultChecked value="Corporate Branding" type="radio" ref={register({required: 'This field is required'})} name="purpose"/>Corporate Branding</label>
                                    <label><input value="Static Billboard" type="radio" ref={register({required: 'This field is required'})} name="purpose"/>Static Billboard</label>
                                    <label><input value="Digital Billboard" type="radio" ref={register({required: 'This field is required'})} name="purpose"/>Digital Billboard</label>
                                    <label><input value="Recreational Park" type="radio" ref={register({required: 'This field is required'})} name="purpose"/>Recreational Park</label>
                                    <label><input value="Scenic Park" type="radio" ref={register({required: 'This field is required'})} name="purpose"/>Scenic Park</label>
                                    <label><input value="Green House" type="radio" ref={register({required: 'This field is required'})} name="purpose"/>Green House</label>
                                    <label><input value="Public Art" type="radio" ref={register({required: 'This field is required'})} name="purpose"/>Public Art</label>
                                    <label><input value="Other" type="radio" ref={register({required: 'This field is required'})} name="purpose"/>Other</label>
                                </div>
                            </div>

                            <div className="text-left">
                                <label className="text-left w-100">Tree Pictures*</label>
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
                </div>
            </div>
        </section>
    </Layout>
}

export default Adoption;