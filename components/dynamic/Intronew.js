import React from 'react';
import styled from 'styled-components';
import Image from '../Image';

const Intro = ({ data }) => {
    return (
        <Container>
            {data.Title && <h2 className="maintitle">{data.Title}</h2>}
            <div className="boxes-container row">
                {data.IntroSection?.map(el => (
                    <div className="boxes col-md-3" key={Math.random()}>
                        <div className="imgcon">
                            <Image src={el.Image} size="medium"/>
                        </div>
                        <div className="top">
                            <div className="slogan">{el.Caption}</div>
                            <p className="maintext"><b>{el.Title}</b></p>
                            <div className="line"></div>
                        </div>
                        <div className="middle">
                            <p>
                            {el.Description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default Intro;

const Container = styled.div`
    padding-left:5vw;
    padding-right:5vw;
    padding-top:100px;
    padding-bottom:100px;
    .maintitle{
        margin-bottom:30px;
        border-bottom:2px solid rgba(0,0,0,0.1);
        padding-bottom:10px;
    }
    .line{
        width:200px;
        height:3px;
        margin-bottom:30px;
        background-image: linear-gradient(to right,#2957a4,#00a859);
        margin-left:auto;
        margin-right:auto;
    }
    .boxes-container{
        width:100%;
        position:relative;
        display:flex;
        text-align:center;
        .boxes{
            .top{
                margin-top:15px;
                .slogan{
                    max-height:21px;
                    min-height:21px;
                }
                .maintext{
                    font-size:16px;
                }
            }
            .imgcon{
                img{
                    width:100%;
                    height:223px;
                    object-fit:cover;
                }
            }
        }
    }
`