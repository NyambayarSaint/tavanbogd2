import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Centered = ({ data }) => {
    return (
        <Container>
            <div className="container">
                {data.Title && <h1>{data.Title}</h1>}
                {data.Description && <h4>{data.Description}</h4>}
                {data.ButtonText && <Link href={data.ButtonLink}><a><button>{data.ButtonText}</button></a></Link>}
            </div>
        </Container>
    );
};

export default Centered;

const Container = styled.div`
    padding-top:5vh;
    padding-bottom:5vh;
    .container{
        text-align:center;
        h1{
            margin-bottom:30px;
            color:${({theme})=>theme.mainColor3};
            font-weight:600;
        }
        h4{
            margin-bottom:40px;
            font-weight:400;
            line-height:40px;
        }
        button{
            border:none;
            background:${({theme})=>theme.mainColor3};
            color:white;
            padding:15px 60px;
        }
    }
    @media only screen and (max-width: 768px){
        .container{
            h1{
                margin-bottom:20px;
            }
            h4{
                line-height:25px;
                margin-bottom:25px;
            }
            button{
                padding:8px;
                width:100%;
            }
        }
    }
`