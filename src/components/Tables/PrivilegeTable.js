import React from 'react';

// @material-ui/core
import { makeStyles, fade, withStyles, lighten } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AddIcon from '@material-ui/icons/Add';
import * as CustomButton from '../CustomButtons/CustomButtons'
import {
    FiEdit,
    FiMonitor,
    FiLock,
    FiDelete,
    FiClipboard,
    FiUsers,
    FiSend,
    FiUserCheck,
    FiUser,
    FiUserMinus,
} from "react-icons/fi";

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));


const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();

    return (
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                User List
            </Typography>

            <div>
                <CustomButton.MainPrimaryButton
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    style={{
                        height: "40px",
                        width: "120px",
                        padding: "5px 10px",
                        fontSize: "14px",
                        marginBottom: "5px",
                        textTransform: "initial"
                    }}
                    startIcon={<AddIcon />}
                    sm={6} onClick={props.handleAddUserButton}
                >
                    Add User
                </CustomButton.MainPrimaryButton>
            </div>
        </Toolbar>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        margin: theme.spacing(1),
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
    menuRow: {
        display: "grid",
        gridTemplateColumns: "1fr auto"
    }
}));

function PrivilegeTable(props) {

    return (
        <div className="flex-width">
            <EnhancedTableToolbar handleAddUserButton={props.handleAddUserButton} />
            <div className="coc-user-row">
                <div className="blue_text font500">Name</div>
                <div className="blue_text font500">Email</div>
                <div className="blue_text font500">Phone</div>
                <div className="blue_text center-text font500">Status</div>
                <div className="blue_text center-text font500">Action</div>
            </div>
            {props.rows.map((row, index) => {
                return (
                    <div className="coc-user-row" key={row.name}>
                        <div>
                            {row.name}
                        </div>
                        <div>{row.email}</div>
                        <div>{row.phone}</div>
                        <div className="center-text">
                            {row.status == 0 || row.status == (-2) || row.status == (-1) ?
                                <FiUserMinus style={{ color: "#FFBA3F", fontSize: "1.5rem" }} /> :
                                <FiUserCheck style={{ color: "#13D391", fontSize: "1.5rem" }} />}
                        </div >
                        <div
                            id={`user-action-box-${index}`}
                            key={`ction-box-${index}`}
                            className="center-text"
                            onClick={(e) => props.handlMenuClick(e, index)}
                        // onMouseLeave={props.handleCloseTooltipAction}
                        >
                            <div style={{
                                position: 'relative',
                            }}>
                                <IconButton
                                    size="small"
                                    aria-controls="simple-menu"
                                    aria-haspopup="true"
                                >
                                    <MoreHorizIcon color="primary" fontSize="small"
                                        style={{ fontSize: "1.5rem" }} key={`notifyIcon-${index}`} />
                                </IconButton>
                                {props.currTooltipIndex === index ?
                                    <ClickAwayListener onClickAway={props.handleCloseTooltipAction}>
                                        <div className="ToolTip cc-action-box" style={{ zIndex: 999 }}>
                                            {props.vendor === true ? <ul>
                                                <li
                                                    onClick={(e) => props.handleMapCustomerOpen(e, row.id)}
                                                > <FiMonitor style={{ marginRight: "5px", color: "#444444" }} />
                                                    <span>Map Customer</span>
                                                </li>
                                                <li onClick={
                                                    (e) => props.handleEditOpen(e, row.id, row.name, row.email, row.phone)}
                                                >
                                                    <FiEdit style={{ marginRight: "5px", color: "gray", fontSize: "1rem" }} />
                                                    <span>Edit</span>
                                                </li>
                                                <li onClick={(e) => props.handlePasswordOpen(e, row.id)}>
                                                    <FiLock style={{ marginRight: "5px", color: "#007bff", fontSize: "1rem" }} />
                                                    <span>Password</span>
                                                </li>

                                                <li onClick={(e) => props.handleDeleteUsers(e, row.id)} style={{ color: "red" }}>
                                                    <FiDelete style={{ marginRight: "5px", color: "crimson", fontSize: "1rem" }} />
                                                    <span>Delete</span>
                                                </li>
                                            </ul> : <ul>
                                                {row.status == 0 || row.status == (-2) || row.status == (-1) ?
                                                    null
                                                    : <li
                                                        onClick={(e) => props.handleInstancesOpen(e, row.id)}
                                                    > <FiMonitor style={{ marginRight: "5px", color: "#444444" }} />
                                                        <span>Instnace</span>
                                                    </li>
                                                }
                                                {row.status == 0 || row.status == (-2) || row.status == (-1) ?
                                                    null
                                                    : <li onClick={(e) => props.handleRolesOpen(e, row.id)}>
                                                        <FiUsers style={{ marginRight: "5px", color: "green" }} />
                                                        <span>Role</span>
                                                    </li>}
                                                <li onClick={(e) => props.handleEditOpen(e, row.id)}>
                                                    <FiEdit style={{ marginRight: "5px", color: "gray", fontSize: "1rem" }} />
                                                    <span>Edit</span>
                                                </li>
                                                <li onClick={(e) => props.handlePasswordOpen(e, row.id)}>
                                                    <FiLock style={{ marginRight: "5px", color: "#007bff", fontSize: "1rem" }} />
                                                    <span>Password</span>
                                                </li>

                                                <li onClick={(e) => props.handleLogsOpen(e, row.id)}>
                                                    <FiClipboard style={{ marginRight: "5px", color: "yellow", fontSize: "1rem" }} />
                                                    <span>Logs</span>
                                                </li>
                                                <li onClick={(e) => props.handleDeleteUsers(e, row.id)} style={{ color: "red" }}>
                                                    <FiDelete style={{ marginRight: "5px", color: "crimson", fontSize: "1rem" }} />
                                                    <span>Delete</span>
                                                </li>
                                            </ul>}
                                        </div>
                                    </ClickAwayListener>
                                    : null}
                            </div>


                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default PrivilegeTable;
