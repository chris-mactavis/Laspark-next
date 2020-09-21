import {useRouter} from "next/router";
import {useEffect} from "react";
import axiosInstance from "../../config/axios";
import {loader} from "../../store/actions/loader";
import {useDispatch} from "react-redux";
import Layout from "../../Components/Layout";


const VerifyPayment = () => {
    const dispatch = useDispatch();
    const {query: {trxref}} = useRouter();

    useEffect(() => {

        async function verifyPayment() {
            dispatch(loader());

            const md5 = require('blueimp-md5');
            const stringHash = md5(`88C57643A15222E7B1E00961BB88C099LASPARK${trxref}`).toString().toUpperCase();
            console.log(stringHash);

            try {
                const data = await axiosInstance.get(`https://test.qpay.ng/PaymentGateway/Verify/b99hv9gm9qd00000b99h/LASPARK/${stringHash}`);
                console.log(data);
                dispatch(loader());
            } catch (e) {
                console.log(e);
            }
        }

        verifyPayment();
    }, []);

    return <Layout>
        div
    </Layout>
};

export default VerifyPayment;