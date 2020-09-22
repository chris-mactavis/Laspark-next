import Head from "next/head";
import Layout from "../../../Components/Layout";
import React, {useEffect, useState} from "react";
import {User} from "../../../Utils/User";
import {showNotifier} from "../../../store/actions/notifier";
import Router from "next/router";
import {useForm} from "react-hook-form";
import Token from "../../../Utils/Token";
import Link from "next/link";
import Cookies from 'js-cookie';
import Error from "../../../Components/Error";
import axiosInstance from "../../../config/axios";
import {useDispatch} from "react-redux";
import {toggleParkRules} from "../../../store/actions/booking";
import {randomString} from "../../../Utils/String";
import {loader} from "../../../store/actions/loader";

const Badagry = () => {

    const {register, errors, handleSubmit} = useForm();

    const [park, setPark] = useState('Entire Park');
    const [amount, setAmount] = useState(10000);
    const [capacity, setCapacity] = useState(255);
    const [space, setSpace] = useState('');
    const [billNumber, setBillNumber] = useState(null);
    const [stringHash, setStringHash] = useState(null);
    const [transactionId, setTransactionId] = useState(randomString(20));
    const dispatch = useDispatch();

    const bookHandler = async data => {
        dispatch(loader());
        try {
            const {data: {bill_number}} = await axiosInstance.post(`payment/get-bill-reference`, {amount}, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            setBillNumber(bill_number);
            const hashString = `${process.env.REVPAY_TOKEN}LASPARK${bill_number}${transactionId}${amount}` + "http://165.227.73.31/verify-payment";
            setStringHash(
                CryptoJS.MD5(hashString).toString().toUpperCase()
            )

            localStorage.setItem('bookedPark', JSON.stringify({date: data.date, spaceId: space}));

            document.getElementById('frm').submit();
        } catch (e) {
            console.log(e);
            dispatch(showNotifier(e.response.data.message, 'danger'));
            dispatch(loader());
        }
    }

    const loadSpaceModal = (park, amount, capacity, currentSpace, e) => {
        e.preventDefault();
        if (!Token()) {
            Cookies.set('redirectIntended', '/parks/badagry')
            Router.push('/login');
            return;
        }
        setPark(park);
        setAmount(amount);
        setCapacity(capacity);
        setSpace(currentSpace);
        $('#spaceModal').modal('show');
    }

    useEffect(() => {
        $('.park-slider').slick({
            autoplay: true,
            arrows: true,
            dots: false,
            fade: true,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
            ]
        });

        $('.amenities').slick({
            autoplay: true,
            dots: false,
            slidesToShow: 6,
        });
    }, []);

    useEffect(() => {
        let dtToday = new Date();

        let month = dtToday.getMonth() + 1;
        let day = dtToday.getDate();
        let year = dtToday.getFullYear();
        if(month < 10)
            month = '0' + month.toString();
        if(day < 10)
            day = '0' + day.toString();

        let maxDate = year + '-' + month + '-' + day;
        $('#txtDate').attr('min', maxDate);
    }, [])

    return <>
        <Layout hasHeader={false}>
            <Head>
                <title>Badagry | Laspark</title>
                <script src="https://js.paystack.co/v1/inline.js"/>
            </Head>

            <section className="single-park">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h1>Badagry <br/> Recreational <br/> Park</h1>
                        </div>

                        <div className="col-md-7 pl-0 offset-md-1">
                            <a className="park-slider">
                                <img className="img-fluid" src="/images/single-parks/badagry/1.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/badagry/2.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/badagry/3.jpg"/>
                            </a>
                        </div>
                    </div>

                    <div className="row profile-row">
                        <div className="col-md-5 pr-0">
                            <iframe className="w-100"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.848464630191!2d2.897067715356681!3d6.4135110262100605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b6289b0bdb9bb%3A0xae5165cc26118017!2sBadagry%20Recreational%20Park!5e0!3m2!1sen!2sng!4v1594382464121!5m2!1sen!2sng"
                                    width="600" height="450" frameBorder="0" style={{border: 0}} allowFullScreen=""
                                    aria-hidden="false" tabIndex="0"/>
                        </div>

                        <div className="col-md-7 pl-5 d-flex align-items-center">
                            <div>
                                <h5>Park Profile</h5>

                                <p>The Badagry Recreational Park located at Topo-Idale Whedakoh, Ascon Road, Badagry was established and commissioned in the year 2017 by the Special Adviser on Housing to the Former Lagos State Governor; Akinwunmi Ambode.</p>
                                <p>Badagry known for its legendary historical backgrounds as a tourist haven is the motivation for establishing the park in that axis to further enhance its accessibility to tourists and fun seekers as well as those living in the locality.</p> 
                                <p> It sits on an expanse of Land measuring up to 17,710 square meters and houses the following structures:</p>
                            </div>
                        </div>
                    </div>

                    <div className="row amenities-row">
                        <div className="col">
                            <div className="amenities">
                                <div>
                                    <img src="/images/amenities/toilet.svg"/>
                                    <p>Toilets</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/slide.svg"/>
                                    <p>Children's Playground</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/football.svg"/>
                                    <p>Five-a-side Football Pitch</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/fountain.svg"/>
                                    <p>A Fountain</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/fish.png"/>
                                    <p>A Fish Pond</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/police-station.svg"/>
                                    <p>A Security Building</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/gazebo.svg"/>
                                    <p>Gazebo</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/parking.svg"/>
                                    <p>Car Park</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/stadium.svg"/>
                                    <p>A Multipurpose Court for Sports</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/kitchen.svg"/>
                                    <p>Kitchen</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/administration.svg"/>
                                    <p>An Administrative Block</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/backup-generator.svg"/>
                                    <p>Generator House</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row profile-details">
                        <div className="col">
                            <table role="table">
                                <thead role="rowgroup">
                                <tr role="row">
                                    <th role="columnheader">Park Space</th>
                                    <th role="columnheader">Capacity (People)</th>
                                    <th role="columnheader">Amount (₦)</th>
                                    <th role="columnheader">Book</th>
                                </tr>
                                </thead>
                                <tbody role="rowgroup">
                                <tr role="row">
                                    <td role="cell">Exclusive Use</td>
                                    <td role="cell">3000</td>
                                    <td role="cell">500,000</td>
                                    <td role="cell" onClick={(e) => loadSpaceModal('Exclusive Use', 500000, 3000, 3, e)}><a
                                        className="btn extra-thin green-transparent" href="#">Book Now</a>
                                    </td>
                                </tr>

                                <tr role="row">
                                    <td role="cell">Platform</td>
                                    <td role="cell">30</td>
                                    <td role="cell">25,000</td>
                                    <td role="cell" onClick={(e) => loadSpaceModal('Platform', 250000, 30, 4, e)}><a
                                        className="btn extra-thin green-transparent" href="#">Book Now</a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <form name="frm" id="frm" method="post" target="_parent"
                          action="https://test.qpay.ng/PaymentGateway/Index">
                        <input type="hidden" name="type" value="Webguid"/>
                        <input type="hidden" name="transactionId" value={transactionId}/>
                        <input type="hidden" name="billReference" value={billNumber} />
                        <input type="hidden" name="amount" value={amount} />
                        <input type="hidden" name="returnUrl" value="http://165.227.73.31/verify-payment"/>
                        <input type="hidden" name="clientCode" value="LASPARK"/>
                        <input type="hidden" name="Hash" value={stringHash}/>
                    </form>
                </div>
            </section>

            <div className="modal fade" id="spaceModal" tabIndex="-1" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Book Park</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form className="contact-form" onSubmit={handleSubmit(bookHandler)}>
                            <div className="modal-body">
                                <label>Park Name</label>
                                <input type="text" name="park_name" placeholder="Park Name*"
                                       defaultValue="Badagry Park" disabled/>
                                <label>Park Space</label>
                                <input type="text" name="space" placeholder="Park Space*" value={park} disabled/>
                                <label>Capacity</label>
                                <input type="text" name="capacity" placeholder="Park Capacity*" value={capacity}
                                       disabled/>
                                <label>Amount(N)</label>
                                <input type="number" name="price" placeholder="Price" value={amount} disabled/>
                                <label>Book Date</label>
                                <input type="date" name="date" placeholder="Date" required id="txtDate"
                                       ref={register({required: 'This field is required'})}/>
                                {errors.date && <Error>{errors.date.message}</Error>}

                                <label className="d-flex flex-row align-items-center">
                                    <input type="checkbox" className="mb-0" name="tandc" required/>
                                    I agree to the <a href="#" onClick={() => dispatch(toggleParkRules())}> &nbsp; park rules </a>
                                </label>
                                <small>Payment is non refundable!</small>

                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn extra-thin green-transparent">Book Now</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
        <style jsx>{`
            .modal a {
            color: #0056b3
            }
            label input {
                width: 20px;
                }
        `}</style>
    </>
}

export default Badagry;