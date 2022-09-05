import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Box, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import styles from './Information.module.scss';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { editUser } from '../../services/index';
import { useSelector } from 'react-redux';
import { tokenRedux } from '../../store/authSlice';
import { CONSTANTS } from '../../constant';

export default function Information(props) {
    const token = useSelector(tokenRedux);
    const user = useSelector((state) => state.auth.login.currentUser);
    const { open, setOpen } = props;
    const [fullName, setFullName] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [typeEdit, setTypeEdit] = React.useState({
        fullName: false,
        phone: false,
    });

    React.useEffect(() => {
        setFullName(user?.fullName);
        setPhoneNumber(user?.phoneNumber);
    }, [user]);

    const handleClose = () => {
        setOpen(false);
        setFullName('');
        setPhoneNumber('');
        setTypeEdit({
            fullName: false,
            phone: false,
        });
    };

    const handleEdit = async (type) => {
        const data = {
            fullName: !fullName ? user?.fullName : fullName.trim(),
            phoneNumber: !phoneNumber ? user?.phoneNumber : phoneNumber.trim(),
        };
        if (type === 'fullName') {
            if (typeEdit.fullName) {
                setTypeEdit((prev) => ({ ...prev, fullName: false }));
                const res = await editUser(data, token);
                if (res && res.status === CONSTANTS.STATUS200) {
                    fetch();
                }
            } else {
                setTypeEdit((prev) => ({ ...prev, fullName: true }));
                setFullName(user?.fullName);
            }
        }
        if (type === 'phone') {
            if (typeEdit.phone) {
                setTypeEdit((prev) => ({ ...prev, phone: false }));
                const res = await editUser(data, token);
                if (res && res.status === CONSTANTS.STATUS200) {
                    fetch();
                }
            } else {
                setTypeEdit((prev) => ({ ...prev, phone: true }));
                setPhoneNumber(user?.phoneNumber);
            }
        }
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent className={styles.content}>
                    <div className={styles.header}>
                        <span className={styles.titleInfo}>Information</span>
                        <CloseIcon className={styles.iconClose} onClick={handleClose} />
                    </div>
                    <Box className={styles.avatarName}>
                        <Typography className={styles.headerTitle}>
                            <AccountCircle />
                            {typeEdit.fullName ? (
                                <input
                                    className={styles.inputEdit}
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            ) : (
                                <>{user?.fullName}</>
                            )}
                        </Typography>
                        {typeEdit.fullName ? (
                            <CheckIcon className={styles.iconEdit} onClick={() => handleEdit('fullName')} />
                        ) : (
                            <BorderColorIcon className={styles.iconEdit} onClick={() => handleEdit('fullName')} />
                        )}
                    </Box>
                    <Typography>
                        <span className={styles.leftTitle}>User name:</span>
                        {user?.userName}
                    </Typography>
                    <Typography>
                        <span className={styles.leftTitle}>Email:</span>
                        {user?.email}
                    </Typography>
                    <div className={styles.phone}>
                        <div className={styles.wrapTitlePhone}>
                            <span className={styles.leftTitle}>Phone:</span>
                            {typeEdit.phone ? (
                                <input
                                    className={styles.inputEdit}
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    type="number"
                                    maxLength={10}
                                />
                            ) : (
                                <>{user?.phoneNumber}</>
                            )}
                        </div>
                        {typeEdit.phone ? (
                            <CheckIcon className={styles.iconEdit} onClick={() => handleEdit('phone')} />
                        ) : (
                            <BorderColorIcon className={styles.iconEdit} onClick={() => handleEdit('phone')} />
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
