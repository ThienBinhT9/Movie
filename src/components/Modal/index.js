import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from '@fortawesome/free-solid-svg-icons'

import classNames from "classnames/bind";

import styles from './Modal.module.scss'

const cx = classNames.bind(styles)

function Modal({children}) {
    return ( 
        <div className={cx('modal')}>
            {children}
        </div>
     );
}

export const ModalContent = ({children,onClose,className}) => {

    const handleClose = () => {
        onClose()
    }
    
    return (
        <div className={cx('modal__container',{[className]:className})}>
            <FontAwesomeIcon icon={faClose}  className={cx('modal__close')} onClick={handleClose}/>
            <div className={cx('modal__content')}>
                {children}
            </div>
        </div>
    )
}

export default Modal;