import Link from "next/link";
import React, { useEffect, useState } from "react";
import {logout} from "../store/actions/auth";
import {useDispatch, useSelector} from "react-redux";
import {showNotifier} from "../store/actions/notifier";
import { updateMessage } from "../store/actions/liveEvents";
import Router from "next/router";
import Cookies from "js-cookie";
import axiosInstance from "../config/axios";
import {setNotifications} from "../store/actions/notifications";

const Nav = ({isLoggedIn, hasHeader}) => {
    const dispatch = useDispatch();

    const allNotifications = useSelector(state => state.notifications.allNotifications) || [];
    const messageUpdate = useSelector(state => state.liveEvent.updatedMessage);

    
    const [ notification, setNotification ] = useState(allNotifications);
    const [ readNotifications, setReadNotifications ] = useState([]);

   
    
    useEffect(() => {
        const filterNotification = notification.filter(filtNotifity => filtNotifity.read_at === null);
        setReadNotifications(filterNotification);    
    }, [notification]);


    useEffect(() => {
        const fetchMyNotification = async () => {
            try {
                const token = Cookies.get('token');
                const {data} = await axiosInstance.get('fetch-my-notifications', { headers: { Authorization: `Bearer ${token}` }
                });

                Cookies.set('notificatons', JSON.stringify(data.data));
                setNotification(data.data);
                dispatch(setNotifications(data.data));
                dispatch(updateMessage(false));
            } catch (e) {     
                console.log(e.response)
            }
        }    

        if (isLoggedIn || messageUpdate) {
            fetchMyNotification();
        }
    }, [messageUpdate, isLoggedIn]);


    useEffect(() => {
        const theNotifications = Cookies.get('notifications') ? JSON.parse(Cookies.get('notifications')) : [];

        setNotification(theNotifications);
    }, []);
  

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
    };

    const gotoUrl = async (message, id) => {
       
        try {
            const token = Cookies.get('token');
            const {data} = await axiosInstance.post(`${id}/mark-as-read`, [], { headers: { Authorization: `Bearer ${token}` }
            });

            const objKey = message.data;
            const newObjKeys = Object.keys(objKey)[0];

            if (newObjKeys === "park_space_booking_id") {
                Router.push(`/profile/park-bookings/${message.data.park_space_booking_id}`);
            } else {
                Router.push(`/profile/service-bookings/${message.data.service_booking_id}`);
            }

        } catch (e) {     
            console.log(e.response)
        }
    }

    const markAllNotificationAsRead = async () => {
        try {
            const token = Cookies.get('token');
            const {data} = await axiosInstance.post('mark-all-as-read', [], { headers: { Authorization: `Bearer ${token}` }
            });
            Cookies.remove('notificatons');
            setNotification([]);
            dispatch(setNotifications([]));
        } catch (e) {     
            console.log(e.response)
        }
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
                    <p className="notification-number">{readNotifications.length}</p>
                </a>
                <ul className="dropdown-menu">
                    <div className="d-flex justify-content-between align-items-center pl-3 pr-3 notification-bar">
                        <p className="head-text">Messages</p>
                        <span>{notification.length} New</span>
                    </div>

                    <div className="scroll-container pl-3 pr-3">
                       {readNotifications.length === 0 && <p className="head-text">No messages</p> }
                        {notification.map((message) => {
                            // function formatAMPM(date) {
                            //     var hours = date.getHours();
                            //     var minutes = date.getMinutes();
                            //     var ampm = hours >= 12 ? 'pm' : 'am';
                            //     hours = hours % 12;
                            //     hours = hours ? hours : 12; // the hour '0' should be '12'
                            //     minutes = minutes < 10 ? '0'+minutes : minutes;
                            //     var strTime = hours + ':' + minutes + ' ' + ampm;
                            //     return strTime;
                            // }
                            // const time = formatAMPM(new Date(message.created_at));
                            
                            return <div onClick={() => gotoUrl(message, message.id)} key={message.id} className="message-container">
                                        <div className="message-link">
                                            <p className="head-text">New message</p>
                                            <li>Laspark sent a message</li>
                                            <span>{message.created_at}</span>
                                        </div>    
                                    </div>
                        })}
                    </div>
                    {notification.length > 1 &&<div className="d-flex justify-content-between align-items-center pl-3 pr-3 notification-bottom notification-bar">
                       <a onClick={markAllNotificationAsRead}><p className="head-text">Mark all as read</p></a> 
                    </div>}
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
