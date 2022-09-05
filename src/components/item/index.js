import React from 'react';
import styles from './Item.module.scss';
import MoreIconDropDown from '../moreIconDropDown';
import CheckIcon from '@mui/icons-material/Check';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Dialog from '../dialog';
import moment from 'moment';
import { deleteItem, editItem } from '../../services';
import { toast } from 'react-toastify';
import BackdropLoading from '../backDrop';
import { useSelector, useDispatch } from 'react-redux';
import { tokenRedux } from '../../store/authSlice';
import ButtonIconLoading from '../buttonIconLoading';
import { checkDateToDoOutDate } from '../../util/checkDateToDoOutDate';
import { CONSTANTS } from '../../constant';
import clsx from 'clsx';

const Item = (props) => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [openLoading, setOpenLoading] = React.useState(false);
    const [openIconLoading, setOpenIconLoading] = React.useState(false);
    const token = useSelector(tokenRedux);
    const dispatch = useDispatch();
    const { item } = props;

    React.useEffect(() => {
        if (item.status !== CONSTANTS.OUTDATE) {
            const fetchItemOutDate = async () => {
                const itemOutDate = await checkDateToDoOutDate(item);
                let data = { ...itemOutDate };
                data.status = CONSTANTS.OUTDATE;
                const res = await editItem(data, token);
                if (res && res.status === CONSTANTS.STATUS200) {
                    toast.warning('Was todo out date!');
                } else {
                    toast.error('Was an err!');
                }
            };
            fetchItemOutDate();
        }
    }, [item, token]);

    const handleDeleteItem = async () => {
        setOpenLoading(true);
        const res = await deleteItem(item.id, token);
        if (res && res.status === CONSTANTS.STATUS200) {
            setOpenLoading(false);
            props.getTodoAction(token, dispatch);
            toast.success('Your was delete success!');
            return true;
        } else {
            toast.error('Was an err!');
        }
    };

    const handleEditItem = () => {
        setOpenDialog(true);
    };

    const setDataForm = async (data) => {
        setOpenLoading(true);
        const res = await editItem(data, token);
        if (res && res.status === CONSTANTS.STATUS200) {
            props.getTodoAction(token, dispatch);
            toast.success('Your was edit success!');
            setOpenLoading(false);
            setOpenDialog(false);
        } else {
            toast.error('Was an err!');
        }
    };

    const handleStatusItem = async () => {
        setOpenIconLoading(true);
        const itemData = { ...item };
        switch (itemData.status) {
            case CONSTANTS.OPEN:
                itemData.status = CONSTANTS.PROCESS;
                break;
            case CONSTANTS.PROCESS:
                itemData.status = CONSTANTS.OPEN;
                break;
            default:
                break;
        }
        const res = await editItem(itemData, token);
        if (res && res.status === CONSTANTS.STATUS200) {
            setOpenIconLoading(false);
            props.getTodoAction(token, dispatch);
        } else {
            toast.error('Was an err!');
        }
    };

    const handleRemoveItemOutHome = async () => {
        setOpenIconLoading(true);
        const itemData = { ...item };
        itemData.status = CONSTANTS.DONE;
        const res = await editItem(itemData, token);
        if (res && res.status === CONSTANTS.STATUS200) {
            setOpenIconLoading(false);
            props.getTodoAction(token, dispatch);
            toast.warning('Todo added to history!');
        } else {
            toast.error('Was an err!');
        }
    };

    return (
        <>
            <div className={clsx(styles.item, item.status === CONSTANTS.OUTDATE && styles.outDate)}>
                <div className={styles.left}>
                    <div className={styles.mid}>
                        <div className={styles.title}>{item.title}</div>
                        <div className={styles.content}>{item.description}</div>
                        <div className={styles.date}>
                            <div className={styles.time}>{moment(item.startDate).format('MM/DD/YYYY')}</div>
                            <span className={styles.space}>&#8594;</span>
                            <div className={styles.time} style={{ color: item.status === 3 && 'red' }}>
                                {moment(item.endDate).format('MM/DD/YYYY')}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {item.status === 3 && <span>Tasks out date</span>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <MoreIconDropDown
                        onClickDelete={handleDeleteItem}
                        onClickEdit={handleEditItem}
                        disableEdit={item.status === CONSTANTS.OUTDATE || item.status === CONSTANTS.DONE}
                    />
                    {props.disableAction === true || item.status === CONSTANTS.OUTDATE ? (
                        ''
                    ) : (
                        <div className={styles.actions}>
                            {item.status === CONSTANTS.PROCESS && (
                                <ButtonIconLoading
                                    variant="contained"
                                    className={styles.btnRemove}
                                    onClick={handleRemoveItemOutHome}
                                >
                                    add to history
                                </ButtonIconLoading>
                            )}
                            {item.status === CONSTANTS.PROCESS ? (
                                <ButtonIconLoading
                                    openIconLoading={openIconLoading}
                                    variant="contained"
                                    className={item.status === CONSTANTS.PROCESS ? styles.btnDone : styles.btnCheck}
                                    onClick={handleStatusItem}
                                >
                                    <AutorenewIcon />
                                </ButtonIconLoading>
                            ) : (
                                <ButtonIconLoading
                                    openIconLoading={openIconLoading}
                                    variant="contained"
                                    className={item.status === CONSTANTS.PROCESS ? styles.btnDone : styles.btnCheck}
                                    onClick={handleStatusItem}
                                >
                                    <CheckIcon />
                                </ButtonIconLoading>
                            )}
                        </div>
                    )}
                </div>
                <Dialog open={openDialog} setOpen={setOpenDialog} item={openDialog && item} setDataForm={setDataForm} />
            </div>
            <BackdropLoading openLoading={openLoading} />
        </>
    );
};

export default Item;
