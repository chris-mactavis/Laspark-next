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
import {useDispatch} from "react-redux";
import axiosInstance from "../../../config/axios";
import {toggleParkRules} from "../../../store/actions/booking";

const Ikorodu = () => {

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
                console.log(res);
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
            Cookies.set('redirectIntended', '/parks/ikorodu')
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

    return <>
        <Layout hasHeader={false}>
            <Head>
                <title>Ikorodu | Laspark</title>
                <script src="https://js.paystack.co/v1/inline.js"/>
            </Head>

            <section className="single-park">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h1>Ikorodu <br/> Recreational <br/> Park</h1>
                        </div>

                        <div className="col-md-7 pl-0 offset-md-1">
                            <a className="park-slider">
                                <img className="img-fluid" src="/images/single-parks/ikorodu/1.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/ikorodu/2.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/ikorodu/3.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/ikorodu/4.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/ikorodu/5.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/ikorodu/6.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/ikorodu/7.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/ikorodu/8.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/ikorodu/9.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/ikorodu/10.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/ikorodu/11.jpg"/>
                            </a>
                        </div>
                    </div>

                    <div className="row profile-row">
                        <div className="col-md-5 pr-0">
                            <iframe className="w-100"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.3403839358184!2d3.4825798153567855!3d6.6045557240466595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bec360070e8df%3A0xfcf8a31a18a75dee!2sIkorodu%20Recreational%20Park!5e0!3m2!1sen!2sng!4v1594380131655!5m2!1sen!2sng"
                                    width="600" height="450" frameBorder="0" style={{border: 0}} allowFullScreen=""
                                    aria-hidden="false" tabIndex="0"/>
                        </div>

                        <div className="col-md-7 pl-5 d-flex align-items-center">
                            <div>
                                <h5>Park Profile</h5>

                                <p>Ikorodu recreational park an ultra-modern recreational garden was established in 2010, a strategy employed by the government to take governance to the people of that locality. The purpose of it’s creation of the park is mainly for relaxations as well as social event.</p>
                                <p>The park sits on a total land area of approximately 10,200M2 and is managed by Lagos State Parks & Gardens Agency (LASPARK)
                                Some of the side attraction of the park includes:</p>
                            </div>
                        </div>
                    </div>

                    <div className="row amenities-row">
                        <div className="col">
                            <div className="amenities">
                                <div>
                                    <img src="/images/amenities/slide.svg"/>
                                    <p>Children Playground</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/basketball.svg"/>
                                    <p>Basketball Court</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/lounge.png"/>
                                    <p>lounge/ Huts</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/zoo.svg"/>
                                    <p>Mini Zoo</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/football.svg"/>
                                    <p>Five-a-side Football Pitch</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/food-stall.svg"/>
                                    <p>Food Court</p>
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
                                    <td role="cell">700,000</td>
                                    <td role="cell" onClick={() => loadSpaceModal('Exclusive Use', 700000, 2500, 14)}><a
                                        className="btn extra-thin green-transparent" href="#">Book Now</a>
                                    </td>
                                </tr>

                                <tr role="row">
                                    <td role="cell">Football Pitch</td>
                                    <td role="cell">250</td>
                                    <td role="cell">200,000</td>
                                    <td role="cell" onClick={() => loadSpaceModal('Platform', 200000, 250, 15)}><a
                                        className="btn extra-thin green-transparent" href="#">Book Now</a>
                                    </td>
                                </tr>

                                <tr role="row">
                                    <td role="cell">Basketball Court</td>
                                    <td role="cell">200</td>
                                    <td role="cell">150,000</td>
                                    <td role="cell" onClick={() => loadSpaceModal('Platform', 150000, 200, 16)}><a
                                        className="btn extra-thin green-transparent" href="#">Book Now</a>
                                    </td>
                                </tr>

                                <tr role="row">
                                    <td role="cell">Gazebo 1</td>
                                    <td role="cell">40</td>
                                    <td role="cell">30,000</td>
                                    <td role="cell" onClick={() => loadSpaceModal('Platform', 30000, 40, 17)}><a
                                        className="btn extra-thin green-transparent" href="#">Book Now</a>
                                    </td>
                                </tr>

                                <tr role="row">
                                    <td role="cell">Gazebo 2</td>
                                    <td role="cell">250</td>
                                    <td role="cell">200,000</td>
                                    <td role="cell" onClick={() => loadSpaceModal('Platform', 200000, 250, 18)}><a
                                        className="btn extra-thin green-transparent" href="#">Book Now</a>
                                    </td>
                                </tr>
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
                                       defaultValue="Ikorodu Park" disabled/>
                                <label>Park Space</label>
                                <input type="text" name="space" placeholder="Park Space*" value={park} disabled/>
                                <label>Capacity</label>
                                <input type="text" name="capacity" placeholder="Park Capacity*" value={capacity}
                                       disabled/>
                                <label>Amount(N)</label>
                                <input type="number" name="price" placeholder="Price" value={amount} disabled/>
                                <label>Book Date</label>
                                <input type="date" name="date" placeholder="Date" required
                                       ref={register({required: 'This field is required'})}/>
                                {errors.date && <Error>{errors.date.message}</Error>}

                                <label className="d-flex flex-row align-items-center">
                                    <input type="checkbox" className="mb-0" name="tandc" required/>
                                    I agree to the <a href="#" onClick={() => dispatch(toggleParkRules())}> &nbsp; park rules </a>
                                </label>

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

export default Ikorodu;