import React from "react";
import Link from "next/link";

const HeaderContent = () => {
    return <>
        <div className="banner-description z-10">
            <h1>Laspark</h1>
            <p className="desc">Making a greener and healthier Lagos.</p>
            <div className="text-center">
                <Link href="/parks"><a className="btn w-200 white">Book a park</a></Link> &ensp;
                <Link href="/services"><a href="#" className="btn w-200 white">Request
                    Service</a></Link>
            </div>
        </div>

        <a href="#our-parks" className="z-10" id="scroll-down">
            <span className="arrow-down"/>
            <span id="scroll-title">Scroll down</span>
        </a>
    </>
}

export default HeaderContent;