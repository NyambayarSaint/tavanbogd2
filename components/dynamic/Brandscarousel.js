import React from 'react';
import styled from 'styled-components';
import Carousel from 'react-elastic-carousel';
import checkLanguage from '../miscs/checkLanguage';
import Image from '../Image';
import { MenuContext } from '../miscs/ContextMenuProvider';
import { useRouter } from 'next/router';

const Brandscarousel = ({ data }) => {

    const [loaded, setLoaded] = React.useState(null);
    const { config } = React.useContext(MenuContext);
    const R = useRouter();

    React.useEffect(() => {
        go();
    }, []);

    const go = async () => {
        let res = await checkLanguage('/brands');
        setLoaded(res.data);
    }

    return (
        <Container className="container">
            {data.Title && <h3>{data.Title}</h3>}
            {loaded ? <>
                <Carousel isRTL={true} enableAutoPlay={true} autoPlaySpeed={2500} showArrows={false} pagination={false} itemsToShow={config.width > 768 ? 7 : config.width > 420 ? 6 : 4} initialActiveIndex={1} className="top">
                    {loaded.map(el => (
                        <a key={Math.random()} href={el.Link ? el.Link : ''} target="__blank">
                            <div className="brand">
                                <Image src={el.Logo} size="small" />
                            </div>
                        </a>
                    ))}
                </Carousel>
                <Carousel enableAutoPlay={true} autoPlaySpeed={2500} showArrows={false} pagination={false} itemsToShow={config.width > 768 ? 7 : config.width > 420 ? 6 : 4} initialActiveIndex={1} className="bottom">
                    {loaded.reverse().map(el => (
                        <a key={Math.random()} href={el.Link ? el.Link : ''} target="__blank">
                            <div className="brand">
                                <Image src={el.Logo} size="small" />
                            </div>
                        </a>
                    ))}
                </Carousel>
            </> : <img src="/img/loading.gif" className="loading" alt="loading gif" />}
            {data.ButtonText && <button onClick={()=>data.ButtonLink && R.push(data.ButtonLink)}>{data.ButtonText}</button>}
        </Container>
    );
};

export default Brandscarousel;

const Container = styled.div`
    h3{
        text-align:center;
        padding-bottom:50px;
        font-weight:400;
    }
    .loading{
        width:100px;
        display:block;
        margin:0px auto;
    }
    button{
        padding:12px 50px;
        border:none;
        background:none;
        background-image: linear-gradient(to right, #2957a4, #00a859);
        color:white;
        margin:50px auto 0px;
        display:block;
    }
    .top{
        .rec-swipable{
            border-top:1px solid rgba(0,0,0,0.1);
            border-bottom:1px solid rgba(0,0,0,0.1);
        }
    }
    .bottom{
        .rec-swipable{
            border-bottom:1px solid rgba(0,0,0,0.1);
        }
    }
    .rec-carousel-item{
        .brand{
            border-left:0.5px solid rgba(0,0,0,0.1);
            border-right:0.5px solid rgba(0,0,0,0.1);
            padding:30px;
            img{
                width:100%;
                height:100%;
                object-fit:contain;
            }
        }
    }
    @media only screen and (max-width: 768px){
        h3{
            font-weight:500;
            padding-bottom:15px;
        }
        button{
            margin-top:20px;
            padding:5px 30px;
        }
        .rec-carousel-item{
            .brand{
                border-left:0.5px solid rgba(0,0,0,0.1);
                border-right:0.5px solid rgba(0,0,0,0.1);
                padding:15px;
                img{
                    width:100%;
                    height:100%;
                    object-fit:contain;
                }
            }
        }
    }
`