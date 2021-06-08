import React from 'react';
import styled from 'styled-components';
import Image from '../Image';
import checkLanguage from '../miscs/checkLanguage';
import { RiExternalLinkLine } from 'react-icons/ri'
import Link from 'next/link';
import decrease from '../miscs/decrease';
import FormatDate from '../miscs/formatDate';
import { BiChevronRight } from 'react-icons/bi';

const Allnews = ({ data }) => {

    const [loaded, setLoaded] = React.useState(null);

    const go = async () => {
        const social = await checkLanguage('/posts-of-social-responsibilities?_sort=createdAt:DESC&_limit=1');
        const podcast = await checkLanguage('/podcasts?_sort=createdAt:DESC&_limit=1');
        const news = await checkLanguage('/posts?_sort=createdAt:DESC&_limit=1');
        setLoaded({ social: social.data[0], podcast: podcast.data[0], news: news.data[0] });
    }

    React.useEffect(() => {
        go();
    }, [])

    return (
        <Container>
            <div className="container">
                <div className="row">
                    {loaded && <>
                        <div className="col-md-4">
                            <div className="box">
                                <div className="top">
                                    <h5>{data.SocialResponsibility}</h5>
                                    <span>{data.SeeAll}</span>
                                </div>
                                <div className="middle">
                                    <div className="img-con">
                                        <Image src={loaded.social.Thumbnail} size="medium" />
                                        <Link href={process.env.newsUrl + loaded.social.slug}><a><div className="effect" ><RiExternalLinkLine /></div></a></Link>
                                    </div>
                                    <div className="info">
                                        <p className="date">{FormatDate(loaded.social.createdAt)}</p>
                                        <h5>{decrease(loaded.social.Title, 65, 30)}...</h5>
                                        <p>{decrease(loaded.social.Description, 110, 72)}...</p>
                                        <Link href={process.env.newsUrl + loaded.social.slug}><a><div><BiChevronRight /> {data.Readmore}</div></a></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="box">
                                <div className="top">
                                    <h5>{data.News}</h5>
                                    <span>{data.SeeAll}</span>
                                </div>
                                <div className="middle">
                                    <div className="img-con">
                                        <Image src={loaded.news.Thumbnail} size="medium" />
                                        <Link href={process.env.newsUrl + loaded.news.slug}><a><div className="effect" ><RiExternalLinkLine /></div></a></Link>
                                    </div>
                                    <div className="info">
                                        <p className="date">{FormatDate(loaded.news.createdAt)}</p>
                                        <h5>{decrease(loaded.news.Title, 65, 30)}...</h5>
                                        <p>{decrease(loaded.news.Description, 110, 72)}...</p>
                                        <Link href={process.env.newsUrl + loaded.news.slug}><a><div><BiChevronRight /> {data.Readmore}</div></a></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="box">
                                <div className="top">
                                    <h5>{data.Podcast}</h5>
                                    <span>{data.SeeAll}</span>
                                </div>
                                <div className="middle">
                                    <div className="img-con">
                                        <Image src={loaded.podcast.Thumbnail} size="medium" />
                                        <Link href={process.env.newsUrl + loaded.podcast.slug}><a><div className="effect" ><RiExternalLinkLine /></div></a></Link>
                                    </div>
                                    <div className="info">
                                        <p className="date">{FormatDate(loaded.podcast.createdAt)}</p>
                                        <h5>{decrease(loaded.podcast.Title, 65, 30)}...</h5>
                                        <p>{decrease(loaded.podcast.Description, 110, 72)}...</p>
                                        <Link href={process.env.newsUrl + loaded.podcast.slug}><a><div><BiChevronRight /> {data.Readmore}</div></a></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    }

                </div>
            </div>
        </Container>
    );
};

export default Allnews;

const Container = styled.div`
    .box{
        .top{
            display:flex;
            justify-content:space-between;
            align-items:center;
            margin-bottom:10px;
            h5{
                margin-bottom:0px;
                &:after{
                    content:"";
                    display:block;
                    width:100%;
                    height:2px;
                    margin-top:3px;
                    background-image:linear-gradient(to right, ${({ theme }) => theme.mainColor}, ${({ theme }) => theme.mainColor2});
                }
            }
            span{
                color:${({ theme }) => theme.mainColor2};
                font-weight:400;
            }
        }
        .middle{
            .img-con{
                height:200px;
                position:relative;
                overflow:hidden;
                img{
                    width:100%;
                    height:100%;
                    object-fit:contain;
                    transition:0.5s ease;
                }
                .effect{
                    position:absolute;
                    left:0px;
                    top:0px;
                    right:0px;
                    bottom:0px;
                    background-image: linear-gradient(to right bottom, ${({ theme }) => theme.mainColor}, ${({ theme }) => theme.mainColor2});
                    opacity:0;
                    transition:0.5s ease;
                    color:white;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    font-size:25px;
                }
                &:hover{
                    img{
                        transform:scale(1.05);
                    }
                    .effect{
                        opacity:0.7;
                    }
                }
            }
            .info{
                box-shadow:0 2px 4px 0 rgb(0 0 0 / 25%);
                padding:15px;
                h5{
                    margin-bottom:15px;
                }
                div{
                    svg{
                        font-size:20px;
                        margin-top:-3px;
                    }
                }
            }
        }
    }
    @media only screen and (max-width: 768px){
        .box{
            margin-bottom:30px;
            .middle{
                .info{
                    .date{
                        margin-bottom:5px;
                    }
                    h5{
                        margin-bottom:5px;
                    }
                }
            }
        }
    }
`