import React from 'react';
import { Button } from '@mui/material';
import { CircularProgress as IconLoading } from '@mui/material';
import styles from './ButtonIconLoading.module.scss';

const ButtonIconLoading = ({ className, children, openIconLoading, onClick, ...rest } ) => {
    return (
        <Button
            className={className}
            {...rest}
            onClick={onClick}
        >
            {openIconLoading ? <IconLoading className={styles.iconLoading}/> : children}
        </Button>
    )
}

export default ButtonIconLoading