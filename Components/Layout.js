import React, {useEffect} from "react";
import Head from "next/head";
import TopBar from "./TopBar";
import Footer from "./Footer";
import Loader from "./UI/Loader";
import Notifier from "./UI/Notifier";
import Nav from "./Nav";
import Link from "next/link";
import {useSelector} from "react-redux";
import ParkRules from "./ParkRules";
import NProgress from 'nprogress';
import Router from 'next/router';

Router.onRouteChangeStart = url => {
    console.log(url);
    NProgress.start();
};

Router.onRouteChangeComplete = ()  => NProgress.done();

Router.onRouteChangeError = ()  => NProgress.done();


const Layout = ({children, headerContent, page = null, mainClass = null, headerClass = null, hasHeader = true}) => {
    const isLoggedIn = useSelector(state => state.auth.loggedIn);

    const showRules = useSelector(state => state.bookings.showParkRules);

    useEffect(() => {
        $('#parkRules').modal(showRules ? 'show' : 'hide');
    }, [showRules])

    return (
        <>
            

            

            <Loader/>

            <Notifier/>

            <main className={mainClass}>
                {
                    hasHeader && <header className={headerClass}>
                        <TopBar isLoggedIn={isLoggedIn} page={page} headerContent={headerContent}/>
                    </header>
                }

                {
                    !hasHeader && <nav className="navbar navbar-expand-lg white-nav">
                        <div className="container">
                            <a href="http://138.197.187.14" className="navbar-brand logo-container">
                                <img src="/images/laspark-logo.png" alt=""/>
                            </a>

                            <button className="navbar-toggler" id="show-nav" type="button" data-toggle="collapse"
                                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <img className="navbar-toggler-icon" src="/images/icon/button.svg" alt=""/>
                            </button>

                            <Nav isLoggedIn={isLoggedIn}/>
                        </div>
                    </nav>
                }

                {children}
            </main>

            <ParkRules/>

            <Footer/>
        </>
    )
}

export default Layout;