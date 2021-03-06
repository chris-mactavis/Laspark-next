import Layout from "../../../Components/Layout";
import Head from "next/head";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {loader} from "../../../store/actions/loader";
import {showNotifier} from "../../../store/actions/notifier";
import Error from "../../../Components/Error";
import Router from "next/router";
import axiosInstance from "../../../config/axios";
import Token from "../../../Utils/Token";
import Cookies from "js-cookie";

const TreePlanting = ({localGovernment}) => {

    const [minDate, setMinDate] = useState(null);

    const dispatch = useDispatch();
    const {errors, register, handleSubmit} = useForm();
    let user = useSelector(state => state.auth.user) || {};
    user = typeof user === 'object' ? user : JSON.parse(user);

    useEffect(() => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

        // Setting the minimum date selection
        var dtToday = new Date();
        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();
        if(month < 10)
            month = '0' + month.toString();
        if(day < 10)
            day = '0' + day.toString();
        
        var maxDate = year + '-' + month + '-' + day;
        setMinDate(maxDate);

        if ( $('[type="date"]').prop('type') != 'date' ) {
            $('[type="date"]').datepicker();
        }
    }, []);

    useEffect(() => {
        dispatch(loader());

        if (!Token()) {
            dispatch(loader());
            Cookies.set('redirectIntended', `/services/tree-planting`)
            Router.push('/login');
        } else {
            dispatch(loader());
        }
    }, []);

    const serviceRequestHandler = async data => {

        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'tree_pictures') {
                Array.from(data[key]).forEach((tp, index) => formData.append('pictures[]', data[key][index]));
            } else {
                formData.append(key, data[key])
            }
        });

        formData.append('user_id', user.id);

        dispatch(loader());

        try {
            const {data: response} = await axiosInstance.post(`services/3/book`, formData, {
                headers: {Authorization: `Bearer ${Token()}`}
            })
            console.log(response);
            dispatch(loader());
            dispatch(showNotifier('You will be contacted through call/email within  48hrs.'));
            Router.push('/profile');
        } catch (e) {
            console.log(e);
            dispatch(loader());
            dispatch(showNotifier(e.response.data.message, 'danger'));
        }
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

                            <div className="d-flex inline-form">
                                <label>Date for Planting</label>
                                <input ref={register({required: 'This field is required'})} type="date"
                                       name="date_for_planting" min={minDate}
                                       placeholder="Proposed date for planting*"/>
                            </div>

                            <input ref={register({required: 'This field is required'})} type="number" min="0" name="no_of_trees"
                                   id="cname" placeholder="Number of trees to be planted*"/>
                            {errors.no_of_trees && <Error>{errors.no_of_trees.message}</Error>}

                            <input ref={register} type="text" name="purpose"
                                   placeholder="Purpose for Planting*"/>
                            {errors.purpose && <Error>{errors.purpose.message}</Error>}

                            <textarea ref={register({required: 'This field is required'})} rows="3" name="location"
                                      placeholder="Location*"/>
                            {errors.location && <Error>{errors.location.message}</Error>}

                            <textarea ref={register} rows="3" name="request_letter"
                                      placeholder="Request letter (minimum of 250 words)"/>
                            {errors.request_letter && <Error>{errors.request_letter.message}</Error>}



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

TreePlanting.getInitialProps = async () => {
    const {data} = await axiosInstance.get('local-governments');

    return {
        localGovernment: data
    }
}

export default TreePlanting;
