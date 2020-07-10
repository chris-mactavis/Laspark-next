import Layout from "../../Components/Layout";
import Head from "next/head";
import React from "react";
import Link from "next/link";
import Router from "next/router";

const Parks = () => {
    const goToPark = (parkUrl) => {
        Router.push('/parks/' + parkUrl);
    }

    return <Layout hasHeader={false}>
        <Head>
            <title>Parks | Laspark</title>
        </Head>

        <section className="our-parks">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2 className="text-center mb-5">Choose a Park</h2>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <a className="park" onClick={() => goToPark('johnson-jakande-tinubu-park')}>
                            <img className="img-fluid" src="/images/parks/johnson-jakande.jpg"/>

                            <div className="content">
                                <h5>Johnson Jakande Tinubu Park</h5>

                                <div className="location">
                                    <img className="pin" src="/images/icon/location-green.svg"/> Alausa, Ikeja
                                </div>

                                <div className="view">View Park <img className="arrow-right"
                                                                     src="/images/icon/arrow-right-green.svg"/></div>
                            </div>
                        </a>
                    </div>

                    <div className="col-md-4">
                            <a className="park" onClick={() => goToPark('ndubuisi-kanu-park')}>
                                <img className="img-fluid" src="/images/parks/ndubuisi-kanu.jpg"/>

                                <div className="content">
                                    <h5>Ndubuisi Kanu Park</h5>

                                    <div className="location">
                                        <img className="pin" src="/images/icon/location-green.svg"/> Alausa, Ikeja
                                    </div>

                                    <div className="view">View Park <img className="arrow-right"
                                                                         src="/images/icon/arrow-right-green.svg"/></div>
                                </div>
                            </a>
                    </div>

                    <div className="col-md-4">
                        <a className="park" onClick={() => goToPark('oluyomi')}>
                            <img className="img-fluid" src="/images/parks/oluyomi-abayomi.jpg"/>

                            <div className="content">
                                <h5>Dr. Oluyomi Abayomi Finnih Park</h5>

                                <div className="location">
                                    <img className="pin" src="/images/icon/location-green.svg"/> Allen, Ikeja
                                </div>

                                <div className="view">View Park <img className="arrow-right"
                                                                     src="/images/icon/arrow-right-green.svg"/></div>
                            </div>
                        </a>
                    </div>

                    <div className="col-md-4">
                        <a className="park" onClick={() => goToPark('muri')}>
                            <img className="img-fluid" src="/images/parks/muri-okunola.jpg"/>

                            <div className="content">
                                <h5>Muri Okunola Park</h5>

                                <div className="location">
                                    <img className="pin" src="/images/icon/location-green.svg"/> Victoria Island,
                                    Eti-Osa
                                </div>

                                <div className="view">View Park <img className="arrow-right"
                                                                     src="/images/icon/arrow-right-green.svg"/></div>
                            </div>
                        </a>
                    </div>

                    <div className="col-md-4">
                        <a className="park" onClick={() => goToPark('ikorodu')}>
                            <img className="img-fluid" src="/images/parks/ikorodu.jpg"/>

                            <div className="content">
                                <h5>Ikorodu Recreational Park</h5>

                                <div className="location">
                                    <img className="pin" src="/images/icon/location-green.svg"/> Ikorodu, Lagos
                                </div>

                                <div className="view">View Park <img className="arrow-right"
                                                                     src="/images/icon/arrow-right-green.svg"/></div>
                            </div>
                        </a>
                    </div>

                    <div className="col-md-4">
                        <a className="park" onClick={() => goToPark('rafiu')}>
                            <img className="img-fluid" src="/images/parks/alimosho-park.jpg"/>

                            <div className="content">
                                <h5>Rafiu Jafojo Park</h5>

                                <div className="location">
                                    <img className="pin" src="/images/icon/location-green.svg"/> Shasha, Alimosho
                                </div>

                                <div className="view">View Park <img className="arrow-right"
                                                                     src="/images/icon/arrow-right-green.svg"/></div>
                            </div>
                        </a>
                    </div>

                    <div className="col-md-4">
                        <a className="park" onClick={() => goToPark('jibowu')}>
                            <img className="img-fluid" src="/images/parks/infinity-park.jpg"/>

                            <div className="content">
                                <h5>Infinity Park</h5>

                                <div className="location">
                                    <img className="pin" src="/images/icon/location-green.svg"/> Jibowu, Yaba
                                </div>

                                <div className="view">View Park <img className="arrow-right"
                                                                     src="/images/icon/arrow-right-green.svg"/></div>
                            </div>
                        </a>
                    </div>

                    <div className="col-md-4">
                        <a className="park" onClick={() => goToPark('gani')}>
                            <img className="img-fluid" src="/images/parks/gani-fawehinmi.jpg"/>

                            <div className="content">
                                <h5>Gani Fawehinmi Park</h5>

                                <div className="location">
                                    <img className="pin" src="/images/icon/location-green.svg"/> Ojota, Ikorodu Road
                                </div>

                                <div className="view">View Park <img className="arrow-right"
                                                                     src="/images/icon/arrow-right-green.svg"/></div>
                            </div>
                        </a>
                    </div>

                    <div className="col-md-4">
                        <a className="park" onClick={() => goToPark('badagry')}>
                            <img className="img-fluid" src="/images/parks/badagry.jpg"/>

                            <div className="content">
                                <h5>Badagry Recreational Park</h5>

                                <div className="location">
                                    <img className="pin" src="/images/icon/location-green.svg"/> Hospital Road, Badagry
                                </div>

                                <div className="view">View Park <img className="arrow-right"
                                                                     src="/images/icon/arrow-right-green.svg"/></div>
                            </div>
                        </a>
                    </div>

                    <div className="col-md-4">
                        <a className="park" onClick={() => goToPark('tunji')}>
                            <img className="img-fluid" src="/images/parks/tunji-braithwaite.jpg"/>

                            <div className="content">
                                <h5>Tunji Braithwaite Park</h5>

                                <div className="location">
                                    <img className="pin" src="/images/icon/location-green.svg"/> Dolphin Estate, Ikoyi
                                </div>

                                <div className="view">View Park <img className="arrow-right"
                                                                     src="/images/icon/arrow-right-green.svg"/></div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
}

export default Parks;