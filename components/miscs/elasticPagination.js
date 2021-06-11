import React from 'react';
import styled from 'styled-components';

const elasticPagination = ({ pages, activePage, onClick, color }) => {
    return (
        <Pag color={color}>
            {pages.map(page => {
                const isActivePage = activePage === page
                return (
                    <div
                        key={Math.random()}
                        onClick={() => onClick(page)}
                        active={isActivePage}
                        className={isActivePage ? 'active' : ''}
                    />
                )
            })}
        </Pag>
    )
}

export default elasticPagination;

const Pag = styled.div`
display:flex;
justify-content:space-between;
width:100%;
margin-top:15px;
div{
    width:50px;
    height:6px;
    margin:0px 5px;
    background:white;
    border:1px solid #162B4E;
    flex:1;
    position:relative;
    &.active{
        background:#162B4E;
        &:after{
            content:"";
            position:absolute;
            bottom:5px;
            left:50%;
            margin-left:-5px;
            width: 0; 
            height: 0; 
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 5px solid #162B4E;
        }
    }
    &:last-child{
        margin-right:5px;
    }
    
}
`