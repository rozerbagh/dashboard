import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { format } from 'money-formatter';
import { lighten, makeStyles, withStyles, fade } from '@material-ui/core/styles';
// @materaial cotre components
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TablePagination from '@material-ui/core/TablePagination'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import PaymentIcon from '@material-ui/icons/Payment';
import Button from '@material-ui/core/Button'

import GridItem from "../../../../components/Grid/GridItem";
import { FaRegFilePdf } from "react-icons/fa";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: fade(theme.palette.primary.light, 0.15),
        color: theme.palette.common.black,
        border: "none",
        fontSize: "1em",
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
        fontSize: 14,
        border: "none",
        fontSize: "1em",
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
        '&:nth-of-type(even)': {
            backgroundColor: fade(theme.palette.primary.light, 0.15),
        },
        border: "none",
    },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}


function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <StyledTableCell padding="checkbox" align="center">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    /> All
                </StyledTableCell>
                {props.headCells.map((headCell) => (
                    <StyledTableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'center' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                            <span className={classes.visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </span>
                        ) : null}
                    </StyledTableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        borderRadius: "0.5rem",
        marginBottom: "0.5rem"
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.95),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
    paynow_btn: {
        maxHeight: "50px",
    }
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected, totalBal, paynow_fn } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} Invoices selected with <span className="text-spacing font500 left-margin">
                        Total Balance :- {format('INR', (parseInt(totalBal)))}</span>
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    Invoices
                </Typography>
            )}

            {numSelected > 0 ? (
                <GridItem xs={2} sm={2} md={2} alignItems="flex-end">
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button + classes.paynow_btn}
                        startIcon={<PaymentIcon />}
                        onClick={paynow_fn}>
                        Pay Now
                    </Button>
                </GridItem>
            ) : (
                <GridItem xs={2} sm={2} md={2} alignItems="flex-end">
                    <Button
                        variant="outlined"
                        color="primary"
                        disabled
                        className={classes.button + classes.paynow_btn}
                        startIcon={<PaymentIcon />} >
                        Pay Now
                    </Button>
                </GridItem>
            )
            }
        </Toolbar >
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    totalBal: PropTypes.number.isRequired,
};

export default function InvoicesTable(props) {

    const classes = useStyles();

    const [balancedArr, setBalancedArr] = React.useState([])
    const [totalBalance, setTotalBalance] = React.useState(0);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('serial_no');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(true);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleActionClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }

    const handleSelectAllClick = (event) => {
        let dues = 0;
        if (event.target.checked) {
            let newSelecteds = [];
            props.rows.map((row) => {
                if (row.balance_amt > 0) {
                    dues += row.balance_amt
                    newSelecteds.push(row.balance_amt);
                    localStorage.setItem('balance_dues', dues)
                } else {
                    newSelecteds = newSelecteds;
                }
            });
            setSelected(newSelecteds);
            setTotalBalance(dues);
        } else {
            setSelected([]);
        }
        dues = 0;
    };

    const isSelected = (balance_amt) => selected.indexOf(balance_amt) > -1;



    const handleClick = (event, balance) => {
        if (balance > 0) {
            const selectedIndex = selected.indexOf(balance);
            let newSelected = [];
            let balanaceArr = []
            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, balance);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1));
            } else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selected.slice(0, selectedIndex),
                    selected.slice(selectedIndex + 1),
                );
            }
            setSelected(newSelected);
            let sum = 0;
            newSelected.map(ele => {
                sum += ele;
            })
            setTotalBalance(sum);
        }

    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const totalLength = props.rows.length;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, totalLength - page * rowsPerPage);

    const preventDefault = (event) => event.preventDefault();

    React.useEffect(() => {
        let duesArr = [];
        let sum = 0;
        props.rows.map((row, index) => {
            if (row.balance_amt > 0) {
                sum += row.balance_amt;
                duesArr.push(row.balance_amt)
            }
        })
        setBalancedArr(duesArr);
        setSelected(duesArr)
        setTotalBalance(sum);
    }, [props.rows])

    return (
        <div className={classes.root}>
            <EnhancedTableToolbar numSelected={selected.length}
                paynow_fn={props.paynowFunction}
                totalBal={totalBalance} />
            <TableContainer>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={dense ? 'small' : 'medium'}
                    aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={balancedArr.length}
                        headCells={props.headCells}
                    />
                    <TableBody>
                        {stableSort(props.rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const isItemSelected = isSelected(row.balance_amt)
                                // if (row.balance_amt > 0) {
                                //     isItemSelected = isSelected(row.balance_amt);
                                // }
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <StyledTableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.balance_amt)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={`invoice-row-${index}`}
                                        selected={isItemSelected}>
                                        <StyledTableCell padding="checkbox" align="center">
                                            {row.balance_amt > 0 ? <Checkbox
                                                checked={isItemSelected}
                                                value={row.balance_amt}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            /> : null}
                                        </StyledTableCell>
                                        <StyledTableCell component="th" id={labelId} scope="row" padding="none" style={{ width: "15em" }}>
                                            {row.order_no}
                                        </StyledTableCell>
                                        <StyledTableCell align="left" style={{ width: "12em" }}>{row.invoice_no}</StyledTableCell>
                                        <StyledTableCell align="left" style={{ width: "12em" }}>{row.invoice_date}</StyledTableCell>
                                        <StyledTableCell align="left" style={{ width: "12em" }}>{row.invoice_due_date}</StyledTableCell>
                                        <StyledTableCell align="left" style={{ width: "8em" }}>{row.status}</StyledTableCell>
                                        <StyledTableCell align="left">{row.amount}</StyledTableCell>
                                        <StyledTableCell align="center">{row.balance_due}</StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <StyledTableRow style={{ height: (dense ? 30 : 45) * emptyRows }}>
                                <TableCell colSpan={6} />
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={props.rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
}

