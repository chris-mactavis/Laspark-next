import React, {useEffect} from "react";
import Layout from "../../Components/Layout";
import Head from "next/head";
import Router from "next/router";
import Link from "next/link";
import {useForm} from "react-hook-form";
import Error from "../../Components/Error";
import {useDispatch} from "react-redux";
import {loader} from "../../store/actions/loader";
import axiosInstance from "../../config/axios";
import {showNotifier} from "../../store/actions/notifier";
import {withoutAuth} from "../../Components/hoc/auth";
import {storeAuth} from "../../store/actions/auth";

const Signup = () => {
    const {register, errors, handleSubmit, watch} = useForm();

    const dispatch = useDispatch();

    const signupHandler = async data => {
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post('register', data);
            dispatch(storeAuth(data))
            dispatch(loader());
            dispatch(showNotifier('Registered successfully!'))
            Router.push('/');
        } catch (e) {
            console.log(e);
            dispatch(loader());
            dispatch(showNotifier(e.response.data.message, 'danger'))
        }
        console.log(data);
    }

    const verifyEmailHandler = async email => {
        try {
            const {data: {email_exists}} = await axiosInstance.post('verify-email', {email});
            return !email_exists || 'Email already exists. Do you want to login instead?';
        } catch (e) {

        }
    }

    const verifyPhoneHandler = async phone => {
        try {
            const {data: {phone_exists}} = await axiosInstance.post('verify-phone', {phone});
            return !phone_exists || 'Phone number already exists';
        } catch (e) {

        }
    }


    return <Layout mainClass="bg signup">

        <Head>
            <title>Signup | Laspark</title>
        </Head>

        <section className="login" id="myLogin">
            <div className="container">
                <div className="row">

                    <div className="col-md-6 mx-auto">
                        <div className="sign-up-form login-form bg-white text-center">
                            <div className="heading">
                                <h3>Sign Up</h3>
                                <p>Already have an account? <Link href="/login"><a>Login</a></Link></p>
                            </div>

                            <form className="account-create" onSubmit={handleSubmit(signupHandler)}>
                                <input type="text" ref={register({required: 'This field is required'})} name="first_name"
                                       id="name" placeholder="First name*"/>
                                {errors.first_name && <Error>{errors.first_name.message}</Error>}

                                <input type="text" ref={register({required: 'This field is required'})} name="last_name"
                                       id="name" placeholder="Last name*"/>
                                {errors.last_name && <Error>{errors.last_name.message}</Error>}

                                <input type="text" ref={register}
                                       name="company_name" id="cname" placeholder="Company name"/>

                                <input type="email" ref={register({
                                    required: 'This field is required',
                                    validate: async value => verifyEmailHandler(value)
                                })} name="email"
                                       id="email" placeholder="Email address*"/>
                                {errors.email && <Error>{errors.email.message}</Error>}

                                <input type="tel" ref={register({
                                    required: 'This field is required',
                                    validate: async value => verifyPhoneHandler(value)
                                })} name="phone"
                                       id="tel" placeholder="Phone number*"/>
                                {errors.phone && <Error>{errors.phone.message}</Error>}

                                <input type="text" ref={register} name="address"
                                       id="address" placeholder="Address"/>

                                <input type="password" ref={register({required: 'This field is required', pattern: {value: /^[A-Za-z]+[A-Za-z]/i, message: "password must have an upper case"}, minLength: { value: 8, message: "password must be more than 8 characters" }})}
                                       name="password" id="pwd"
                                       placeholder="Password*"/>
                                 {/* {errors.password ? '' : <span className="error-span-text text-danger">password must be at least one upper case, one lower case, one digit and minimum of 8 characters</span>} */}
                                {errors.password && <Error>{errors.password.message}</Error>}

                                <input ref={register({
                                    required: 'You must specify a password',
                                    validate: value => value === watch('password') || 'The passwords do not match'
                                })} type="password" name="confirm_password" id="pwd"
                                       placeholder="Confirm password*"/>
                                {errors.confirm_password && <Error>{errors.confirm_password.message}</Error>}

                                <button className="btn green thin wide" type="submit">Create
                                    account
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
}

export default withoutAuth(Signup);