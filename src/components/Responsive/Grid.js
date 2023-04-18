import classNames from "classnames/bind";

import styles from './main.module.scss'

const cx = classNames.bind(styles)

function Grid({children}) {
    return ( 
        <div className={cx('grid','wide')}>
            {children}
        </div>
    );
}

export default Grid;