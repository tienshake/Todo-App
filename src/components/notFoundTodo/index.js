import React from 'react'
import styles from './NotFoundTodo.module.scss'
import SearchOffIcon from '@mui/icons-material/SearchOff'
const NotFoundTodo = () => {
  return (
    <div className={styles.container}>
        <SearchOffIcon/>
        <div>There are no todos</div>
    </div>
  )
}

export default NotFoundTodo