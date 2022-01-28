import React from 'react';
import { withStyles, makeStyles, fade } from '@material-ui/core/styles';
import { CSVLink, CSVDownload } from "react-csv";

// @material/core components
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';

import { FaFileCsv } from "react-icons/fa";
import { FiMinus } from 'react-icons/fi'

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
        height: 20,
        fontWeight: 500,
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
const BandwidthTable = (props) => {

    const classes = useStyles();

    return (<>
        <TableContainer>
            <div className={classes.tableTitleContainer}>
                <span style={{ fontWeight: 500, fontSize: "0.8rem" }}>Bandwidth | All IP</span>
                <div>
                    <CSVLink data={props.rows}
                        filename={`bandwidth_${props.fromdate.toDateString()}-${props.todate.toDateString()}.csv`}>
                        <IconButton color="primary" size="small">
                            <FaFileCsv style={{ color: "#007bff", fontSize: "2em", }} />
                        </IconButton>
                    </CSVLink>
                </div>
            </div>
            <Table aria-label="instances-table" aria-label="a dense table">
                <TableHead>
                    <StyledTableRow key="heading">
                        <StyledTableCell>
                            <span style={{ paddingLeft: "20px" }}></span>Label
                        </StyledTableCell>
                        <StyledTableCell align="left">Public IP</StyledTableCell>
                        <StyledTableCell align="left">Received</StyledTableCell>
                        <StyledTableCell align="left">Transmitted</StyledTableCell>
                        <StyledTableCell align="left">Total</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {props.rows.map((row, index) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell align="left">
                                <span style={{ paddingLeft: "20px" }}></span>
                                {row.label}
                            </StyledTableCell>
                            <StyledTableCell align="left">{row.ip}</StyledTableCell>
                            <StyledTableCell align="left">{row.recived_bandwidth}</StyledTableCell>
                            <StyledTableCell align="left">{row.transmit_bandwidth}</StyledTableCell>
                            <StyledTableCell align="left">{row.bandwidth}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    {props.total === true ? <StyledTableRow key="total-report">
                        <StyledTableCell align="left"></StyledTableCell>
                        <StyledTableCell style={{ fontWeight: 700 }}>Total</StyledTableCell>
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

export default BandwidthTable;