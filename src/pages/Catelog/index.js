import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import styles from './Catalog.module.scss'
import footerImg from '../../asstes/images/footer-bg.jpg'
import Grid from "../../components/Responsive/Grid";
import Row from '../../components/Responsive/Row'
import Col from '../../components/Responsive/Col'
import tmdbApi,{tvType, movieType} from "../../api/tmdbApi";
import CardItem from '../../components/CardItem'
import Button from "../../components/Button";
import { faChevronDown, faSearch } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles)


function Catalog() {
    const { cate } = useParams()

    let page = useRef(1)
    const path = useLocation()
    const [list,setList] = useState([])
    const [totlePage,setTotlePage] = useState(null)

    useEffect(() => {
        const getData = async () => {
            const params = {page:page.current}
            if(cate === 'movie'){
                const data = await tmdbApi.getMovieList(movieType.popular,{params})
                setList(data.results)
                setTotlePage(data.total_pages)
            }
            else{
                const data = await tmdbApi.getTvList(tvType.popular,{params})
                setList(data.results)
                setTotlePage(data.total_pages)
            }
        }
        getData()

        window.scrollTo({top:0,behavior:'smooth'})
    },[cate,page])

    const handleLoadMore = () => {
        page.current++

        const getData = async () => {
            const params = {page:page.current}
            if(cate === 'movie'){
                const data = await tmdbApi.getMovieList(movieType.popular,{params})
                setList(prev => [...prev, ...data.results])
            }
            else{
                const data = await tmdbApi.getTvList(tvType.popular,{params})
                setList(prev => [...prev, ...data.results])
            }
        }
        if(page.current < totlePage){
            getData()
        }
    }
    

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img src={footerImg} alt=""/>
                <h3 className={cx('title')}>{
                   cate === 'movie' ? 'Movie' : 'Tv Series'
                }</h3>
            </div>
            <Grid>
                <div className={cx('container')}>
                    <Button to={`${path.pathname}/search`} className={cx('btn-search')} iconLeft={faSearch}>Tìm kiếm</Button>
                    <div className={cx('content')}>
                        <Row>
                            {
                                list.map((item,index) => {
                                    return (
                                        <Col l={2} m={4} s={6} mb={24} key={index}>
                                            <CardItem item={item} cate={cate}/>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                        <Button iconRight={page.current < totlePage ? faChevronDown : undefined} className={cx('btn-loadMore')} onClick={handleLoadMore}>{page.current < totlePage ? 'Xem thêm' : ''}</Button >
                    </div>
                </div>
            </Grid>
        </div>
    );
}

export default Catalog;