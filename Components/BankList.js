import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

const BankList = ({invoice}) => {

    const isService = invoice.is_service;

    console.log({invoice});

    const bankList = [
        {name: 'ACCESS', accountNumber: '0697051813', sn: '1'},
        {name: 'CITI', accountNumber: '0011305964', sn: '2'},
        {name: 'DIAMOND', accountNumber: '0068779079', sn: '3'},
        {name: 'ECO', accountNumber: '0048743779', sn: '4'},
        {name: 'ENTERPRISE', accountNumber: '1900093134', sn: '5'},
        {name: 'FCMB', accountNumber: '0135582346', sn: '6'},
        {name: 'FIDELITY', accountNumber: '5030058723', sn: '7'},
        {name: 'FIRST ', accountNumber: '2028563246', sn: '8'},
        {name: 'GTB', accountNumber: '0176319468', sn: '9'},
        {name: 'HERITAGE', accountNumber: '5900000805', sn: '10'},
        {name: 'KEYSTONE', accountNumber: '1006571668', sn: '11'},
        {name: 'SKYE', accountNumber: '4030010449', sn: '12'},
        {name: 'STANBIC', accountNumber: '0015579848', sn: '13'},
        {name: 'STERLING', accountNumber: '0040510131', sn: '14'},
        {name: 'UBA', accountNumber: '1019169517', sn: '15'},
        {name: 'UNION', accountNumber: '0045277024', sn: '16'},
        {name: 'UNITY', accountNumber: '0024669148', sn: '17'},
        {name: 'WEMA', accountNumber: '0122514218', sn: '18'},
        {name: 'ZENITH', accountNumber: '1014361774', sn: '19'},
        {name: 'LBIC', accountNumber: '0001709719', sn: '20'},
    ];

    return (
        <>
            {isService === 0 && <div className="row instructions">
                <div className="col">
                    <h2 className="text-center mb-2">Park Management</h2>
                    <h4 className="text-center">Instruction on payment across the counter</h4>
                    <div className="row">
                        <div className="col-12 mx-auto">
                            <ul>
                                <li>Go to any of the desired bank listed.</li>
                                <li>Obtain Lagos State Revenue deposit slip and fill with the revenue code and agency code below: <br/>
                                    <strong>(REVENUE CODE: 4050016)</strong><br/>
                                    <strong>(AGENCY CODE: 7760000)</strong>
                                </li>
                                <li>Obtain the Lasg Revenue receipt from the Bank and upload to your users' profile on the Laspark Portal or send as attachment to <a href="mailto:laspark@lagosstate.gov.ng">laspark@lagosstate.gov.ng</a> </li>
                                <li>Ensure the order number is included in the subject when sending the attached revenue receipt to <a href="mailto:laspark@lagosstate.gov.ng">laspark@lagosstate.gov.ng</a> </li>
                                <li>Await final approval letter in your mail within 72 hrs. after sending receipt of payment</li>
                                <li>Print out final approval and bring to the park prior to/on your event day. </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> }
            {isService === 1 && 
            <div>
                {(invoice.service_booking.service.service === 'Tree Felling' || invoice.service_booking.service.service === 'Tree Pruning' || invoice.service_booking.service.service === 'Adoption of Open Space') &&
                <div className="row instructions">
                    <div className="col">
                        <h2 className="text-center mb-2">{invoice.service_booking.service.service === 'Tree Felling' || invoice.service_booking.service.service === 'Tree Pruning' ? "Tree Felling and Tree Pruning" : "Adoption of Open Space "}</h2>
                        <h4 className="text-center">Instruction on payment across the counter</h4>
                        <div className="row">
                            <div className="col-12 mx-auto">
                                <ul>
                                    <li>Go to any of the desired bank listed.</li>
                                    {(invoice.service_booking.service.service === 'Tree Felling' || invoice.service_booking.service.service === 'Tree Pruning') &&
                                    <li>Obtain Lagos State Revenue deposit slip and fill with the revenue code and agency code below: <br/>
                                        <strong>(REVENUE CODE: 4080022)</strong><br/>
                                        <strong>(AGENCY CODE: 77600000)</strong>
                                    </li>}
                                    {invoice.service_booking.service.service === 'Adoption of Open Space' &&
                                    <li>Obtain Lagos State Revenue deposit slip and fill with the with the ground/ revenue code and agency code below: <br/>
                                        <strong>(GROUND RENT/REVENUE CODE: 4080022)</strong><br/>
                                        <strong>(AGENCY CODE: 77600000)</strong>
                                    </li>}
                                    <li>Obtain the Lasg Revenue receipt from the Bank and upload to your users' profile on the Laspark Portal or send as attachment to <a href="mailto:laspark@lagosstate.gov.ng">laspark@lagosstate.gov.ng</a> </li>
                                    <li>Ensure the order number is included in the subject when sending the attached revenue receipt to <a href="mailto:laspark@lagosstate.gov.ng">laspark@lagosstate.gov.ng</a> </li>
                                    {(invoice.service_booking.service.service === 'Tree Felling' || invoice.service_booking.service.service === 'Tree Pruning') && <li>Await final approval letter in your mail within 48 hrs. after sending receipt of payment.</li>}
                                    {invoice.service_booking.service.service === 'Adoption of Open Space' && <li>Await final approval letter in your mail and use accordingly.</li>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div> 
                }
            </div> }

            
            <div className="row mt-5">
                <div className="col">
                    <h2 className="text-center mb-5">All Banks</h2>
                </div>
            </div>

            {/* <p>Notice: Kindly input the following</p> */}

            <div className="row booking-history">
                <div className="col">
                    <Table role="table">
                        <Thead role="rowgroup">
                            <Tr role="row">
                                <Th role="columnheader">S/N</Th>
                                <Th role="columnheader">Bank</Th>
                                <Th role="columnheader">Account Number</Th>
                            </Tr>
                        </Thead>
                        <Tbody role="rowgroup">
                            {bankList.map((bank, i) => {
                                return <Tr key={i} role="row">
                                    <Td role="cell">{bank.sn}</Td>
                                    <Td role="cell">{bank.name}</Td>
                                    <Td role="cell">{bank.accountNumber}</Td>
                                </Tr>
                            })}
                        </Tbody>
                    </Table>
                </div>
            </div>
         </>
    );
};


export default BankList;