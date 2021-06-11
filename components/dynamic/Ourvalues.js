import React from 'react';
import styled from 'styled-components';
import Image from '../Image';
import { MenuContext } from '../miscs/ContextMenuProvider';
import Carousel from 'react-elastic-carousel'
import elasticPagination from '../miscs/elasticPagination';

const Ourvalues = ({ data }) => {

    const { general, config } = React.useContext(MenuContext);

    return (
        <Container>
            <div className="container">
                {data.Title && <h3 className="maintitle">{data.Title}</h3>}
                {config.width > 768 ?
                    <div className="row">
                        {general.OurValue?.map(el => (
                            <div className="col-md-3" key={Math.random()}>
                                <div className="box">
                                    <div className="icon">
                                        <Image src={el.Icon} size="small" />
                                    </div>
                                    <h5>{el.Title}</h5>
                                    <div className="lists">
                                        {el.Ourvalues.map(ok => <span key={Math.random()}>{ok.Title}</span>)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    <Carousel itemsToShow={1} renderPagination={elasticPagination}>
                        {general.OurValue?.map(el => (
                            <div className="col-md-3" key={Math.random()}>
                                <div className="box">
                                    <div className="icon">
                                        <Image src={el.Icon} size="small" />
                                    </div>
                                    <h5>{el.Title}</h5>
                                    <div className="lists">
                                        {el.Ourvalues.map(ok => <span key={Math.random()}>{ok.Title}</span>)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                }
            </div>
        </Container>
    );
};

export default Ourvalues;

const Container = styled.div`
    padding-top:5vh;
    padding-bottom:5vh;
    .maintitle{
        text-align:center;
        width:fit-content;
        width:-moz-fit-content;
        margin:0px auto;
        margin-bottom:45px;
        &:after{
            content:"";
            display:block;
            margin-top:5px;
            width:100%;
            height:3px;
            background-image:linear-gradient(to right, ${({ theme }) => theme.mainColor}, ${({ theme }) => theme.mainColor2});
        }
    }
    .box{
        text-align:center;
        .icon{
            img{
                width:75px;
                margin-bottom:15px;
            }
        }
        h5{
            width:fit-content;
            width:-moz-fit-content;
            margin:0px auto;
            margin-bottom:15px;
            &:after{
                content:"";
                display:block;
                margin-top:10px;
                width:100%;
                height:1px;
                background:rgba(0,0,0,0.3);
            }
        }
        .lists{
            span{
                display:block;
                margin-bottom:10px;
                font-weight:500;
                &:before{
                    content:"-";
                    margin-right:5px;
                }
            }
        }
    }
`