import React from 'react';
import styled from 'styled-components';
import Image from '../Image';
import { Document, Page } from 'react-pdf';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { pdfjs } from 'react-pdf';
import minimize from '../miscs/minimize';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const Pdf = ({ data }) => {

    const ContainerRef = React.useRef()
    const [minHeight, setMinHeight] = React.useState(671)
    const [numberOfPages, setNumberOfPages] = React.useState(null)
    const [pageNumber, setPageNumber] = React.useState(1)
    const onDocumentLoadSuccess = ({ numPages }) => {
        const getHeight = ContainerRef.current.offsetHeight
        setTimeout(() => {
            setMinHeight(getHeight)
        }, 3000);
        setNumberOfPages(numPages)
    }
    console.log(minimize(data.file), 'file is here')
    return (
        <Container ref={ContainerRef} minHeight={minHeight}>
            <div className='container'>
                <div className='pdf_wrapper'>
                    <Document file={minimize(data.file)} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page scale={0.8} pageNumber={pageNumber} />
                    </Document>
                    <div className='control_wrapper'>
                        <div className='control_arrows' onClick={()=>setPageNumber(pageNumber - 1)}><AiOutlineArrowLeft /></div>
                        <div className='middle_wrap'>Page {pageNumber} of {numberOfPages}</div>
                        <div className='control_arrows' onClick={()=>setPageNumber(pageNumber + 1)}><AiOutlineArrowRight /></div>
                    </div>
                </div>

            </div>
        </Container>
    );
};

export default Pdf;

const Container = styled.div`
    .pdf_wrapper{
        width:fit-content;
        width:-moz-fit-content;
        margin:30px auto;
        position:relative;
        min-height:${({minHeight}) => minHeight && minHeight}px;
        canvas{
            margin:auto;
        }
        .control_wrapper{
            position:absolute;
            left:50%;
            margin-left:-96px;
            background:white;
            box-shadow:rgb(0 0 0 / 25%) 0px 2px 4px 0px;
            bottom:100px;
            opacity:0;
            transition:0.3s ease;
            border-radius:4px;
            display:flex;
            justify-content:center;
            align-items:center;
            overflow:hidden;
            border:1px solid rgba(0,0,0,0.1);
            .control_arrows{
                padding:16px;
                &:hover{
                    cursor:pointer;
                    background:rgba(0,0,0,0.2);
                }
            }
            .middle_wrap{
                margin-left:10px;
                margin-right:10px;
            }
        }
        &:hover{
            .control_wrapper{
                opacity:0.4;
                &:hover{
                    opacity:1;
                }
            }
        }
    }
`

