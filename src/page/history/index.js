import React from 'react';
import styles from './History.module.scss';
import Filter from '../../components/filter/Filter';
import NotFoundTodo from '../../components/notFoundTodo';
import Item from '../../components/item';
import { useSelector, useDispatch } from 'react-redux';
import { tokenRedux } from '../../store/authSlice';
import { todoRedux } from '../../store/todoSlice';
import { getTodoAction } from '../../store/apiRequest';
import { CONSTANTS } from '../../constant';
const History = () => {
    const [listTodoSearch, setListTodoSearch] = React.useState([]);
    const token = useSelector(tokenRedux);
    const todos = useSelector(todoRedux);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (todos && todos.length === 0) {
            getTodoAction(token, dispatch);
        }
    }, [token, dispatch, todos]);

    React.useEffect(() => {
        const data = [...todos];
        const arr = data.filter((item) => item.status === CONSTANTS.DONE);
        setListTodoSearch(arr.reverse());
    }, [todos]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h4>History todo</h4>
            </div>
            <div className={styles.filter}>
                <Filter listTodo={todos} setListTodoSearch={setListTodoSearch} historyPage={true} />
            </div>
            <div className={styles.content}>
                {listTodoSearch.length === 0 ? (
                    <NotFoundTodo>There are no todos</NotFoundTodo>
                ) : (
                    <>
                        {listTodoSearch?.map((item, i) => {
                            return <Item key={i} item={item} disableAction getTodoAction={getTodoAction} />;
                        })}
                    </>
                )}
            </div>
        </div>
    );
};

export default History;
