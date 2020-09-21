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

const Layout = ({children, headerContent, page = null, mainClass = null, headerClass = null, hasHeader = true}) => {
    const isLoggedIn = useSelector(state => state.auth.loggedIn);

    const showRules = useSelector(state => state.bookings.showParkRules);

    useEffect(() => {
        $('#parkRules').modal(showRules ? 'show' : 'hide');
    }, [showRules])

    return (
        <>
            <Head>
                <meta charSet="utf-8"/>


                <title>Laspark</title>
                <meta name="description" content=""/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>

                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16"
                      href="/images/favicon/favicon-16x16.png"/>
                <link rel="stylesheet"
                      href="/css/bootstrap.min.css"/>

                <link rel="stylesheet" type="text/css" href="/slick/slick.css"/>
                <link rel="stylesheet" type="text/css" href="/slick/slick-theme.css"/>

                {/*<meta*/}
                {/*    name="description"*/}
                {/*    content="Learn how to build a personal website using Next.js"*/}
                {/*/>*/}
                {/*<meta*/}
                {/*    property="og:image"*/}
                {/*    content={`https://og-image.now.sh/${encodeURI(*/}
                {/*        siteTitle*/}
                {/*    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}*/}
                {/*/>*/}
                {/*<meta name="og:title" content={siteTitle} />*/}
                {/*{meta}*/}

                <script src="https://code.jquery.com/jquery-3.4.1.min.js"
                        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
                        crossOrigin="anonymous"/>
                <script type="text/javascript" src="/slick/slick.min.js"/>
                <script src="/js/bootstrap.min.js"/>
                <script src="/js/crypto-js.min.js"/>
                <script src="/js/main.js"/>
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
                            <Link href="/">
                                <a className="navbar-brand logo-container">
                                    <img src="/images/laspark-logo.png" alt=""/>
                                </a>
                            </Link>

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