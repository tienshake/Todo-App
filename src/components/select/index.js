import React from 'react';
import { MenuItem, Select as SelectNonOutline } from '@mui/material';
import styles from './Select.module.scss';
import { CONSTANTS } from '../../constant';
let options = [
    { title: 'Open ', value: CONSTANTS.OPEN, home: true },
    { title: 'Process', value: CONSTANTS.PROCESS, home: true },
    { title: 'Done', value: CONSTANTS.DONE },
    { title: 'Out date', value: CONSTANTS.OUTDATE },
    { title: 'All', value: CONSTANTS.ALL },
];

const Select = (props) => {
    const { setSelected } = props;

    return (
        <SelectNonOutline
            value={5}
            className={styles.select}
            renderValue={() => 'Quick filters'}
            onChange={setSelected}
        >
            {options?.map((item, i) => {
                return (
                    <MenuItem key={i} value={item.value}>
                        {item.title}
                    </MenuItem>
                );
            })}
        </SelectNonOutline>
    );
};

export default Select;
