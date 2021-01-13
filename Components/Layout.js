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
// import NProgress from 'nprogress';
import Router from 'next/router';

// Router.onRouteChangeStart = url => {
//     console.log(url);
//     NProgress.start();
// };

// Router.onRouteChangeComplete = ()  => NProgress.done();

// Router.onRouteChangeError = ()  => NProgress.done();


const Layout = ({children, headerContent, page = null, mainClass = null, headerClass = null, hasHeader = true}) => {
    const isLoggedIn = useSelector(state => state.auth.loggedIn);

    const showRules = useSelector(state => state.bookings.showParkRules);

    useEffect(() => {
        $('#parkRules').modal(showRules ? 'show' : 'hide');
    }, [showRules])

    return (
        <>
             <Head>
                <title>Laspark</title>

                <meta charSet="utf-8" />

                <meta name="description" content="" />

                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <link rel="stylesheet" href="/css/bootstrap.min.css" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"></link>

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" crossorigin="anonymous" />

                <link rel="stylesheet" type="text/css" href="/slick/slick.css" />
                <link rel="stylesheet" type="text/css" href="/slick/slick-theme.css" />



                <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDWajwZf_MGn2k5vVYECfrtphdGTCAKurg&libraries=places"></script>
                <script src="https://code.jquery.com/jquery-3.4.1.min.js"
                    integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
                    crossOrigin="anonymous" />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min.js"></script>
                <script type="text/javascript" src="/slick/slick.min.js" />
                <script src="/js/bootstrap.min.js" />
                <script src="/js/main.js" />
            </Head>
            

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