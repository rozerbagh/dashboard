import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme, withStyles, fade, lighten } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button"
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'

import CloseIcon from '@material-ui/icons/Close';

import Loader from "../../../../components/UI/Loader/Loader";
import ASVTable from './ASVTable';


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(0),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        width: "100%",
    },
    submitButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginBottom: "10px",
        paddingBottom: "10px",
    },
    closeIcon: {
        position: "absolute",
        top: "0px",
        right: 0,
    },
    heading: {
        width: "100%",
        textAlign: "center",
        fontWeight: 600,
    }
}));

function CustomerVmsList(props) {

    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [currentData, setCurrentData] = useState([]);

    useEffect(() => {
        const arr = [];
        props.data.map((ele, i) => {
        })

    }, [])

    return (
        <Dialog
            open={props.open}
            fullScreen={fullScreen}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title">


            {props.loader ? <Loader bigLoader style={{ margin: "0 auto" }} /> :
                <div className={classes.pageContent}>
                    <div className={classes.closeIcon}>
                        <IconButton onClick={props.handleClose} color="inherit" size="small">
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div className={classes.heading}>
                        <Typography variant="h6">Assign Instances</Typography>
                    </div>

                    <DialogContent>
                        <ASVTable asvdata={props.data}
                            modal={true}
                            handleSelectedAsvData={props.handleSelectedAsvData}
                        />
                    </DialogContent>
                    <Button color="secondary" variant="contained" fullWidth
                        onClick={props.updatedAsvData}
                    >
                        Update List
                    </Button>
                </div>}
        </Dialog >
    )
}

export default CustomerVmsList;
