import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ClickAwayListener, MenuItem, Popper, Typography } from '@mui/material';
import styles from './MoreIconDropDown.module.scss'
const MoreIconDropDown = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const { id, onClickDelete, onClickEdit, disableEdit } = props;
    const open = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClickAway = () => {
        setAnchorEl(false);
    };

    const handleClickAction = async () => {
        const isDelete = await onClickDelete()
        if(isDelete) setAnchorEl(false)
    }

    return (
        <ClickAwayListener
            onClickAway={handleClickAway}
        >
            <div className={styles.container}>
                <MoreVertIcon onClick={handleClick} />
                <Popper
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                >
                    <div className={styles.popperContent}>
                        {disableEdit ?
                            ''
                            :
                            <MenuItem
                                onClick={onClickEdit}
                                className={styles.itemEdit}
                            >
                                <Typography>Edit</Typography>
                            </MenuItem>

                        }
                        <MenuItem
                            onClick={handleClickAction}
                            className={styles.itemDelete}
                        >
                            <Typography>Remove</Typography>
                        </MenuItem>
                    </div>
                </Popper>
            </div>
        </ClickAwayListener>

    )
}

export default MoreIconDropDown