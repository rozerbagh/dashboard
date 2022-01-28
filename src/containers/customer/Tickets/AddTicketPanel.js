import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    Button, Paper, IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
    useMediaQuery,
    Modal,
    Backdrop,
    Fade,
    TextField,
    TextareaAutosize,
} from '@material-ui/core';
import styled from 'styled-components'
import CloseIcon from '@material-ui/icons/Close';
import GridItem from "../../../components/Grid/GridItem";
import { FiX } from 'react-icons/fi';
import * as action from '../../../store/actions/customer/index';

import { useTheme, makeStyles, withStyles } from "@material-ui/core/styles";

const CustomModal = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 65%;
    height: 80vh;
    padding: 1em;
    border-radius: 5px;
    position: relative;
    background-color: #ffffff;
    
`;

const Box = styled.div`
    max-height: 70vh;
    margin: 5px;
    z-index: 101;
    font-size: 0.7em;
    overflow: none;
    overflow-y: scroll;
    color: #081b2c;
    position: relative;
    &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 0.2em #007bffa4;
        margin-right: 1em;
        border-radius: 1em;
    };

    &::-webkit-scrollbar-thumb{
        background-color: #007bff;
        border-radius: 1em;
    };

    &::-webkit-scrollbar{
        width: 0.2em;
    };
`
const CloseButton = styled(FiX)`
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 1.2em;
    z-index: 999;
    cursor:pointer;
`

const useStyles = makeStyles(theme => ({
    pageContent: {
        display: 'flex',
        gap: "5px",
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
        borderRadius: "5px"
    },
    chatBoxHeader: {
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(1),
    }
}));

function AddTicketPannel(props) {

    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [ticketName, setTicketName] = useState('');
    const [comments, setComments] = useState('');

    const inputChangedHandler = (event, controlName) => {
        if (controlName == 'name') {
            setTicketName(event.target.value)
        } else {
            setComments(event.target.value)
        }

    }

    let form = <>
        <TextField
            onChange={(event) => inputChangedHandler(event, 'name')}
            fullWidth
            margin="normal"
            id="filled-search"
            label="Enter Ticket name"
            type="text"
            variant="outlined" />
        <textarea style={{ width: "100%", maxWidth: "100%", minHeight: "290px" }}
            placeholder="Comments"
            onChange={(event) => inputChangedHandler(event, 'comments')} />
    </>

    const submitAddTickets = (event) => {
        event.preventDefault();
        props.addTicketDemoAlert();
        // props.onAddingTickets(props.token, comments, ticketName);
        props.handleClose();
    }

    return (
        <>
            <CustomModal
                // className={classes.modal}
                open={props.open}
                onClose={props.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <Wrapper>
                        <div>
                            <Typography variant="h5">Add Ticket</Typography>
                            <CloseButton onClick={props.handleClose} />
                        </div>

                        <Box>
                            <div className={classes.pageContent}>
                                <GridItem xs={12} sm={6} md={6}>
                                    <form onSubmit={submitAddTickets}>
                                        {form}
                                        <Button
                                            disabled={comments.length > 0 ? false : true}
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            fullWidth
                                            onClick={submitAddTickets}
                                        >
                                            Add Tickets
                                        </Button>
                                    </form>

                                </GridItem>
                                <GridItem xs={12} sm={6} md={6}>
                                    <div className={classes.chatBox}>
                                        <Typography className={classes.chatBoxHeader}>Name</Typography>
                                    </div>
                                </GridItem>
                            </div>
                        </Box>
                    </Wrapper>
                </Fade>
            </CustomModal>

        </>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.auth_reducer.token,
        loader: state.customerTickets.loading,
        success_msg: state.customerTickets.adding_success_msg,
        error: state.customerTickets.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddingTickets: (token, ticketText, title) => dispatch(action.adding_tickets(token, ticketText, title)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddTicketPannel);
