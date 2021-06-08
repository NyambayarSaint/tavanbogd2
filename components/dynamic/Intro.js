import React from 'react';
import styled from 'styled-components';
import Image from '../Image';

const Intro = ({ data }) => {
    return (
        <Container reversed={data.Reversed}>
            <div className="side picture"><Image src={data.Image}/></div>
            <div className="side content">
                {data.Caption && <p className="caption">{data.Caption}</p>}
                {data.Title && <h4 className="title">{data.Title}</h4>}
                <div className="line"></div>
                {data.Description && <p className="description">{data.Description}</p>}
            </div>
        </Container>
    );
};

export default Intro;

const Container = styled.div`
    display:flex;
    align-items:center;
    justify-content:${({ reversed }) => reversed ? 'flex-start' : 'flex-end'};
    .content{
        height:80vh;
        background:#f5f5f6;
        width:70%;
        display:flex;
        justify-content:center;
        flex-direction:column;
        ${({ reversed }) => reversed ? 'padding-right:20%;padding-left:5vw;' : 'padding-left:20%;padding-right:5vw;'};
        ${({ reversed }) => reversed ? `align-items:flex-end;text-align:right;` : `align-items:flex-start;text-align:left;`};
        .caption{
            text-transform:uppercase;
            opacity:0.7;
        }
        .title{
            font-weight:400;
        }
        .line{
            width:200px;
            height:3px;
            margin-bottom:30px;
            background-image: linear-gradient(to right, #2957a4, #00a859);
        }
    }
    .picture{
        position:absolute;
        width:45%;
        ${({ reversed }) => reversed ? 'right:0px;' : 'left:0px'};
        img{
            width:100%;
            padding:10vh 0px;
        }
    }
    @media only screen and (max-width: 768px){
        flex-direction:column;
        .side{
            width:100%;
        }
        .picture{
            position:unset;
            img{
                padding:0px;
                max-height:180px;
                object-fit:cover;
            }
        }
        .content{
            padding-left:0px;
            padding-right:0px;
            height:unset;
            padding-top:15px;
            padding-left:15px;
            padding-right:15px;
            align-items:center;
            text-align:center;
            .line{
                margin-bottom:15px;
                margin-top:5px;
            }
            .title{
                font-weight:500;
            }
        }
    }
`