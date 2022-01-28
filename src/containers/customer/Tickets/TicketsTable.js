import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';

// @material core components
import { withStyles, makeStyles, fade } from '@material-ui/core/styles';
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead";
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"
import Button from "@material-ui/core/Button"

import GridItem from '../../../components/Grid/GridItem';
import WarningAlert from '../../../components/Alerts/Warning/Warn';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import RateReviewIcon from '@material-ui/icons/RateReview';
import AddIcon from '@material-ui/icons/Add';
import AddTicketPannel from './AddTicketPanel';
import UpdatingTicketPannel from './UpdatingTickets';
import ViewingClosedTickets from './ViewClosedTickets'

import * as action from '../../../store/actions/customer/index';


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: fade(theme.palette.primary.light, 0.15),
        color: theme.palette.common.black,
        border: "none",
        fontSize: "0.8rem",
        height: 20,
        padding: "5px 10px",
        '&:nth-last-of-type(1)': {
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "5px",
            borderTopLeftRadius: "0",
            borderTopRightRadius: "5px",
        },
        '&:nth-of-type(1)': {
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "0px",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "0px",
        }
    },
    body: {
        padding: "5px 10px",
        fontSize: "0.8rem",
        border: "none",
        '&:nth-last-of-type(1)': {
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "10px",
            borderTopLeftRadius: "0",
            borderTopRightRadius: "10px",
        },
        '&:nth-of-type(1)': {
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "0px",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "0px",
        }
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        height: 20,
        fontSize: 14,
        border: "none",
        '&:nth-of-type(even)': {
            backgroundColor: fade(theme.palette.primary.light, 0.15),
            border: "none",
            borderRadius: theme.spacing(1)
        },
    },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
    },
    heading: {
        padding: "5px 10px",
        color: " #132739"
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    tableHeader: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%"
    },
    selectInput: {
        height: "60px"
    }
}));

function TicketsTable(props) {
    const classes = useStyles();
    const [demoAlert, setDemoAlert] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleActionClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const [open, setOpen] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [updateIndex, setUpdateIndex] = useState(0)
    const [update_id, setUpdateMsgBox_id] = useState('');

    const [chatTitle, setChatTitle] = useState('');

    const [updateChatMessages, setUpdateChatMessages] = useState([]);

    const [comments, setComments] = useState('');
    const [validComment, setValidComment] = useState(false);
    const handleCommentsChange = (event) => {
        setComments(event.target.value);
        if (event.target.value.length >= 3) {
            setValidComment(true)
        } else {
            setValidComment(false)
        }
    }

    const handleAddPanelOpen = () => {
        setOpen(true);
    };

    const handleAddPanelClose = () => {
        setOpen(false);
    };

    const handleUpdatePanelOpen = (id, title, i) => {
        setChatTitle(title)
        setUpdateMsgBox_id(id);
        setOpenUpdateModal(true);
        setUpdateIndex(i)
        props.onFetchingUpdatesTicketsMessages(props.token, id)
    };

    const handleUpdatePanelClose = () => {
        setOpenUpdateModal(false);
    };

    const handleViewPanelOpen = (id, title, i) => {
        setChatTitle(title)
        setUpdateMsgBox_id(id);
        setOpenViewModal(true);
        setUpdateIndex(i)
        props.onFetchingUpdatesTicketsMessages(props.token, id)
    };

    useEffect(() => {

        const arr = []
        props.updatesMessages.map(ele => {
            arr.push({
                admin_name: ele.admin_name,
                ticket_text: ele.ticket_text,
                userId: ele.userId,
                user_name: ele.user_name,
                user_type: ele.user_type,
                _id: ele._id,
            })
            setChatTitle(ele.user_name)
        })
        setUpdateChatMessages(arr)
    }, [props.updatesMessages])

    const handleViewPanelClose = () => {
        setOpenViewModal(false);
    };

    const [selectInput, setSelectInput] = useState('all');


    const handleSelectChange = (event) => {
        const name = event.target.value;
        setSelectInput(name)
    };

    useEffect(() => {
        if (props.searchedTicket !== '' &&
            props.searchedTicket !== null &&
            props.searchedTicket !== undefined) {
            setSelectInput(props.searchedTicket);
        }
    }, [props.searchedTicket])

    const handleUpdateTicket = (event) => {
        event.preventDefault();
        setDemoAlert(<WarningAlert message="Demo Account" />)
        setTimeout(() => setDemoAlert(null), 5000);
        // props.onUpdatingTickets(props.token, comments, update_id)
        setComments('')
    }

    const addTicketDemoAlert = () => {
        setDemoAlert(<WarningAlert message="Demo Account tickets added" />);
        setTimeout(() => setDemoAlert(null), 5000)
    }

    return (
        <>
            <TableContainer>
                <div className={classes.tableHeader}>
                    <GridItem xs={12} sm={8} md={8}>
                        <Typography variant="h6" className={classes.heading}>Tickets</Typography>
                    </GridItem>

                    <GridItem xs={12} sm={2} md={2}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="outlined-tickets-native-simple">
                                Tickets
                            </InputLabel>
                            <Select
                                native
                                value={selectInput}
                                onChange={handleSelectChange}
                                label="Tickets"
                            >
                                <option defaultValue="all" value="all">All</option>
                                <option value="closed">Closed</option>
                                <option value="pending">Pending</option>
                            </Select>
                        </FormControl>
                    </GridItem>

                    <GridItem xs={12} sm={2} md={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<AddIcon />}
                            sm={6} onClick={handleAddPanelOpen}
                        >
                            Create Ticket
                        </Button>
                    </GridItem>
                </div>
                <Table aria-label="instances-table" aria-label="a dense table" size="small">
                    <TableHead>
                        <StyledTableRow key="heading">
                            <StyledTableCell align="center">T.No</StyledTableCell>
                            <StyledTableCell align="center">Created Date</StyledTableCell>
                            <StyledTableCell align="center">Updated Date</StyledTableCell>
                            <StyledTableCell align="center">Title</StyledTableCell>
                            <StyledTableCell align="center">Status</StyledTableCell>
                            <StyledTableCell align="center">Updates</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {props.tickets.filter((val, index) => {
                            if (selectInput === "all") {
                                return val;
                            } else if (selectInput === "closed") {
                                return val.status === 0 ? val : null;
                            } else if (selectInput === "pending") {
                                return val.status === 1 ? val : null;
                            }
                        }).map((ticket, index) => (
                            <StyledTableRow key={ticket.tickets_index}>
                                <StyledTableCell align="center">
                                    <Typography variant="body2" className={classes.heading}>{ticket.tickets_index}</Typography>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Typography variant="body2" className={classes.heading}>{ticket.c_date}</Typography>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Typography variant="body2" className={classes.heading}>{ticket.u_date}</Typography>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Typography variant="body2" className={classes.heading}>{ticket.title}</Typography>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {ticket.status == 0 ? <div style={{ color: "green" }}>Closed</div> :
                                        <div style={{ color: "orange" }}>Pending</div>
                                    }

                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Typography variant="body2" className={classes.heading}>
                                        {ticket.status == 0 ? <IconButton size="small"
                                            onClick={() => handleViewPanelOpen(ticket.id, ticket.title, index)}
                                        >
                                            <RateReviewIcon size="small" color="primary" />
                                        </IconButton> :
                                            <IconButton size="small"
                                                onClick={() => handleUpdatePanelOpen(ticket.id, ticket.title, index)}>
                                                <BorderColorIcon size="large" color="primary" />
                                            </IconButton>}
                                    </Typography>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <AddTicketPannel
                addTicketDemoAlert={addTicketDemoAlert}
                open={open}
                handleClose={handleAddPanelClose}
            />
            {demoAlert}

            <UpdatingTicketPannel key={`ticket-panel-${update_id}-pending`}
                U_loading={props.update_loader}
                updt_loading={props.up_loading}
                open={openUpdateModal}
                comments={comments}
                validComments={validComment}
                inputHandler={handleCommentsChange}
                updateTicket={handleUpdateTicket}
                handleClose={handleUpdatePanelClose}
                chatHistory={updateChatMessages}
                chatTitle={chatTitle}
            />

            <ViewingClosedTickets key={`ticket-panel-${update_id}-closed`}
                U_loading={props.update_loader}
                open={openViewModal}
                handleClose={handleViewPanelClose}
                chatHistory={updateChatMessages}
                chatTitle={chatTitle}
            />
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        token: state.auth_reducer.token,
        updatesMessages: state.customerTickets.updates_message,
        error: state.customerTickets.error,
        update_loader: state.customerTickets.fetch_update_loading,
        up_loading: state.customerTickets.u_loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchingUpdatesTicketsMessages: (token, id) => dispatch(action.fetch_updates_tickets_msg(token, id)),
        onUpdatingTickets: (token, ticketText, id) => dispatch(action.updating_tickets(token, ticketText, id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TicketsTable);