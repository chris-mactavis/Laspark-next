import Link from "next/link";
import React, { useEffect } from "react";
import {logout} from "../store/actions/auth";
import {useDispatch} from "react-redux";
import {showNotifier} from "../store/actions/notifier";
import Router from "next/router";

const Nav = ({isLoggedIn, hasHeader}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        $(document).ready(function(){
            $('.dropdown-toggle').on('click', function() {
                $('.dropdown-menu').toggleClass('show');
            })
        });
    },[]);


    const logoutHandler = () => {
        window.location = 'http://157.230.237.165/';
        dispatch(logout());
        dispatch(showNotifier('Logged Out'));
        // Router.push('http://157.230.237.165/');
    }

    return <div className="navbar-collapse collapse ml-auto" id="navbarSupportedContent">
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

            <li className="nav-item">
                <a href="http://157.230.237.165" className="nav-link">Home</a>
            </li>

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

            { isLoggedIn &&  <li className="nav-item dropdown">
                <a className="nav-link notification-link dropdown-toggle"> 
                    <img src={hasHeader == false ? "/images/icon/bell-green.svg" : "/images/icon/bell.svg"} style={{width: '25px'}} className="img-fluid" alt=""/>
                    <p className="notification-number">0</p>
                </a>
                <ul className="dropdown-menu">
                    <div className="d-flex justify-content-between align-items-center pl-3 pr-3 notification-bar">
                        <p className="head-text">Notifications</p>
                        <span>25 New</span>
                    </div>

                    <div className="scroll-container pl-3 pr-3">
                        <p className="head-text">Park Bookings</p>
                        <li>New Messages</li>
                        <li>New Messages</li>
                        <li>New Messages</li>     
                        <li>New Messages</li>
                        <li>New Messages</li>
                        <li>New Messages</li>
                        <li>New Messages</li>
                        <li>New Messages</li>

                        <li>New Messages</li>
                        <li>New Messages</li>
                        <li>New Messages</li>
                        <li>New Messages</li>
                        <li>New Messages</li>
                        <li>New Messages</li>
                        <li>New Messages</li>
                        <li>New Messages</li>
                        <li>New Messages</li>
                        <li>New Messages</li>

                        <li>New Messages</li>
                        <li>New Messages</li>

                        <p className="head-text">Service Bookings</p>
                        <li>New Messages</li>
                    </div>
                </ul>
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