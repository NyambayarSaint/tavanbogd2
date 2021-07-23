import React from 'react';
import styled from 'styled-components';
import { MenuContext } from '../miscs/ContextMenuProvider';
import { BsMap, BsPhone, BsEnvelope } from 'react-icons/bs';
import { IoIosGlobe } from 'react-icons/io';
import { AiFillFacebook, AiFillLinkedin } from 'react-icons/ai'
import { FaInstagramSquare } from 'react-icons/fa'

const Contact = ({ data }) => {

    const { general } = React.useContext(MenuContext);
    React.useEffect(() => {
        // INJECTING SCRIPTS
        window.erxesSettings = {
            forms: [{ brand_id: data.Erxes_brand_id, form_id: data.Erxes_form_id }],
            knowledgeBase: { topic_id: "2DEe4TcQPyerDtxbw" }
        };
        (function () {
            var script = document.createElement("script");
            script.src =
                "https://erxes.tavanbogd.mn/widgets/build/formWidget.bundle.js";
            script.async = true;
            var entry = document.getElementsByTagName("script")[0];
            entry.parentNode.insertBefore(script, entry);
        })();
    }, []);

    return (
        <div className="container">
            <Container>
                <div className="row">
                    <div className="col-md-7">
                        <div data-erxes-embed={data.Erxes_form_id} style={{ width: '100%', height: 'auto' }}></div>
                    </div>
                    <div className="col-md-5">
                        <div className="box">
                            {data.Title && <p className="title"><strong>{data.Title}</strong></p>}
                            <p><a><BsMap />{general.Location}</a></p>
                            <p><a href={`callto:${general.Phone}`}><BsPhone />{general.Phone}</a></p>
                            <p><a href={`mailto:${general.Phone}`}><BsEnvelope />{general.Email}</a></p>
                            <p><a><IoIosGlobe />{general.Website}</a></p>
                            <div className="socials">
                                <a href={general.Facebook} target="__blank"><AiFillFacebook /></a>
                                <a href={general.Linkedin} target="__blank"><AiFillLinkedin /></a>
                                <a href={general.Instagram} target="__blank"><FaInstagramSquare /></a>
                            </div>
                        </div>

                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Contact;

const Container = styled.div`
    margin-top:5vh;
    margin-bottom:5vh;
    .box{
        padding:5vh 45px;
        padding-right:15px;
        color:white;
        background:${({ theme }) => theme.mainColor2};
        .title{
            margin-bottom:30px;
        }
        p{
            font-weight:500;
            svg{
                font-size:24px;
                margin-right:10px;
                margin-top:-2px;
            }
        }
        .socials{
            margin-top:30px;
            svg{
                font-size:30px;
                margin-right:10px;
            }
        }
    }
    @media only screen and (max-width: 768px){
        .box{
            padding-left:30px;
            padding-right:30px;
        }
    }
`