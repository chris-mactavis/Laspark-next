import { useDispatch } from "react-hook-form";
import Pusher from 'pusher-js';
import {useEffect} from 'react';


const ComponentWrapper = ({Component, pageProps}) => {
    useEffect(() => {
        Pusher.logToConsole = false;
        const pusher = new Pusher('db943f16ad7c7991b14b', {
            cluster: 'eu',
            forceTLS: true
        });

        // Live Product Update
        const parkBookingChannel = pusher.subscribe('new-park-space-booking-message');
        parkBookingChannel.bind('App\\Events\\NewParkSpaceBookingMessage', eventData => {
             console.log(eventData, 'parkBookingChannel');
            // dispatch(productUpdated(true));
        });

        
    }, []);
    return <Component {...pageProps} />
};

export default ComponentWrapper;