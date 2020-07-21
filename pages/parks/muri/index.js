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

const Muri = () => {

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
                // Router.push('/');
            },
            onClose: function () {
                // alert('Transaction was not completed, window closed.');
            },
        });
        handler.openIframe();
    }

    const loadSpaceModal = (park, amount, capacity, currentSpace) => {
        if (!Token()) {
            Cookies.set('redirectIntended', '/parks/muri')
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
                <title>Muri | Laspark</title>
                <script src="https://js.paystack.co/v1/inline.js"/>
            </Head>

            <section className="single-park">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h1>Muri <br/> Recreational <br/> Park</h1>
                        </div>

                        <div className="col-md-7 pl-0 offset-md-1">
                            <a className="park-slider">
                                <img className="img-fluid" src="/images/single-parks/muri/1.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/muri/2.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/muri/3.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/muri/4.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/muri/5.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/muri/6.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/muri/7.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/muri/8.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/muri/9.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/muri/10.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/muri/11.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/muri/12.jpg"/>
                                <img className="img-fluid" src="/images/single-parks/muri/13.jpg"/>
                            </a>
                        </div>
                    </div>

                    <div className="row profile-row">
                        <div className="col-md-5 pr-0">
                            <iframe className="w-100"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.703658131387!2d3.429673515356725!3d6.432100426002194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf5b9ad32cb01%3A0x68d5215d0b320063!2sMuri%20Okunola%20Street%20Lagos%20VI!5e0!3m2!1sen!2sng!4v1594379545989!5m2!1sen!2sng"
                                    width="600" height="450" frameBorder="0" style={{border: 0}} allowFullScreen=""
                                    aria-hidden="false" tabIndex="0"/>
                        </div>

                        <div className="col-md-7 pl-5 d-flex align-items-center">
                            <div>
                                <h5>Park Profile</h5>

                                <p>Muri Okunola Park is located on Adeyemo Alakija Street in Victoria Island, close to
                                    the Lagos campus of the Nigerian Law School.</p>
                                <p>It was built and commissioned on 18th Dec. 2008 by the former governor of Lagos State
                                    (Gov. Babatunde Raji Fashola SAN) in honour of late Justice Muri Okunola for his
                                    dedication to the service of Lagos State and Nigeria as a whole. The immortalization
                                    of late Justice Muri Okunola is a demonstration of the determination to ensure that
                                    the heroic deeds of the past leaders are not in vain.</p>
                                <p>This beautiful park is well tended with lush-green grass and beautiful flowers; this
                                    is an ideal location for a quiet getaway with loved ones. Also, events like
                                    festivals, wedding ceremonies and the occasional video/photo shoot take place to
                                    make for an even more eventful time at the park, another dream destination for
                                    photographers. Some of the facilities available include:</p>
                            </div>
                        </div>
                    </div>

                    <div className="row amenities-row">
                        <div className="col">
                            <div className="amenities">
                                <div>
                                    <img src="/images/amenities/toilet.svg"/>
                                    <p>8 Toilets</p>
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
                                    <img src="/images/amenities/security.svg"/>
                                    <p>Security Presence</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/parking.svg"/>
                                    <p>Parking Space</p>
                                </div>

                                <div>
                                    <img src="/images/amenities/wifi.svg"/>
                                    <p>Free Wi-Fi</p>
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
                                    <td role="cell">3,500</td>
                                    <td role="cell">1,500,000</td>
                                    <td role="cell" onClick={() => loadSpaceModal('Exclusive Use', 1500000, 3500, 19)}><a
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
                                       defaultValue="Muri Park" disabled/>
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

export default Muri;