import Link from "next/link";

const TopBar = ({isLoggedIn, page, headerContent}) => {
    return <>
        {
            page === 'home' && <div className="banner-slide">
                <img src="/images/banner.jpg"/>
                <img src="/images/banner-2.jpg"/>
                <img src="/images/banner-3.jpg"/>
                <img src="/images/banner-4.jpg"/>
                <img src="/images/banner-5.jpg"/>
            </div>
        }

        <div className="container position-relative z-10">
            <nav className="navbar navbar-expand-lg">
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

                <div className="navbar-collapse ml-auto" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link href="/explore"><a className="nav-link">Parks</a></Link>
                        </li>

                        <li className="nav-item">
                            <Link href="/services"><a className="nav-link">Services</a></Link>
                        </li>

                        <li className="nav-item">
                            <Link href="/contact-us"><a className="nav-link">Contact Us</a></Link>
                        </li>

                        {
                            isLoggedIn && <li className="nav-item">
                                <Link href="/my-account"><a className="nav-link">my account</a></Link>
                            </li>
                        }

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
                    </ul>
                </div>
            </nav>
        </div>

        <div className="sidebar">
            <button id="close-btn">
                <img src="/images/icon/return-button.svg" alt="" className="img-fluid"/>
            </button>

            <ul className="profile-list">
                <li>
                    <a href="profile.html">Profile <img src="/images/icon/profile.svg" alt=""/></a>
                </li>
                <li>
                    <a href="booking-history.html">Booking History <img src="/images/icon/booking-history.svg"
                                                                        alt=""/></a>
                </li>
                <li>
                    <a href="service-history.html">Service History <img src="/images/icon/service-history.svg"
                                                                        alt=""/></a>
                </li>
            </ul>

            <ul className="links">
                <li>
                    <a href="service.html">Services</a>
                </li>
                <li>
                    <a href="explore.html">Explore</a>
                </li>
                <li>
                    <a href="contact-us.html">Contact Us</a>
                </li>
                <li>
                    <a href="#">Logout</a>
                </li>
            </ul>
        </div>

        {headerContent}
    </>
}

export default TopBar;