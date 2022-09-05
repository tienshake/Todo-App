import React from 'react';
import styles from './GlobalStyle.module.scss';
import clsx from "clsx"
const GlobalStyle = ({ children }) => {
    return (
        <div className={clsx(styles.container)}>
            {children}
        </div>
    )
}

export default GlobalStyle