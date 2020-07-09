import Layout from "../Components/Layout";
import React, {useEffect} from "react";
import HeaderContent from "../Components/home/HeaderContent";
import Head from "next/head";

const Home = () => {

    useEffect(() => {
        $('document').ready(function () {
            $('.banner-slide').slick({
                autoplay: true,
                fade: true
            });

            $('.park-slider').slick({
                autoplay: true,
                slidesToShow: 3,
                dots: true,
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
        });
    }, []);

    return <Layout headerContent={<HeaderContent/>} page="home" headerClass="home-banner">

        <Head>
            <title>SI Fuse</title>
        </Head>

        <section id="our-parks" className="our-parks">
            <div className="leaf-bg">
                <img src="/images/leaf-background.png" alt=""/>
            </div>

            <div className="palm-bg">
                <img src="/images/Palm-background.png" alt=""/>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2 className="text-center mb-5">Book Our Parks</h2>
                    </div>
                </div>

                <div className="row park-slider">
                    <div className="col-md-4">
                        <a className="park">
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
                        <a className="park">
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
                        <a className="park">
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
                        <a className="park">
                            <img className="img-fluid" src="/images/parks/muri-okunola.jpg"/>

                            <div className="content">
                                <h5>Muri Okunola Park</h5>

                                <div className="location">
                                    <img className="pin" src="/images/icon/location-green.svg"/> Victoria Island, Eti-Osa
                                </div>

                                <div className="view">View Park <img className="arrow-right"
                                                                     src="/images/icon/arrow-right-green.svg"/></div>
                            </div>
                        </a>
                    </div>

                    <div className="col-md-4">
                        <a className="park">
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
                        <a className="park">
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
                        <a className="park">
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
                        <a className="park">
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
                        <a className="park">
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
                        <a className="park">
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

                <div className="text-center">
                    <a href="#" className="btn green wide">Explore Parks</a>
                </div>
            </div>
        </section>

        <section className="our-services">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2 className="text-center">Request Our Services</h2>
                    </div>
                </div>
            </div>

        </section>

    </Layout>
}

export default Home;