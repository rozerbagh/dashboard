import React, { useState, useEffect } from 'react';

// @material core components
import { useTheme, makeStyles, withStyles, fade } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Loader from "../../../components/UI/Loader/Loader";

const StyledDialogTitle = withStyles((theme) => ({
    root: {
        width: "inherit",
    },
}))(DialogTitle);

const useStyles = makeStyles(theme => ({
    pageContent: {
        display: 'flex',
        [theme.breakpoints.up("sm")]: {
            width: "100%",
        },
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
        minWidth: "400px",
        maxWidth: "500px",
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

function ViewingClosedTickets(props) {

    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [ticketsDetails, setTicketsDetails] = useState({
        textMessage: {
            elementType: 'textarea',
            elementConfig: {
                type: 'text',
                placeholder: 'Comments'
            },
            value: '',
            validation: {
                required: true,
                isPhone: true,
                minlength: 6
            },
            valid: false,
            touched: false
        },
    });

    const [comments, setComments] = useState('');

    const checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        return isValid;
    }



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
            <DialogTitle id="form-dialog-title">Closed Tickets</DialogTitle>
            <DialogContent>
                <Grid>
                    {props.U_loading ? <Loader bigLoader style={{ margin: "0 auto" }} /> :
                        <div className={classes.pageContent}>
                            <Grid item xs={12} sm={12} md={12}>
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
                            </Grid>
                        </div>
                    }
                </Grid>
            </DialogContent>
        </Dialog >
    )
}

export default ViewingClosedTickets;
