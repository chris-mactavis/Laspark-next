import Link from "next/link";
import React from "react";
import {logout} from "../store/actions/auth";
import {useDispatch} from "react-redux";
import {showNotifier} from "../store/actions/notifier";
import Router from "next/router";

const Nav = ({isLoggedIn}) => {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        window.location = 'http://138.197.187.14';
        dispatch(logout());
        dispatch(showNotifier('Logged Out'));
        // Router.push('http://138.197.187.14/');
    }

    return <div className="navbar-collapse ml-auto" id="navbarSupportedContent">
        <ul className="navbar-nav">
            {/*<li className="nav-item">*/}
            {/*    <Link href="/parks"><a className="nav-link">Parks</a></Link>*/}
            {/*</li>*/}

            {/*<li className="nav-item">*/}
            {/*    <Link href="/services"><a className="nav-link">Services</a></Link>*/}
            {/*</li>*/}

            {/*<li className="nav-item">*/}
            {/*    <Link href="/contact-us"><a className="nav-link">Contact Us</a></Link>*/}
            {/*</li>*/}

            {
                !isLoggedIn && <li className="nav-item">
                    <Link href="/login"><a className="nav-link">login</a></Link>
                </li>
            }

            {
                !isLoggedIn && <li className="nav-item btn extra-thin mr-0">
                    <Link href="/signup"><a className="nav-link">Sign Up</a></Link>
                </li>
            }

            {
                isLoggedIn && <li className="nav-item">
                    <Link href="/profile"><a className="nav-link">profile</a></Link>
                </li>
            }

            {
                isLoggedIn && <li className="nav-item">
                    <a className="nav-link" href="#" onClick={logoutHandler}>logout</a>
                </li>
            }
        </ul>
    </div>
}

export default Nav;