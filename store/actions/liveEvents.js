export const PARK_BOOKING_MESSAGE = 'PARK_BOOKING_MESSAGE';
export const SERVICE_BOOKING_MESSAGE = 'SERVICE_BOOKING_MESSAGE';

export const parkBookingMessage = data => ({type: PARK_BOOKING_MESSAGE, data });
export const serviceBookingMessage = data => ({type: SERVICE_BOOKING_MESSAGE, data });