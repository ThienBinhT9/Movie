import classNames from "classnames/bind";

import styles from './Catalog.module.scss'
import Button from "../../components/Button";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { memo } from "react";

const cx = classNames.bind(styles)

function Search({ keyword, setKeyword, loading, handleSubmit}) {
    

    return ( 
        <div className={cx('box-search')}>
            <div className={cx('search')}>
                <input type="text" placeholder="Tìm kiếm..." onChange={(e) => setKeyword(e.target.value)} value={keyword} />
                {keyword && !loading && <FontAwesomeIcon className={cx('clear')} icon={faXmarkCircle} onClick={() => setKeyword('')}/>}
                {loading && <div className={cx('loading')}><FontAwesomeIcon icon={faSpinner} /></div>}
            </div>
            <Button className={cx('btn')} iconLeft={faSearch} onClick={handleSubmit}></Button>
        </div>
     );
}

export default memo(Search);