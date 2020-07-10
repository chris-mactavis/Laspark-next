import React from "react";

const Footer = () => {
    return <>
        <footer className="footer text-center">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5>Address</h5>
                        <ul>
                            <li>
                                <a target="_blank" href="https://goo.gl/maps/iCe4n5nUs7wcWzwD9">
                                    Plot 2, Lateef Junaid Dosumu Street, CBD, Agidingbi, Ikeja, Lagos.
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Contact</h5>
                        <ul>
                            <li><a href="tel:07005277275">0700LASPARK</a></li>
                            <li><a href="mailto:info@laspark.lg.gov.ng">info@laspark.lg.gov.ng</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Online</h5>
                        <ul>
                            <li>
                                <a target="_blank" href="https://facebook.com/lasparklagos"><img
                                    src="/images/icon/facebook.svg"/></a>
                                <a target="_blank" href="https://twitter.com/lasparklagos"><img
                                    src="/images/icon/twitter.svg"/></a>
                                <a target="_blank" href="https://instagram.com/lasparklagos"><img
                                    src="/images/icon/instagram.svg"/></a>
                            </li>

                            <li>
                                <a target="_blank"
                                   href="https://www.laspark.lagosstate.gov.ng">www.laspark.lagosstate.gov.ng</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>

        <div className="footer-bottom text-center">
            <div className="container">
                <div className="row mb-5">
                    <div className="col">
                        <img src="/images/lagos-logo.jpg" alt=""/> &ensp; <img src="/images/laspark-logo.png" alt=""/>
                    </div>
                </div>

                <div className="row">
                    <div className="col text-center">
                        <p> &copy;2020. All Rights Reserved. Lagos State Parks & Gardens. </p>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Footer;