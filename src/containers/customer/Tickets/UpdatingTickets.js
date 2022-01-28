import React, { useState, useEffect } from 'react';

// @material core components
import { useTheme, makeStyles, withStyles, fade } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

import styled from 'styled-components'
import CloseIcon from '@material-ui/icons/Close';
import GridItem from "../../../components/Grid/GridItem";
import Loader from "../../../components/UI/Loader/Loader";
import { FiX } from 'react-icons/fi';

const useStyles = makeStyles(theme => ({
    pageContent: {
        display: 'flex',
        [theme.breakpoints.up("sm")]: {
            width: "100%",
        },
    },
    heading: {
        width: "100%",
        textAlign: "center",
        fontWeight: 600,
    },
    closeIcon: {
        position: "absolute",
        top: "0px",
        right: 0,
    },
    chatBox: {
        minHeight: "400px",
        width: "100%",
        border: "1px solid #ccc",
        borderRadius: "5px",
        maxWidth: "400px",
    },
    chatBoxHeader: {
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(1),
    },
    leftMsgBox: {
        float: "left",
        textAlign: "left",
        width: "100%",
        position: "relative",
        marginBottom: theme.spacing(0.2),
    },
    leftTextBox: {
        backgroundColor: fade(theme.palette.primary.light, 0.15),
        maxWidth: "60%",
        float: "left",
        padding: theme.spacing(0.5),
        borderBottomRightRadius: "3px",
        borderTopRightRadius: "3px",
    },

    rightMsgBox: {
        textAlign: "right",
        float: "right",
        width: "100%",
        position: "relative",
        marginBottom: theme.spacing(0.2),
    },
    rightTextBox: {
        backgroundColor: fade(theme.palette.primary.light, 0.15),
        maxWidth: "60%",
        float: "right",
        padding: theme.spacing(0.5),
        borderBottomLeftRadius: "3px",
        borderTopLeftRadius: "3px",
    },
}));

function UpdatingTickets(props) {

    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    let form = <textarea style={{
        width: "100%", maxWidth: "400px", minHeight: "370px",
        maxHeight: "320px"
    }}
        placeholder="Comments"
        onChange={props.inputHandler}
        value={props.comments} />


    return (
        <Dialog
            fullScreen={fullScreen}
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title">
            <div className={classes.closeIcon}>
                <IconButton onClick={props.handleClose} color="inherit" size="small">
                    <CloseIcon />
                </IconButton>
            </div>
            <DialogTitle className={classes.heading}>Updates Tickets</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {props.U_loading || props.updt_loading ? <Loader bigLoader style={{ margin: "0 auto" }} /> :
                        <>
                            <GridItem xs={12} sm={6} md={6}>
                                {form}
                                <Button
                                    disabled={props.validComments === true ? false : true}
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={props.updateTicket}
                                >
                                    Updates Tickets
                                </Button>
                            </GridItem>
                            <GridItem xs={12} sm={6} md={6}>
                                <div className={classes.chatBox}>
                                    <Typography className={classes.chatBoxHeader}>{props.chatTitle}</Typography>
                                    {props.chatHistory.map((chat, index) => {
                                        if (chat.user_type == 1) {
                                            return (<div className={classes.rightMsgBox} key={`right-chat-no-${index}`}>
                                                <Typography variant="body2" className={classes.rightTextBox}>{chat.ticket_text}</Typography>
                                            </div>)
                                        } else if (chat.user_type == 2) {
                                            return (<div className={classes.leftMsgBox} key={`left-chat-no-${index}`}>
                                                <Typography variant="body2" className={classes.leftTextBox}>{chat.ticket_text}</Typography>
                                            </div>)
                                        }
                                    })}
                                </div>
                            </GridItem>
                        </>
                    }
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

export default UpdatingTickets;
