import React from 'react';
import styled from 'styled-components';
import Carousel from 'react-elastic-carousel'
import { MenuContext } from '../miscs/ContextMenuProvider';
import Image from '../Image';

const Grid3 = ({ data }) => {
    const { config } = React.useContext(MenuContext);
    return (
        <Container>
            <div className="container">
                {data.Title && <h3>{data.Title}</h3>}
                {config.width > 768 ?
                    <div className="row">
                        {data.List?.map(el => (
                            <div className="col-md-4" key={Math.random()}>
                                <div className="box">
                                    <Image src={el.Image} size="medium" />
                                    <h5>{el.Title}</h5>
                                    <p>{el.Description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    <Carousel itemsToShow={1}>
                        {data.List?.map(el => (
                            <div className="boxx">
                                <Image src={el.Image} size="medium" />
                                <h5>{el.Title}</h5>
                                <p>{el.Description}</p>
                            </div>
                        ))}
                    </Carousel>
                }
            </div>
        </Container>
    );
};

export default Grid3;

const Container = styled.div`
    padding-top:5vh;
    padding-bottom:5vh;
    .container{
        h3{
            color:${({ theme }) => theme.mainColor3};
            font-weight:600;
            display:block;
            width:fit-content;
            width:-moz-fit-content;
            margin:0px auto;
            margin-bottom:30px;
            &:after{
                content: "";
                display:block;
                height:5px;
                width:100%;
                background-image:linear-gradient(to right, ${({ theme }) => theme.mainColor},${({ theme }) => theme.mainColor2});
                margin-top:5px;
            }
        }
        .row{
            .box{
                text-align:center;
                margin-bottom:30px;
                h5{
                    font-weight:700;
                    color:${({ theme }) => theme.mainColor3};
                }
                img{
                    width:88px;
                    height:88px;
                }
            }
        }
        .rec-carousel-item{
            align-items:flex-start;
            .boxx{
                text-align:center;
                img{
                    width:88px;
                    height:88px;
                    margin-bottom:15px;
                }
                h5{
                    font-weight:600;
                    color:${({ theme }) => theme.mainColor3};
                }
            }
        }
    }
`