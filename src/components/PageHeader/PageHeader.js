import React from 'react';

import { Paper, Typography, makeStyles } from '@material-ui/core';
import Card from "../Card/Card.js";

const useStyles = makeStyles(theme=>({
    root:{

    },
    pageHeaderContainer:{
      padding:"10px",
      display: "flex",
      alignItems: "center"
    },
    iconLabel:{
        fontSize: "20px",
        padding: "5px",
        alignItems: "center",
        textAlign: "center",
    },
    pageHeaderBody: {
        display: "flex",
        flexDirection: "column",
    }
}))

function PageHeader(props) {
    const classes = useStyles();
    return (
        <div>
            <Card>
                <div className={classes.pageHeaderContainer}>
                    <div className={classes.iconLabel}>
                        {props.icon}
                    </div>
                    <div className={classes.pageHeaderBody}>
                        <Typography variant="h6">{props.title}</Typography>
                        <Typography variant="caption">{props.subTitle}</Typography>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default PageHeader
