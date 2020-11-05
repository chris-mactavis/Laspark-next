import Layout from "../../Components/Layout";
import Head from "next/head";
import React from "react";
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

const Login = () => {

    const dispatch = useDispatch();

    const {register, errors, handleSubmit} = useForm({
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

    return <Layout mainClass="bg login">
        <Head>
            <title>Login | Laspark</title>
        </Head>

        <section className="login" id="myLogin">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <div className="sign-up-form login-form bg-white text-center">
                            <div className="heading">
                                <h3>Login</h3>
                                <p>No account? <Link href="/signup"><a>Sign Up</a></Link></p>
                            </div>

                            <form className="account-create" onSubmit={handleSubmit(loginHandler)}>
                                <input ref={register({required: 'This field is required'})} type="email" name="email" id="email" placeholder="Email"/>
                                {errors.email && <Error>{errors.email.message}</Error>}

                                <input ref={register({required: 'This field is required'})} type="password" name="password" id="pwd" placeholder="Password"/>
                                {errors.password && <Error>{errors.password.message}</Error>}

                                <button className="btn green thin wide" type="submit">Login</button>

                                <p className="mt-5">Forgot password? <a href="#">Click here</a></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
}

export default withoutAuth(Login);