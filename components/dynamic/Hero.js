import React from 'react';
import styled from 'styled-components';
import minimize from '../miscs/minimize';
import splitText from '../miscs/splitText';

const Hero = ({data}) => {
    return (
        <Container image={minimize(data.Image)} imageMobile={data.ImageMobile && minimize(data.ImageMobile)} fade={data.Fade} height={data.Height} heightMobile={data.HeightMobile}>
            <div className="fadeLayer">
                <div className="vw5">
                    <h1>{splitText(data.Title).map(el=><span key={Math.random()}>{el}</span>)}</h1>
                    <h6>{splitText(data.Description).map(el=><span key={Math.random()}>{el}</span>)}</h6>
                </div>
            </div>
        </Container>
    );
};

export default Hero;

const Container = styled.div `
    height:${({height})=>height};
    background-image:${({image}) => image && `url(${image})`};
    background-size:cover;
    background-position:center center;
    .fadeLayer{
        width:100%;
        height:${({height})=>height};
        background-color:${({fade}) => fade && `rgba(0,0,0,${fade})`};
        .vw5{
            height:${({height})=>height};
            color:white;
            display:flex;
            flex-direction:column;
            justify-content:center;
            h1{
                font-weight:bold;
                font-size:50px;
                display:flex;
                flex-direction:column;
                margin-bottom:30px;
                padding-top:10vh;
            }
            h6{
                display:flex;
                flex-direction:column;
            }
        }
    }
    @media only screen and (max-width: 768px){
        ${({imageMobile}) => imageMobile && `background-image: url(${imageMobile}) !important`};
        height:${({heightMobile})=>heightMobile};
        .fadeLayer{
            height:${({heightMobile})=>heightMobile};
            .vw5{
                height:${({heightMobile})=>heightMobile};
                h1{
                    font-size:20px;
                    margin-bottom:15px;
                    padding-top:20vh;
                }
                h6{
                    display:inline-block;
                    span{
                        margin-right:5px;
                        &:last-child{
                            margin-right:0px;
                        }
                    }
                }
            }
        }
    }
`