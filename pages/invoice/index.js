import Head from "next/head";
import Layout from "../../Components/Layout";
import React, {useState, useEffect} from "react";
import axiosInstance from "../../config/axios";
import {randomString} from "../../Utils/String";
import cookies from "next-cookies";

const Invoice = ({billNumber, invoice}) => {
    const [transactionId, setTransactionId] = useState(randomString(20));
    const [stringHash, setStringHash] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const hashString = `${process.env.REVPAY_TOKEN}LASPARK${billNumber}${transactionId}${invoice.amount}` + "http://165.227.73.31/profile";
        setStringHash(
            CryptoJS.MD5(hashString).toString().toUpperCase()
        )
    }, []);


    const payHandler = () => {
        document.getElementById('frm').submit();
        setIsLoading(true);
    }

    return <Layout hasHeader={false}>
        <Head>
            <title>Payment Invoice | Laspark</title>
        </Head>

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
                                <td role="cell">#{invoice.ref}</td>
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
                            <button type="button" disabled={isLoading} onClick={payHandler} className="btn extra-thin green-transparent">Pay
                                Now
                            </button>
                        </div>
                        <small className="mt-2">Payment is non refundable!</small>
                    </div>
                </div>
            </div>
        </section>

        <form name="frm" id="frm" method="post" target="_parent"
              action="https://test.qpay.ng:7071/PaymentGateway/Index">
            <input type="hidden" name="type" value="Webguid"/>
            <input type="hidden" name="transactionId" value={transactionId}/>
            <input type="hidden" name="billReference" value={billNumber}/>
            <input type="hidden" name="amount" value={invoice.amount}/>
            <input type="hidden" name="returnUrl" value="http://165.227.73.31/profile"/>
            <input type="hidden" name="clientCode" value="LASPARK"/>
            <input type="hidden" name="Hash" value={stringHash}/>
        </form>
    </Layout>
}

Invoice.getInitialProps = async (ctx) => {
    const {query, req} = ctx;
    const token = cookies(ctx).token;
    // const token = req.cookies.token;
    try {
        const {data: {invoice, bill_number: billNumber}} = await axiosInstance.get(`invoices/${query.invoice}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return {
            billNumber,
            invoice
        }
    } catch (e) {
        console.log(e, 'the error');
        return {
            billNumber: null,
            invoice: null
        }
    }
}

export default Invoice;