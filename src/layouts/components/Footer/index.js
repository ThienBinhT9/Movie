import classNames from "classnames/bind";

import styles from './Footer.module.scss'
import footer from '../../../asstes/images/footer-bg.jpg'

const cx = classNames.bind(styles)

function Footer() {
    return ( 
        <div className={cx('footer')}>
            <img src={footer} alt="footer"/>
        </div>
    );
}

export default Footer;