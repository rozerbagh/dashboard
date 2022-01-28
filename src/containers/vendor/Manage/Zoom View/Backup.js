import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';

// @material-ui/core components
import { makeStyles, withStyles, fade } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import Typography from "@material-ui/core/Typography"
import Loader from "../../../../components/UI/Loader/Loader";

import * as formatter from '../../../../components/Functions/Formatter'

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        borderBottom: "1px solid #ccc",
        borderRadius: 0,
    },
    loaderContainer: {
        position: "relative",
        margin: "0 auto",
        width: "500px",
        height: "500px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
});

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: fade(theme.palette.primary.light, 0.15),
        color: theme.palette.common.black,
        border: "none",
        fontSize: 12,
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
        fontSize: 12,
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



const ZoomViewBackup = React.memo((props) => {
    const classes = useStyles();
    const [backups, setBackups] = useState([]);
    const [totalSize, setTotalSize] = useState(0);

    useEffect(() => {
        setBackups(props.backups);
    }, [props.backups]);


    useEffect(() => {
        let totalSize = 0;
        props.backups.map(ele => {
            totalSize += parseInt(ele.jobbytes);
        });
        setTotalSize(formatter.formatBytes(totalSize));

    }, [props.backups])

    return (
        <div className={classes.root}>
            {props.loader ?
                <div className={classes.loaderContainer}>
                    <Loader bigLoader style={{ margin: "0 auto" }} />
                </div> :
                <div>
                    <Typography variant="body1">Backup | {props.public_ip}
                        <span style={{ margin: "0 10px" }}>Backup Size - {totalSize} </span>
                    </Typography>
                    <span style={{ padding: "3px" }}></span>
                    <Table>
                        <TableHead>
                            <StyledTableRow key="heading">
                                <StyledTableCell align="left">Start Time</StyledTableCell>
                                <StyledTableCell align="left">End Time</StyledTableCell>
                                <StyledTableCell>Size</StyledTableCell>
                                <StyledTableCell align="left">Status</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {backups.map((backup, index) => {
                                let size = formatter.formatBytes(parseInt(backup.jobbytes))
                                let jobstatus = ''
                                if (backup.jobstatus == 'C') {
                                    backup.starttime = '---';
                                    backup.endtime = '---';
                                    jobstatus = `Not Yet Started`;
                                    // textClass = 'text_orange';
                                } else if (backup.jobstatus == 'A') {
                                    jobstatus = `Canceled By Users`;
                                    // textClass = 'text_red'
                                } else if (backup.jobstatus == 'T') {
                                    jobstatus = `Success`;
                                    // textClass = 'text_green'
                                } else if (backup.jobstatus == 'f') {
                                    jobstatus = `Failure`;
                                    // textClass = 'text_red'
                                }

                                if (backup == null) {

                                } else {
                                    return (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell align="left">
                                                <Typography variant="body2">
                                                    {backup.starttime}
                                                </Typography>
                                            </StyledTableCell>

                                            <StyledTableCell>
                                                <Typography variant="body2">{backup.endtime}</Typography>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Typography variant="body2">{size}</Typography>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Typography variant="body2">
                                                    <span style={{
                                                        color: backup.jobstatus == 'T' ? 'green' : 'red'
                                                    }}>
                                                        {jobstatus}</span>
                                                </Typography>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    )
                                }

                            })}
                        </TableBody>
                    </Table>
                </div>}

        </div>
    )
})

const mapStateToProps = state => {
    return {
        backups: state.vendorZoomView.backupsList,
        loader: state.vendorZoomView.loadingBackup,
    }
}


export default connect(mapStateToProps, null)(ZoomViewBackup);