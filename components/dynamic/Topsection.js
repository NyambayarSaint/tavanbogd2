import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import minimize from '../miscs/minimize';

const Topsection = ({ data }) => {
    const R = useRouter();
    return (
        <Container img={minimize(data.Image)}>
            <div className="effect">
                <div className="dark">
                    <div className="container">
                        {data.Title && <h3>{data.Title}</h3>}
                        {data.Description && <p>{data.Description}</p>}
                        {data.ButtonText && <button onClick={()=> data.ButtonLink && R.push(data.ButtonLink)}>{data.ButtonText}</button>}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Topsection;

const Container = styled.div`
    background-image: url(${({ img }) => img});
    background-size:cover;
    background-position:center top;
    .effect{
        background:#2957a4cc;
        .dark{
            background:rgba(0,0,0,0.65);
            .container{
                color:white;
                padding-top:10vh;
                padding-bottom:10vh;
                h3{
                    font-weight:400;
                    margin-bottom:2vh;
                }
                button{
                    border:none;
                    background:${({theme})=>theme.mainColor2};
                    color:white;
                    padding:12px 30px;
                }
            }
        }
    }
    @media only screen and (max-width: 768px){
        .effect{
            .dark{
                .container{
                    padding-top:30px;
                    padding-bottom:30px;
                    h3{
                        font-weight:500;
                        margin-bottom:5px;
                    }
                    p{
                        font-weight:300;
                        margin-bottom:10px;
                    }
                    button{
                        padding:6px 30px;
                    }
                }
            }
        }
    }
`