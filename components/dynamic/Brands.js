import React from 'react';
import styled from 'styled-components';
import Image from '../Image';
import checkLanguage from '../miscs/checkLanguage';

const Brands = ({ data }) => {

    const [activities, setActivities] = React.useState([]);
    const [filter, setFilter] = React.useState(null);
    const [brands, setBrands] = React.useState([]);
    const [brandsData, setBrandsData] = React.useState([]);

    React.useEffect(() => {
        go();
        goFilter();
    }, [filter, brandsData]);

    const go = async () => {
        if (brandsData.length === 0 && activities.length === 0) {
            let res = await checkLanguage('/activities');
            setActivities(res.data);
            let resBrands = await checkLanguage('/brands');
            setBrandsData(resBrands.data);
        }

    }

    const goFilter = async () => {

        if (!filter) {
            return setBrands(brandsData);
        }
        else {
            let tmp = [];
            brandsData.map(el => {
                if (el.Company) {
                    if (el.Company.Activities) {
                        el.Company.Activities.map(K => K === filter && tmp.push(el));
                    }
                }
            });
            setBrands(tmp);
        }
    }

    return (
        <Container>
            <div className="container">
                <h4>{data.Title}</h4>
                <div className="activity-con">
                    <div className={`each each-selector ${!filter && 'active'}`} onClick={() => setFilter(null)}>{data.All}</div>
                    {activities.map(el => <div className={`each each-selector ${filter === el.id && 'active'}`} key={Math.random()} onClick={() => setFilter(el.id)}>{el.Title}</div>)}
                </div>
                <div className="box-con row">
                    {brands.map(el => (
                        <div className="col-md-3 col-4 cl" key={Math.random()}>
                            <div className="box">
                                <div className="top">
                                    <a href={el.Link} target="__blank">
                                        <Image src={el.Logo} size="medium" />
                                    </a>
                                </div>
                                <a href={el.Link} target="__blank">
                                    <p>{el.Title}</p>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default Brands;

const Container = styled.div`
    padding:50px 0px;
    .container{
        h4{
            color:${({ theme }) => theme.mainColor3};
            font-weight:bold;
            text-align:center;
            margin-bottom:5vh;
        }
        .activity-con{
            display:flex;
            margin-bottom:5vh;
            justify-content:center;
            .each{
                padding:12px 10px;
                background:rgba(0,0,0,0.05);
                margin-right:15px;
                line-height:15px;
                display:flex;
                align-items:center;
                text-align:center;
                &:hover{
                    cursor:pointer;
                }
                &:last-child{
                    margin-right:0px;
                }
                &.active{
                    background:${({ theme }) => theme.mainColor3};
                    color:white;
                }
            }
        }
        .box-con{
            .box{
                border:1px solid rgba(0,0,0,0.1);
                box-shadow:0 2px 4px 0 rgb(0 0 0 / 10%);
                text-align:center;
                margin-bottom:30px;
                .top{
                    padding:15px 30px;
                    img{
                        height:65px;
                        max-width:50%;
                        object-fit:contain;
                    }
                }
                p{
                    margin:0px;
                    background:rgba(0,0,0,0.07);
                    padding:8px 0px;
                    opacity:0.8;
                }
            }
        }
    }
    @media only screen and (max-width: 768px){
        .container{
            .activity-con{
                flex-wrap:wrap;
                margin-bottom:10px;
                .each{
                    margin-bottom:7.5px;
                    padding:6px 10px;
                    font-size:${({ theme }) => theme.fontSizeSmall};
                    margin-right:7.5px;
                }
            }
            .box-con{
                .box{
                    margin-bottom:15px;
                    .top{
                        img{
                            max-width:100%;
                        }
                    }
                    p{
                        font-size:${({ theme }) => theme.fontSizeSmall};
                    }
                }
            }
            .row{
                margin-left:0px;
                margin-right:0px;
                .cl{
                    padding:0px;
                }
            }
            .box-con{
                .box{
                    box-shadow:unset;
                    margin-bottom:0px;
                    p{
                        line-height:15px;
                        height:46px;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                    }
                }
            }
        }
    }
`