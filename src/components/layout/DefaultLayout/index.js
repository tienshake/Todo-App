import React from 'react';
import Header from '../Header';
import styles from './DefaultLayout.module.scss';
const DefaultLayout = ({ children }) => {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>{children}</div>
        </div>
    );
};

export default DefaultLayout;
