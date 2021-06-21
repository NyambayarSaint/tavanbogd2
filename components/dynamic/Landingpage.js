import React from 'react';
import styled from 'styled-components';
import minimize from '../miscs/minimize';
import { MenuContext } from '../miscs/ContextMenuProvider';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { BsArrowLeft } from 'react-icons/bs'
import Carousel from 'react-elastic-carousel'
import { Parser } from 'html-to-react'
import { changeLang, returnLanguage } from '../miscs/parseCookies';
const parser = new Parser();

const Landingpage = ({ data }) => {
    const { general } = React.useContext(MenuContext);
    const [onlineMenu, setOnlineMenu] = React.useState(false);
    const { config } = React.useContext(MenuContext);
    
    return (
        <Container style={{ backgroundImage: `url(${minimize(data.Background)})` }}>
            <div className="con">
                <div className="language-container" style={{ cursor: 'pointer' }}>
                    {returnLanguage() === "mn" ? <img onClick={() => changeLang()} src="/img/en.png" /> : <img onClick={() => changeLang()} src="/img/mn.jpg" />}
                </div>
                <AnimatePresence>
                    {onlineMenu &&
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className="links-container">
                                <div className="backbutton" onClick={() => setOnlineMenu(false)}>
                                    <button><BsArrowLeft />{data.Back}</button>
                                </div>
                                <div className="logo-con">
                                    <img src={minimize(data.Logo)} />
                                </div>
                                {config.width > 768 ?
                                    <div className="brands">
                                        <h4>{data.BrandsTitle}</h4>
                                        <div className="box-con">
                                            {data.Brands?.map(el => (
                                                <Link key={Math.random()} href={el.Link}>
                                                    <a target="__blank">
                                                        <div className="box">
                                                            <img src={minimize(el.Image, 'medium')} />
                                                        </div>
                                                    </a>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                    :
                                    <div className="brands">
                                        <h4>{data.BrandsTitle}</h4>
                                        <div className="box-con">
                                            <Carousel itemsToShow={3} pagination={false} showArrows={false} autoPlaySpeed={1500} enableAutoPlay={true}>
                                                {data.Brands?.map(el => (
                                                    <Link key={Math.random()} href={el.Link}>
                                                        <a target="__blank">
                                                            <div className="box">
                                                                <img src={minimize(el.Image, 'medium')} />
                                                            </div>
                                                        </a>
                                                    </Link>
                                                ))}
                                            </Carousel>
                                        </div>
                                    </div>
                                }
                                {config.width > 768 ?
                                    <div className="coops">
                                        <div className="deliverby">
                                            {parser.parse(data.BottomContent)}
                                        </div>
                                        <div className="box-con">
                                            {data.Coop?.map(el => (
                                                <Link key={Math.random()} href={el.Link}>
                                                    <a>
                                                        <div className="box">
                                                            <img src={minimize(el.Image, 'medium')} />
                                                        </div>
                                                    </a>
                                                </Link>

                                            ))}
                                        </div>
                                    </div>
                                    :
                                    <div className="coops">
                                        <div className="deliverby">
                                            {parser.parse(data.BottomContent)}
                                        </div>
                                        <div className="box-con">
                                            <Carousel itemsToShow={3} pagination={false} showArrows={false} autoPlaySpeed={1500} enableAutoPlay={true}>
                                                {data.Coop?.map(el => (
                                                    <Link key={Math.random()} href={el.Link}>
                                                        <a>
                                                            <div className="box">
                                                                <img src={minimize(el.Image, 'medium')} />
                                                            </div>
                                                        </a>
                                                    </Link>
                                                ))}
                                            </Carousel>
                                        </div>
                                    </div>
                                }
                            </div>
                        </motion.div>
                    }
                </AnimatePresence>
                <AnimatePresence>
                    {!onlineMenu &&
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className="top">
                                <img src={minimize(data.Logo)} />
                                <div className="box">
                                    <div className="ct">
                                        <Link href="/p/home">
                                            <a>
                                                <h4>{data.Website}</h4>
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="ct" onClick={() => setOnlineMenu(true)}>
                                        <h4>{data.Online}</h4>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    }
                </AnimatePresence>
                <div className="bottom">
                    <div>{general.Copyright}</div>
                </div>
                <div className="linear-line"></div>
            </div>
            <div className="popup-container"></div>
        </Container>
    );
};

export default Landingpage;

const Container = styled.div`
    width:100%;
    height:100vh;
    ${'' /* background:#091c3d; */}
    ${'' /* color:white; */}
    overflow-x:hidden;
    overflow-y:hidden;
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center center;
    #tsparticles{
        position:absolute;
        left:0px;
        top:0px;
        right:0px;
        bottom:0px;
        z-index:1;
    }
    .con{
        padding:30px;
        display:flex;
        justify-content:center;
        align-items:center;
        flex-direction:column;
        height:100%;
        position:relative;
        z-index:2;
        .language-container{
            position:absolute;
            top:15px;
            right:15px;
            z-index:10;
            img{
                width:35px;
            }
        }
        .top{
            text-align:center;
            margin-top:-100px;
            img{
                width:350px;
                margin-bottom:30px;
            }
            .box{
                display:flex;
                .ct{
                    padding:8px 15px;
                    transition:0.3s ease;
                    &:first-child{
                        border-right:1px solid ${({ theme }) => theme.mainColor2};
                    }
                    a{
                        text-decoration:none;
                    }
                    h4{
                        font-weight:400;
                        opacity:0.7;
                        margin-bottom:0px;
                        width:350px;
                    }
                    &:hover{
                        background:${({ theme }) => theme.mainColor2};
                        color:white;
                        cursor:pointer;
                        h4{
                            opacity:1;
                        }
                    }
                }
            }
        }
        .bottom{
            position:absolute;
            bottom:30px;
            div{
                font-weight:500;
                opacity:0.7;
            }
        }
        .linear-line{
            position:absolute;
            bottom:0px;
            left:0px;
            right:0px;
            height:10px;
            background-image: linear-gradient(to right, ${({ theme }) => theme.mainColor}, ${({ theme }) => theme.mainColor2});
        }
        .links-container{
            position:absolute;
            left:0px;
            top:0px;
            right:0px;
            bottom:0px;
            display:flex;
            flex-direction:column;
            justify-content:center;
            padding-left:10vw;
            padding-right:10vw;
            .backbutton{
                position:absolute;
                top:45px;
                left:45px;
                button{
                    background:${({ theme }) => theme.mainColor2};
                    color:white;
                    border:none;
                    padding:6px 30px;
                    svg{
                        font-size:18px;
                    }
                }
            }
            .logo-con{
                position:absolute;
                top:20px;
                left:50%;
                margin-left:-100px;
                img{
                    width:200px;
                }
            }
            .brands,.coops{
                text-align:center;
                h4{
                    font-weight:400;
                    opacity:0.7;
                    margin-bottom:30px;
                }
                .box-con{
                    display:flex;
                    justify-content:center;
                    flex-wrap:wrap;
                    .box{
                        background:white;
                        box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
                        border-radius:15px;
                        border:1px solid rgba(0,0,0,0.1);
                        width:100px;
                        height:100px;
                        padding:5px;
                        margin-left:7.5px;
                        margin-right:7.5px;
                        margin-bottom:15px;
                        img{
                            width:100%;
                            height:100%;
                            object-fit:contain;
                            border-radius:15px;
                        }
                    }
                }
            }
            .brands{
                margin-bottom:50px;
            }
            .coops{
                .deliverby{
                    opacity:0.7;
                    margin-top:15px;
                    a{
                        color:rgb(0, 102, 192);
                    }
                    p{
                        font-weight:500;
                    }
                }
            }
        }
    }
    
    @media only screen and (max-width: 768px){
        .con{
            padding:15px;
            .top{
                img{
                    width:200px;
                }
                .box{
                    .ct{
                        h4{
                            font-size:16px;
                            width:unset;
                        }
                    }
                }
            }
            .bottom{
                bottom:18px;
            }
        }
        .links-container{
            padding-left:0px !important; 
            padding-right:0px !important; 
            .backbutton{
                left:15px !important;
                top:25px !important;
                button{
                    padding-left:10px !important;
                    padding-right:10px !important;
                    font-size:${({ theme }) => theme.fontSizeSmall};
                }
            }
            .logo-con{
                margin-left:-50px !important;
                img{
                    width:100px !important;
                }
            }
            .brands,.coops{
                .box-con{
                    .box{
                        padding:15px !important;
                        margin-bottom:5px;
                    }
                }
            }
        }
    }
`