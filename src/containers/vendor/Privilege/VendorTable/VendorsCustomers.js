import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
// @material-ui/core
import { makeStyles, useTheme, fade, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import Checkbox from "@material-ui/core/Checkbox"
import CloseIcon from '@material-ui/icons/Close';

import Loader from "../../../../components/UI/Loader/Loader";
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: fade(theme.palette.primary.light, 0.15),
        color: theme.palette.common.black,
        border: "none",
        padding: theme.spacing(1),
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
        border: "none",
        padding: theme.spacing(1),
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

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, numSelected, rowCount } = props;

    return (
        <TableHead>
            <StyledTableRow>
                <StyledTableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </StyledTableCell>
                {headCells.map((headCell) => (
                    <StyledTableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                    >
                        {headCell.label}
                    </StyledTableCell>
                ))}
            </StyledTableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    title: {
        flex: '1 1 100%',
    },
}));

const AssignInstanceToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
        <Toolbar>
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    Assigned customers are - {numSelected}
                </Typography>
            ) : (
                <Typography className={classes.title} variant="subtitle1" id="tableTitle" component="div">
                    No customers has been assigned
                </Typography>
            )}
        </Toolbar>
    );
};

AssignInstanceToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const headCells = [
    { id: 'instance_name', numeric: false, disablePadding: true, label: 'customers' },
];

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(0),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
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

function VendorsCustomers(props) {

    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [selected, setSelected] = React.useState([]);

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = props.customers.map((inst) => inst.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
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
    };
    useEffect(() => {
        let newSelected = [];
        props.customers.map((inst, index) => {
            if (inst.flag != 0) {
                newSelected.push(inst.id);
            } else {

            }
        });
        setSelected(newSelected);
    }, [props.customers]);

    const isSelected = (customer_name) => selected.indexOf(customer_name) !== -1;

    const submitCustomersHandler = () => {
        const customers = selected.toString()
        props.submitCustomersHandler(customers)
    }

    return (
        <Dialog
            open={props.open}
            fullScreen={fullScreen}
            onClose={props.handleInstanacesClose}
            aria-labelledby="form-dialog-title">


            {props.loader ?
                <Loader bigLoader style={{ margin: "0 auto" }} /> :
                <div className={classes.pageContent}>
                    <div className={classes.closeIcon}>
                        <IconButton onClick={props.handleInstanacesClose} color="inherit" size="small">
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div className={classes.heading}>
                        <Typography variant="h6">Map Customers</Typography>
                    </div>

                    <DialogContent>
                        <AssignInstanceToolbar numSelected={selected.length} />
                        <TableContainer>
                            <Table>
                                <EnhancedTableHead
                                    classes={classes}
                                    numSelected={selected.length}
                                    onSelectAllClick={handleSelectAllClick}
                                    rowCount={props.customers.length}
                                />
                                <TableBody>
                                    {props.customers.map((inst, index) => {
                                        const isItemSelected = isSelected(inst.id);
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <StyledTableRow
                                                hover
                                                onClick={(event) => handleClick(event, inst.id)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={`intance-of-${inst.id}-no-${index}`}
                                            // selected={isItemSelected}
                                            >
                                                <StyledTableCell padding="checkbox">
                                                    {inst.flag == 0 ? <Checkbox
                                                        checked={isItemSelected}
                                                        value={inst.id}
                                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                                    /> : <Checkbox
                                                        checked={isItemSelected}
                                                        value={inst.id}
                                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                                    />}
                                                </StyledTableCell>
                                                <StyledTableCell id={labelId} scope="row">
                                                    {inst.customers_name}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </DialogContent>
                    <DialogActions>
                        <div className={classes.submitButton}>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                onClick={submitCustomersHandler}
                                endIcon={<DesktopWindowsIcon />}>
                                Map Customers
                    </Button>
                        </div>
                    </DialogActions>
                </div>}
        </Dialog >
    )
}

export default VendorsCustomers;
