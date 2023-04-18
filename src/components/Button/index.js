import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import styles from './Button.module.scss'

const cx = classNames.bind(styles)

function Button({children,to,href,className,iconLeft,iconRight,onClick, ...passProps}) {

    let Comp = 'button'

    const props = {
        onClick,
        ...passProps
    }

    if(to){
        Comp = Link
        props.to = to
    }
    else if(href){
        Comp = 'a'
        props.href = href
    }

    const classes = cx('wrapper',{[className]:className})

    return ( 
        <Comp className={classes} {...props}>
            {iconLeft && <FontAwesomeIcon icon={iconLeft} />}
            <span className={cx('text')}>{children}</span>
            {iconRight && <FontAwesomeIcon icon={iconRight} />}
        </Comp>
     );
}

export default Button;