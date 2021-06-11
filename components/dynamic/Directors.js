import React from 'react';
import styled from 'styled-components';
import Image from '../Image';

const Directors = ({ data }) => {
    return (
        <Container>
            <div className="container">
                <h5>{data.Title}</h5>
                <div className="row">
                    {data.Subdirectors.map(el => (
                        <div className="col-md-3 col-6" key={Math.random()}>
                            <div className="box">
                                <Image src={el.Image} size="medium" />
                                {el.Name && <p><strong>{el.Name}</strong></p>}
                                {el.Company && <p className="company">{el.Company}</p>}
                                {el.Position && <p>{el.Position}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default Directors;

const Container = styled.div`
    .container{
        h5{
            &:after{
                content: "";
                display:block;
                height:3px;
                margin-top:10px;
                background-image: linear-gradient(to right, ${({ theme }) => theme.mainColor}, ${({ theme }) => theme.mainColor2});
            }
        }
        .box{
            padding:30px;
            text-align:center;
            img{
                width:100%;
                margin-bottom:10px;
            }
            p{
                margin-bottom:3px;
                font-weight:500;
            }
            .company{
                opacity:0.7;
            }
        }
    }
    @media only screen and (max-width: 768px){
        .container{
            h5{
                margin-bottom:30px;
            }
            .box{
                padding:0px;
                margin-bottom:30px;
                p{
                    margin-bottom:0px;
                }
            }
        }
    }
`