import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import Cookies from 'js-cookie';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

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
                            <Table role="table">
                                <Thead role="rowgroup">
                                <Tr role="row">
                                    <Th role="columnheader">Item</Th>
                                    <Th role="columnheader">Value</Th>
                                </Tr>
                                </Thead>
                                <Tbody role="rowgroup">
                                <Tr role="row">
                                    <Td role="cell">Invoice Number</Td>
                                    <Td role="cell">{prefix() + invoice.invoice_number}</Td>
                                </Tr>
                                <Tr role="row">
                                    <Td role="cell">Order Number</Td>
                                    <Td role="cell">{prefix() + invoice.service_booking.order_number}</Td>
                                </Tr>
                                <Tr role="row">
                                    <Td role="cell">Customer</Td>
                                    <Td role="cell">{invoice.user.first_name} {invoice.user.last_name}</Td>
                                </Tr>
                                <Tr role="row">
                                    <Td role="cell">{(serviceType === 'Tree Pruning' || serviceType === 'Tree Felling') ? 'Item/Service Description' : 'Item Description'}</Td>
                                    <Td role="cell">{serviceType}</Td>
                                </Tr>
                                {(serviceType !== 'Tree Planting' && invoice.service_booking.street_name && invoice.service_booking.house_number) &&
                                <Tr role="row">
                                    <Td role="cell">Location</Td>
                                    <Td role="cell">{invoice.service_booking.house_number} {invoice.service_booking.street_name}</Td>
                                </Tr>}
                                <Tr role="row">
                                    <Td role="cell">Purpose</Td>
                                    <Td role="cell">{invoice.service_booking.purpose}</Td>
                                </Tr>
                                {invoice.service_booking.no_of_trees && <Tr role="row">
                                    <Td role="cell">No of Trees</Td>
                                    <Td role="cell">{invoice.service_booking.no_of_trees}</Td>
                                </Tr>}
                                {
                                    invoice.waiver !== 1 && invoice.amount > 0 && (serviceType === 'Tree Felling' || serviceType === 'Tree Pruning') && <>
                                    {
                                        serviceType === 'Tree Felling' && <Tr role="row">
                                            <Td role="cell">Green Restoration</Td>
                                            <Td role="cell">₦{Intl.NumberFormat().format(invoice.service_booking.green_restoration)}</Td>
                                        </Tr>
                                    }
                                        <Tr role="row">
                                            <Td role="cell">Admin Charge</Td>
                                            <Td role="cell">₦{Intl.NumberFormat().format(invoice.service_booking.admin_charge)}</Td>
                                        </Tr>
                                    </>
                                }
                                <Tr role="row">
                                    <Td role="cell">Total Amount</Td>
                                    <Td role="cell">₦{Intl.NumberFormat().format(invoice.amount)}</Td>
                                </Tr>
                                </Tbody>
                            </Table>
                        </div>
                    </div>

                    <div className="row mt-3 mb-5">
                        <div className="col text-center">
                            <div className="form-check form-check-inline mr-5">
                                <input className="form-check-input" type="radio" name="payment" id="inlineRadio1"
                                       onChange={changePaymentHandler} value={"pay-online" || ""}/>
                                <label className="form-check-label" htmlFor="inlineRadio1">Pay Online</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="payment" id="inlineRadio2"
                                       onChange={changePaymentHandler} value={"pay-to-bank" || ""}/>
                                <label className="form-check-label" htmlFor="inlineRadio2">Pay to Bank</label>
                            </div>
                        </div>
                    </div>

                    {paymentOption === 'pay-to-bank' && <BankList invoice = {invoice} />}

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
                <input type="hidden" name="type" value="Webguid"/>
                <input type="hidden" name="transactionId" value={transactionId}/>
                <input type="hidden" name="billReference" value={billNumber}/>
                <input type="hidden" name="amount" value={invoice.amount}/>
                <input type="hidden" name="returnUrl" value="http://67.207.88.128/verify-payment"/>
                <input type="hidden" name="clientCode" value="LASPARK"/>
                <input type="hidden" name="Hash" value={stringHash}/>
            </form>

        </>
    )


};

export default ServiceInvoice;
