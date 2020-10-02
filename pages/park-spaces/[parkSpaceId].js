import axiosInstance from "../../config/axios";
import Head from "next/head";
import Layout from "../../Components/Layout";
import React, {useState, useEffect} from "react";
import Link from "next/link";
import Error from "../../Components/Error";
import {useForm} from "react-hook-form";
import {loader} from "../../store/actions/loader";
import Token from "../../Utils/Token";
import {showNotifier} from "../../store/actions/notifier";
import {useDispatch} from "react-redux";
import {randomString} from "../../Utils/String";
import {toggleParkRules} from "../../store/actions/booking";
import {auth} from "../../Components/hoc/auth";

import Cookies from "js-cookie";
import Router from "next/router";

const SingleParkSpace = ({parkSpace, parkSpaceRef}) => {
    // console.log(parkSpace, parkSpaceRef);
    const [transactionId, setTransactionId] = useState(randomString(20));
    const [billNumber, setBillNumber] = useState(null);
    const [stringHash, setStringHash] = useState(null);

    const {register, errors, handleSubmit} = useForm();
    const dispatch = useDispatch();

    useEffect(() => {
    dispatch(loader());

        if (!Token()) {
            dispatch(loader());
            Cookies.set('redirectIntended', `/park-spaces/${parkSpaceRef}`)
            Router.push('/login');
        } else {
            dispatch(loader());
        }
    }, []);

    const bookingHandler = async data => {

        dispatch(loader());
        try {
            const {data: {bill_number}} = await axiosInstance.post(`payment/get-bill-reference`, {amount: parkSpace.price}, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            setBillNumber(bill_number);
            const hashString = `${process.env.REVPAY_TOKEN}LASPARK${bill_number}${transactionId}${parkSpace.price}` + "http://165.227.73.31/verify-payment";
            setStringHash(
                CryptoJS.MD5(hashString).toString().toUpperCase()
            )

            localStorage.setItem('bookedPark', JSON.stringify({date: data.date, spaceId: parkSpace.id}));

            document.getElementById('frm').submit();
        } catch (e) {
            console.log(e);
            dispatch(showNotifier(e.response.data.message, 'danger'));
            dispatch(loader());
        }
    };
    return <Layout hasHeader={false}>
        <Head>
            <title>{parkSpace.park.name} | Laspark</title>
        </Head>

        <section className="profile">
            <div className="container">
                <form name="frm" id="frm" method="post" target="_parent"
                      action="https://52.168.24.59:7071/PaymentGateway/Index">
                    <input type="hidden" name="type" value="Webguid"/>
                    <input type="hidden" name="transactionId" value={transactionId}/>
                    <input type="hidden" name="billReference" value={billNumber}/>
                    <input type="hidden" name="amount" value={parkSpace.price}/>
                    <input type="hidden" name="returnUrl" value="http://165.227.73.31/verify-payment"/>
                    <input type="hidden" name="clientCode" value="LASPARK"/>
                    <input type="hidden" name="Hash" value={stringHash}/>
                </form>
                <form onSubmit={handleSubmit(bookingHandler)}>
                    <div className="row">
                        <div className="col">
                            <h2 className="text-center mb-5">{parkSpace.park.name}</h2>
                        </div>
                    </div>

                    <div className="row booking-history">
                        <div className="col">
                            <table role="table">
                                <thead role="rowgroup">
                                <tr role="row">
                                    <th role="columnheader" colSpan={2}>{parkSpace.space}</th>
                                </tr>
                                </thead>
                                <tbody role="rowgroup">
                                <tr role="row">
                                    <td role="cell">Park Name</td>
                                    <td role="cell">{parkSpace.park.name}</td>
                                </tr>

                                {parkSpace.space !== 'Video Shoot' && <tr role="row">
                                    <td role="cell">Space Capacity (People)</td>
                                    <td role="cell">{new Intl.NumberFormat().format(parkSpace.capacity)}</td>
                                </tr>}

                                <tr role="row">
                                    <td role="cell">Amount</td>
                                    <td role="cell">₦{new Intl.NumberFormat().format(parkSpace.price)}</td>
                                </tr>

                                <tr role="row">
                                    <td role="cell">Book Date</td>
                                    <td role="cell">
                                        <input style={{background: 'transparent'}} type="date" name="date"
                                               placeholder="Date" required id="txtDate"
                                               ref={register({required: 'This field is required'})}/>
                                        {errors.date && <Error>{errors.date.message}</Error>}
                                    </td>
                                </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>


                    <div className="row mt-5">
                        <div className="col text-center d-flex flex-column">
                            <label className="">
                                <input type="checkbox" className="mb-0" name="tandc" required/> &nbsp;
                                I agree to the <a href="#" style={{color: '#0056b3'}}
                                                  onClick={() => dispatch(toggleParkRules())}>park
                                rules </a>
                            </label>
                            <div>
                                <button type="submit" className="btn extra-thin green-transparent justify-">Book Now
                                </button>
                            </div>
                            <small className="mt-2">Payment is non refundable!</small>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    </Layout>
}

export default SingleParkSpace;


export async function getStaticPaths() {
    const {data: response} = await axiosInstance.get('park-spaces-ref');
    const refs = response.map(ref => ({
        params: {
            parkSpaceId: ref.ref.toString()
        }
    }));

    return {
        paths: refs,
        fallback: false
    }
}

export async function getStaticProps(context) {
    console.log(context);
    const ref = context.params.parkSpaceId;
    const {data: {data: parkSpace}} = await axiosInstance.get(`park-spaces/${ref}/by-ref`);

    return {
        props: {
            parkSpace,
            parkSpaceRef: ref
        }
    }
}