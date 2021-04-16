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
    console.log(parkSpace, parkSpaceRef);
    const [transactionId, setTransactionId] = useState(randomString(20));
    const [billNumber, setBillNumber] = useState(null);
    const [stringHash, setStringHash] = useState(null);
    const [showMulti, setShowMulti] = useState(false);
    const [otherNatureEvent, setOtherNatureEvent] = useState('');
    const [minDate, setMinDate] = useState(null);

    console.log(otherNatureEvent);
    
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

    const bookingHandler = async data => {
        console.log(data);
        try {
            dispatch(loader());
            const {data: response} = await axiosInstance.post(`/park-spaces/${parkSpaceRef}/book`, {
                ...data,
                amount: parkSpace.price
            }, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            dispatch(loader());
            Router.push('/profile');
            dispatch(showNotifier('You will be contacted through call/email within 48 hours.', 'success'));
        } catch (e) {
            console.log(e);
            dispatch(showNotifier(e.response.data.message, 'danger'));
            dispatch(loader());
        }

        // dispatch(loader());
        // try {
        //     const {data: {bill_number}} = await axiosInstance.post(`payment/get-bill-reference`, {amount: parkSpace.price}, {
        //         headers: {
        //             Authorization: `Bearer ${Token()}`
        //         }
        //     });
        //     setBillNumber(bill_number);
        //     const hashString = `${process.env.REVPAY_TOKEN}LASPARK${bill_number}${transactionId}${parkSpace.price}` + "http://165.227.73.31/verify-payment";
        //     setStringHash(
        //         CryptoJS.MD5(hashString).toString().toUpperCase()
        //     )
        //
        //     localStorage.setItem('bookedPark', JSON.stringify({date: data.date, spaceId: parkSpace.id}));
        //
        //     document.getElementById('frm').submit();
        // } catch (e) {
        //     console.log(e);
        //     dispatch(showNotifier(e.response.data.message, 'danger'));
        //     dispatch(loader());
        // }
    };

    const handleChange = (e) => {
        setOtherNatureEvent(e.target.value);
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

                                {(parkSpace.space !== 'Video Shoot' && parkSpace.space !== 'Photo Shoot') &&
                                <tr role="row">
                                    <td role="cell">Space Capacity (People)</td>
                                    <td role="cell">{new Intl.NumberFormat().format(parkSpace.capacity)}</td>
                                </tr>}

                                <tr role="row">
                                    <td role="cell">Amount</td>
                                    <td role="cell">₦{new Intl.NumberFormat().format(parkSpace.price)}</td>
                                </tr>

                                <tr role="row">
                                    <td role="cell">Book Multiple Days</td>
                                    <td role="cell">
                                        <label className="">
                                            <input type="checkbox" className="mb-0" defaultChecked={showMulti}
                                                   name="multi_days" onChange={() => setShowMulti(s => !s)}/>
                                        </label>
                                    </td>
                                </tr>

                                <tr role="row">
                                    <td role="cell">{showMulti ? 'Start Date' : 'Event Date'}</td>
                                    <td role="cell">
                                        <input style={{background: 'transparent'}} type="date" name="start_date"
                                               placeholder="Date" required id="txtDate" min={minDate}
                                               ref={register({required: 'This field is required'})}/>
                                        {errors.date && <Error>{errors.date.message}</Error>}
                                    </td>
                                </tr>

                                {
                                    showMulti && <tr role="row">
                                        <td role="cell">End Date</td>
                                        <td role="cell">
                                            <input style={{background: 'transparent'}} type="date" name="end_date"
                                                   placeholder="Date" required id="txtEndDate" min={minDate}
                                                   ref={register({required: 'This field is required'})}/>
                                            {errors.end_date && <Error>{errors.end_date.message}</Error>}
                                        </td>
                                    </tr>
                                }

                                <tr role="row">
                                    <td role="cell">Start Time</td>
                                    <td role="cell">
                                        <input style={{background: 'transparent'}} type="time" name="start_time"
                                               placeholder="Start Time" required
                                               ref={register({required: 'This field is required'})}/>
                                        {errors.start_time && <Error>{errors.start_time.message}</Error>}
                                    </td>
                                </tr>

                                <tr role="row">
                                    <td role="cell">End Time</td>
                                    <td role="cell">
                                        <input style={{background: 'transparent'}} type="time" name="end_time"
                                               placeholder="End Time" required
                                               ref={register({required: 'This field is required'})}/>
                                        {errors.end_time && <Error>{errors.end_time.message}</Error>}
                                    </td>
                                </tr>

                                {(parkSpace.space !== 'Video Shoot' && parkSpace.space !== 'Photo Shoot') &&
                                <tr role="row">
                                    <td role="cell">Nature of Event</td>
                                    <td role="cell">
                                        <select onChange={handleChange} style={{ background: 'transparent' }}  name={otherNatureEvent === "Others" ? '' : "event_nature"} required
                                            ref={register({ required: 'This field is required' })}>
                                            <option value="">Nature of Event</option>
                                            <option value="Picnic">Picnic</option>
                                            <option value="Birthday Party">Birthday Party</option>
                                            <option value="Wedding Reception">Wedding Reception</option>
                                            <option value="Product Launch">Product Launch</option>
                                            <option value="Trade Fairs/Exhibitions">Trade Fairs/Exhibitions</option>
                                            <option value="Get-together">Get-together</option>
                                            <option value="Reunions">Reunions</option>
                                            <option value="Festival Gatherings">Festival Gatherings</option>
                                            <option value="Meeting">Meeting</option>
                                            <option value="Music Concert">Music Concert</option>
                                            <option value="Excursion">Excursion</option>
                                            <option value="Others">Others</option>
                                        </select>
                                        {otherNatureEvent === 'Others' && <input className="ml-2 pb-0" style={{ background: 'transparent' }} type="text" placeholder="Please fill in" ref={register({ required: 'This field is required' })} name="event_nature" required />}

                                        {errors.event_nature && <Error>{errors.event_nature.message}</Error>}
                                    </td>
                                </tr>}

                                <tr role="row">
                                    <td role="cell">Expected Number of People</td>
                                    <td role="cell">
                                        <input style={{background: 'transparent'}} type="number" min="10"
                                               placeholder="Number of People" required
                                               defaultValue={10}
                                               name="no_of_people"
                                               ref={register({required: 'This field is required'})}/>
                                        <span className="small d-block">Park is free for less than 10 people.</span>
                                        {errors.no_of_people && <Error>{errors.no_of_people.message}</Error>}
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
                                I agree to the <a href="#" style={{color: '#0bb503'}}
                                                  onClick={() => dispatch(toggleParkRules())}>park
                                rules </a>
                            </label>
                            <div>
                                <button type="submit" className="btn extra-thin green-transparent justify-">Book Now
                                </button>
                            </div>
                            {/*<small className="mt-2">Payment is non refundable!</small>*/}
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