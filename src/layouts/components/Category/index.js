import { memo } from "react";
import classNames from "classnames/bind";
import { useLocation } from "react-router-dom";

import styles from './Category.module.scss'
import Button from '../../../components/Button'
import category from "../../../asstes/fakeData/category";

const cx = classNames.bind(styles)

function Category() {
    
    const path = useLocation()
    const arrPath =  path.pathname.split('')
    const Path = []
    for(let i = 1; i<arrPath.length; i++){
        if(arrPath[i] === '/') break
        else
            Path.push(arrPath[i])
    }

    return ( 
        <div className={cx('wrapper')}>
            {
                category.map((item,index) => {
                    return (
                        <Button key={index} className={cx('item',{active:item.path === `/${Path.join('')}`})} to={item.path}>
                            {item.display}
                        </Button>
                        
                    )
                })
            }
        </div>
    );
}

export default memo(Category);