import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormHelperText, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import moment from 'moment';
import CloseIcon from '@mui/icons-material/Close';
import styles from './DialogModal.module.scss';
import FormError from '../formError';

export default function DialogModal(props) {
    const { open, setOpen, setDataForm, item } = props;
    const [endTime, setEndTime] = React.useState(null);
    const [startTime, setStartTime] = React.useState(new Date());
    const [title, setTitle] = React.useState('');
    const [des, setDes] = React.useState('');
    const [dateErr, setDateErr] = React.useState('');
    const [errors, setErrors] = React.useState({});
    const [errorTop, setErrorTop] = React.useState('');

    React.useEffect(() => {
        if (item) {
            setTitle(item.title);
            setDes(item.description);
            if (item.startDate) {
                setStartTime(moment(item.startDate).format());
            }
            if (item.endDate) {
                setEndTime(moment(item.endDate).format());
            }
        }
    }, [item]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleValidate = () => {
        let isValid = false;
        let inputsError = {};
        if (!endTime) {
            isValid = true;
            inputsError.endTime = 'Missing end Date';
        }
        if (!startTime) {
            isValid = true;
            inputsError.startTime = 'Missing start Date';
        }
        if (!des) {
            isValid = true;
            inputsError.des = 'Missing description';
        }
        if (!title) {
            isValid = true;
            inputsError.title = 'Missing title';
        }
        if (dateErr === 'invalidDate' || dateErr === 'minDate') {
            isValid = true;
            inputsError.dateErr = 'Date invalid';
        }
        if (!handCheckDate()) {
            isValid = true;
            inputsError.dateErr = 'Date invalid';
        }
        setErrors(inputsError);
        setErrorTop('Submit Fail! Please check again.');
        return isValid;
    };

    const handCheckDate = () => {
        let isValid = true;
        if (item && item.id) {
            if (new Date(item.endDate).getTime() < new Date(item.startDate).getTime()) {
                isValid = false;
            }
        } else {
            if (endTime) {
                if (endTime.getTime() < startTime.getTime()) {
                    isValid = false;
                }
            }
        }
        return isValid;
    };

    const handleSubmit = async () => {
        const formatEndTime = moment(endTime).format('YYYY-MM-DD');
        const covertStringEndTime = formatEndTime + 'T00:00:00.000Z';
        const formatStartTime = moment(startTime).format('YYYY-MM-DD');
        const covertStringStartTime = formatStartTime + 'T00:00:00.000Z';
        if (handleValidate()) {
            return;
        } else {
            if (typeof setDataForm === 'function') {
                const object = {
                    title: title.trim(),
                    description: des.trim(),
                    endDate: covertStringEndTime,
                    startDate: covertStringStartTime,
                };
                if (item && item.id) {
                    setDataForm({
                        ...object,
                        id: item.id,
                        status: item.status,
                    });
                } else {
                    const isSubmit = await setDataForm(object);
                    if (isSubmit) {
                        setTitle('');
                        setDes('');
                        setStartTime(new Date());
                        setEndTime(null);
                    }
                }
            }
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} className={styles.Dialog}>
            <DialogTitle className={styles.DialogTitle}>
                <span>Make a todo for the new day</span>
                <CloseIcon onClick={handleClose} />
            </DialogTitle>
            <DialogContent className={styles.form}>
                <div className={styles.formInput}>
                    {errorTop !== '' && <FormError errors={errorTop} />}
                    <span>
                        Title
                        <span> &#x2a;</span>
                    </span>
                    <TextField
                        id="outlined-basic"
                        label="Title"
                        variant="outlined"
                        error={errors.title !== undefined}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {!!errors.title && (
                        <FormHelperText error id="outlined-basic">
                            {errors.title}
                        </FormHelperText>
                    )}
                </div>
                <div className={styles.formInput}>
                    <span>
                        Description
                        <span> &#x2a;</span>
                    </span>
                    <TextField
                        id="outlined-textarea"
                        className={styles.area}
                        label="Description"
                        variant="outlined"
                        multiline
                        error={errors.des !== undefined}
                        value={des}
                        rows={5}
                        onChange={(e) => setDes(e.target.value)}
                        InputProps={{
                            inputComponent: TextareaAutosize,
                            inputProps: {
                                style: {
                                    resize: 'auto',
                                },
                            },
                        }}
                    />
                    {!!errors.des && (
                        <FormHelperText error id="outlined-textarea">
                            {errors.des}
                        </FormHelperText>
                    )}
                </div>
                <div className={styles.formInput}>
                    <span>
                        Start Date
                        <span> &#x2a;</span>
                    </span>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Time"
                            value={startTime}
                            maxDate={endTime}
                            minDate={new Date()}
                            onChange={(newValue) => {
                                setStartTime(newValue);
                            }}
                            onError={(err) => setDateErr(err)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    error={errors.startTime !== undefined}
                                    helperText={errors.startTime !== '' && errors.startTime}
                                />
                            )}
                        />
                    </LocalizationProvider>
                    <span>
                        End Date
                        <span> &#x2a;</span>
                    </span>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Time"
                            value={endTime}
                            minDate={startTime}
                            onChange={(newValue) => {
                                setEndTime(newValue);
                            }}
                            onError={(err) => setDateErr(err)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    error={errors.endTime !== undefined}
                                    helperText={errors.endTime !== '' && errors.endTime}
                                />
                            )}
                        />
                    </LocalizationProvider>
                </div>
            </DialogContent>
            <DialogActions className={styles.DialogActions}>
                <Button onClick={handleClose} variant="outlined">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} variant="contained">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}
