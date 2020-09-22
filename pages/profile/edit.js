import Layout from "../../Components/Layout";
import Head from "next/head";
import Link from "next/link";
import Error from "../../Components/Error";
import React from "react";
import {useForm} from "react-hook-form";
import {auth} from "../../Components/hoc/auth";
import {User} from "../../Utils/User";
import axiosInstance from "../../config/axios";
import Token from "../../Utils/Token";
import {useDispatch} from "react-redux";
import {showNotifier} from "../../store/actions/notifier";
import {loader} from "../../store/actions/loader";
import {storeUser} from "../../store/actions/auth";

const ProfileEdit = ({user}) => {
    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();

    const verifyEmailHandler = async email => {
        try {
            const {data: {email_error}} = await axiosInstance.post('verify-email-update', {email}, {
                headers: {Authorization: `Bearer ${Token()}`}
            });
            return !email_error || 'Email already exists.';
        } catch (e) {

        }
    }

    const updateHandler = async data => {
        dispatch(loader());
        try {
            await axiosInstance.post('user', data, {
                headers: {Authorization: `Bearer ${Token()}`}
            });
            dispatch(loader());
            dispatch(showNotifier('Profile updated'));
            dispatch(storeUser({...data, id: user.id}))
        } catch (e) {
            console.log(e);
            dispatch(loader());
            dispatch(showNotifier(e.response.data.message, 'danger'));
        }
    }

    return <Layout mainClass="bg signup">

        <Head>
            <title>Profile Edit | Laspark</title>
        </Head>

        <section className="login">
            <div className="container">
                <div className="row">

                    <div className="col-md-6 mx-auto">
                        <div className="sign-up-form login-form bg-white text-center">
                            <div className="heading">
                                <h3>Edit Profile</h3>
                            </div>

                            <form className="account-create" onSubmit={handleSubmit(updateHandler)}>
                                <input type="text" ref={register({required: 'This field is required'})} name="first_name"
                                       id="name" placeholder="First name*" defaultValue={user.first_name}/>
                                {errors.first_name && <Error>{errors.first_name.message}</Error>}

                                <input type="text" ref={register({required: 'This field is required'})} name="last_name"
                                       id="name" placeholder="Last name*" defaultValue={user.last_name}/>
                                {errors.last_name && <Error>{errors.last_name.message}</Error>}

                                <input type="text" ref={register}
                                       name="company_name" id="cname" placeholder="Company name" defaultValue={user.company_name}/>

                                <input type="email" ref={register({
                                    required: 'This field is required',
                                    validate: async value => verifyEmailHandler(value)
                                })} name="email"
                                       id="email" placeholder="Email address*" defaultValue={user.email}/>
                                {errors.email && <Error>{errors.email.message}</Error>}

                                <input type="tel" ref={register({required: 'This field is required'})} name="phone"
                                       id="tel" placeholder="Phone number*" defaultValue={user.phone}/>
                                {errors.phone && <Error>{errors.phone.message}</Error>}

                                <input type="text" ref={register({required: 'This field is required'})} name="address"
                                       id="address" placeholder="Address" defaultValue={user.address}/>

                                <button className="btn green thin wide" type="submit">Update Profile
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
}

ProfileEdit.getInitialProps = (context) => {
    return {
        user: User(context)
    }
}

export default auth(ProfileEdit);