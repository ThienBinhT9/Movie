import classNames from "classnames/bind";

import styles from './Home.module.scss'
import Slide from "../../components/Slide";
import Section from "../../components/Section";
import { useEffect } from "react";

const cx = classNames.bind(styles)

function Home() {

    useEffect(() => {
        window.scrollTo({
            top:0,
            left:0,
            behavior:'smooth'
        })
    },[])

    return ( 
        <div className={cx('wrapper')}>
            <Slide />
            <div className={cx('catalog')}>
                <Section title='Trending Movie' category='movie' type='popular'></Section>
                <Section title='Top Rated Movie' category='movie' type='top_rated'></Section>
                <Section title='Sắp Chiếu' category='movie' type='upcoming'></Section>
                <Section title='Trending Tv' category='tv' type='popular'></Section>
                <Section title='Top Rated Tv' category='tv' type='top_rated'></Section>
            </div>
        </div>
    );
}

export default Home;