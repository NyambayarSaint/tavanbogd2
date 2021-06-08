import React from 'react';
import styled from 'styled-components';
import Image from '../Image';
import { AiOutlineArrowDown } from 'react-icons/ai'

const Preselection = ({ data }) => {
    return (
        <Container>
            <div className="container">
                {data.Steps?.map(el => (
                    <div className="box row" key={Math.random()}>
                        <div className="title col-md-5">{el.Title}</div>
                        <div className="col-md-2 image"><Image src={el.Image} size="medium" /></div>
                        <div className="desc col-md-5">{el.Description}</div>
                        <div className="col-md-12 down"><AiOutlineArrowDown /></div>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default Preselection;

const Container = styled.div`
    padding-top:10vh;
    padding-bottom:10vh;
    .container{
        .box{
            display:flex;
            .title{
                display:flex;
                align-items:center;
                justify-content:flex-end;
                font-weight:bold;
            }
            .image{
                text-align:center;
            }
            .desc{
                text-align:left;
                display:flex;
                align-items:center;
            }
            .down{
                text-align:center;
                svg{
                    font-size:20px;
                    color:rgba(0,0,0,0.85);
                }
                margin-top:15px;
                margin-bottom:30px;
            }
            &:last-child{
                .down{
                    display:none;
                }
            }
        }
    }
    @media only screen and (max-width: 768px){
        .container{
            .box{
                .title{
                    justify-content:center;
                    text-align:center;
                    margin-bottom:15px;
                }
                .desc{
                    justify-content:center;
                    text-align:center;
                }
                .image{
                    margin-bottom:15px;
                }
            }
        }
    }
`