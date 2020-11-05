import React from "react";
import axiosInstance from "../../config/axios";
import Layout from "../../Components/Layout";
import Head from "next/head";
import Link from "next/link";
import Error from "../../Components/Error";
import {useForm} from "react-hook-form";
import {loader} from "../../store/actions/loader";
import {showNotifier} from "../../store/actions/notifier";
import Router from "next/router";
import {useDispatch} from "react-redux";

const ResetPassword = ({tokenIsValid, reason, token}) => {

    const dispatch = useDispatch();

    const {register, errors, handleSubmit, watch} = useForm({
        validateCriteriaMode: "all"
    });

    const resetPasswordHandler = async data => {
        dispatch(loader());

        try {
            const {data: res} = await axiosInstance.post(`change-password`, {password: data.password, token});
            console.log(res);
            dispatch(loader());
            dispatch(showNotifier('Password updated!'));
            Router.push('/login');
        } catch (e) {
            dispatch(showNotifier(e.response.data.message, 'danger'));
            dispatch(loader());
            console.log(e);
        }
    }

    return <Layout mainClass="bg login">
        <Head>
            <title>Reset Password | Laspark</title>
        </Head>

        <section className="login" id="myLogin">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <div className="sign-up-form login-form bg-white text-center">

                            {
                                tokenIsValid && <>
                                    <div className="heading">
                                        <h3>Change Password</h3>
                                    </div>

                                    <form className="account-create mt-4" onSubmit={handleSubmit(resetPasswordHandler)}>

                                        <input ref={register({required: 'This field is required'})} type="password"
                                               name="password" id="pwd" placeholder="Password"/>
                                        {errors.password && <Error>{errors.password.message}</Error>}

                                        <input ref={register({
                                            required: 'This field is required',
                                            validate: value => value === watch('password') || 'The passwords do not match'
                                        })} type="password"
                                               name="confirm_password" id="pwd_confirm" placeholder="Re-enter Password"/>
                                        {errors.confirm_password && <Error>{errors.confirm_password.message}</Error>}

                                        <button className="btn green thin wide" type="submit">Reset</button>

                                        <p className="mt-5">
                                            <Link href="/login"><a>Back to login</a></Link></p>
                                    </form>
                                </>
                            }

                            {
                                !tokenIsValid && <div>
                                    {
                                        reason === 'token expired'
                                            ? <>
                                                <h4>Token Expired</h4>
                                                <p className="mt-4">The link you supplied has expired. Please generate another link to reset
                                                    your password.</p>
                                            </>
                                            : <>
                                                <h4>Wrong Link</h4>
                                                <p className="mt-4">
                                                    You have clicked on an invalid link. Please make sure that you have
                                                    typed the link correctly.<br />
                                                    If are copying this link from a mail reader please ensure that you have
                                                    copied all the lines in the link.
                                                </p>
                                            </>
                                    }
                                    <p className="mt-3">
                                        <Link href="/login"><a>Back to login</a></Link></p>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
}

ResetPassword.getInitialProps = async ({query}) => {
    if (!query.hasOwnProperty('code')) {
        return {
            tokenIsValid: false,
            reason: null
        }
    }

    try {
        const {data: response} = await axiosInstance.post(`validate-reset-token`, query)
        return {
            token: query.code,
            tokenIsValid: response.message === 'reset link valid',
            reason: null
        }

    } catch (e) {
        return {
            tokenIsValid: false,
            reason: e.response.data.message
        }
    }
}

export default ResetPassword;