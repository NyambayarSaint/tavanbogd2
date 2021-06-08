import { MenuContext } from '@/components/miscs/ContextMenuProvider';
import React from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram, FaPhoneAlt, FaFax, FaRegEnvelope, FaGlobeAsia } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Carousel from 'react-elastic-carousel';
import elasticPagination from '@/components/miscs/elasticPagination';

const Footer = () => {
    const { general, config } = React.useContext(MenuContext);
    const R = useRouter();
    return (
        <Container>
            <div className="top-con">
                <div className="container">
                    <div className="top">
                        <div className="copyright">{general.Copyright}</div>
                        <div className="social">
                            {general.Facebook && <div><a target="__blank" href={general.Facebook}><FaFacebookF /><span>Facebook</span></a></div>}
                            {general.Linkedin && <div><a target="__blank" href={general.Linkedin}><FaLinkedinIn /><span>Linkedin</span></a></div>}
                            {general.Twitter && <div><a target="__blank" href={general.Twitter}><FaTwitter /><span>Twitter</span></a></div>}
                            {general.Instagram && <div><a target="__blank" href={general.Instagram}><FaInstagram /><span>Instagram</span></a></div>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-con">
                {config.width > 768 ?
                    <div className="container">
                        {general.Menu_footer.length && general.Menu_footer.map(el => (
                            <div className="box" key={Math.random()}>
                                <p onClick={() => el.Path && R.push(el.Path)}>{el.Name}</p>
                                {el.Child.length && el.Child.map(ok => (
                                    ok.Path ? <Link href={ok.Path} key={Math.random()}><a><li>{ok.Name}</li></a></Link> : <li key={Math.random()}>{ok.Name}</li>
                                ))}
                            </div>
                        ))}
                        <div className="last">
                            <img src="/img/small-logo-color.png" />
                            <div className="location">{general.Location}</div>
                            <div className="contact">
                                <a href={`callto:${general.Phone}`}><li><FaPhoneAlt />{general.Phone}</li></a>
                                <a href={`callto:${general.Phone}`}><li><FaFax />{general.Phone}</li></a>
                            </div>
                            <div className="digital">
                                <a href={`mailto:${general.Email}`}><li><FaRegEnvelope />{general.Email}</li></a>
                                <li><FaGlobeAsia />{general.Website}</li>
                            </div>
                        </div>
                    </div>
                    :
                    <Carousel showArrows={false} renderPagination={elasticPagination} itemsToShow={1} className="carousel-con">
                        <div className="last">
                            <img src="/img/small-logo-color.png" />
                            <div className="location">{general.Location}</div>
                            <div className="contact">
                                <a href={`callto:${general.Phone}`}><li><FaPhoneAlt />{general.Phone}</li></a>
                                <a href={`callto:${general.Phone}`}><li><FaFax />{general.Phone}</li></a>
                            </div>
                            <div className="digital">
                                <a href={`mailto:${general.Email}`}><li><FaRegEnvelope />{general.Email}</li></a>
                                <li><FaGlobeAsia />{general.Website}</li>
                            </div>
                        </div>
                        {general.Menu_footer.length && general.Menu_footer.map(el => (
                            <div className="box" key={Math.random()}>
                                <p onClick={() => el.Path && R.push(el.Path)}>{el.Name}</p>
                                {el.Child.length && el.Child.map(ok => (
                                    ok.Path ? <Link href={ok.Path} key={Math.random()}><a><li>{ok.Name}</li></a></Link> : <li key={Math.random()}>{ok.Name}</li>
                                ))}
                            </div>
                        ))}
                    </Carousel>
                }
            </div>
        </Container>
    );
};

export default Footer;

const Container = styled.div`
    .top-con{
        border-top:1px solid rgba(0,0,0,0.1);
        border-bottom:1px solid rgba(0,0,0,0.1);
        .top{
            display:flex;
            justify-content:space-between;
            align-items:center;
            padding-top:8px;
            padding-bottom:8px;
            .social{
                display:flex;
                div{
                    margin-right:30px;
                    &:last-child{
                        margin-right:0px;
                    }
                }
                svg{
                    font-size:16px;
                    margin-right:5px;
                    margin-top:-5px;
                    opacity:0.6;
                }
            }
        }
    }
    .bottom-con{
        padding-top:50px;
        padding-bottom:50px;
        .container{
            display:flex;
            justify-content:space-between;
            .box{
                margin-right:15px;
                p{
                    font-weight:500;
                    padding-bottom:10px;
                    border-bottom:1px solid rgba(0,0,0,0.1);
                    margin-bottom:10px;
                }
                li{
                    list-style-type:none;
                    margin-bottom:5px;
                }
            }
            .last{
                min-width:350px;
                max-width:350px;
                text-align:right;
                img{
                    height:50px;
                    margin-bottom:3px;
                }
                .location{
                    margin-bottom:15px;
                }
                .contact{
                    margin-bottom:15px;
                }
                svg{
                    margin-right:5px;
                    color:#162B4E;
                }
                li{
                    list-style-type:none;
                }
            }
        }
    }
    @media only screen and (max-width: 768px){
        display:flex;
        flex-direction:column-reverse;
        border-top:1px solid rgba(0,0,0,0.1);
        .top-con{
            .top{
                .copyright{
                    font-size: ${({ theme }) => theme.fontSizeSmall};
                }
                .social{
                    div{
                        margin-right:15px;
                        span{
                            display:none;
                        }
                    }
                    svg{
                        margin-right:0px;
                    }
                }
            }
        }
        .bottom-con{
            padding:15px;
            padding-left:10px;
            padding-right:10px;
            padding-bottom:15px;
            .carousel-con{
                display:flex;
                ${'' /* flex-direction:column-reverse; */}
                .rec-arrow{
                    min-width:unset;
                    min-height:unset;
                    padding:none;
                    line-height:30px;
                    font-size:14px;
                    width:36px;
                    height:30px;
                    &:hover{
                        color:white !important;
                    }
                }
                
                .rec-carousel-item{
                    .box{
                        ${'' /* text-align:center; */}
                        width:100%;
                        p{
                            font-weight:500;
                        }
                        li{
                            list-style-type:none;
                        }
                    }
                    .last{
                        ${'' /* text-align:center; */}
                        img{
                            margin-top:5px;
                            margin-bottom:5px;
                            height:35px;
                        }
                        li{
                            list-style-type:none;
                        }
                        svg{
                            margin-right:5px;
                            color:#162B4E;
                        }
                        .location{
                            margin-bottom:10px;
                        }
                        .contact{
                            margin-bottom:10px;
                        }
                        .digital{
                            margin-bottom:10px;
                        }
                    }
                }
            }
        }
    }
`