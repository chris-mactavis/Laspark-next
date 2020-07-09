import React from "react";
import Router from "next/router";
import Cookies from 'js-cookie'

export const withoutAuth = Component => {
    const isServer = typeof window === 'undefined';

    const Wrapper = (props) => {
        if (props.isLoggedIn && !isServer) {
            Router.push('/')
        }

        return <Component {...props} />
    }

    Wrapper.getInitialProps = async (ctx) => {

        let isLoggedIn;
        if (isServer && ctx.res) {
            isLoggedIn = ctx.req.cookies && !!ctx.req.cookies.token;
            if (isLoggedIn) {
                ctx.res.writeHead(302, {Location: '/'});
                ctx.res.end();
            }
        } else {
            isLoggedIn = !!Cookies.get('token');
        }

        const componentProps =
            Component.getInitialProps &&
            (await Component.getInitialProps(ctx));

        return {...componentProps, isLoggedIn};
    }

    return Wrapper;
}