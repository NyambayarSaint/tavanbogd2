import React from 'react';
import styled from 'styled-components';
import Image from '../Image';

const Sidebyside = ({ data }) => {
    return (
        <Container>
            <div className="container">
                <div className="row">
                    <div className="info-con col-md-6">
                        {data.Title && <h2>{data.Title}</h2>}
                        {data.Description && <h6>{data.Description}</h6>}
                    </div>
                    <div className="img-con col-md-6">
                        <Image src={data.Image} />
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Sidebyside;

const Container = styled.div`
    padding-top:5vh;
    padding-bottom:5vh;
    .row{
        .info-con{
            justify-content:center;
            display:flex;
            flex-direction:column;
            h2{
                color:${({theme})=>theme.mainColor3};
                font-weight:600;
                margin-bottom:15px;
            }
            h6{
                font-weight:400;
                line-height:25px;
            }
        }
        .img-con{
            img{
                width:100%;
            }
        }
    }
    @media only screen and (max-width: 768px){
        .row{
            flex-direction:column-reverse;
            display:flex;
            .img-con{
                margin-bottom:15px;
            }
        }
    }
`