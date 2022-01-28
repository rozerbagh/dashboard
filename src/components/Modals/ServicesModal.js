import React, { useState, useEffect } from 'react';

import styled from 'styled-components'
import { withStyles, fade, makeStyles, useTheme } from '@material-ui/core/styles';
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CloseIcon from '@material-ui/icons/Close';

const StatusText = styled.span`
    color: ${p => p.status == 'CRIT' ? 'red' : p.status == 'WARN' ? 'orange' : '#13D391'};
`;

const DateText = styled.span`
    white-space: nowrap;
    width: 100%;
`;

const Title = styled.h6`
    white-space: nowrap;
    width: 90%;
    margin: 1rem 1rem 0 1rem;
    font-weight: 500;
    border-bottom: 1px solid #ccc;
`

const CloseBtn = styled.div`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
`;

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: fade(theme.palette.primary.light, 0.15),
        color: theme.palette.common.black,
        border: "none",
        fontSize: "0.8rem",
        height: 20,
        padding: "5px 10px",
    },
    body: {
        padding: "5px 10px",
        fontSize: "0.8rem",
        border: "none",
        height: 20
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

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    heading: {
        padding: "5px 10px",
        color: " #132739"
    }
});


const ServicesModal = React.memo((props) => {

    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [services, setServices] = useState([]);

    useEffect(() => {
        const serArr = [];
        let subTitle = '';
        let setDate = '';
        let dateTime = '';
        props.serviceRows.map((ser, i) => {
            let sniceDate = new Date(ser.last_time * 1000);
            let date = sniceDate.getDate();
            let month = sniceDate.getMonth() + 1;
            let year = sniceDate.getFullYear();
            let hours = sniceDate.getHours();
            let minutes = sniceDate.getMinutes();
            let seconds = sniceDate.getSeconds();
            // Hours format
            if (hours < 10) {
                hours = `0${hours}`
            } else {
                hours = hours
            }
            // Minutes format
            if (minutes < 10) {
                minutes = `0${minutes}`
            } else {
                minutes = minutes
            }
            // seconds format
            if (seconds < 10) {
                seconds = `0${seconds}`
            } else {
                seconds = seconds
            }

            if (ser.subtitle.length > 0) {
                subTitle = `${ser.title} | ${ser.subtitle}`
            } else {
                subTitle = `${ser.title}`
            }

            dateTime = `${date}/${month}/${year} - ${hours}:${minutes}:${seconds}`

            if (ser.title.indexOf('check_mk') < 0) {
                serArr.push({
                    id: Math.random(),
                    eleIndex: i + 1,
                    state: ser.state,
                    date: dateTime,
                    service: subTitle,
                    details: ser.details
                })
            }
        })
        setServices(serArr)
    }, [props.serviceRows])


    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
            maxWidth="md"
            fullScreen={fullScreen}
        >
            <CloseBtn>
                <CloseIcon onClick={props.handleClose} />
            </CloseBtn>
            <Title>{props.hostName}</Title>
            <DialogContent>
                <Table aria-label="instances-table" aria-label="a dense table">
                    <TableHead>
                        <StyledTableRow key={`${props.wan_ip}-sevive-dialog-title`}>
                            <StyledTableCell align="center">State</StyledTableCell>

                            <StyledTableCell align="left">Since</StyledTableCell>
                            <StyledTableCell align="left">Service</StyledTableCell>
                            <StyledTableCell>State Details</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {services.map((row, i) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell align="left">
                                    <StatusText status={row.state}>{row.state}</StatusText>
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <DateText>{row.date}</DateText>
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {row.service}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {row.details}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </DialogContent>
        </Dialog >
    )
})

export default ServicesModal;
