import Link from "next/link";
import React from "react";

const Nav = () => {
    return <div className="navbar-collapse ml-auto" id="navbarSupportedContent">
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link href="/parks"><a className="nav-link">Parks</a></Link>
            </li>

            <li className="nav-item">
                <Link href="/services"><a className="nav-link">Services</a></Link>
            </li>

            <li className="nav-item">
                <Link href="/contact-us"><a className="nav-link">Contact Us</a></Link>
            </li>

            <li className="nav-item">
                <Link href="/login"><a className="nav-link">login</a></Link>
            </li>

            <li className="nav-item btn extra-thin mr-0">
                <Link href="/signup"><a className="nav-link">Sign Up</a></Link>
            </li>
        </ul>
    </div>
}

export default Nav;