import React from 'react';
import { withStyles, makeStyles, fade } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import { CSVLink, CSVDownload } from "react-csv";
import { FaFileCsv } from "react-icons/fa";
import { FiMinus } from 'react-icons/fi';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: fade(theme.palette.primary.light, 0.15),
        color: theme.palette.common.black,
        border: "none",
        fontSize: "0.8rem",
        height: 20,
        color: "#007bff",
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
        fontWeight: 500,
        height: 20,
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
    },
    tableTitleContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    }
});
const TopAppsTable = (props) => {

    const classes = useStyles();

    return (<>
        <TableContainer>
            <div className={classes.tableTitleContainer}>
                <span style={{ fontWeight: 500, fontSize: "0.8rem" }}>Apps
                    |  {props.wan_ip}
                </span>
                <div>
                    <CSVLink data={props.rows}
                        filename={`top-appps_${props.csvNo}-${props.fromdate.toDateString()}-${props.todate.toDateString()}.csv`}>
                        <IconButton color="primary" size="small">
                            <FaFileCsv style={{ color: "#007bff", fontSize: "1.5em", }} />
                        </IconButton>
                    </CSVLink>
                </div>
            </div>
            <Table aria-label="instances-table" aria-label="a dense table">
                <TableHead>
                    <StyledTableRow key={`${props.wan_ip}-title`}>
                        <StyledTableCell>
                            <span style={{ paddingLeft: "20px" }}></span>App
                        </StyledTableCell>
                        <StyledTableCell align="left">Active Conn.</StyledTableCell>
                        <StyledTableCell align="left">Total Conn.</StyledTableCell>
                        <StyledTableCell align="left">Received</StyledTableCell>
                        <StyledTableCell align="left">Transmitted</StyledTableCell>
                        <StyledTableCell align="left">Total</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {props.rows.map((row) => (
                        <StyledTableRow key={`${props.wan_ip}-${row.id}`}>
                            <StyledTableCell align="left">
                                <span style={{ paddingLeft: "20px" }}></span>{row.app}
                            </StyledTableCell>
                            <StyledTableCell align="left">{row.active_conn}</StyledTableCell>
                            <StyledTableCell align="left">{row.total_conn}</StyledTableCell>
                            <StyledTableCell align="left">{row.recived_bandwidth}</StyledTableCell>
                            <StyledTableCell align="left">{row.transmit_bandwidth}</StyledTableCell>
                            <StyledTableCell align="left">{row.bandwidth}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    {props.total === true ? <StyledTableRow key={Math.random().toString()}>
                        <StyledTableCell style={{ fontWeight: 700 }}>Total</StyledTableCell>
                        <StyledTableCell align="left"></StyledTableCell>
                        <StyledTableCell align="left"></StyledTableCell>
                        <StyledTableCell align="left" style={{ fontWeight: 700 }}>{props.total_recieved}</StyledTableCell>
                        <StyledTableCell align="left" style={{ fontWeight: 700 }}>{props.total_transmit}</StyledTableCell>
                        <StyledTableCell align="left" style={{ fontWeight: 700 }}>{props.total}</StyledTableCell>
                    </StyledTableRow> : null}
                </TableBody>
            </Table>
        </TableContainer>
    </>)
}

export default TopAppsTable;