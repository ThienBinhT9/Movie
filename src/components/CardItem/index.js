import classNames from "classnames/bind";

import styles from './CardItem.module.scss'
import Button from "../Button";
import configApi from "../../utils/configTmdbApi";

const cx = classNames.bind(styles)

function CartItem({item,cate}) {

    const handleScrollTo = () => {
        window.scrollTo({top:0,behavior:'smooth'})
    }

    return ( 
        <Button to={`/${cate}/${item.id}`} className={cx('wrapper')} onClick={handleScrollTo}>
            <div className={cx('img')} >
                <img src={configApi.originalImage(item.poster_path || item.backdrop_path)} alt=""/>
            </div>
            <p className={cx('title')}>{item.title || item.name}</p>
        </Button>
    );
}

export default CartItem;