import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import { DatetimePicker } from 'rc-datetime-picker';

const DateTime = (props) => {
    const { staticContext,
        exportDate,
        label,
        propsDate,
        dateTypes,
        sheduled,
        showTime,
        showDates,
        mmyy,
        ...rest } = props;
    const dateRef = useRef();
    const [openDateTime, setOpenDateTime] = useState(false);
    const [dateTime, setDateTime] = useState(moment());
    const [dateInput, setDateInput] = useState(moment().format("dddd, MMMM Do, hh:mm A"));

    const handleToggleDateTimeOpen = () => {
        setOpenDateTime(prevState => !prevState)
    }
    const handleChange = (moment) => {
        const date = new Date(moment._d);
        exportDate(date, dateTypes)
        setDateTime(moment)
    }

    useEffect(() => {
        setDateTime(moment(propsDate))
        setDateInput(moment(propsDate).format("dddd, MMMM Do, hh:mm A"))
    }, [propsDate])

    useEffect(() => {
        if (mmyy === true) {
            const value = moment(dateTime).format("MMMM, YYYY");
            setDateInput(value);
        } else {
            const value = moment(dateTime).format("dddd, MMMM Do, hh:mm A");
            setDateInput(value);
        }
    }, [dateTime])

    useEffect(() => {
        const handler = (e) => {
            if (!dateRef.current.contains(e.target)) {
                setOpenDateTime(false)
            }
        }
        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler)
        }
    })

    return <div className="flex-width right-margin" ref={dateRef}>
        <TextField
            className="date-width"
            variant="outlined"
            size="small"
            type="text"
            label={label}
            value={dateInput}
            onClick={handleToggleDateTimeOpen}
            inputProps={
                { readOnly: true, }
            }
        />
        <div className="pos-abs">
            <DatetimePicker
                showTimePicker={showTime === false ? false : true}
                isOpen={openDateTime}
                maxDate={sheduled === true ? null : moment()}
                moment={dateTime}
                onChange={handleChange}
            />
        </div>
    </div>
}

export default DateTime;