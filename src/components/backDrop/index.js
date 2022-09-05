import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const BackdropLoading = (props) => {
    const { openLoading } = props;

    return (
        <div>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000 }} open={openLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};

export default BackdropLoading;
