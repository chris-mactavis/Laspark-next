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

const Oluyomi = () => {

    const {register, errors, handleSubmit} = useForm();

    const [park, setPark] = useState('Entire Park');
    const [amount, setAmount] = useState(10000);
    const [capacity, setCapacity] = useState(255);
    const [space, setSpace] = useState(255);

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
            Cookies.set('redirectIntended', '/parks/oluyomi')
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
                <title>Oluyomi | Laspark</title>
                <script src="https://js.paystack.co/v1/inline.js"/>
            </Head>

            <section className="single-park">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h1>Dr. Oluyomi <br/> Abayomi <br/> Finnih <br/> Park</h1>
                        </div>

                        <div className="col-md-7 pl-0 offset-md-1">
                            <a className="park-slider">
                                <img className="img-fluid" src="/images/single-parks/finnih/1.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/finnih/2.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/finnih/3.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/finnih/4.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/finnih/5.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/finnih/6.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/finnih/7.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/finnih/8.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/finnih/9.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/finnih/10.jpg"/>
                            </a>
                        </div>
                    </div>

                    <div className="row profile-row">
                        <div className="col-md-5 pr-0">
                            <iframe className="w-100"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.402838185611!2d3.3643545153568337!3d6.596753324136153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b93fdcee44551%3A0x7192859463678c0c!2sDr%20Abayomi%20Finnih%20Recreational%20Park!5e0!3m2!1sen!2sng!4v1594379347958!5m2!1sen!2sng"
                                    width="600" height="450" frameBorder="0" style={{border: 0}} allowFullScreen=""
                                    aria-hidden="false" tabIndex="0"/>
                        </div>

                        <div className="col-md-7 pl-5 d-flex align-items-center">
                            <div>
                                <h5>Park Profile</h5>

                                <p>The Dr. Abayomi Finnih Park, Oregun named after a prominent medical practitioner and
                                    elder statesman Dr. Oluyomi Abayomi Finnih, located in Oregun, Ikeja, was
                                    commissioned on Saturday the 31st August 2019.</p>
                                <p>The beautiful and magnificent facility was commissioned by the Governor of the State
                                    Mr. Babajide Sanwoolu, ably represented by the delectable First Lady H. E. Dr.
                                    Ibijoke Sanwoolu.</p>
                                <p>The park which is designed to Promote the vision and mission of the Lagos State Parks
                                    and Gardens Agency for a greener and healthier Lagos consists of various
                                    recreational facilities which includes: A Mini Zoo, Botanical Garden, 3 different
                                    playing grounds for all age groups, a restaurant, Games and art arcade, a mini mart,
                                    Gazebos and cool spots for aesthetic and amusement purposes.</p>
                                <p>The magnificent Park since inception till date has hosted various events ranging from
                                    birthdays, Fun fair, exhibitions, team bonding, corporate end of the year events
                                    etc.</p>
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
                                    <img src="/images/amenities/slide.svg"/>
                                    <p>Children Playground</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/security.svg"/>
                                    <p>Security Presence</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/parking.svg"/>
                                    <p>Parking Space</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/food-stall.svg"/>
                                    <p>Vendor Stand</p>
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
                                    <td role="cell">1,000</td>
                                    <td role="cell">500,000</td>
                                    <td role="cell" onClick={() => loadSpaceModal('Exclusive Use', 500000, 1000, 20)}><a
                                        className="btn extra-thin green-transparent" href="#">Book Now</a>
                                    </td>
                                </tr>

                                <tr role="row">
                                    <td role="cell">Adult Corner + Car park + Gazebo 1</td>
                                    <td role="cell">350</td>
                                    <td role="cell">250,000</td>
                                    <td role="cell" onClick={() => loadSpaceModal('Platform', 250000, 350, 21)}><a
                                        className="btn extra-thin green-transparent" href="#">Book Now</a>
                                    </td>
                                </tr>

                                <tr role="row">
                                    <td role="cell">Car Park</td>
                                    <td role="cell">200</td>
                                    <td role="cell">120,000</td>
                                    <td role="cell" onClick={() => loadSpaceModal('Platform', 120000, 200, 22)}><a
                                        className="btn extra-thin green-transparent" href="#">Book Now</a>
                                    </td>
                                </tr>

                                <tr role="row">
                                    <td role="cell">Platform/Adult Corner</td>
                                    <td role="cell">100</td>
                                    <td role="cell">100,000</td>
                                    <td role="cell" onClick={() => loadSpaceModal('Platform', 100000, 100, 23)}><a
                                        className="btn extra-thin green-transparent" href="#">Book Now</a>
                                    </td>
                                </tr>

                                <tr role="row">
                                    <td role="cell">Gazebo 1</td>
                                    <td role="cell">70</td>
                                    <td role="cell">60,000</td>
                                    <td role="cell" onClick={() => loadSpaceModal('Platform', 60000, 70, 24)}><a
                                        className="btn extra-thin green-transparent" href="#">Book Now</a>
                                    </td>
                                </tr>

                                <tr role="row">
                                    <td role="cell">Cool Spot</td>
                                    <td role="cell">60</td>
                                    <td role="cell">70,000</td>
                                    <td role="cell" onClick={() => loadSpaceModal('Platform', 70000, 60, 25)}><a
                                        className="btn extra-thin green-transparent" href="#">Book Now</a>
                                    </td>
                                </tr>

                                <tr role="row">
                                    <td role="cell">Gazebo 2</td>
                                    <td role="cell">30</td>
                                    <td role="cell">30,000</td>
                                    <td role="cell" onClick={() => loadSpaceModal('Platform', 30000, 30, 26)}><a
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
                                       defaultValue="Oluyomi Park" disabled/>
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

export default Oluyomi;