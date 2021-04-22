import { useDispatch } from "react-redux";
import Pusher from 'pusher-js';
import {useEffect} from 'react';

import { updateMessage } from "../../store/actions/liveEvents";


const ComponentWrapper = ({Component, pageProps}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        Pusher.logToConsole = false;
        const pusher = new Pusher('db943f16ad7c7991b14b', {
            cluster: 'eu',
            forceTLS: true
        });

        // Live park message Update
        const parkBookingChannel = pusher.subscribe('new-park-space-booking-message');
        parkBookingChannel.bind('App\\Events\\NewUserParkSpaceBookingMessage', eventData => {
            dispatch(updateMessage(true));
        });

        // Live service message update
        const serviceBookingChannel = pusher.subscribe('new-service-booking-message');
        serviceBookingChannel.bind('App\\Events\\NewUserServiceBookingMessage', eventData => {
            dispatch(updateMessage(true));
        });

           
    }, []);
    return <Component {...pageProps} />   
};

export default ComponentWrapper;    