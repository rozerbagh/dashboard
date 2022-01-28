import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import styled from 'styled-components'
// @material-ui/core components
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from '@material-ui/core/Grid';
import Redirection from '../../../components/Alerts/Alert/Modal';
import Loader from "../../../components/UI/Loader/Loader";
import Card from "../../../components/Card/Card";
import TicketsTable from './TicketsTable';

import * as action from '../../../store/actions/customer/index';


const SuccessBtn = styled.button`
    outline: none;
    border: none;
    background-color: #31E8A9;
    padding: 0.3rem 0.9rem;;
    font-size: 1rem;
    color:#ffffff;
    margin: 0.1rem 0.5rem;
    border-radius: 5px;
    cursor: pointer;
`;

const ConfirmButtons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
`;

const ConfirmAlertText = styled.p`
    font-size: 1rem;
    text-align: center;
`;

const useStyles = makeStyles(theme => ({
    loaderContainer: {
        position: "relative",
        margin: "0 auto",
        width: "500px",
        height: "500px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
}))

function Tickets(props) {
    const classes = useStyles();

    const [searchedLink, setSearchedLink] = useState('')

    const [ticketList, setTicketsList] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        props.onFetchingTickets(props.token)
        setCount(count + 1)
    }, [])

    useEffect(() => {
        if (props.location.search !== '' &&
            props.location.search !== null &&
            props.location.search !== undefined) {
            console.log(props.location.search.split("?")[1])
            setSearchedLink(props.location.search.split("?")[1])
        }
    }, [props.location.search])


    useEffect(() => {
        const ticketsArr = [];
        props.tickets.map((ticket, index) => {
            ticketsArr.push({
                tickets_index: index + 1,
                c_date: new Date(ticket.ctime * 1000).toDateString(),
                u_date: new Date(ticket.utime * 1000).toDateString(),
                title: ticket.title,
                status: ticket.status,
                updates: ticket.status,
                id: ticket._id
            })
        });
        setTicketsList(ticketsArr)
    }, [props.tickets])
    return (
        <>
            {
                props.error === 'logout' || props.notificationsError === 'logout' ? <Redirection
                    linkRoute="/logout"
                    bodyText="Other session is active and you are logged out. Please login again."
                    btnText="Ok" /> :
                    props.error === 'Your roles have been updated. Login again.' ||
                        props.notificationsError === 'Your roles have been updated. Login again.' ? <Redirection
                        linkRoute="/logout"
                        bodyText="Your roles have been updated. Login again."
                        btnText="Ok" /> :
                        <Grid container>
                            <Grid item xs={12} sm={12} md={12}>
                                {props.loader ?
                                    <div className={classes.loaderContainer}>
                                        <Loader bigLoader style={{ margin: "0 auto" }} />
                                    </div> :
                                    <Card>
                                        <TicketsTable
                                            searchedTicket={searchedLink}
                                            tickets={ticketList}
                                        />
                                    </Card>
                                }
                            </Grid>
                        </Grid>}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.auth_reducer.token,
        loader: state.customerTickets.loading,
        tickets: state.customerTickets.ticket_list,
        updatesMessages: state.customerTickets.updates_message,
        error: state.customerTickets.error,
        notificationsError: state.customerCommon.notifications_error_msg,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchingTickets: (token) => dispatch(action.fetching_tickets(token)),
        onFetchingUpdatesTicketsMessages: (token, id) => dispatch(action.fetch_updates_tickets_msg(token, id)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Tickets);