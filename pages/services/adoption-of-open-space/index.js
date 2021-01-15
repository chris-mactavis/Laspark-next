import Layout from "../../../Components/Layout";
import Head from "next/head";
import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {loader} from "../../../store/actions/loader";
import {showNotifier} from "../../../store/actions/notifier";
import Error from "../../../Components/Error";
import Router from "next/router";
import axiosInstance from "../../../config/axios";
import Token from "../../../Utils/Token";
import Cookies from "js-cookie";

const Adoption = ({localGovernment}) => {
    const dispatch = useDispatch();
    const {errors, register, handleSubmit} = useForm();

    let user = useSelector(state => state.auth.user) || {};
    user = typeof user === 'object' ? user : JSON.parse(user);

    useEffect(() => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }, []);

    useEffect(() => {
        dispatch(loader());

        if (!Token()) {
            dispatch(loader());
            Cookies.set('redirectIntended', `/services/adoption-of-open-space`)
            Router.push('/login');
        } else {
            dispatch(loader());
        }
    }, []);

    const serviceRequestHandler = async data => {
        console.log(data);
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'proposed_design') {
                formData.append('proposed_design', data[key][0]);
            } else if (key === 'tree_pictures') {
                Array.from(data[key]).forEach((tp, index) => formData.append('pictures[]', data[key][index]));
            }  else if (key === 'attach_letter') {
                formData.append('attach_letter', data[key][0]);
            }else {
                formData.append(key, data[key])
            }
        });

        formData.append('user_id', user.id);

        dispatch(loader());

        try {
            const {data: response} = await axiosInstance.post(`services/4/book`, formData, {
                headers: {Authorization: `Bearer ${Token()}`}
            })
            console.log(response);
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
                                    <label><input value="Garden" type="radio" ref={register({required: 'This field is required'})} name="purpose"/>Garden</label>
                                    <label><input value="Installation of Movement" type="radio" ref={register({required: 'This field is required'})} name="purpose"/>Installation of Movement</label>
                                    {/* <label><input value="Engage with Strategic" type="radio" ref={register({required: 'This field is required'})} name="purpose"/>Engage with Strategic</label> */}
                                    <label><input value="Other" type="radio" ref={register({required: 'This field is required'})} name="purpose"/>Other</label>
                                </div>
                            </div>

                            {/* <input ref={register({required: 'This field is required'})} type="text" name="size"
                                   placeholder="Size*"/>
                            {errors.size && <Error>{errors.size.message}</Error>} */}

                            <div className="text-left">
                                <label className="text-left w-100">Current Picture*</label>
                                <input ref={register({required: 'This field is required'})} type="file"
                                       name="tree_pictures" placeholder="Current Picture*"/>
                                {errors.current_tree_picture && <Error>{errors.current_tree_picture.message}</Error>}
                            </div>

                            <div className="text-left">
                                <label className="text-left w-100">Proposed Design*</label>
                                <input ref={register({required: 'This field is required'})} type="file"
                                       name="proposed_design" placeholder="Proposed Design*"/>
                                {errors.proposed_design && <Error>{errors.proposed_design.message}</Error>}
                            </div>

                            <div className="text-left">
                                <label className="text-left w-100">Attach Letter*</label>
                                <input ref={register({required: 'This field is required'})} type="file" accept=".pdf,.docx,.doc"
                                       name="attach_letter" placeholder="Attach Letter*"/>
                                {errors.attach_letter && <Error>{errors.attach_letter.message}</Error>}
                            </div>


                            <select ref={register({required: 'This field is required'})} name="institution_type">
                                <option value="">Customer</option>
                                <option value="individual">Individual</option>
                                <option value="organization">Organization</option>
                            </select>
                            {errors.local_government_id && <Error>{errors.local_government_id.message}</Error>}

                            {/*<div className="text-left">*/}
                            {/*    <label className="text-left w-100">Tree Pictures*</label>*/}
                            {/*    <input ref={register({required: 'This field is required'})} type="file" multiple*/}
                            {/*           name="tree_pictures" placeholder="Tree Pictures*"/>*/}
                            {/*    {errors.purpose && <Error>{errors.tree_pictures.message}</Error>}*/}
                            {/*</div>*/}

                            <select ref={register({required: 'This field is required'})} name="local_government_id">
                                <option value="">Select Local Govt</option>
                                {
                                    localGovernment.map(lg => <option value={lg.id} key={lg.id}>{lg.name}</option>)
                                }
                            </select>
                            {errors.local_government_id && <Error>{errors.local_government_id.message}</Error>}

                            {/* <input ref={register({required: 'This field is required'})} type="text" name="street_name"
                                   placeholder="Street name*"/>
                            {errors.street_name && <Error>{errors.street_name.message}</Error>} */}

                            {/* <input ref={register({required: 'This field is required'})} type="text" name="house_number"
                                   placeholder="House Number*"/>
                            {errors.house_number && <Error>{errors.house_number.message}</Error>} */}

                            <button className="btn green thin wide" type="submit">Submit Request</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="container py-5 other-services">
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

Adoption.getInitialProps = async () => {
    const {data} = await axiosInstance.get('local-governments');

    return {
        localGovernment: data
    }
}

export default Adoption;