import React, { useState, useEffect } from 'react';

// @material-ui/core
import { makeStyles, useTheme, fade, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import Checkbox from "@material-ui/core/Checkbox"
import CloseIcon from '@material-ui/icons/Close';

import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Input from '../../../../components/UI/Input/Input';

import Loader from "../../../../components/UI/Loader/Loader";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

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
    rolesRow: {
        display: "grid",
        gridTemplateColumns: "0.5fr 1fr"
    }
}));

function UserRoles(props) {

    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [checked, setChecked] = React.useState(true);
    const [unchecked, setUnChecked] = React.useState(false);
    const [selected, setSelected] = React.useState([]);

    const handleCheckedChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
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
    const isSelected = (id) => {
        return selected.indexOf(id) !== -1
    }

    useEffect(() => {
        let newSelected = [];
        props.roles.map((role, index) => {
            if (role.flag != 0) {
                newSelected.push(role.reportId);
            }
        });
        setSelected(newSelected);
    }, [props.roles])

    useEffect(() => {
        sessionStorage.setItem('current_users_role_id', selected)
    }, [selected])

    return (
        <Dialog
            open={props.open}
            fullScreen={fullScreen}
            onClose={props.handleRolesClose}
            aria-labelledby="form-dialog-title">

            {props.loader ?
                <Loader bigLoader style={{ margin: "0 auto" }} /> :
                <div className={classes.pageContent}>
                    <div className={classes.closeIcon}>
                        <IconButton onClick={props.handleRolesClose} color="inherit" size="small">
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <DialogTitle id="form-dialog-title">Assign Roles</DialogTitle>
                    <DialogContent>
                        <Table>
                            <TableBody>
                                {props.roles.map((role, index) => {
                                    const isItemSelected = isSelected(role.reportId);
                                    const labelId = `role-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, role.reportId)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={role.reportId}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                {role.flag == 0 ? <Checkbox
                                                    checked={isItemSelected}
                                                    value={role.reportId}
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                /> : <Checkbox
                                                    checked={isItemSelected}
                                                    value={role.reportId}
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />}
                                            </TableCell>
                                            <TableCell id={labelId} scope="row" padding="none">
                                                <Typography variant="subtitle2">{role.report_name}</Typography>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </DialogContent>
                    <div className={classes.submitButton}>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            onClick={props.submitRolesHandler}
                            endIcon={<PermIdentityIcon />}>
                            Assign Roles
                        </Button>
                    </div>
                </div>}
        </Dialog >
    )
}

export default UserRoles;
