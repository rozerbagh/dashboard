import React from 'react';


// @material-ui/core components;
import { withStyles, makeStyles, fade } from '@material-ui/core/styles';
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import Typography from "@material-ui/core/Typography"
import * as Buttons from "../../CustomButtons/CustomButtons";
import { FiMinus } from 'react-icons/fi'

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: fade(theme.palette.primary.light, 0.15),
        color: theme.palette.common.black,
        border: "none",
        fontSize: "0.8rem",
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
        },
        padding: "5px 10px",
    },
    body: {
        padding: "5px 10px",
        fontSize: "0.8rem",
        border: "none",
        height: 20,
        fontWeight: 500,
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
    },
    tableFooterButtons: {
        margin: "0 auto",
        fontSize: "0.7rem"
    }
});
const ExternalIPTable = (props) => {

    const classes = useStyles();

    const [startIndex, setStartIndex] = React.useState(0);
    const [endIndex, setEndIndex] = React.useState(5);
    const [buttonText, setButtonText] = React.useState('More')

    const showMore = () => {
        setEndIndex(endIndex + 5);
    };

    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    // };

    React.useMemo(() => {
        endIndex >= props.rows.length ? setButtonText('That\'s all') : setButtonText('View More');
    }, [endIndex, props.rows])

    return (<>
        <TableContainer>
            <div className={classes.tableTitleContainer}>
                <span style={{ fontWeight: 500 }}>External IP Communication
                    | {props.wan_ip === '' ? 'No data Found' : props.wan_ip}
                </span>
                {/* <div>
                    <CSVLink data={props.rows}
                        filename={`ip-tracking_${props.csvNo}-${props.fromdate.toDateString()}-${props.todate.toDateString()}.csv`}>
                        <IconButton color="primary" size="small">
                            <FaFileCsv style={{ color: "#007bff", fontSize: "1.5em", }} />
                        </IconButton>
                    </CSVLink>
                </div> */}
            </div>
            <Table aria-label="instances-table" aria-label="a dense table">
                <TableHead>
                    <StyledTableRow key={`${props.wan_ip}-ext-ip-title`}>
                        <StyledTableCell>Internal IP</StyledTableCell>
                        <StyledTableCell align="center">External IP</StyledTableCell>
                        <StyledTableCell align="center">Received</StyledTableCell>
                        <StyledTableCell align="center">Transmitted</StyledTableCell>
                        <StyledTableCell align="center">Total</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {props.rows.slice(startIndex, endIndex).map((row) => (
                        <StyledTableRow key={`${props.wan_ip}-${row.i}-${row.tn}-ext-ip-tracking`}>
                            <StyledTableCell component="th" scope="row">{row.internal_ip}</StyledTableCell>
                            <StyledTableCell align="center">{row.external_ip}</StyledTableCell>
                            <StyledTableCell align="center">{row.recived_bandwidth}</StyledTableCell>
                            <StyledTableCell align="center">{row.transmit_bandwidth}</StyledTableCell>
                            <StyledTableCell align="center">{row.bandwidth}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <div className={classes.tableFooterButtons}>
            <Buttons.TextPrimaryButton onClick={showMore}>
                {buttonText}
            </Buttons.TextPrimaryButton>
        </div>

    </>)
}

export default ExternalIPTable;