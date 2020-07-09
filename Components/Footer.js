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
                                <a href="">
                                    Plot 2, Lateef Junaid Dosumu Street, CBD, Agidingbi, Ikeja, Lagos.
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Phone</h5>
                        <ul>
                            <li><a href="tel:0800LASPARK">0800-LASPARK</a></li>
                            <li><a href="tel:08005277275">0800 527 7275</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Email</h5>
                        <ul>
                            <li><a href="mailto:info@laspark.lg.gov.ng">info@laspark.lg.gov.ng</a></li>
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