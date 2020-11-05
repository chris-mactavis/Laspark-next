import Layout from "../../Components/Layout";
import Head from "next/head";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {loader} from "../../store/actions/loader";
import Error from "../../Components/Error";
import {loginAsync} from "../../store/actions/auth";
import {showNotifier} from "../../store/actions/notifier";
import Router from "next/router";
import {withoutAuth} from "../../Components/hoc/auth";
import Cookies from 'js-cookie';
import Link from "next/link";
import axiosInstance from "../../config/axios";

const Login = () => {

    const dispatch = useDispatch();

    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const {register, errors, handleSubmit, reset} = useForm({
        validateCriteriaMode: "all"
    });

    const loginHandler = async data => {
        try {
            await dispatch(loginAsync(data));
            dispatch(showNotifier('Logged In'));
            Cookies.get('redirectIntended') ? Router.push(Cookies.get('redirectIntended')) : window.location = 'http://138.197.187.14';
            Cookies.remove('redirectIntended');
        } catch (e) {
            console.log(e);
        }
    }

    const forgotPasswordHandler = async data => {
        dispatch(loader());
        try {
            const {data: res} = await axiosInstance.post('send-reset-link', data);
            dispatch(loader());
            dispatch(showNotifier(res.message));
            reset();
        } catch (e) {
            console.log(e);
        }
    }

    return <Layout mainClass="bg login">
        <Head>
            <title>{showForgotPassword ? 'Forgot Password' : 'Login'} | Laspark</title>
        </Head>

        <section className="login" id="myLogin">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <div className="sign-up-form login-form bg-white text-center">
                            <div className="heading">
                                <h3>{showForgotPassword ? 'Forgot Password' : 'Login'}</h3>
                                {!showForgotPassword && <p>No account? <Link href="/signup"><a>Sign Up</a></Link></p>}
                            </div>

                            {
                                !showForgotPassword && <form className="account-create" onSubmit={handleSubmit(loginHandler)}>
                                    <input ref={register({required: 'This field is required'})} type="email"
                                           name="email"
                                           id="email" placeholder="Email"/>
                                    {errors.email && <Error>{errors.email.message}</Error>}

                                    <input ref={register({required: 'This field is required'})} type="password"
                                           name="password" id="pwd" placeholder="Password"/>
                                    {errors.password && <Error>{errors.password.message}</Error>}

                                    <button className="btn green thin wide" type="submit">Login</button>

                                    <p className="mt-5">Forgot password? <a href="#"
                                                                            onClick={() => setShowForgotPassword(true)}>Click
                                        here</a></p>
                                </form>
                            }

                            {
                                showForgotPassword && <form className="account-create mt-5" onSubmit={handleSubmit(forgotPasswordHandler)}>
                                    <input ref={register({required: 'This field is required'})} type="email"
                                           name="email"
                                           id="email" placeholder="Email"/>
                                    {errors.email && <Error>{errors.email.message}</Error>}

                                    <button className="btn green thin wide" type="submit">Recover Password</button>

                                    <p className="mt-5"><a href="#" onClick={() => setShowForgotPassword(false)}>Back to login</a></p>
                                </form>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
}

export default withoutAuth(Login);