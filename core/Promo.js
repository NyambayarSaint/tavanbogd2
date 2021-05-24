import { MenuContext } from '@/components/miscs/ContextMenuProvider';
import minimize from '@/components/miscs/minimize';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { AiOutlineCloseSquare } from 'react-icons/ai'

const Promo = () => {
    const outsideRef = React.useRef();
    const [show, setShow] = React.useState(false);
    const { menu, promoTriggered } = React.useContext(MenuContext);

    React.useEffect(() => {
        !promoTriggered && setTimeout(() => {
            setShow(true);
        }, 3000);
    }, []);

    return (
        menu.Promo ? <Container>
            <AnimatePresence>
                {show && <motion.div ref={outsideRef} onClick={(e) => e.target === outsideRef.current && setShow(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="con">
                    <div className="box">
                        {menu.Promo.Link ?
                            <Link href={menu.Promo.Link}><a><img onClick={()=>setShow(false)} src={minimize(menu.Promo.Image)} /></a></Link>
                            :
                            <img onClick={()=>setShow(false)} src={minimize(menu.Promo.Image)} />
                        }
                        <AiOutlineCloseSquare onClick={() => setShow(false)} />
                    </div>
                </motion.div>}
            </AnimatePresence>
        </Container> : ''
    );
};

export default Promo;

const Container = styled.div`
position:relative;
z-index:999;

    .con{
        position:fixed;
        left:0;
        right:0;
        top:0;
        bottom:0;
        background:rgba(0,0,0,0.7);
        display:flex;
        align-items:center;
        justify-content:center;
        padding-left:10vw;
        padding-right:10vw;
        .box{
            background:white;
            img{
                max-height:70vh;
                object-fit:contain;
            }
            svg{
                position:absolute;
                color:white;
                font-size:30px;
                margin-left:-30px;
            }
        }
    }
    @media only screen and (max-width: 768px){
        .con{
            padding-left:0px;
            padding-right:0px;
            .box{
                margin:0px 15px;
                img{
                    max-height:70vh;
                }
            }
        }
    }
`