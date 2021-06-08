import React from 'react';
import styled from 'styled-components';
import FormatDate from './miscs/formatDate';
import { FaFacebookF, FaTwitter } from 'react-icons/fa'
import { TwitterShareButton, FacebookShareButton } from 'react-share'
import Image from './Image';
import { Parser } from 'html-to-react';
import Link from 'next/link';

const NewsSingle = ({ single, multiple }) => {
    const ContentParser = new Parser();
    const [loaded, setLoaded] = React.useState(false);
    React.useEffect(() => {
        setLoaded(true);
    }, []);
    return (
        <Container>
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        <div className="box">
                            <div className="info-con">
                                <div className="top">
                                    <p>{loaded && FormatDate(single.createdAt)}</p>
                                    <div className="socials">
                                        {loaded && <FacebookShareButton url={location.href}><FaFacebookF /></FacebookShareButton>}
                                        {loaded && <TwitterShareButton url={location.href}><FaTwitter /></TwitterShareButton>}
                                    </div>
                                </div>
                                <h2 className="maintitle">{single.Title}</h2>
                                <p>By: Admin</p>
                                <p className="description">{single.Description}</p>
                            </div>
                            <div className="mainimage row">{loaded && <Image src={single.Thumbnail} />}</div>
                        </div>
                        <div className="content-container">
                            {ContentParser.parse(single.Content)}
                        </div>
                    </div>
                    <div className="col-md-3">
                        {loaded && <div className="right-con">
                            {multiple.map(el => (
                                <Link href={el.slug} key={Math.random()}>
                                    <a>
                                        <div className="boxx">
                                            <Image src={el.Thumbnail} size="medium" />
                                            <p>{FormatDate(el.createdAt)}</p>
                                            <h6>{el.Title}</h6>
                                        </div>
                                    </a>
                                </Link>
                            ))}
                        </div>}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default NewsSingle;

const Container = styled.div`
    background-color:rgba(0,0,0,0.05);
    padding-top:30px;
    padding-bottom:30px;
    .container{
        background:white;
        .box{
            padding:30px 0px;
            padding-right:15px;
            border-right:1px solid rgba(0,0,0,0.1);
            .info-con{
                padding:0px 45px 30px;
                .top{
                    display:flex;
                    justify-content:space-between;
                    .socials{
                        button{
                            margin-left:15px;
                            border-left:1px solid rgba(0,0,0,0.1) !important;
                            padding-left:15px !important;
                            svg{
                                font-size:18px;
                            }
                        }
                    }
                }
                .maintitle{
                    font-weight:400;
                    margin-top:20px;
                }
                .description{
                    margin-bottom:0px;
                }
            }
            .mainimage{
                img{
                    width:100%;
                }
            }
        }
        .content-container{
            padding:0px 30px;
            padding-right:45px;
            border-right:1px solid rgba(0,0,0,0.1);
            img{
                max-width:100%;
            }
            a{
                color:#004cff;
            }
        }
        .right-con{
            padding-right:15px;
            padding-top:30px;
            .boxx{
                margin-bottom:30px;
                img{
                    width:100%;
                    margin-bottom:5px;
                }
                p{
                    margin-bottom:5px;
                }
            }
        }
    }
    @media only screen and (max-width: 768px){
        padding-left:15px;
        padding-right:15px;
        padding-top:15px;
        .container{
            .box{
                padding-right:0px;
                border-right:unset;
                .info-con{
                    padding-left:0px;
                    padding-right:0px;
                    padding-bottom:15px;
                    .top{
                        flex-direction:column;
                        .socials{
                            button{
                                &:first-child{
                                    padding-left:0px !important;
                                    margin-left:0px !important;
                                    border-left:0px !important;
                                }
                            }
                        }
                    }
                    .description{
                        margin-bottom:0px;
                    }
                    .maintitle{
                        font-weight:bold;
                        margin-top:15px;
                    }
                }
            }
            .content-container{
                padding-left:0px;
                padding-right:0px;
                border-right:0px;
            }
            .col-md-9{
                border-bottom:1px solid rgba(0,0,0,1);
                padding-bottom:10vh;
                margin-bottom:10vh;
            }
            .right-con{
                padding-right:0px;
                .boxx{
                    padding-bottom:15px;
                    border-bottom:1px solid rgba(0,0,0,0.1);
                }
            }
        }
    }
`