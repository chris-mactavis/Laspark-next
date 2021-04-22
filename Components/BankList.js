import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

const BankList = () => {

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
    ]

    return (
        <>
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
                            {/* <Tr role="row">
                                <Td role="cell">CITI</Td>
                                <Td role="cell">0011305964</Td>
                            </Tr>
                            <Tr role="row">
                                <Td role="cell">DIAMOND</Td>
                                <Td role="cell">0068779079</Td>
                            </Tr>
                            <Tr role="row">
                                <Td role="cell">Item Description</Td>
                                <Td role="cell"></Td>
                            </Tr>
                            <Tr role="row">
                                <Td role="cell">Amount</Td>
                                <Td role="cell"></Td>
                            </Tr> */}
                        </Tbody>
                    </Table>
                </div>
            </div>
         </>
    );
};


export default BankList;