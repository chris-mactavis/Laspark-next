import {useRouter} from "next/router";
import React, {useEffect} from "react";
import axiosInstance from "../../config/axios";
// import axios from 'axios';
import {loader} from "../../store/actions/loader";
import {useDispatch} from "react-redux";
import Layout from "../../Components/Layout";
import Token from "../../Utils/Token";
import {showNotifier} from "../../store/actions/notifier";
import Router from "next/router";


const VerifyPayment = () => {

    // const dispatch = useDispatch();
    useEffect(() => {
        Router.push('/profile');
        // async function verifyPayment() {
        //     dispatch(loader());
        //
        //     const md5 = require('blueimp-md5');
        //     const stringHash = md5(`88C57643A15222E7B1E00961BB88C099LASPARK${reference}`).toString().toUpperCase();
        //     const bookedPark = JSON.parse(localStorage.getItem('bookedPark'));
        //     try {
        //         const link = `https://52.168.24.59:7071/PaymentGateway/Verify/${reference}/LASPARK/${stringHash}`;
        //         const {data} = await axiosInstance.post(`payment/verify-payment`, {...bookedPark, link}, {
        //             headers: {
        //                 Authorization: `Bearer ${Token()}`
        //             }
        //         });
        //         dispatch(loader());
        //         dispatch(showNotifier(data.message));
        //         Router.push('/profile');
        //     } catch (e) {
        //         console.log(e);
        //     }
        // }

        // verifyPayment();
    }, []);

    return <Layout hasHeader={false}>
        <section className="empty">
            &nbsp;
        </section>
    </Layout>
};

// VerifyPayment.getInitialProps = ({query: {trxref: reference}}) => {
//
//     return {reference}
// }


export default VerifyPayment;