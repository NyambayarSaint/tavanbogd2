import { MenuContext } from '@/components/miscs/ContextMenuProvider';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';
import { changeLang, returnLanguage } from '@/components/miscs/parseCookies';
import SearchInput from './SearchInput';

const HeaderDesktop = ({headerType}) => {

    const { general } = React.useContext(MenuContext);
    const [mode, setMode] = React.useState(headerType);
    const [height, setHeight] = React.useState(0);
    const Menu = general.Menu_header;
    const refContainer = React.useRef();

    const checkMode = () => {
        console.log('aliishuu', headerType)
        const scrollPos = window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;
        if (headerType === "white") {
            setHeight(0);
            if (scrollPos === 0) return setMode('white');
            return setMode('black');
        }
        else {
            refContainer.current && setHeight(refContainer.current.offsetHeight);
            setMode('black');
        }
    }

    React.useEffect(() => {
        checkMode(); // Initial check
        window.addEventListener('scroll', checkMode);
    }, []);

    return (
        <>
            <Container color={mode} ref={refContainer} className="vw5" >
                <Link href="/"><a>
                    {mode === "black" ? <img src="/img/logo.png" /> : <img src="/img/logo-white3.png" />}
                </a></Link>
                <div className="main">
                    <div className="other-container">
                        <div className="search-container">
                            <SearchInput />
                        </div>
                        <div className="language-container" style={{cursor:'pointer'}}>
                            {returnLanguage() === "mn" ? <img onClick={() => changeLang()} src="/img/en.png" /> : <img onClick={() => changeLang()} src="/img/mn.jpg" />}
                        </div>
                    </div>
                    <div className="menu-container">
                        {Menu.length ? Menu.map(el =>
                            el.Child.length ?
                                <div key={Math.random()} className="with-children">
                                    {el.Path ? <Link href={el.Path} key={Math.random()}><a><li>{el.Name}</li></a></Link> : <a key={Math.random()}><li>{el.Name}</li></a>}
                                    <div className="children-container">
                                        {el.Child.map(child => child.Path ? <Link href={child.Path} key={Math.random()}><a><span>{child.Name}</span></a></Link> : <a key={Math.random()}><span>{child.Name}</span></a>)}
                                    </div>
                                </div>
                                :
                                el.Path ? <Link href={el.Path} key={Math.random()}><a><li>{el.Name}</li></a></Link> : <a key={Math.random()}><li>{el.Name}</li></a>
                        ) : ''}
                    </div>
                </div>
            </Container>
            <Padder height={height} />
        </>

    );
};

export default HeaderDesktop;

const Padder = styled.div`
    height: ${({ height }) => height + 'px;'};
`

const Container = styled.div`
    width:100%;
    padding-top:15px;
    padding-bottom:15px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    color:${({ color }) => color};
    position:fixed;
    background:${({ color }) => color === "white" ? 'transparent' : 'white'};
    transition:0.5s ease;
    ${({ color }) => color === "white" ? '' : 'box-shadow:0px 0px 5px rgba(0,0,0,0.3) !important;'};

    .main{
        display:flex;
        flex-direction:column;
        align-items:flex-end;
        .other-container{
            display:flex;
            .search-container{
                position:relative;
                input{
                    background:none;
                    border:none;
                    border-bottom:1px solid ${({ color }) => color};
                    color:${({ color }) => color};
                }
                svg{
                    position:absolute;
                    right:0px;
                    &:hover{
                        cursor:pointer;
                    }
                }
            }
            .language-container{
                margin-left:30px;
                img{
                    height:17.5px;
                }
            }
        }
        .menu-container{
            display:flex;
            a,.with-children{
                margin-right:15px;
                display:block;
                text-decoration:none;
                transition:0.3s ease;
                ${({ color }) => color === 'black' && `font-weight:500`};
                &:last-child{
                    margin-right:0px;
                }
                li{
                    position:relative;
                    list-style-type:none;
                    color:${({ color }) => color};
                    padding:30px 0px 15px;
                    &:after{
                        content: "";
                        display:block;
                        width:100%;
                        height:1px;
                        background-color:${({ color }) => color};
                        margin-top:5px;
                        margin-left:-30px;
                        opacity:0;
                        transition:0.3s ease;
                    }
                    &:hover{
                        &:after{
                            opacity:1;
                            margin-left:0px;
                        }
                    }
                }
                .children-container{
                    position:absolute;
                    padding:7.5px 15px;
                    transition:0.3s ease;
                    transform: scaleY(0);
                    background:${({ color }) => color === 'white' ? 'transparent' : 'white'};
                    ${({ color }) => color === 'black' && `box-shadow:0px 4px 4px rgb(0 0 0 / 5%);`};
                    span{
                        display:block;
                        padding:7.5px 0px;
                    }
                    a{
                        text-decoration:none;
                        color:${({ color }) => color};
                    }
                }
                &:hover{
                    .children-container{
                        transform: scaleY(1);
                    }
                }
            }
        }
    }
`