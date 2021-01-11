import Layout from "../../../Components/Layout";
import Head from "next/head";
import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {loader} from "../../../store/actions/loader";
import {showNotifier} from "../../../store/actions/notifier";
import Error from "../../../Components/Error";
import Router from "next/router";
import axiosInstance from "../../../config/axios";
import Token from "../../../Utils/Token";
import Cookies from "js-cookie";

const TreePruning = ({localGovernment}) => {
    const dispatch = useDispatch();
    const {errors, register, handleSubmit} = useForm();


    useEffect(() => {
        dispatch(loader());

        if (!Token()) {
            dispatch(loader());
            Cookies.set('redirectIntended', `/services/tree-pruning`)
            Router.push('/login');
        } else {
            dispatch(loader());
        }
    }, []);

    const serviceRequestHandler = async data => {

        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'request_letter') {
                formData.append('request_letter_file', data[key][0]);
            } else if (key === 'tree_pictures') {
                Array.from(data[key]).forEach((tp, index) => formData.append('pictures[]', data[key][index]));
            } else {
                formData.append(key, data[key])
            }
        });

        dispatch(loader());

        try {
            const {data: response} = await axiosInstance.post(`services/2/book`, formData, {
                headers: {Authorization: `Bearer ${Token()}`}
            })
            dispatch(loader());
            dispatch(showNotifier('Request sent!'));
            Router.push('/profile');
        } catch (e) {
            console.log(e);
            dispatch(loader());
            dispatch(showNotifier(e.response.data.message, 'danger'));
        }
    }

    return <Layout hasHeader={false}>
        <Head>
            <title>Tree pruning | Laspark</title>
        </Head>

        <section className="single-service">
            <div className="container-fluid">
                <div className="row bg-row">
                    <div className="col-md-6 p-0">
                        <div className="bg pruning"/>
                    </div>

                    <div className="col-md-6 d-flex align-items-center">
                        <form className="account-create w-100" onSubmit={handleSubmit(serviceRequestHandler)}>
                            <h1>Tree Pruning</h1>

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

                            <input ref={register({required: 'This field is required'})} type="number" min="0" name="no_of_trees"
                                   id="cname" placeholder="Number of trees to be pruned*"/>
                            {errors.no_of_trees && <Error>{errors.no_of_trees.message}</Error>}

                            <input ref={register({required: 'This field is required'})} type="text" name="purpose"
                                   id="text" placeholder="Purpose for Pruning*"/>
                            {errors.purpose && <Error>{errors.purpose.message}</Error>}

                            <div className="text-left">
                                <label className="text-left">Request Letter*</label>
                                <input ref={register({required: 'This field is required'})} type="file"
                                       name="request_letter"
                                       placeholder="Request letter"/>
                                {errors.request_letter && <Error>{errors.request_letter.message}</Error>}
                            </div>

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


TreePruning.getInitialProps = async () => {
    const {data} = await axiosInstance.get('local-governments');

    return {
        localGovernment: data
    }
}

export default TreePruning;