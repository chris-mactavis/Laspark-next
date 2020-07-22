import React from "react";
import {auth} from "../../Components/hoc/auth";
import Head from "next/head";
import Layout from "../../Components/Layout";
import axiosInstance from "../../config/axios";
import Token from "../../Utils/Token";
import Link from "next/link";

const Profile = ({parkBookings, serviceBookings}) => {
    console.log(parkBookings);
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
                                <th role="columnheader">Park Space(Park)</th>
                                <th role="columnheader">Amount Paid(₦)</th>
                                <th role="columnheader">Date Booked</th>
                            </tr>
                            </thead>
                            <tbody role="rowgroup">
                            {
                                parkBookings.map(booking => <tr role="row" key={booking.id}>
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
                                <th role="columnheader">Service</th>
                                <th role="columnheader">Amount Paid(₦)</th>
                                <th role="columnheader">Date Booked</th>
                                <th role="columnheader">Status</th>
                            </tr>
                            </thead>
                            <tbody role="rowgroup">
                            <tr role="row">
                                <td role="cell">Exclusive Use</td>
                                <td role="cell">1,500,000</td>
                                <td role="cell">3,500</td>
                                <td role="cell">3,500</td>
                            </tr>
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