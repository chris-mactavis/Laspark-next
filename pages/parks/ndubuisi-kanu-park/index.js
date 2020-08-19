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

const KanuPark = () => {

    const {register, errors, handleSubmit} = useForm();

    const [park, setPark] = useState('Entire Park');
    const [amount, setAmount] = useState(10000);
    const [capacity, setCapacity] = useState(255);
    const [space, setSpace] = useState('');
    const dispatch = useDispatch();

    const bookHandler = async data => {
        const handler = PaystackPop.setup({
            key: 'pk_test_128d82585adfc879f77acfeaf7b3d0412a03aeb4',
            email: User().email,
            amount: amount * 100,
            currency: 'NGN',
            firstname: User().full_name,
            reference: 'The reference',
            callback: async function (response) {
                const {data: res} = await axiosInstance.post(`park-spaces/${space}/book`, {date: data.date}, {
                    headers: {
                        Authorization: `Bearer ${Token()}`
                    }
                });
                // const reference = response.reference;
                // alert('Payment complete! Reference: ' + reference);
                $('#spaceModal').modal('hide');
                dispatch(showNotifier('Space Booked'));
                Router.push('/');
            },
            onClose: function () {
                // alert('Transaction was not completed, window closed.');
            },
        });
        handler.openIframe();
    }

    const loadSpaceModal = (park, amount, capacity, currentSpace) => {
        if (!Token()) {
            Cookies.set('redirectIntended', '/parks/ndubuisi-kanu-park')
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
                <title>Ndubuisi Kanu Park | Laspark</title>
                <script src="https://js.paystack.co/v1/inline.js"/>
            </Head>

            <section className="single-park">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h1>Ndubuisi <br/> Kanu <br/> Park</h1>
                        </div>

                        <div className="col-md-7 pl-0 offset-md-1">
                            <a className="park-slider">
                                <img className="img-fluid" src="/images/single-parks/ndubuisi/1.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/ndubuisi/2.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/ndubuisi/3.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/ndubuisi/4.jpg"/>
                            </a>
                        </div>
                    </div>

                    <div className="row profile-row">
                        <div className="col-md-5 pr-0">
                            <iframe className="w-100"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.2653456693242!2d3.3631756153568193!3d6.613918123939101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b93b3c47d7e27%3A0xe01e5df9cb437938!2sNdubuisi%20Kanu%20Park%20Oregun%20Lagos!5e0!3m2!1sen!2sng!4v1594335427925!5m2!1sen!2sng"
                                    width="600" height="450" frameBorder="0" style={{border: 0}} allowFullScreen=""
                                    aria-hidden="false" tabIndex="0"/>
                        </div>

                        <div className="col-md-7 pl-5 d-flex align-items-center">
                            <div>
                                <h5>Park Profile</h5>

                                <p>
                                    The Ndubuisi Kanu Park was commissioned on the 12th of June, 2014 during the
                                    administration of the former Lagos State Governor - Gov. Babatunde Raji Fashola
                                    (SAN).
                                </p>

                                <p>
                                    It is named after a former Governor of Lagos State (1977 – 1978), Rear Admiral (Rtd)
                                    Ndubuisi Godwin Kanu.
                                    The park sits on an expanse of Land (1 Acre) and it has the following facilities:
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row amenities-row">
                        <div className="col">
                            <div className="amenities">
                                <div>
                                    <img src="/images/amenities/toilet.svg"/>
                                    <p>18 Toilets</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/electricity.svg"/>
                                    <p>24-hours Electricity</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/fountain.svg"/>
                                    <p>Fountain</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/swings.svg"/>
                                    <p>Children Playground</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/security.svg"/>
                                    <p>Security Presence</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/gazebo.svg"/>
                                    <p>2 Gazebos</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/food-stall.svg"/>
                                    <p>Vendor Stand</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/wifi.svg"/>
                                    <p>Free Wi-Fi</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/rotunda.svg"/>
                                    <p>Rotunda Stand</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/artwork.svg"/>
                                    <p>Artwork Monument</p>
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
                                    <td role="cell">2,500</td>
                                    <td role="cell">1,200,000</td>
                                    <td role="cell" onClick={() => loadSpaceModal('Exclusive Use', 1200000, 2500, 27)}>
                                        <a
                                            className="btn extra-thin green-transparent" href="#">Book Now</a>
                                    </td>
                                </tr>

                                <tr role="row">
                                    <td role="cell">Basketball Court</td>
                                    <td role="cell">300</td>
                                    <td role="cell">250,000</td>
                                    <td role="cell" onClick={() => loadSpaceModal('Basketball Court', 250000, 300, 28)}>
                                        <a
                                            className="btn extra-thin green-transparent" href="#">Book Now</a>
                                    </td>
                                </tr>

                                <tr role="row">
                                    <td role="cell">Uncle Vinnie's Corner</td>
                                    <td role="cell">80</td>
                                    <td role="cell">100,000</td>
                                    <td role="cell"
                                        onClick={() => loadSpaceModal('Uncle Vinnie\'s Corner', 100000, 80, 29)}><a
                                        className="btn extra-thin green-transparent" href="#">Book Now</a>
                                    </td>
                                </tr>

                                <tr role="row">
                                    <td role="cell">Gazebo 1</td>
                                    <td role="cell">70</td>
                                    <td role="cell">80,000</td>
                                    <td role="cell" onClick={() => loadSpaceModal('Gazebo 1', 80000, 70, 30)}><a
                                        className="btn extra-thin green-transparent" href="#">Book Now</a>
                                    </td>
                                </tr>

                                <tr role="row">
                                    <td role="cell">The Fountain Corner</td>
                                    <td role="cell">50</td>
                                    <td role="cell">50,000</td>
                                    <td role="cell"
                                        onClick={() => loadSpaceModal('The Fountain Corner', 50000, 50, 31)}><a
                                        className="btn extra-thin green-transparent" href="#">Book Now</a>
                                    </td>
                                </tr>

                                <tr role="row">
                                    <td role="cell">Rotunda</td>
                                    <td role="cell">40</td>
                                    <td role="cell">40,000</td>
                                    <td role="cell" onClick={() => loadSpaceModal('Rotunda', 40000, 40, 32)}><a
                                        className="btn extra-thin green-transparent" href="#">Book Now</a>
                                    </td>
                                </tr>


                                {/*<tr role="row">*/}
                                {/*    <td role="cell">Captain</td>*/}
                                {/*    <td role="cell">Cool</td>*/}
                                {/*    <td role="cell">Tree Crusher</td>*/}
                                {/*    <td role="cell">Blue</td>*/}
                                {/*    <td role="cell">Wars</td>*/}
                                {/*    <td role="cell">Steve 42nd</td>*/}
                                {/*    <td role="cell">December 13, 1982</td>*/}
                                {/*    <td role="cell">Las Vegas</td>*/}
                                {/*    <td role="cell">1.9</td>*/}
                                {/*    <td role="cell">Under the couch</td>*/}
                                {/*</tr>*/}
                                </tbody>
                            </table>
                        </div>
                    </div>
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
                                       defaultValue="Ndubuisi Kanu Park" disabled/>
                                <label>Park Space</label>
                                <input type="text" name="space" placeholder="Park Space*" value={park} disabled/>
                                <label>Capacity</label>
                                <input type="text" name="capacity" placeholder="Park Capacity*" value={capacity}
                                       disabled/>
                                <label>Amount(N)</label>
                                <input type="number" name="price" placeholder="Price" value={amount} disabled/>
                                <label>Book Date</label>
                                <input type="date" id="txtDate" name="date" placeholder="Date" required
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

export default KanuPark;