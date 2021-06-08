import React from 'react';
import styled from 'styled-components';
import Image from '../Image';
import checkLanguage from '../miscs/checkLanguage';
import Carousel from 'react-elastic-carousel'
import { FaCheck } from 'react-icons/fa'

const Companies = () => {

    const [companies, setCompanies] = React.useState([]);

    React.useEffect(() => {
        go();
    }, []);

    const go = async () => {
        const res = await checkLanguage('/companies');
        setCompanies(res.data);
        console.log(res.data, 'res');
    }

    return (
        <Container>
            <div className="container">
                <div className="row">
                    {companies.map(el => (
                        <div key={Math.random()} className="col-md-4">
                            <div className="box">
                                <div className="top">
                                    <a href={el.Website} target="__blank">
                                        <Image src={el.Logo} size="thumbnail" />
                                        <h6>{el.Title}</h6>
                                    </a>
                                </div>
                                <div className="bottom">
                                    <div className="activities">
                                        <Carousel itemsToShow={1} showArrows={false} pagination={false}>
                                            {el.Activities.map(ol => <div key={Math.random()}><FaCheck /> <span>{ol.Title}</span></div>)}
                                        </Carousel>
                                    </div>
                                    <div className="brands">
                                        <Carousel itemsToShow={1} showArrows={false} pagination={false}>
                                            {el.Brands.map(ol => <a target="__blank" href={ol.Link} key={Math.random()}><Image src={ol.Logo} size="small" /></a>)}
                                        </Carousel>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </Container>
    );
};

export default Companies;

const Container = styled.div`
    padding-top:30px;
    padding-bottom:30px;
    .container{
        .box{
            box-shadow:0 2px 4px 0 rgb(0 0 0 / 25%);
            text-align:center;
            margin-bottom:30px;
            .top{
                padding:15px 0px;
                border-bottom:1px solid rgba(0,0,0,0.1);
                img{
                    height:50px;
                    max-width:100%;
                    object-fit:cover;
                    margin-bottom:15px;
                }
                h6{
                    margin-bottom:0px;
                }
            }
            .bottom{
                padding:15px;
                .activities{
                    height:40px;
                    display:flex;
                    align-items:center;
                    svg{
                        color:${({theme})=>theme.mainColor2};
                        margin-right:3px;
                    }
                }
                .brands{
                    padding-top:10px;
                    height:60px;
                    img{
                        height:50px;
                        max-width:100px;
                        object-fit:contain;
                    }
                }
            }
        }
    }
`