import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';
import { BiChevronRight, BiCalendar } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'
import checkLanguage from '../miscs/checkLanguage';
import minimize from '../miscs/minimize';
import Image from '../Image';
import FormatDate from '../miscs/formatDate';
import decrease from '../miscs/decrease';

const Posts = ({ data }) => {

    const [collection, setCollection] = React.useState(null);
    const [type, setType] = React.useState(data.Type);
    const optionsCon = React.useRef();
    const searchButtonRef = React.useRef();
    const [increaser, setIncreaser] = React.useState(5);
    const [loading, setLoading] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [searchMode, setSearchMode] = React.useState(false);
    const [pathPrepend, setPathPrepend] = React.useState(null);

    React.useEffect(() => {
        goFetch();
    }, [increaser]);

    const goFetch = async (typeSearch) => {
        setLoading(true);
        if (typeSearch === true) {
            if (type === "podcasts") {
                let res = await checkLanguage(`/podcasts?Title_contains=${search}&_sort=createdAt:DESC`);
                setPathPrepend('/post_podcasts/');
                setCollection(res.data);
            }
            else if (type === "posts") {
                let res = await checkLanguage(`/posts?Title_contains=${search}&_sort=createdAt:DESC`);
                setPathPrepend('/post_news/');
                setCollection(res.data);
            }
            else {
                let res = await checkLanguage(`/posts-of-social-responsibilities?Title_contains=${search}&_sort=createdAt:DESC`);
                setPathPrepend('/post_srs/');
                setCollection(res.data);
            }
        }
        else {
            if (type === "podcasts") {
                let res = await checkLanguage(`/podcasts?_sort=createdAt:DESC&_limit=${increaser}&_start=0`);
                setPathPrepend('/post_podcasts/');
                setCollection(res.data);
            }
            else if (type === "posts") {
                let res = await checkLanguage(`/posts?_sort=createdAt:DESC&_limit=${increaser}&_start=0`);
                setPathPrepend('/post_news/');
                setCollection(res.data);
            }
            else {
                let res = await checkLanguage(`/posts-of-social-responsibilities?_sort=createdAt:DESC&_limit=${increaser}&_start=0`);
                setPathPrepend('/post_srs/');
                setCollection(res.data);
            }
        }
        setLoading(false);
    }

    const handleSearch = (e) => {
        goFetch(true);
        setSearchMode(true);
    }

    return (
        <Container>
            <div className="row">
                <div className="col-md-2">
                    <div className="left">
                        <h4 className="info-center">{data.Information_center}</h4>
                        <div className="options" ref={optionsCon}>
                            {data.Options.map(el => (
                                <Link href={el.Link} key={Math.random()}>
                                    <a className={el.Link === location.pathname ? 'active' : ''} summary={el.Link}>
                                        <div className="opt"><span>{el.Title}</span></div>
                                    </a>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-md-10">
                    <div className="right">
                        <div className="search-con">
                            <div className="row">
                                <div className="col-md-10 col-9">
                                    <BsSearch />
                                    <input disabled={searchMode ? true : false} value={search} onKeyDown={(e) => e.key === 'Enter' && searchButtonRef.current.click()} onChange={(e) => setSearch(e.target.value)} type="text" placeholder={data.Search} />
                                </div>
                                <div className="col-md-2 col-3 button-con">
                                    <button onClick={handleSearch} ref={searchButtonRef}>Search</button>
                                </div>
                            </div>
                        </div>
                        {loading && searchMode && <img className="search-spinner" src="/img/loading.gif"/>}
                        {searchMode && !loading && <div className="result-con"><div className="title">{data.Search_result}:</div><div onClick={()=>{goFetch();setSearchMode(false);setSearch('')}} className="text">{search}</div></div>}
                        {collection ?
                            <div className="row posts-con">
                                {collection.map((el, i) => i === 0 ?
                                    <div className="col-md-8" key={Math.random()}>
                                        <Link href={pathPrepend + el.slug}>
                                            <a>
                                                <div className="firstbox" style={{ backgroundImage: `url(${minimize(el.Thumbnail, 'medium')})` }}>
                                                    {!searchMode && <div className="lastnews">{data.Last_news}</div>}
                                                    <div className="info">
                                                        <div className="date"><BiCalendar />{FormatDate(el.createdAt, true)}</div>
                                                        <h4>{decrease(el.Title, 80)}...</h4>
                                                    </div>
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                    :
                                    <div className="col-md-4" key={Math.random()}>
                                        <Link href={pathPrepend + el.slug}>
                                            <a>
                                                <div className="box">
                                                    <Image src={el.Thumbnail} size="medium" />
                                                    <div className="info">
                                                        <div className="date"><BiCalendar />{FormatDate(el.createdAt, true)}</div>
                                                        <h5>{decrease(el.Title, 55)} ...</h5>
                                                        <div className="more"><BiChevronRight /></div>
                                                    </div>
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                )}
                                {!loading && !searchMode && <div className="col-md-12"><button className="loadmore" onClick={() => setIncreaser(increaser + 3)}>{data.Loadmore}</button></div>}
                            </div>
                            :
                            ''
                        }
                        {loading && <div className="loading-con">
                            <img src="/img/loading.gif" />
                        </div>}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Posts;

const Container = styled.div`
    padding-left:5vw;
    padding-right:5vw;
    .left{
        .info-center{
            font-weight:400;
            margin-bottom:30px;
        }
        .options{
            a{
                .opt{
                    padding:10px 15px;
                    border-top-right-radius:30px;
                    border-bottom-right-radius:30px;
                    margin-bottom:5px;
                    transition:0.3s ease;
                }
            }
            .active{
                text-decoration:none;
                .opt{
                    background-image:linear-gradient(to right, ${({ theme }) => theme.mainColor}, ${({ theme }) => theme.mainColor2});
                    color:white;
                    font-weight:bold;
                }
            }
        }
    }
    .right{
        border-left:1px solid rgba(0,0,0,0.1);
        padding-left:30px;
        .search-con{
            position:relative;
            margin-bottom:30px;
            width:100%;
            padding-left:15px;
            border:1px solid rgba(0,0,0,0.1);
            input{
                border:none;
                background:none;
                padding:10px 15px;
                width:100%;
                padding-left:30px;
                padding-right:0px;
                &:disabled{
                    opacity:0.3;
                }
            }
            svg{
                position:absolute;
                top:50%;
                margin-top:-7px;
                left:15px;
            }
            .button-con{
                display:flex;
                align-items:center;
                padding-left:0px;
                button{
                    border:none;
                    width:100%;
                    height:100%;
                    background-image:linear-gradient(to right, ${({ theme }) => theme.mainColor},${({ theme }) => theme.mainColor2});
                    color:white;
                }
            }
        }
        .search-spinner{
            width:200px;
            margin:0px auto 30px;
            display:block;
        }
        .result-con{
            margin-top:-15px;
            margin-bottom:15px;
            display:flex;
            align-items:center;
            .title{
                font-weight:bold;
                margin-right:15px;
            }
            .text{
                font-weight:500;
                border:1px solid rgba(0,0,0,0.1);
                padding:4px 15px;
                &:hover{
                    cursor:pointer;
                }
                &:after{
                    content:"X";
                    font-weight:bold;
                    margin-left:15px;
                }
            }
        }
        .loading-con{
            display:flex;
            justify-content:center;
        }
        .posts-con{
            .firstbox{
                height:312px;
                background-size:cover;
                background-position:center top;
                position:relative;
                color:white;
                box-shadow:0 2px 4px 0 rgb(0 0 0 / 25%);
                margin-bottom:30px;
                .lastnews{
                    position:absolute;
                    right:0px;
                    top:15px;
                    padding:6px 30px;
                    background-image:linear-gradient(to right, ${({ theme }) => theme.mainColor},${({ theme }) => theme.mainColor2});
                }
                .info{
                    position:absolute;
                    left:0;
                    right:0;
                    bottom:0;
                    background-image:linear-gradient(to top, black, transparent);
                    padding:15px;
                    .date{
                        margin-bottom:5px;
                        font-weight:bold;
                        svg{
                            margin-top:-3px;
                        }
                    }
                    h4{
                        margin-bottom:0px;
                        font-weight:bold;
                    }
                }
            }
            .box{
                box-shadow:0 2px 4px 0 rgb(0 0 0 / 25%);
                margin-bottom:30px;
                img{
                    width:100%;
                    height:150px;
                    object-fit:cover;
                }
                .info{
                    padding:15px;
                    .date{
                        margin-bottom:10px;
                        svg{
                            margin-top:-3px;
                            margin-right:5px;
                        }
                    }
                    h5{
                        font-weight:400;
                        height:72px;
                        overflow:hidden;
                    }
                    .more{
                        text-align:right;
                        svg{
                            font-size:20px;
                        }
                    }
                }
            }
            .loadmore{
                margin:0px auto;
                display:block;
                border:1px solid rgba(0,0,0,0.5);
                background:none;
                padding:8px 30px;
            }
        }
    }
    @media only screen and (max-width: 768px){
        padding-left:15px;
        padding-right:15px;
        .row{
            .left{
                border:1px solid rgba(0,0,0,0.1);
                padding:15px;
                margin-bottom:15px;
                h4{
                    padding-bottom:15px;
                    margin-bottom:15px;
                    border-bottom:1px solid rgba(0,0,0,0.1);
                    font-weight:500;
                }
                .options{
                    .opt{
                        margin-bottom:0px;
                    }
                }
            }
            .right{
                padding-left:0px;
                border-left:unset;
                .search-con{
                    input{
                        padding-top:6px;
                        padding-bottom:6px;
                    }
                }
                .posts-con{
                    .firstbox{
                        height:200px;
                        .lastnews{
                            font-size:${({ theme }) => theme.fontSizeSmall};
                            padding:6px 15px;
                        }
                        .info{
                            h4{
                                font-size:${({ theme }) => theme.fontSize};
                            }
                        }
                    }
                    .box{
                        .info{
                            .date{
                                font-size:${({ theme }) => theme.fontSizeSmall};
                                margin-bottom:5px;
                            }
                            h5{
                                height:auto;
                                margin-bottom:0px;
                            }
                        }
                    }
                }
            }
        }
    }
`