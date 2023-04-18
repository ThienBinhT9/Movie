import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import styles from './Search.module.scss'
import SearchValue from '../Catelog/search'
import useDebouce from '../../hooks/useDebouce'
import Grid from "../../components/Responsive/Grid";
import footerLogo from '../../asstes/images/footer-bg.jpg'
import tmdbApi,{ tvType, movieType} from "../../api/tmdbApi";
import Row from "../../components/Responsive/Row";
import Col from "../../components/Responsive/Col";
import Button from "../../components/Button";
import CartItem from "../../components/CardItem";

const cx = classNames.bind(styles)

function Search() {
    
    const { cate } = useParams()
    const page = useRef(1)
    
    const [keyword,setKeyword] = useState('')
    const [list,setList] = useState([])
    const [loading,setLoading] = useState(false)
    const [totalPages,setTotalPages] = useState(null)

    const debouce = useDebouce(keyword,1000)

    useEffect(() => {
        setLoading(true)

        const getData = async () => {
            setLoading(true)
            let params = { page: page.current}
            let data = []
            if(debouce === ''){
                if(cate === 'movie'){
                    data = await tmdbApi.getMovieList(movieType.popular,{params})
                }
                else{
                    data = await tmdbApi.getTvList(tvType.popular,{params})
                }
            }
            else{
                params = {
                    page:page.current,
                    query:debouce
                }
                data = await tmdbApi.search(cate,{params})
            }
            
            setTotalPages(data.total_pages)
            setList(data.results)
            setLoading(false)
        }
        getData()

    },[debouce,cate])

    const handleSubmit = useCallback(() => {
        const getData = async () => {
            if(debouce === ''){
                return
            }
            else{
                const params = {
                    page:page.current,
                    query:debouce
                }
                const data = await tmdbApi.search(cate,{params})
                setList(data.results)
            } 
        }
        getData()
    },[cate,debouce])

    const handleLoadMore = () => {
        page.current++
        if(page.current >= totalPages){
            setKeyword('')
            window.scrollTo({top:0,behavior:'smooth'})
            return
        }

        const getData = async () => {
            let data = null
            let params = {page:page.current}
            if(debouce === ''){
                if(cate === 'movie'){
                    data = await tmdbApi.getMovieList(movieType.popular,{params})
                }
                else{
                    data = await tmdbApi.getTvList(tvType.popular,{params})
                }
            }
            else{
                params = {
                    page:page.current,
                    query:debouce
                }
                data = await tmdbApi.search(cate,{params})
            }
            setList(prev => [...prev,...data.results])
        }
        getData()
    }

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img src={footerLogo} alt=""/>
                <h3 className={cx('title')}>{cate === 'movie' ? 'Tìm kiếm Movie' : 'Tìm kiếm Tv Series'}</h3>
            </div>
            <Grid>
                <div className={cx('container')}>
                    <SearchValue keyword={keyword} setKeyword={setKeyword} loading={loading} handleSubmit={handleSubmit} />
                    <div className={cx('content')}>
                        <Row>
                            {
                                list.map((item,index) => {
                                    return (
                                        <Col l={2} m={4} s={6} mb={42} key={index}>
                                             <CartItem item={item} cate={cate}/>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                        <Button iconRight={page.current < totalPages ? faChevronDown : undefined} className={cx('btn-loadMore')} onClick={handleLoadMore}>{page.current < totalPages ? 'Xem thêm' : 'Quay lại'}</Button >
                    </div>
                </div>
            </Grid>
        </div>
    );
}

export default Search;