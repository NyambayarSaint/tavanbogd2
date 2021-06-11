import Header from '@/core/Header'
import Footer from '@/core/Footer';
import { MenuContext } from '@/miscs/ContextMenuProvider';
import { useContext } from "react";
import styled from "styled-components";
import PreSeo from "@/components/miscs/PreSeo";
import Promotion from './Promotion';
import Promo from './Promo';

export default function Root(props) {

    const { completelyLoaded } = useContext(MenuContext);

    return (
        <Body>
            <PreSeo seo={props.seo} />
            {/* <Promo /> */}
            {completelyLoaded && <Header />}
            {/* {completelyLoaded && menu.Promotion && <Promotion data={menu.Promotion} />} */}
            {props.children}
            {completelyLoaded && <Footer />}
        </Body>
    )
}

const Body = styled.div`

    font-size: ${(props) => props.theme.fontSize};
    font-family: ${(props) => props.theme.fontFamily};
    font-weight: ${props => props.theme.fontWeightNormal};
    color:black;

    .fs-medium{
        font-size:14px;
    }

    div{
        font-size:inherit;
    }
    a{
        color:inherit;
    }
    
    button{
        transition:0.5s ease;
        opacity:1;
        &:active{
            opacity:0.7;
        }
    }
    .vw5{
        padding-left:5vw;
        padding-right:5vw;
    }
    button,a,input,textarea{
        outline:none;
    }

    ${'' /* 3rd party css customization */}
    .rec-carousel-item{
        display:flex;
        align-items:center;
    }
    .rec-pagination{
        button{

        }
        .rec-dot_active{
            box-shadow:0 0 1px 3px ${({ theme }) => theme.mainColor};
            background:white;
        }
    }
    .rec-arrow{
        background-color: rgba(255,255,255,0.6);
        outline:none;
        &:hover{
            background:${({ theme }) => theme.mainColor} !important;
        }
        &:focus{
            background:white;
            color:#333;
        }
    }
    
    @media only screen and (max-width: 768px){
        overflow-x:hidden;
        h1,h2,h3,h4,h5,h6{
            font-size:${({theme})=>theme.fontSize2};
        }
    }
`