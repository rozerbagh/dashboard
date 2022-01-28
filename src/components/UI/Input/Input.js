import React from 'react';

import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles';
import { TextField, InputBase, TextareaAutosize, InputAdornment } from '@material-ui/core';
import classes from './Input.module.css';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
            margin: "10px 0px",
        },
        '&:hover': {
            border: "1px soild #007bff"
        }
    },
    customInput: {
        margin: "10px 0",
        '&:hover': {
            border: "1px soild #007bff"
        }
    }
}));

const Input = (props) => {

    const classes = useStyles();

    let inputElement = null;
    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p>Enter a valid {props.valueType}!</p>;
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = <TextField
                InputProps={props.endicon == null ? {
                    startAdornment: (
                        <InputAdornment position="start">
                            {props.icon}
                        </InputAdornment>
                    ),
                } : {
                        startAdornment: (
                            <InputAdornment position="start">
                                {props.icon}
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="start" onClick={props.handleChange}
                                style={{ cursor: "pointer" }}
                            >
                                {props.endicon}
                            </InputAdornment>
                        ),
                }}
                touched={props.touched}
                invalid={props.invalid}
                fullWidth
                label={props.elementConfig.placeholder}
                variant="outlined"
                {...props.elementConfig}
                {...props}
                value={props.value}
                onChange={props.changed}
                className={classes.customInput}
            />
            break;
        case ('number'):
            inputElement = <TextField
                fullWidth
                label={props.elementConfig.placeholder}
                variant="outlined"
                {...props.elementConfig}
                value={props.value}
                {...props}
                onChange={props.changed} className={classes.customInput}
            />
            break;
        case ('textarea'):
            inputElement = <TextareaAutosize
                placeholder={props.elementConfig.placeholder}
                rowsMin={6}
                variant="outlined"
                {...props.elementConfig}
                {...props}
                touched={props.touched}
                value={props.value}
                onChange={props.changed} />
            break;
        case ('select'):
            inputElement = (
                <select onChange={props.changed}>
                    {props.elementConfig.options.map(option => {
                        return (
                            <option
                                key={option.value}
                                value={option.value}>
                                {option.displayValue}
                            </option>
                        )
                    })}
                </select>)
            break;
        default:
            inputElement = <TextField
                fullWidth
                label={props.elementConfig.placeholder}
                variant="outlined"
                {...props.elementConfig}
                {...props}
                value={props.value}
                onChange={props.changed}
                className={classes.customInput}
            />
            break;
    }
    return (
        <div className={classes.root}>
            {inputElement}
        </div>
    )
}

export default Input;

Input.propTypes = {
    elementConfig: PropTypes.object.isRequired,
    validation: PropTypes.object,
    elementType: PropTypes.string.isRequired,
    touched: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
};