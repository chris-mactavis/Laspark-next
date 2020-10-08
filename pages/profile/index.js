import React from "react";
import {auth} from "../../Components/hoc/auth";
import Head from "next/head";
import Layout from "../../Components/Layout";
import axiosInstance from "../../config/axios";
import Token from "../../Utils/Token";
import Link from "next/link";
import Router from "next/router";

const Profile = ({parkBookings, serviceBookings}) => {

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
                                parkBookings.map(booking => <tr role="row" key={booking.id} className="cursor-pointer" onClick={() => goToChat(booking.id, true)}>
                                    <td role="cell">#{booking.order_number}</td>
                                    <td role="cell">{booking.park_space.space} ({booking.park.name})</td>
                                    <td role="cell">{booking.amount_formatted}</td>
                                    <td role="cell">{booking.date}</td>
                                </tr>)
                            }
                            </tbody>
                        </table>
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
                                serviceBookings.map(booking => <tr role="row" key={booking.id} className="cursor-pointer" onClick={() => goToChat(booking.id)}>
                                    <td role="cell">#{booking.order_number}</td>
                                    <td role="cell">{booking.service.service}</td>
                                    <td role="cell">{booking.purpose}</td>
                                    <td role="cell">{booking.local_government}</td>
                                </tr>)
                            }
                            </tbody>
                        </table>
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
    const {data: {park_space_booking: parkBookings, service_booking: serviceBookings}} = await axiosInstance.get('my-profile-content', {
        headers: {
            Authorization: `Bearer ${Token(context)}`
        }
    });

    return {
        parkBookings,
        serviceBookings
    }
}

export default auth(Profile);