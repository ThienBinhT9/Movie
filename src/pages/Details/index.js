import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Swiper, SwiperSlide} from 'swiper/react'
import {Autoplay} from 'swiper'

import tmdbApi from "../../api/tmdbApi";
import styles from './Details.module.scss'
import configApi from "../../utils/configTmdbApi";
import Button from '../../components/Button'
import Grid from "../../components/Responsive/Grid";
import CardItem from '../../components/CardItem'

const cx = classNames.bind(styles)

function Details() {
    const [item,setItem] = useState({})
    const [genres,setGenres] = useState([])
    const [casts,setCasts] = useState([])
    const [listTrailer,setListTrailer] = useState([])
    const [similars,setSimilars] = useState([])


    const {cate, id} = useParams()
    useEffect(() => {
        const getData = async () => {
            const params = {}
            const data = await tmdbApi.detail(cate,id,{params})
            const castss = await tmdbApi.credits(cate,id,{params})
            const trailers = await tmdbApi.getVideos(cate,id)
            let cast = []
            if(castss.cast.length > 5) {
                cast = castss.cast.slice(0,5)
            }
            else{
                cast = castss.cast
            }
            setCasts(cast)
            setListTrailer(trailers.results)
            setItem(data)
            setGenres(data.genres)
        }
        getData()
    },[id,cate])

    useEffect(() => {
        const getData = async () => {
            const params = {page:1}
            const similar = await tmdbApi.getMovieList('popular',{params})
            setSimilars(similar.results)
        }
        getData()
    },[cate])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')} style={{backgroundImage:`url(${configApi.originalImage(item.backdrop_path || item.poster_path)})`}}>
                <div className={cx('info')}>
                    <div className={cx('poster')}>
                        <img src={configApi.originalImage(item.poster_path || item.backdrop_path)} alt=""/>
                    </div>
                    <div className={cx('desc')}>
                        <h2 className={cx('title')}>{item.title || item.name}</h2>
                        <div className={cx('genres')}>
                            {
                                genres.map((genre,index) => {
                                    return (
                                        <Button className={cx('genre')} key={index}>{genre.name}</Button>
                                    )
                                })
                            }
                        </div>
                        <p className={cx('overview')}>{item.overview}</p>
                        <h3 className={cx('section-title')}>Diễn viên</h3>
                        <div className={cx('box-casts')} >
                            <div className={cx('casts')}>
                                {
                                    casts.map((cast,index) => {
                                        return (
                                            <div className={cx('cast')} key={index}>
                                                <div className={cx('avatar')}>
                                                    <img src={configApi.originalImage(cast.profile_path)} alt=""/>
                                                </div>
                                                <h3 className={cx('cast__name')}>{cast.name || cast.original_name}</h3>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('trailers')}>
                <Grid>
                    <h2 className={cx('trailers__title')}>List videos Trailer</h2>
                    <div className={cx('trailers__content')}>
                        {
                            listTrailer.length > 5 && listTrailer.slice(0,5).map((item,index) => {
                                return (
                                    <div className={cx('trailer')} key={index}>
                                        <h3 className={cx('trailer__title')}>{item.name}</h3>
                                        <iframe src={`https://www.youtube.com/embed/${item.key}`} title={index}></iframe>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Grid>
            </div>
            <div className={cx('similars')}>
                <div className={cx('similar')}>
                    <h3 className={cx('similar__title')}>Phim liên quan</h3>
                    <div className={cx('similar__content')}>
                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={12}
                            slidesPerView={6}
                            breakpoints={{
                                1024:{
                                    slidesPerView:6
                                },
                                740:{
                                    slidesPerView:4
                                },
                                0:{
                                    slidesPerView:2
                                }
                            }}
                            autoplay={{delay:2000}}
                        >
                            {
                                similars.map((item,index) => {
                                    return (
                                        <SwiperSlide>
                                            <CardItem key={index} item={item} cate={cate}/>
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details;