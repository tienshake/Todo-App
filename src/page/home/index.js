import { Button } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { tokenRedux } from '../../store/authSlice';
import { todoRedux } from '../../store/todoSlice';
import styles from './Home.module.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Filter from '../../components/filter/Filter';
import Item from '../../components/item';
import DialogModal from '../../components/dialog';
import { createItem } from '../../services';
import { toast } from 'react-toastify';
import { checkTokenExpirationMiddleware } from '../../util/checkToken';
import NotFoundTodo from '../../components/notFoundTodo';
import { getTodoAction } from '../../store/apiRequest';
import { CONSTANTS } from '../../constant';

const Home = () => {
    const [open, setOpen] = React.useState(false);
    const [listTodoSearch, setListTodoSearch] = React.useState([]);
    const token = useSelector(tokenRedux);
    const todos = useSelector(todoRedux);

    const dispatch = useDispatch();

    React.useEffect(() => {
        checkTokenExpirationMiddleware();
        if (todos && todos.length === 0) {
            getTodoAction(token, dispatch);
        }
    }, [token, dispatch, todos]);

    React.useEffect(() => {
        const data = [...todos];
        const arr = data.filter((item) => item.status !== CONSTANTS.DONE);
        setListTodoSearch(arr.reverse());
    }, [todos]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const setDataForm = async (data) => {
        const res = await createItem(data, token);
        if (res && res.status === CONSTANTS.STATUS200) {
            getTodoAction(token, dispatch);
            setOpen(false);
            toast.success('Your was create success!');
            return true;
        } else {
            toast.error('Was an err!');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h4>List Todo today</h4>
                <div className={styles.actions}>
                    <MoreVertIcon />
                    <Button variant="contained" className={styles.btnHeader} onClick={handleClickOpen}>
                        New ToDo
                    </Button>
                </div>
            </div>
            <div className={styles.filter}>
                <Filter listTodo={todos} setListTodoSearch={setListTodoSearch} />
            </div>
            <div className={styles.content}>
                {listTodoSearch.length === 0 ? (
                    <NotFoundTodo>There are no todos</NotFoundTodo>
                ) : (
                    <>
                        {listTodoSearch?.map((item, i) => {
                            return <Item key={i} item={item} getTodoAction={getTodoAction} />;
                        })}
                    </>
                )}
            </div>
            <DialogModal open={open} setOpen={setOpen} setDataForm={setDataForm} />
        </div>
    );
};

export default Home;
