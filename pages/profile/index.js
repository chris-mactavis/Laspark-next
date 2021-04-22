import React, {useState} from "react";
import {auth} from "../../Components/hoc/auth";
import Head from "next/head";
import Layout from "../../Components/Layout";
import axiosInstance from "../../config/axios";
import Token from "../../Utils/Token";
import Link from "next/link";
import Router from "next/router";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

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
                        <Table role="table">
                            <Thead role="rowgroup">
                            <Tr role="row">
                                <Th role="columnheader">Order #</Th>
                                <Th role="columnheader">Park Space(Park)</Th>
                                <Th role="columnheader">Amount(₦)</Th>
                                <Th role="columnheader">Event Date</Th>
                                <Th role="columnheader">Booking Date</Th>
                                <Th role="columnheader">Booking Status</Th>
                                <Th role="columnheader">Action</Th>
                            </Tr>
                            </Thead>
                            <Tbody role="rowgroup">
                            {
                                parkBookingsData.map(booking => <Tr role="row" key={booking.id} className="cursor-pointer" onClick={() => goToChat(booking.id, true)} >
                                    <Td role="cell">#{booking.order_number}</Td>
                                    <Td role="cell">{booking.park_space.space} ({booking.park.name})</Td>
                                    <Td role="cell">{booking.amount_formatted}</Td>
                                    {booking.end_date ? <Td role="cell">{booking.start_date} - {booking.end_date} </Td> : <Td role="cell">{booking.start_date} </Td>}
                                    <Td role="cell">{booking.date_added}</Td>
                                    <Td role="cell">{booking.booking_status}</Td>
                                    <Td role="cell"><button onClick={() => goToChat(booking.id, true)} className="btn extra-thin green-transparent">Send Message</button></Td>
                                </Tr>)
                            }
                            </Tbody>
                        </Table>

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
                        <Table role="table">
                            <Thead role="rowgroup">
                            <Tr role="row">
                                <Th role="columnheader">Order #</Th>
                                <Th role="columnheader">Service</Th>
                                <Th role="columnheader">Purpose</Th>
                                <Th role="columnheader">Location</Th>
                                <Th role="columnheader">Action</Th>
                            </Tr>
                            </Thead>
                            <Tbody role="rowgroup">
                            {
                                serviceBookingData.map(booking => <Tr role="row" key={booking.id} className="cursor-pointer" onClick={() => goToChat(booking.id)}>
                                    <Td role="cell">#{booking.order_number}</Td>
                                    <Td role="cell">{booking.service.service}</Td>
                                    <Td role="cell">{booking.purpose}</Td>
                                    <Td role="cell">{booking.local_government}</Td>
                                    <Td role="cell"><button onClick={() => goToChat(booking.id)} className="btn extra-thin green-transparent">Send Message</button></Td>
                                </Tr>)
                            }
                            </Tbody>
                        </Table>

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

    const perPage = 5;
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
