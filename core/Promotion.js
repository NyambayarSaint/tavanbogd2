import React from 'react';
import styled from 'styled-components';
import {Parser} from 'html-to-react';
const ContentParser = new Parser()

const Promotion = ({data}) => {
    return (
        <Container>
            {ContentParser.parse(data)}
        </Container>
    );
};

export default Promotion;

const Container = styled.div `
    background-image:url('/img/ribbon.jpg');
    background-size: 100% auto;
    color:white;
    text-align:center;
    padding:7px;
    p{
        font-weight:500;
        margin:0px;
    }
    strong{
        font-weight:500;
        margin:0px;
    }
`