import classNames from "classnames/bind";
import {Swiper, SwiperSlide} from 'swiper/react'
import {Autoplay} from 'swiper'

import styles from './Section.module.scss'
import Button from "../Button";
import { useEffect, useState } from "react";
import tmdbApi, {movieType, tvType} from "../../api/tmdbApi";
import CartItem from "../CardItem";

const cx = classNames.bind(styles)

function Section({title, category, type}) {

    const [list,setList] = useState([])

    useEffect(() => {
        const getData = async () => {
            const params = {page:1}
            if(category === 'movie'){
                const data = await tmdbApi.getMovieList(movieType[type],{params})
                setList(data.results)
            }
            else if(category === 'tv'){
                const data = await tmdbApi.getTvList(tvType[type],{params})
                setList(data.results)
            }
        }
        getData()
    },[category,type])

    return ( 
        <div className={cx('section')}>
            <div className={cx('header')}>
                <h3 className={cx('title')}>{title}</h3>
                <Button className={cx('btn')} to={`/${category}`}>Xem thêm</Button>
            </div>
            <div className={cx('body')}>
                <Swiper
                    spaceBetween={18}
                    slidesPerView={6}
                    modules={[Autoplay]}
                    autoplay={{delay:2000}}
                    breakpoints={{
                        1024:{
                            slidesPerView:6,
                        },
                        740:{
                            slidesPerView:4
                        },
                        0:{
                            slidesPerView:2,
                            spaceBetween:12
                        }

                    }}
                >
                    {
                        list.map((item,index) => {
                            return(
                                <SwiperSlide key={index}>
                                    <CartItem item={item} cate={category}/>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        </div>
     );
}

export default Section;