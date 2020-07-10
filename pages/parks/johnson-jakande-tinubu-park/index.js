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

const KanuPark = () => {

    const {register, errors, handleSubmit} = useForm();

    const [park, setPark] = useState('Entire Park');
    const [amount, setAmount] = useState(10000);
    const [capacity, setCapacity] = useState(255);

    const bookHandler = async data => {
        const handler = PaystackPop.setup({
            key: 'pk_test_128d82585adfc879f77acfeaf7b3d0412a03aeb4',
            email: User().email,
            amount: amount * 100,
            currency: 'NGN',
            firstname: User().full_name,
            reference: 'The reference',
            callback: function (response) {
                // const reference = response.reference;
                // alert('Payment complete! Reference: ' + reference);
                $('#spaceModal').modal('hide');
                dispatch(showNotifier('Space Booked'));
                // Router.push('/');
            },
            onClose: function () {
                // alert('Transaction was not completed, window closed.');
            },
        });
        handler.openIframe();
    }

    const loadSpaceModal = (park, capacity, amount) => {
        if (!Token()) {
            Cookies.set('redirectIntended', '/parks/johnson-jakande-tinubu-park')
            Router.push('/login');
            return;
        }
        setPark(park);
        setAmount(amount);
        setCapacity(capacity);
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
                <title>Johnson Jakande Tinubu Park | Laspark</title>
                <script src="https://js.paystack.co/v1/inline.js"/>
            </Head>

            <section className="single-park">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h1>Johnson <br/> Jakande <br/> Tinubu <br/> Park</h1>
                        </div>

                        <div className="col-md-7 pl-0 offset-md-1">
                            <a className="park-slider">
                                <img className="img-fluid" src="/images/single-parks/johnson/1.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/2.png"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/3.png"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/5.png"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/6.png"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/7.png"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/8.png"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/9.png"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/10.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/11.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/12.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/13.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/14.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/15.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/16.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/17.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/18.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/19.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/20.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/21.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/22.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/23.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/24.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/25.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/26.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/27.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/28.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/29.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/30.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/31.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/32.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/33.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/34.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/35.JPG"/>
                                <img className="img-fluid" src="/images/single-parks/johnson/36.JPG"/>
                            </a>
                        </div>
                    </div>

                    <div className="row profile-row">
                        <div className="col-md-5 pr-0">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.2546631200325!2d3.3617530153694375!3d6.615249895216237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b93b598785b33%3A0xa34c5b687075d120!2sJohnson%20Jakande%20Tinubu%20Park!5e0!3m2!1sen!2sng!4v1594367419760!5m2!1sen!2sng"
                                width="600" height="450" frameBorder="0" style={{border:0}} allowFullScreen=""
                                aria-hidden="false" tabIndex="0"/>
                        </div>

                        <div className="col-md-7 pl-5 d-flex align-items-center">
                            <div>
                                <h5>Profile Description</h5>

                                <p>
                                    Johnson Jakande Tinubu (JJT) Park, an ultra-modern recreational park in honour of
                                    three former Governors of the State, Brigadier Mobolaji Johnson (Rtd.), Alhaji
                                    Lateef Jakande and Senator Bola Ahmed Tinubu. It was commissioned by the Former
                                    Governor of Lagos State (Akinwunmi Ambode) on Dec 13, 2017.
                                </p>

                                <p>
                                    The Governor (Akinwunmi Ambode), said it was part of efforts by his administration
                                    to immortalize heroes who worked hard for the emergence of Lagos as not only the
                                    Centre of Excellence, but also one of the most prominent City States in Africa. The
                                    aim of creating the park is mainly for relaxation as well as social gathering.
                                </p>

                                <p>
                                    The park occupies a total land area of approximately 21,880sqm, amongst other things
                                    and has the following:
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row amenities-row">
                        <div className="col">
                            <div className="amenities">
                                <div>
                                    <img src="/images/amenities/toilet.svg"/>
                                    <p>24 Toilets</p>
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
                                    <img src="/images/amenities/parking.svg"/>
                                    <p>Parking Space</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/waterfall.png"/>
                                    <p>Waterfall</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/wifi.svg"/>
                                    <p>Free Wi-Fi</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/hut.png"/>
                                    <p>Lounge/Huts</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/food-stall.svg"/>
                                    <p>Food Court</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/aviary.png"/>
                                    <p>Aviary</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/pergola.png"/>
                                    <p>Pergola</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/chess.png"/>
                                    <p>Chess Game</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/statue.png"/>
                                    <p>Statues</p>
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
                                    <td role="cell">4,000</td>
                                    <td role="cell">2,000,000</td>
                                    <td onClick={() => loadSpaceModal('Exclusive Use', 4000, 2000000)} role="cell"><a className="btn extra-thin green-transparent" href="#">Book Now</a>
                                    </td>
                                </tr>

                                <tr role="row">
                                    <td role="cell">Hibiscus Gazebo</td>
                                    <td role="cell">60</td>
                                    <td role="cell">120,000</td>
                                    <td onClick={() => loadSpaceModal('Hibiscus Gazebo', 60, 120000)} role="cell"><a className="btn extra-thin green-transparent" href="#">Book Now</a>
                                    </td>
                                </tr>

                                <tr role="row">
                                    <td role="cell">Tuja Gazebo</td>
                                    <td role="cell">60</td>
                                    <td role="cell">120,000</td>
                                    <td onClick={() => loadSpaceModal('Tuja Gazebo', 60, 120000)} role="cell"><a className="btn extra-thin green-transparent" href="#">Book Now</a>
                                    </td>
                                </tr>

                                <tr role="row">
                                    <td role="cell">Ixora Gazebo</td>
                                    <td role="cell">40</td>
                                    <td role="cell">70,000</td>
                                    <td onClick={() => loadSpaceModal('Ixora Gazebo', 40, 70000)} role="cell"><a className="btn extra-thin green-transparent" href="#">Book Now</a>
                                    </td>
                                </tr>

                                <tr role="row">
                                    <td role="cell">Plumbago Gazebo</td>
                                    <td role="cell">20</td>
                                    <td role="cell">30,000</td>
                                    <td onClick={() => loadSpaceModal('Plumbago Gazebo', 20, 30000)} role="cell"><a className="btn extra-thin green-transparent" href="#">Book Now</a>
                                    </td>
                                </tr>

                                <tr role="row">
                                    <td role="cell">Love Nest 1 Gazebo</td>
                                    <td role="cell">5</td>
                                    <td role="cell">10,000</td>
                                    <td onClick={() => loadSpaceModal('Love Nest 1 Gazebo', 5, 10000)} role="cell"><a className="btn extra-thin green-transparent" href="#">Book Now</a>
                                    </td>
                                </tr>

                                <tr role="row">
                                    <td role="cell">Love Nest 2 Gazebo</td>
                                    <td role="cell">5</td>
                                    <td role="cell">10,000</td>
                                    <td onClick={() => loadSpaceModal('Love Nest 2 Gazebo', 5, 10000)} role="cell"><a className="btn extra-thin green-transparent" href="#">Book Now</a>
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
                                       defaultValue="Johnson Jakande Tinubu Park" disabled/>
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
                                    I agree to the <Link href="/park-rules"><a> &nbsp; park
                                    rules </a></Link> &nbsp; and <Link href="#"><a> &nbsp; terms and
                                    conditions</a></Link>
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

export default KanuPark;