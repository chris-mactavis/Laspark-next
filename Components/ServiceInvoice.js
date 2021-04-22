import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import Cookies from 'js-cookie';

import {randomString} from '../Utils/String';
import {showNotifier} from '../store/actions/notifier';
import {loader} from '../store/actions/loader';
import axiosInstance from '../config/axios';

import BankList from '../Components/BankList';




const ServiceInvoice = ({invoice, billNumber, token}) => {
        const serviceType = invoice.service_booking.service.service;

     const [transactionId, setTransactionId] = useState(randomString(20));
     const [stringHash, setStringHash] = useState(null);
     const [isLoading, setIsLoading] = useState(true);
     const [paymentOption, setPaymentOption] = useState('');
 
     const dispatch = useDispatch();

     useEffect(() => {
        const md5 = require('md5');
        Cookies.set('paymentInfo', JSON.stringify({
            amount: invoice.amount,
            booking_id: invoice.service_booking_id,
            service_id: invoice.service_booking.service_id, 
            transactionId,
            billReference: billNumber,
            userToken: token,
            is_service: invoice.is_service
        }));
        const hashString = `${process.env.REVPAY_TOKEN}LASPARK${billNumber}${transactionId}${invoice.amount}` + "http://67.207.88.128/verify-payment";
        setStringHash(
            md5(hashString).toString().toUpperCase()
        )
    }, []);



    const payHandler = async () => {
        // if (invoice.waiver === 1 && invoice.amount == 0) {
        //     dispatch(loader());
        //     try {
        //         await axiosInstance.post(`payment/update-payment`, {
        //             parkSpaceId: invoice.park_space_id,
        //             bookingId: invoice.park_space_booking_id,
        //             amount: invoice.amount,
        //             waived: 1
        //         }, {
        //             headers: {
        //                 Authorization: `Bearer ${token}`
        //             }
        //         });
        //         dispatch(showNotifier('Payment complete'))
        //         dispatch(loader());
        //         setTimeout(() => window.location = 'http://157.230.237.165', 1000);

        //     } catch (e) {
        //         console.log(e);
        //     }
        // } else {
        //     document.getElementById('frm').submit();
        //     setIsLoading(true);
        // }
        document.getElementById('frm').submit();
        setIsLoading(true);
    }


    const changePaymentHandler = (e) => {
        setPaymentOption(e.target.value);
    }

    const prefix = () => {
        switch (serviceType) {
            case 'Tree Felling':
                return 'TFL';
            case 'Tree Pruning':
                return 'TPR';
            case 'Tree Planting':
                return 'TPL';
            default:
                return '';
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
                                        <td role="cell">{prefix() + invoice.invoice_number}</td>
                                    </tr>
                                    <tr role="row">
                                        <td role="cell">Order Number</td>
                                        <td role="cell">{prefix() + invoice.service_booking.order_number}</td>
                                    </tr>
                                    <tr role="row">
                                        <td role="cell">Customer</td>
                                        <td role="cell">{invoice.user.first_name} {invoice.user.last_name}</td>
                                    </tr>
                                    <tr role="row">
                                        <td role="cell">{(serviceType === 'Tree Pruning' || serviceType === 'Tree Felling') ? 'Item/Service Description' : 'Item Description'}</td>
                                        <td role="cell">{serviceType}</td>
                                    </tr>
                                    {(serviceType !== 'Tree Planting' && invoice.service_booking.street_name && invoice.service_booking.house_number) && <tr role="row">
                                        <td role="cell">Location</td>
                                        <td role="cell">{invoice.service_booking.house_number} {invoice.service_booking.street_name}</td>
                                    </tr>}
                                    <tr role="row">
                                        <td role="cell">Purpose</td>
                                        <td role="cell">{invoice.service_booking.purpose}</td>
                                    </tr>
                                    {invoice.service_booking.no_of_trees && <tr role="row">
                                        <td role="cell">No of Trees</td>
                                        <td role="cell">{invoice.service_booking.no_of_trees}</td>
                                    </tr>}
                                    <tr role="row">
                                        <td role="cell">Amount</td>
                                        <td role="cell">₦{Intl.NumberFormat().format(invoice.amount)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col text-center">
                            <div class="form-check form-check-inline mr-5">
                                <input class="form-check-input" type="radio" name="payment" id="inlineRadio1" onChange={changePaymentHandler} value="pay-online" />
                                <label class="form-check-label" for="inlineRadio1">Pay Online</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="payment" id="inlineRadio2" onChange={changePaymentHandler} value="pay-to-bank" />
                                <label class="form-check-label" for="inlineRadio2">Pay to Bank</label>
                            </div>  
                        </div>
                    </div>

                    {paymentOption === 'pay-to-bank' && <BankList />}

                    {paymentOption === 'pay-online' && <div className="row mt-5">
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
                    </div>}
                </div>
            </section>

            <form name="frm" id="frm" method="post" target="_parent"
                action="https://test.qpay.ng:7071/PaymentGateway/Index">
                <input type="hidden" name="type" value="Webguid" />
                <input type="hidden" name="transactionId" value={transactionId} />
                <input type="hidden" name="billReference" value={billNumber} />
                <input type="hidden" name="amount" value={invoice.amount} />
                <input type="hidden" name="returnUrl" value="http://67.207.88.128/verify-payment" />
                <input type="hidden" name="clientCode" value="LASPARK" />
                <input type="hidden" name="Hash" value={stringHash} />
            </form>

        </>
    )


};

export default ServiceInvoice;
