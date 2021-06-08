import React from 'react';
import styled from 'styled-components';
import Image from '../Image';
import minimize from '../miscs/minimize';

const Infobar = ({ data }) => {
    return (
        <Container image={minimize(data.Image)}>
            <div className="effect">
                <div className="dark">
                    <div className="container">
                        {data.Boxes.length && data.Boxes.map(el => (
                            <div className="box" key={Math.random()}>
                                <div className="top">
                                    <Image src={el.Icon} size="medium" />
                                    <h1>{el.Number}</h1>
                                </div>
                                <p>{el.Title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Infobar;

const Container = styled.div`
    ${({ image }) => image && `background-image: url(${image})`};
    background-size:cover;
    background-position:center center;
    .effect{
        background:rgba(41,87,164,0.9);
        .dark{
            background:rgba(0,0,0,0.5);
            .container{
                display:flex;
                color:white;
                padding-top:60px;
                padding-bottom:60px;
                justify-content:space-between;
                .box{
                    flex:1;
                    text-align:center;
                    .top{
                        display:flex;
                        justify-content:center;
                        align-items:center;
                        img{
                            width:50px;
                            margin-right:10px;
                        }
                        h1{
                            font-weight:300;
                            margin-bottom:0px;
                        }
                    }
                    p{
                        margin-top:15px;
                        margin-bottom:0px;
                    }
                }
            }
        }
    }
    @media only screen and (max-width: 768px){
        .effect{
            .dark{
                .container{
                    padding-top:20px;
                    padding-bottom:20px;
                    flex-wrap:wrap;
                    .box{
                        flex:unset;
                        min-width:50%;
                        max-width:50%;
                        .top{
                            img{
                                width:30px;
                            }
                            h1{
                                font-size:25px;
                            }
                        }
                        &:nth-child(2){
                            margin-bottom:30px;
                        }
                        &:first-child{
                            margin-bottom:30px;
                        }
                    }
                }
            }
        }
    }
`