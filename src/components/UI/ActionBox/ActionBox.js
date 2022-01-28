import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import classes from './ActionBox.module.css'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        border: "1px solid #ddd",
    },
    actionBox: {
        border: "1px solid #ddd",
        backgroundColor: "#fff",
        borderRadius: "2px",
    }
}))

function ActionBox(props) {
    return (
        <div className={classes.container} {...props}>
            {props.children}
        </div>
    )
}

export default ActionBox
