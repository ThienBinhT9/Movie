import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Category from "../Category";
import styles from './Header.module.scss'
import logo from '../../../asstes/images/logo.png'
import Grid from "../../../components/Responsive/Grid";
import Button from "../../../components/Button";
import useDebouce from "../../../hooks/useDebouce";


const cx = classNames.bind(styles)

function Header() {

    const [shrink,setShrink] = useState(false)
    const [hide,setHide] = useState(false)
    const debouce = useDebouce(shrink,300)

    useEffect(() => {
        
        let LateX = 0
        let x = 0

        const handleScroll = () => {
            LateX = x 
            x = window.pageYOffset 

            if(x > LateX){
                setShrink(false)
                setHide(true)
            }
            else{
                if(x === 0){
                    setShrink(false)
                }
                else{
                    setShrink(true)
                }
                setHide(false)
            }
        }
        window.addEventListener('scroll',handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    },[])

    
    const handleSearch = () => {
        window.scrollTo({top:0,behavior:'smooth'})
    }

    return (
        <header className={cx('wrapper',{shrink:debouce},{hide:hide})}>
            <Grid>
                <div className={cx('container')}>
                    <div className={cx('logo-and-search')}>
                        <Link to='/' className={cx('logo')}>
                            <img src={logo} alt=""/>
                            <span>FilmHay</span>
                        </Link>
                        <Button to='/movie/search' iconRight={faSearch} className={cx('search')} onClick={handleSearch}></Button>
                    </div>
                    <div className={cx('actions')}>
                        <Category/>
                    </div>
                </div>
            </Grid>
        </header>
    );
}

export default Header;