import React from "react";
import {auth} from "../../Components/hoc/auth";
import Head from "next/head";
import Layout from "../../Components/Layout";
import axiosInstance from "../../config/axios";
import Token from "../../Utils/Token";
import Link from "next/link";
import Router from "next/router";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';


const Profile = ({parkBookings, serviceBookings}) => {
    console.log(serviceBookings, "services");
    console.log(parkBookings, "bookings");

    const goToChat = (bookingId, park = false) => {
        park
            ? Router.push('/profile/park-bookings/[id]', '/profile/park-bookings/' + bookingId)
            : Router.push('/profile/service-bookings/[id]', '/profile/service-bookings/' + bookingId);
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
                                parkBookings.data.map(booking => <Tr role="row" key={booking.id} className="cursor-pointer" onClick={() => goToChat(booking.id, true)} >
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
                                serviceBookings.data.map(booking => <Tr role="row" key={booking.id} className="cursor-pointer" onClick={() => goToChat(booking.id)}>
                                    <Td role="cell">#{booking.order_number}</Td>
                                    <Td role="cell">{booking.service.service}</Td>
                                    <Td role="cell">{booking.purpose}</Td>
                                    <Td role="cell">{booking.local_government}</Td>
                                    <Td role="cell"><button onClick={() => goToChat(booking.id)} className="btn extra-thin green-transparent">Send Message</button></Td>
                                </Tr>)
                            }
                            </Tbody>
                        </Table>
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
    const {data} = await axiosInstance.get('my-profile-content', {
        headers: {
            Authorization: `Bearer ${Token(context)}`
        }
    });

    console.log('profile', data);

    const {park_space_booking: parkBookings, service_booking: serviceBookings} = data;

    return {
        parkBookings,
        serviceBookings
    }
}

export default auth(Profile);