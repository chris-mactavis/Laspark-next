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

const TreeFelling = ({localGovernment}) => {
    const dispatch = useDispatch();
    const {errors, register, handleSubmit} = useForm();

    let user = useSelector(state => state.auth.user) || {};
    user = typeof user === 'object' ? user : JSON.parse(user);

    const [selectedAgeRange, setSelectedAgeRange] = useState('young');
    const [quantity, setQuantity] = useState(null);

    useEffect(() => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }, []);

    useEffect(() => {
        dispatch(loader());

        if (!Token()) {
            dispatch(loader());
            Cookies.set('redirectIntended', `/services/tree-felling`)
            Router.push('/login');
        } else {
            dispatch(loader());
        }
    }, []);

    const adminCharge = () => {
        switch (true) {
            case +quantity === 1:
                return 35000;
            case quantity >= 2 && quantity <= 10:
                return 50000;
            case quantity >= 11 && quantity <= 20:
                return 100000;
            case quantity >= 21 && quantity <= 50:
                return 150000;
            case quantity >= 51 && quantity <= 100:
                return 250000;
            case quantity >= 101:
                return 500000;
            default:
                return 500000;
        }
    }

    const maturityPrice = () => selectedAgeRange === 'young' ? 3000 : 5000;

    const greenRestoration = () => quantity * 5 * maturityPrice();

    const totalAmount = () => {
        return quantity ? adminCharge() + greenRestoration() : '0';
    }

    const serviceRequestHandler = async data => {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'attach_letter') {
                formData.append('attach_letter', data[key][0]);
            } else if (key === 'tree_pictures') {
                Array.from(data[key]).forEach((tp, index) => formData.append('pictures[]', data[key][index]));
            } else {
                formData.append(key, data[key])
            }
        });

        formData.append('user_id', user.id);
        formData.append('green_restoration', greenRestoration());
        formData.append('admin_charge', adminCharge());
        formData.append('amount', totalAmount());

        dispatch(loader());

        try {
            const {data: response} = await axiosInstance.post(`services/1/book`, formData, {
                headers: {Authorization: `Bearer ${Token()}`}
            })
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
                                <option value="">Select Local Government for Felling Exercise*</option>
                                {
                                    localGovernment.map(lg => <option value={lg.id} key={lg.id}>{lg.name}</option>)
                                }
                            </select>
                            {errors.local_government_id && <Error>{errors.local_government_id.message}</Error>}

                            <input ref={register({required: 'This field is required'})} type="text" name="street_name"
                                   placeholder="Street name for felling exercise*"/>
                            {errors.street_name && <Error>{errors.street_name.message}</Error>}

                            <input ref={register({required: 'This field is required'})} type="text" name="house_number"
                                   placeholder="House Number*"/>
                            {errors.house_number && <Error>{errors.house_number.message}</Error>}

                            <input ref={register({required: 'This field is required'})} min="0" type="number"
                                   name="no_of_trees" onKeyUp={(e) => setQuantity(e.target.value)}
                                   id="cname" placeholder="Number of trees to be felled*"/>
                            {errors.no_of_trees && <Error>{errors.no_of_trees.message}</Error>}

                            <select ref={register({required: 'This field is required'})} defaultValue={"young"}
                                    name="age_range" onChange={(e) => setSelectedAgeRange(e.target.value)}>
                                <option value="">Select Age Range</option>
                                <option value="young">Young</option>
                                <option value="matured">Matured</option>
                            </select>
                            {errors.age_range && <Error>{errors.age_range.message}</Error>}

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

                            <div className="text-left">
                                <label className="text-left">Request Letter</label>
                                <input ref={register()} type="file"
                                       name="attach_letter"
                                       placeholder="Request letter"/>
                                {errors.attach_letter && <Error>{errors.attach_letter.message}</Error>}
                            </div>

                            <div className="text-left">
                                <label className="text-left">Tree Pictures*</label>
                                <input id="picture_upload-input" ref={register({required: 'This field is required'})} type="file" multiple
                                       name="tree_pictures" placeholder="Tree Pictures*"/>
                                {errors.tree_pictures && <Error>{errors.tree_pictures.message}</Error>}
                            </div>

                            <div className="text-left">
                                <label
                                    className="text-left d-flex justify-content-between"><span>Total Amount: </span><span
                                    className="total">₦{totalAmount().toLocaleString()}</span></label>
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
