import React, {useState} from "react";
import {auth} from "../../Components/hoc/auth";
import Head from "next/head";
import Layout from "../../Components/Layout";
import axiosInstance from "../../config/axios";
import Token from "../../Utils/Token";
import Link from "next/link";
import Router from "next/router";
import Pagination from "../../Components/Pagination";
import Cookies from "js-cookie";

const Profile = ({
                     parkBookings: {
                         data,
                         current_page,
                         last_page: lastPage,
                     },
                     serviceBookings: {
                         data: service_data,
                         current_page: service_current_page,
                         last_page: serviceLastPage,
                     },
                     perPage
                 }) => {

    const [parkBookingsData, setParkBookingsData] = useState(data);
    const [currentPage, setCurrentPage] = useState(current_page);

    const [serviceBookingData, setServiceBookingData] = useState(service_data);
    const [serviceCurrentPage, setServiceCurrentPage] = useState(service_current_page);

    const goToChat = (bookingId, park = false) => {
        park
            ? Router.push('/profile/park-bookings/[id]', '/profile/park-bookings/' + bookingId)
            : Router.push('/profile/service-bookings/[id]', '/profile/service-bookings/' + bookingId);
    }

    const paginationHandler = async (type = 'parkSpace', first = false, last = false, inc = true) => {
        try {
            if (type === 'parkSpace') {
                let page = first ? 1 : (last ? lastPage : (inc ? currentPage + 1 : currentPage - 1));
                const {data: {park_space_booking}} = await axiosInstance.get(`my-profile-content?per_page=${perPage}&page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`
                    }
                });

                let parkSpaceBooking = park_space_booking.data;

                if (!Array.isArray(parkSpaceBooking)) {
                    parkSpaceBooking = Object.keys(parkSpaceBooking).map(x => parkSpaceBooking[x]);
                }

                setCurrentPage(park_space_booking.current_page);
                setParkBookingsData(parkSpaceBooking);
            } else {
                let page = first ? 1 : (last ? serviceLastPage : (inc ? serviceCurrentPage + 1 : serviceCurrentPage - 1));
                const {data: {service_booking}} = await axiosInstance.get(`my-profile-content?per_page=${perPage}&page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`
                    }
                });

                let serviceBooking = service_booking.data;

                if (!Array.isArray(serviceBooking)) {
                    serviceBooking = Object.keys(serviceBooking).map(x => serviceBooking[x]);
                }

                setServiceCurrentPage(service_booking.current_page);
                setServiceBookingData(serviceBooking);
            }


        } catch (e) {
            console.log(e);
        }

    }

    return <Layout hasHeader={false}>
        <Head>
            <title>My Profile | Laspark</title>
        </Head>

        <section className="profile">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2 className="text-center mb-5">My Profile</h2>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <h5>Park Space Bookings</h5>
                    </div>
                </div>

                <div className="row booking-history">
                    <div className="col">
                        <table role="table">
                            <thead role="rowgroup">
                            <tr role="row">
                                <th role="columnheader">Order #</th>
                                <th role="columnheader">Park Space(Park)</th>
                                <th role="columnheader">Amount Paid(₦)</th>
                                <th role="columnheader">Date Booked</th>
                            </tr>
                            </thead>
                            <tbody role="rowgroup">
                            {
                                parkBookingsData.map(booking => <tr role="row" key={booking.id}
                                                                    className="cursor-pointer"
                                                                    onClick={() => goToChat(booking.id, true)}>
                                    <td role="cell">#{booking.order_number}</td>
                                    <td role="cell">{booking.park_space.space} ({booking.park.name})</td>
                                    <td role="cell">{booking.amount_formatted}</td>
                                    {booking.end_date ?
                                        <td role="cell">{booking.start_date} - {booking.end_date} </td> :
                                        <td role="cell">{booking.start_date} </td>}
                                </tr>)
                            }
                            </tbody>
                        </table>

                        <Pagination currentPage={currentPage}
                                    prevPageHandler={() => paginationHandler('parkSpace', false, false, false)}
                                    nextPageHandler={() => paginationHandler('parkSpace', false, false)}
                                    firstPageHandler={() => paginationHandler('parkSpace', true)}
                                    lastPageHandler={() => paginationHandler('parkSpace', false, true)}
                                    lastPage={lastPage}
                        />
                    </div>
                </div>


                <div className="row mt-5">
                    <div className="col">
                        <h5>Service Bookings</h5>
                    </div>
                </div>

                <div className="row booking-history">
                    <div className="col">
                        <table role="table">
                            <thead role="rowgroup">
                            <tr role="row">
                                <th role="columnheader">Order #</th>
                                <th role="columnheader">Service</th>
                                <th role="columnheader">Purpose</th>
                                <th role="columnheader">Location</th>
                            </tr>
                            </thead>
                            <tbody role="rowgroup">
                            {
                                serviceBookingData.map(booking => <tr role="row" key={booking.id}
                                                                      className="cursor-pointer"
                                                                      onClick={() => goToChat(booking.id)}>
                                    <td role="cell">#{booking.order_number}</td>
                                    <td role="cell">{booking.service.service}</td>
                                    <td role="cell">{booking.purpose}</td>
                                    <td role="cell">{booking.local_government}</td>
                                </tr>)
                            }
                            </tbody>
                        </table>

                        <Pagination currentPage={serviceCurrentPage}
                                    prevPageHandler={() => paginationHandler('serviceBooking', false, false, false)}
                                    nextPageHandler={() => paginationHandler('serviceBooking', false, false)}
                                    firstPageHandler={() => paginationHandler('serviceBooking', true)}
                                    lastPageHandler={() => paginationHandler('serviceBooking', false, true)}
                                    lastPage={serviceLastPage}
                        />
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col text-center">
                        <Link href="/profile/edit">
                            <a
                                className="btn extra-thin green-transparent">Edit Profile</a>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
}

Profile.getInitialProps = async (context) => {
    const perPage = 10;
    const {
        data: {
            park_space_booking: parkBookings,
            service_booking: serviceBookings
        }
    } = await axiosInstance.get(`my-profile-content?per_page=${perPage}`, {
        headers: {
            Authorization: `Bearer ${Token(context)}`
        }
    });

    return {
        parkBookings: parkBookings,
        serviceBookings: serviceBookings,
        perPage
    }
}

export default auth(Profile);
