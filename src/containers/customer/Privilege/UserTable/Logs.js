import React, { useState, useEffect } from 'react';

// @material-ui/core
import { makeStyles, useTheme, fade, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import TableContainer from "@material-ui/core/TableContainer"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import CloseIcon from '@material-ui/icons/Close';

import Loader from "../../../../components/UI/Loader/Loader";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: fade(theme.palette.primary.light, 0.15),
        color: theme.palette.common.black,
        border: "none",
        padding: theme.spacing(1),
        textAlign: "center",
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
    body: {
        border: "none",
        padding: theme.spacing(0.5),
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
        '&:nth-of-type(even)': {
            backgroundColor: fade(theme.palette.primary.light, 0.15),
        },
        border: "none",
    },
}))(TableRow);

const useStyles = makeStyles(theme => ({
    pageContent: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
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

function Logs(props) {

    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Dialog
            open={props.open}
            fullScreen={fullScreen}
            onClose={props.handleLogsClose}
            aria-labelledby="form-dialog-title">

            {props.loader ?
                <Loader bigLoader style={{ margin: "0 auto" }} /> :
                <div style={{ width: "500px", }} className={classes.pageContent}>
                    <div className={classes.closeIcon}>
                        <IconButton onClick={props.handleLogsClose} color="inherit" size="small">
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <DialogTitle id="form-dialog-title">
                        <div className={classes.heading}>
                            <Typography variant="h6">Logs</Typography>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        {props.logs.length == 0 ? <Typography variant="h6">"No changes since"</Typography> : <div>
                            <TableContainer>
                                <Table
                                    aria-labelledby="tableTitle"
                                    aria-label="enhanced table"
                                >
                                    <TableHead>
                                        <StyledTableRow>
                                            <StyledTableCell align="center">Date</StyledTableCell>
                                            <StyledTableCell align="center">Logs</StyledTableCell>
                                        </StyledTableRow>
                                    </TableHead>
                                    <TableBody>
                                        {props.logs.map((log, index) => {
                                            var timestamp = log._id.toString().substring(0, 8)
                                            var date = new Date(parseInt(timestamp, 16) * 1000);
                                            return (
                                                <StyledTableRow key={`logs-details-${index}`}>
                                                    <StyledTableCell align="center">
                                                        {`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        {log.message}
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>}
                    </DialogContent>
                </div>}
        </Dialog >
    )
}

export default Logs;
