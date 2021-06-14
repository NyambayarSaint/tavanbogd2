import React from 'react';
import styled from 'styled-components';
import minimize from '../miscs/minimize';
import { MenuContext } from '../miscs/ContextMenuProvider';

const Landingpage = ({ data }) => {
    const { general } = React.useContext(MenuContext);
    return (
        <Container>
            <div className="con">
                <div className="top">
                    <img src={minimize(data.Logo)} />
                </div>
                <div className="middle">
                    <div className="m-left">
                        <h4>Вебсайтаар зочлох</h4>
                    </div>
                    <div className="m-right">
                        <h4>Онлайн худалдаа</h4>
                    </div>
                </div>
                <div className="bottom">
                    <div>{general.Copyright}</div>
                </div>
            </div>
        </Container>
    );
};

export default Landingpage;

const Container = styled.div`
    width:100%;
    height:100vh;
    ${'' /* background:#091c3d; */}
    ${'' /* color:white; */}
    overflow-x:hidden;
    overflow-y:hidden;
    #tsparticles{
        position:absolute;
        left:0px;
        top:0px;
        right:0px;
        bottom:0px;
        z-index:1;
    }
    .con{
        padding:30px;
        display:flex;
        justify-content:space-between;
        align-items:center;
        flex-direction:column;
        height:100%;
        position:relative;
        z-index:2;
        .middle{
            display:flex;
            align-items:center;
            width:100%;
            .m-left{
                border-right:1px solid rgba(0,0,0,0.3);
                flex:1;
                text-align:right;
                padding:0px 15px;
                h4{
                    margin-left:auto;
                }
            }
            .m-right{
                flex:1;
                padding:0px 15px;
            }
            h4{
                padding:8px 30px;
                font-weight:300;
                border:1px solid rgba(0,0,0,0.0);
                width:fit-content;
                width:-moz-fit-content;
                margin-bottom:0px;
                &:hover{
                    border:1px solid rgba(0,0,0,0.3);
                    cursor:pointer;
                }
            }
        }
        .bottom{
            button{
                background:none;
                border:0px;
                border:1px solid rgba(0,0,0,0.3);
                padding:8px 30px;
            }
        }
    }
    @media only screen and (max-width: 768px){
        .con{
            padding:15px;
            .m-left{
                padding:0px !important;
                h4{
                    &:hover{
                        border-right:0px !important;
                    }
                }
            }
            .m-right{
                padding:0px !important;
                h4{
                    &:hover{
                        border-left:0px !important;
                    }
                }
            }
            h4{
                padding:8px 15px !important;
                
            }
        }
    }
`