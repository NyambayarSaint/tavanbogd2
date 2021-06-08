import React from 'react';
import styled from 'styled-components';
import Image from '../Image';
import Carousel from 'react-elastic-carousel'
import { MenuContext } from '../miscs/ContextMenuProvider';

const Carousel3 = ({ data }) => {
    const {config} = React.useContext(MenuContext);
    return (
        <Container>
            <div className="container">
                {data.Title && <h3>{data.Title}</h3>}
                <Carousel showArrows={true} pagination={false} itemsToShow={config.width > 768 ? 3 : 1}>
                    {data.Each?.map(el => (
                        <div className="box" key={Math.random()}>
                            <Image src={el.Image} />
                            <h6>{el.Description}</h6>
                        </div>
                    ))}
                </Carousel>

            </div>
        </Container>
    );
};

export default Carousel3;

const Container = styled.div`
    padding-top:5vh;
    padding-bottom:5vh;
    h3{
        text-align:center;
        color:${({ theme }) => theme.mainColor3};
        font-weight:600;
        margin-bottom:50px;
    }
    .box{
        text-align:center;
        padding-left:15px;
        padding-right:15px;
        h6{
            font-weight:400;
        }
        img{
            width:150px;
            height:150px;
            object-fit:cover;
            margin-bottom:15px;
        }
    }
    @media only screen and (max-width: 768px){
        .box{
            padding-left:0px;
            padding-right:0px;
        }
    }
`