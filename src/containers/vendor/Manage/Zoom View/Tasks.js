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



const ZoomViewTasks = (props) => {
    const classes = useStyles();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        setTasks(props.taskaArr);
    }, [props.taskaArr]);

    return (
        <div className={classes.root}>
            {props.loader ?
                <div className={classes.loaderContainer}>
                    <Loader bigLoader style={{ margin: "0 auto" }} />
                </div> :
                <div>
                    <Typography variant="body1">Tasks | {props.public_ip}</Typography>
                    <span style={{ padding: "3px" }}></span>
                    <Table>
                        <TableHead>
                            <StyledTableRow key="heading">
                                <StyledTableCell align="left">Instances</StyledTableCell>
                                <StyledTableCell align="left">Action</StyledTableCell>
                                <StyledTableCell>Sheduled Time</StyledTableCell>
                                <StyledTableCell align="left">Executed Time</StyledTableCell>
                                <StyledTableCell>Status</StyledTableCell>
                                <StyledTableCell>Task Created By</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {tasks.map((task, index) => {
                                const sheduledTime = task.tdate;
                                const excutedTime = task.cdate;
                                if (task == null) {

                                } else {
                                    return (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell align="left">
                                                <Typography variant="body2">
                                                    {task.host_name}
                                                </Typography>
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                <Typography variant="body2">
                                                    Reboot
                                                </Typography>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Typography variant="body2">{sheduledTime}</Typography>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Typography variant="body2">{excutedTime}</Typography>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <div variant="body2">
                                                    <span style={{ color: task.status == 'Pending' ? 'red' : 'green' }}>{task.status}</span>
                                                </div>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Typography variant="body2">{task.created_by}</Typography>
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
}

const mapStateToProps = state => {
    return {
        taskaArr: state.vendorZoomView.tasks_list,
        loader: state.vendorZoomView.loadingTasks,
    }
}


export default connect(mapStateToProps, null)(ZoomViewTasks);