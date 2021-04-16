import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import Cookies from 'js-cookie';

import {randomString} from '../Utils/String';
import {showNotifier} from '../store/actions/notifier';
import {loader} from '../store/actions/loader';
import axiosInstance from '../config/axios';


const ParkInvoice = ({invoice, billNumber, token }) => {

    const [transactionId, setTransactionId] = useState(randomString(20));
    const [stringHash, setStringHash] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const md5 = require('md5');
        Cookies.set('paymentInfo', JSON.stringify({
            amount: invoice.amount,
            booking_id: invoice.park_space_booking_id, 
            park_space_id: invoice.park_space_id,
            transactionId,
            billReference: billNumber,
            userToken: token,
            is_service: invoice.is_service
        }));
        const hashString = `${process.env.REVPAY_TOKEN}LASPARK${billNumber}${transactionId}${invoice.amount}` + "http://165.227.73.31/verify-payment";
        setStringHash(
            md5(hashString).toString().toUpperCase()
        )
    }, []);


    const payHandler = async () => {
        if (invoice.waiver === 1 && invoice.amount == 0) {
            dispatch(loader());
            try {
                await axiosInstance.post(`payment/update-payment`, {
                    park_space_id: invoice.park_space_id,
                    booking_id: invoice.park_space_booking_id,
                    amount: invoice.amount,
                    waived: 1
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                dispatch(showNotifier('Payment complete'))
                dispatch(loader());
                setTimeout(() => window.location = 'http://157.230.237.165', 1000);

            } catch (e) {
                console.log(e);
            }
        } else {
            document.getElementById('frm').submit();
            setIsLoading(true);
        }
    }
    return (
        <>
            <section className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h2 className="text-center mb-5">Payment Invoice</h2>
                        </div>
                    </div>

                    <div className="row booking-history">
                        <div className="col">
                            <table role="table">
                                <thead role="rowgroup">
                                    <tr role="row">
                                        <th role="columnheader">Item</th>
                                        <th role="columnheader">Value</th>
                                    </tr>
                                </thead>
                                <tbody role="rowgroup">
                                    <tr role="row">
                                        <td role="cell">Invoice Number</td>
                                        <td role="cell">{invoice.invoice_number}</td>
                                    </tr>
                                    <tr role="row">
                                        <td role="cell">Order Number</td>
                                        <td role="cell">{invoice.park_space_booking.order_number}</td>
                                    </tr>
                                    <tr role="row">
                                        <td role="cell">Bill To</td>
                                        <td role="cell">{invoice.user.first_name} {invoice.user.last_name}</td>
                                    </tr>
                                    <tr role="row">
                                        <td role="cell">Item Description</td>
                                        <td role="cell">{invoice.is_service ? invoice.service.service : invoice.park_space.parks_garden.name}</td>
                                    </tr>
                                    <tr role="row">
                                        <td role="cell">Amount</td>
                                        <td role="cell">₦{Intl.NumberFormat().format(invoice.amount)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col text-center d-flex flex-column">
                            <div>
                                <button type="button" disabled={isLoading} onClick={payHandler}
                                    className="btn extra-thin green-transparent">Pay
                                    Now
                            </button>
                            </div>
                            {(invoice.waiver === 0) &&
                                <small className="mt-2">Payment is non refundable!</small>}
                        </div>
                    </div>
                </div>
            </section>

            <form name="frm" id="frm" method="post" target="_parent"
                action="https://test.qpay.ng:7071/PaymentGateway/Index">
                <input type="hidden" name="type" value="Webguid" />
                <input type="hidden" name="transactionId" value={transactionId} />
                <input type="hidden" name="billReference" value={billNumber} />
                <input type="hidden" name="amount" value={invoice.amount} />
                <input type="hidden" name="returnUrl" value="http://165.227.73.31/verify-payment" />
                <input type="hidden" name="clientCode" value="LASPARK" />
                <input type="hidden" name="Hash" value={stringHash} />
            </form>

        </>
    )


};

export default ParkInvoice;