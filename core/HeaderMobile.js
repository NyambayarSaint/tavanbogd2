import { MenuContext } from '@/components/miscs/ContextMenuProvider';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import HamburgerMenu from 'react-hamburger-menu'
import { BsSearch, BsChevronDown, BsArrowDown } from 'react-icons/bs';
import { FaPhoneAlt } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import { changeLang, returnLanguage } from '@/components/miscs/parseCookies';
import SearchInput from './SearchInput';


const HeaderMobile = () => {
    const { general } = React.useContext(MenuContext);
    const Menu = general.Menu_header;
    const [mode, setMode] = React.useState('black');
    const [height, setHeight] = React.useState(0);
    const refContainer = React.useRef();
    const refPopup = React.useRef();
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [useHeightForStyle, setUseHeightForStyle] = React.useState(0);

    const checkMode = () => {
        const scrollPos = window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;
        if (location.pathname === "/p/home") {
            setHeight(0);
            if (scrollPos === 0) return setMode('white');
            return setMode('black');
        }
        else {
            refContainer.current && setHeight(refContainer.current.offsetHeight);
            setMode('black');
        }
    }

    const handleOutside = (e) => {
        // e.target !== refPopup.current && setMenuOpen(false);
    }

    const menuOpenHandler = (action) => {
        setMenuOpen(!menuOpen);
        if (action === "triggerSearch") return setTimeout(() => document.querySelector('#search')?.focus(), 300);
        else {
            setTimeout(() => {
                if (document.querySelector('.down-arrow-container')) document.querySelector('.down-arrow-container').style.opacity = "0";
            }, 1650);
        }

    }

    React.useEffect(() => {
        setUseHeightForStyle(refContainer.current.offsetHeight);
        checkMode(); // Initial check
    }, []);

    return (
        <>
            <Padder height={height} />
            <Container menuOpen={menuOpen} color={mode} ref={refContainer}>
                <div className="burger-container">
                    <HamburgerMenu
                        isOpen={menuOpen}
                        menuClicked={menuOpenHandler}
                        width={20}
                        height={15}
                        strokeWidth={1}
                        rotate={0}
                        color={mode}
                        borderRadius={0}
                        animationDuration={0.3}
                    />
                </div>
                <Link href="/p/home"><a className="main-logo">
                    {mode === "black" ? <img src="/img/small-logo-color.png" /> : <img src="/img/small-logo-white.png" />}
                </a></Link>
                <div className="search-container" onClick={() => menuOpenHandler("triggerSearch")}>
                    <BsSearch size={16} />
                </div>
            </Container>
            <AnimatePresence>
                {menuOpen && <Popup useHeightForStyle={useHeightForStyle} color={mode}>
                    <motion.div transition={{ type: 'tween' }} initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} className="popup-container" ref={refPopup} onClick={handleOutside}>
                        <div className="body fs-medium">
                            <div className="search-bar">
                                <SearchInput action={true} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                            </div>
                            {Menu.length ? Menu.map(el =>
                                el.Child.length ?
                                    <div key={Math.random()} className="with-children">
                                        {el.Path ? <Link href={el.Path} key={Math.random()}><a><li onClick={()=>setMenuOpen(false)}>{el.Name} <BsChevronDown /></li></a></Link> : <a key={Math.random()}><li><i>{el.Name}</i> <BsChevronDown /></li></a>}
                                        <div className="children-container">
                                            {el.Child.map(child => child.Path ? <Link href={child.Path} key={Math.random()}><a><span onClick={()=>setMenuOpen(false)}>{child.Name}</span></a></Link> : <a key={Math.random()}><span>{child.Name}</span></a>)}
                                        </div>
                                    </div>
                                    :
                                    el.Path ? <Link href={el.Path} key={Math.random()}><a><li onClick={()=>setMenuOpen(false)}>{el.Name}</li></a></Link> : <a key={Math.random()}><li>{el.Name}</li></a>
                            ) : ''}
                        </div>
                        <div className="bottom-container">
                            <div className="contact-container">
                                <a href={'callto:' + general.Phone}>
                                    <FaPhoneAlt />
                                    <span>{general.Phone}</span>
                                </a>
                            </div>
                            <div className="language-container">
                                {returnLanguage() === "mn" ? <div onClick={() => changeLang()}>English <img src="/img/en.png" /></div> : <div onClick={() => changeLang()}>Mongolian <img src="/img/mn.jpg" /></div>}
                            </div>
                        </div>
                        <div className="down-arrow-container">
                            <BsArrowDown />
                        </div>
                    </motion.div>
                </Popup>}
            </AnimatePresence>
        </>
    );
};

export default HeaderMobile;

const Padder = styled.div`
    height: ${({ height }) => height + 'px;'};
`

const Container = styled.div`
    display:flex;
    padding:7.5px 15px;
    justify-content:space-between;
    align-items:center;
    position:fixed;
    top:0px;
    width:100%;
    color:${({ color }) => color};
    background:${({ color }) => color === "white" ? 'transparent' : 'white'};
    ${'' /* ${({menuOpen, color})=> menuOpen && color && `background:rgba(0,0,0,0.5)`}; */}
    background:${({ menuOpen, color }) => menuOpen && color === "white" && `#343434`};
    transition:0.5s ease;
    z-index:10;
    ${({ color }) => color === "white" ? '' : 'box-shadow:0px 0px 5px rgba(0,0,0,0.3) !important;'};
    ${({ menuOpen, color }) => menuOpen ? color === "white" ? 'border-bottom:1px solid rgba(255,255,255,0.2);' : 'box-shadow:0px 4px 4px rgb(0 0 0 / 7%);' : ''};
    .search-container{
        ${({ menuOpen }) => menuOpen && `opacity:0`};
    }
    .main-logo{
        img{
            height:35px;
        }
    }
`

const Popup = styled.div`
    .popup-container{
        height:100vh;
        width:100%;
        position:fixed;
        left:0px;
        right:0px;
        top:0px;
        z-index:9;
        color:${({ color }) => color};
        background:${({ color }) => color === "white" ? '#343434' : 'white'};
        overflow-y:scroll;
        box-shadow:0px 2px 10px rgba(0,0,0,0.25);
        padding-top:${({ useHeightForStyle }) => useHeightForStyle + 'px;'};
        padding-bottom:50px;
        .body{
            padding:0px 15px;
            position:relative;
            .search-bar{
                padding:15px 0px;
                ${({ color }) => color === "white" ? 'border-bottom:1px solid rgba(255,255,255,0.1);' : 'border-bottom:1px solid rgba(0,0,0,0.1);'};
                input{
                    width:100%;
                    padding:7px 10px;
                    border:none;
                    border-radius:5px;
                    ${({ color }) => color === "white" ? 'background:rgba(255,255,255,0.1);' : 'background:rgba(0,0,0,0.01);'};
                    color:${({ color }) => color};
                    ${({ color }) => color === "black" && `border:1px solid rgba(0,0,0,0.1)`};
                    font-weight:500;
                    &::placeholder{
                        color:${({ color }) => color};
                        opacity:0.7;
                    }
                }
                svg{
                    right:25px;
                    margin-top:8px;
                    position:absolute;
                }
            }
            a,.with-children{
                display:block;
                ${({ color }) => color === "white" ? 'font-weight:300;' : 'font-weight:500;'};
                ${({ color }) => color === "white" ? 'border-bottom:1px solid rgba(255,255,255,0.1);' : 'border-bottom:1px solid rgba(0,0,0,0.1);'};
                li{
                    list-style-type:none;
                    i{
                        opacity:0.5;
                    }
                }
                .children-container{
                    padding-left:20px;
                    a{
                        &:last-child{
                            border-bottom:none;
                        }
                    }
                }
            }
            a{
                padding:15px 0px;
            }
        }
        .bottom-container{
            position:fixed;
            height:50px;
            width:100%;
            top:calc(100vh - 50px);
            padding:15px;
            background:${({ color }) => color === "white" ? '#343434' : 'white'};
            display:flex;
            align-items:center;
            justify-content:space-between;
            flex-direction:row-reverse;
            ${({ color }) => color === "white" ? 'border-top:1px solid rgba(255,255,255,0.1);' : 'border-top:1px solid rgba(0,0,0,0.1);'};
            .language-container{
                img{
                    height:12px;
                }
            }
            .contact-container{
                svg{
                    font-size:16px;
                    margin-right:5px;
                    margin-top:-2px;
                }
            }
        }
        .down-arrow-container{
            position:fixed;
            right:15px;
            top:25vh;
            transition:0.3s ease;

            animation-name: arrowDown;
            animation-duration: 1s;
            animation-iteration-count: 2;

            svg{
                display:block;
                font-size:30px;
                opacity:0.8;
            }
        }
    }
    @keyframes arrowDown{
        0% {margin-top:0px;}
        50% {margin-top:20px;}
        100% {margin-top:0px;}
    }
`