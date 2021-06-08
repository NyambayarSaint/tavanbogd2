import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router'
import checkLanguage from '../miscs/checkLanguage';
import Link from 'next/link';
import decrease from '../miscs/decrease';
import Image from '../Image';

const Search = ({ data }) => {
    const router = useRouter();
    const { q } = router.query
    const [pages, setPages] = React.useState(null);
    const [posts, setPosts] = React.useState(null);
    const [podcasts, setPodcasts] = React.useState(null);
    const [srs, setSrs] = React.useState(null);

    React.useEffect(() => {
        console.log(q, 'query');
        goFetch();
    }, []);

    const goFetch = async () => {
        let pageRes = await checkLanguage(`/pages?Name_contains=${q}`);
        let postsRes = await checkLanguage(`/posts?Title_contains=${q}`);
        let podcastRes = await checkLanguage(`/podcasts?Title_contains=${q}`);
        let srsRes = await checkLanguage(`/posts-of-social-responsibilities?Title_contains=${q}`);

        setSrs(srsRes.data);
        setPosts(postsRes.data);
        setPages(pageRes.data);
        setPodcasts(podcastRes.data);
        console.log(podcastRes.data,'yohoho');
    }

    return (
        <Container>
            <div className="container">
                {data.Result && <h6>{data.Result}: <strong>{q}</strong></h6>}
                <hr />
                {pages && pages.length ? <div className="con">
                    <hr />
                    <h6><i>Хуудсууд</i></h6>
                    {pages?.map(el => (
                        <div className="box" key={Math.random()}>
                            <Link href={process.env.frontUrl + process.env.pageUrl + '/' + el.Slug}>
                                <a>
                                    <div>{process.env.frontUrl + process.env.pageUrl + '/' + el.Slug}</div>
                                    <h5>{el.Name}</h5>
                                </a>
                            </Link>
                        </div>
                    ))}
                </div> : ''}
                {posts && posts.length ? <div className="letters posts">
                    <hr />
                    <h6><i>Мэдээ, мэдээлэл</i></h6>
                    {posts?.map(el => (
                        <div className="box" key={Math.random()}>
                            <Link href={process.env.frontUrl + '/post_news' + '/' + el.slug}>
                                <a>
                                    <Image src={el.Thumbnail} size="medium" />
                                    <div className="right">
                                        <div>{decrease(process.env.frontUrl + '/post_news' + '/' + el.slug, 60)}...</div>
                                        <h5>{el.Title}</h5>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    ))}
                </div> : ''}
                {srs && srs.length ? <div className="letters posts">
                    <hr />
                    <h6><i>Нийгмийн хариуцлага</i></h6>
                    {srs?.map(el => (
                        <div className="box" key={Math.random()}>
                            <Link href={process.env.frontUrl + '/post_srs' + '/' + el.slug}>
                                <a>
                                    <Image src={el.Thumbnail} size="medium" />
                                    <div className="right">
                                        <div>{decrease(process.env.frontUrl + '/post_srs' + '/' + el.slug, 60)}...</div>
                                        <h5>{el.Title}</h5>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    ))}
                </div> : ''}
                {podcasts && podcasts.length ? <div className="letters posts">
                    <hr />
                    <h6><i>Ярилцлага</i></h6>
                    {podcasts?.map(el => (
                        <div className="box" key={Math.random()}>
                            <Link href={process.env.frontUrl + '/post_podcasts' + '/' + el.slug}>
                                <a>
                                    <Image src={el.Thumbnail} size="medium" />
                                    <div className="right">
                                        <div>{decrease(process.env.frontUrl + '/post_podcasts' + '/' + el.slug, 60)}...</div>
                                        <h5>{el.Title}</h5>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    ))}
                </div> : ''}
            </div>
        </Container>
    );
};

export default Search;

const Container = styled.div`
    padding-top:5vh;
    padding-bottom:5vh;
    .con,.letters{
        h6{
            margin-bottom:15px;
        }
        .box{
            border-bottom:1px solid rgba(0,0,0,0.1);
            padding-top:15px;
            padding-bottom:15px;
            h5{
                color:${({ theme }) => theme.mainColor3};
                font-weight:600;
                margin-top:5px;
                margin-bottom:0px;
            }
            a{
                text-decoration:none;
                display:flex;
            }
            img{
                width:160px;
                height:100px;
                object-fit:cover;
                margin-right:15px;
            }
        }
    }
    @media only screen and (max-width: 768px){
        .con,.letters{
            .box{
                a{
                    flex-wrap:wrap;
                }
                img{
                    margin-bottom:10px;
                }
            }
        }
    }
`