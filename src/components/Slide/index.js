import { Autoplay } from 'swiper'
import { memo, useCallback, useEffect, useState } from "react";
import classNames from "classnames/bind";
import { SwiperSlide, Swiper } from 'swiper/react'

import Button from '../Button'
import styles from './Slide.module.scss'
import configApi from '../../utils/configTmdbApi';
import tmdbApi, { movieType } from "../../api/tmdbApi";
import Modal, {ModalContent} from '../Modal';

const cx = classNames.bind(styles)


function Slide() {

    const [listMovies,setListMovies] = useState([])
    const [showTrailer,setShowTrailer] = useState(false)
    const [pathTrailer,setPathTrailer] = useState('')
    
    const closeTrailer = useCallback(() => {
        setShowTrailer(false)
        setPathTrailer('')
    },[])

    useEffect(() => {
        const movies = async () => {
            const params = {
                page:1
            }
            try{
                const results = await tmdbApi.getMovieList(movieType.popular,{params})
                const data = results.results.splice(0,5)
                setListMovies(data)
                
            }catch{
                console.log('lấy data lỗi');
            }
        }
        movies()
    },[])

    return ( 
        <div className={cx('wrapper')}>
            <Swiper
                modules={[Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{delay:7000}}
            >
                {
                    listMovies.map((item,index) => {
                        return (
                            <SwiperSlide key={index}>
                                {
                                    ({isActive}) => (
                                        <SlideItem className={cx({active:isActive})} item={item} setShowTrailer={setShowTrailer} setPathTrailer={setPathTrailer}/>
                                    )
                                }
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            {showTrailer && (
                <Modal>
                    <ModalContent onClose={closeTrailer} className={cx('customModal')}>
                        <iframe className={cx('video')} title='2' src={pathTrailer}></iframe>
                    </ModalContent>
                </Modal>
            )}
        </div>
     );
}

const SlideItem = ({className, item, setShowTrailer, setPathTrailer}) => {

    const handleWatchTrailer = () => {
        setShowTrailer(true)
        
        const getReview = async () => {
            const pathVideoTrailer = await tmdbApi.getVideos('movie',item.id)
            if(pathVideoTrailer.results.length > 0){
                setPathTrailer(`https://www.youtube.com/embed/${pathVideoTrailer.results[0].key}`)
            }
        }
        getReview()
    }

    return (
        <div className={cx({[className]:className},'slideItem')} style={{backgroundImage:`url(${configApi.originalImage(item.backdrop_path || item.poster_path)})`}}>
            <div className={cx('slideItem__content')}>
                <div className={cx('info')}>
                    <h3 className={cx('title')}>{item.title}</h3>
                    <p className={cx('overview')}>{item.overview}</p>
                    <div className={cx('btns')}>
                        <Button to={`/movie/${item.id}`} className={cx('btn','btn-watchNow')} onClick={()=>{window.scrollTo({top:0,behavior:'smooth'})}} >Xem ngay</Button>
                        <Button className={cx('btn','btn-watchTrailer')} onClick={handleWatchTrailer}>Xem Trailer</Button>
                    </div>
                </div>
                <div className={cx('poster')}>
                    <img src={configApi.w500Image(item.poster_path || item.backdrop_path)} alt=''/>
                </div>
            </div>
        </div>
    )
}

export default memo(Slide);