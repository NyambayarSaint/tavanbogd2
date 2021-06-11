import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import styled from 'styled-components';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import checkLanguage from '../miscs/checkLanguage';
import Image from '../Image';
import { FcDownload } from 'react-icons/fc'

const Tenders = ({ data }) => {

    const [tenders, setTenders] = React.useState(null);

    React.useEffect(() => {
        goFetch();
    }, []);

    const goFetch = async () => {
        let res = await checkLanguage('/tenders');
        setTenders(res.data);
    }

    return (
        <Container>
            <div className="container">
                <Table>
                    <Thead>
                        <Tr>
                            <Th>{data.Tender_name}</Th>
                            <Th>{data.Company}</Th>
                            <Th>{data.Company_name}</Th>
                            <Th>{data.Contact}</Th>
                            <Th>{data.Material}</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {tenders ?
                            tenders.length && tenders.map(el => (
                                <Tr key={Math.random()}>
                                    <Td><div>{el.Name}</div></Td>
                                    <Td style={{ textAlign: 'center' }}>
                                        <div><a href={process.env.serverUrl + el.Image.url} target="__blank"><Image src={el.Image} size="small" /></a></div>
                                    </Td>
                                    <Td><div>{el.Company.Title}</div></Td>
                                    <Td>
                                        <div>{el.Contact}</div>
                                    </Td>
                                    <Td style={{ textAlign: 'center' }}>
                                        <div>
                                            <a target="__blank" download={el.Image.name} href={process.env.serverUrl + el.Image.url}>
                                                <FcDownload /><div>{data.Download}</div>
                                            </a>
                                        </div>
                                    </Td>
                                </Tr>
                            ))
                            :
                            <Tr><Td>{data.No_tender}</Td></Tr>
                        }
                    </Tbody>
                </Table>
            </div>
        </Container>
    );
};

export default Tenders;

const Container = styled.div`
    padding-top:5vh;
    padding-bottom:5vh;
    .container{
        table{
            border:1px solid rgba(0,0,0,0.3);
            thead{
                tr{
                    th{
                        background:${({ theme }) => theme.mainColor3};
                        color:white;
                        padding:8px 15px;
                        border-right:1px solid white;
                        &:last-child{
                            border-right:0px;
                        }
                    }
                }
            }
            tbody{
                tr{
                    td{
                        padding:8px 15px;
                        border-right:1px solid rgba(0,0,0,0.3);
                        max-width:25vw;
                        &:last-child{
                            border-right:0px;
                        }
                        img{
                            width:100px;
                        }
                        svg{
                            font-size:24px;
                        }
                    }
                }
            }
        }
    }
    @media only screen and (max-width: 768px){
        .container{
            table{
                border:unset !important;
                tr{
                    margin-bottom:15px;
                    td{
                        max-width:unset !important;
                        border-bottom:1px solid rgba(0,0,0,1) !important;
                        &:last-child{
                            border-bottom:unset !important;
                            text-align:center !important;
                        }
                        div{
                            display:flex;
                        }
                    }
                }
            }
        }
    }
`