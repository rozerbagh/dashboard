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
            borderRadius: theme.spacing(1)
        },
    },
}))(TableRow);



const ZoomViewServices = (props) => {
    const classes = useStyles();
    const [services, setServices] = useState([]);

    useEffect(() => {
        setServices(props.servicesArr);
    }, [props.servicesArr]);

    return (
        <div className={classes.root}>
            {props.loader ?
                <div className={classes.loaderContainer}>
                    <Loader bigLoader style={{ margin: "0 auto" }} />
                </div> :
                <div>
                    <Table>
                        <TableHead>
                            <StyledTableRow key="heading">
                                <StyledTableCell align="center">State</StyledTableCell>
                                <StyledTableCell align="left">Services</StyledTableCell>
                                <StyledTableCell>Services</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {services.map((inst, index) => {
                                if (inst == null) {

                                } else {
                                    return (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell align="center">
                                                <div variant="body2" style={{
                                                    color: inst.state === 'OK' ? 'green' :
                                                        inst.state === 'WARN' ? 'oragne' : 'red'
                                                }}>
                                                    {inst.state}
                                                </div>
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                <Typography variant="body2">
                                                    {inst.subtitle.length > 0 ?
                                                        `${inst.title} | ${inst.subtitle}` :
                                                        inst.title
                                                    }
                                                </Typography>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Typography variant="body2">{inst.details}</Typography>
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
        servicesArr: state.vendorZoomView.services_list,
        loader: state.vendorZoomView.loadingServices,
    }
}


export default connect(mapStateToProps, null)(ZoomViewServices);