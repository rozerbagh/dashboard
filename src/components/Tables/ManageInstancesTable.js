import React from 'react'
import { Link } from 'react-router-dom';
import { withStyles, makeStyles, fade } from '@material-ui/core/styles';
import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import Icon from "@material-ui/core/Icon"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import * as formatter from '../Functions/Formatter';
// Icons
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { FaUbuntu, FaWindows, FaCentos } from "react-icons/fa";
import { DiRedhat } from "react-icons/di";
import { warningColor, successColor, dangerColor } from '../../assets/jss/variables';
import CentOS from '../../assets/img/centos.png';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
    },
    heading: {
        padding: "5px 10px",
        color: " #132739"
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function ManageInstancesTable(props) {
    const {
        staticContext,
        row,
        index,
        vendor,
        scheduleReboot,
        reboot,
        currTooltipIndex,
        handleServiceClickOpen,
        fetchNotify,
        handleActionClick,
        handleCloseTooltipAction,
        handleScheduledTask,
        handleReboot,
        ...rest
    } = props;
    const storeTheIPS = (private_ip, public_ip, tab) => {
        localStorage.setItem('from_dashboardtograph_lip', formatter.convertIPStr(private_ip));
        localStorage.setItem('from_dashboardtograph_wip', formatter.convertIPStr(public_ip));
        localStorage.setItem('from_dashboardtograph_tab', tab);
    }
    const classes = useStyles();
    return (<>
        <div className="coc-instance-row" {...rest}>
            <div className="center-text">
                <Icon>
                    {
                        row.power_status == "POWERED_ON" ?
                            <FiberManualRecordIcon color="secondary" style={{ fontSize: 15 }} /> :
                            <FiberManualRecordIcon color="error" style={{ fontSize: 15 }} />
                    }
                </Icon>
            </div>
            <div className="center-text 500">
                {
                    row.vm_os.toLowerCase().includes(('WINDOWS').toLowerCase()) ?
                        <Icon color="primary" style={{ fontSize: 20 }}>
                            <FaWindows />
                        </Icon> : row.vm_os.toLowerCase().includes(('CENTOS').toLowerCase()) ?
                            <Icon >
                                <img src={CentOS} alt="cent_os" style={{ width: "0.9em" }} />
                            </Icon> : row.vm_os.toLowerCase().includes(('RHEL').toLowerCase()) ?
                                <Icon color="error">
                                    <DiRedhat style={{ fontSize: 20 }} />
                                </Icon> :
                                <Icon color="error" style={{ fontSize: 20 }}><FaUbuntu /></Icon>
                }
            </div>
            <div onClick={(event) =>
                handleServiceClickOpen(event, index, row.serviceArr, row.publicIP, row.hostname)}
                className="left-text font400 pointer">
                {row.hostname}
            </div>
            <div className="left-text font400">{row.private_ip}</div>
            <div className="left-text font400">{row.public_ip}</div>
            <div className="center-text font500 ok_text">{row.ok}</div>
            <div className="center-text font500 warning_text">{row.warn}</div>
            <div className="center-text font500 danger_text">{row.crit}</div>
            <div className="center-text" onClick={(event) => fetchNotify(event, row.private_ip)}>
                <NotificationImportantIcon color="primary" className="pointer" />
            </div>
            <div style={{ position: "relative" }} className="center-text">
                {row.private_ip !== '' && row.private_ip !== null && row.private_ip !== undefined ?
                    <>
                        <IconButton
                            size="small"
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={(event) => handleActionClick(event, index, row)}
                        // onClick={(e) => handleToolTipAction(e, index)}
                        >
                            <MoreHorizIcon color="primary" fontSize="small"
                                style={{ fontSize: "1.5rem" }}
                                key={`notifyIcon-${index}`} />
                        </IconButton>
                        {currTooltipIndex === index ?
                            <ClickAwayListener onClickAway={handleCloseTooltipAction}>
                                <div className="ToolTip cc-action-box">
                                    <ul>
                                        <li onClick={() => storeTheIPS(row.private_ip, row.public_ip, 'graph')}>
                                            <Link
                                                to={{
                                                    pathname: vendor === true ? "/vendor/manage/zoom_view" : "/coc/manage/zoom_view",
                                                    search: `?ip=${row.private_ip}&tab=graph`,
                                                    hash: null,
                                                    state: {
                                                        lip: '',
                                                        wip: '',
                                                        tab: "graph",
                                                    }
                                                }}
                                            >
                                                Performance
                                            </Link>
                                        </li>
                                        <li onClick={() => storeTheIPS(row.private_ip, row.public_ip, 'backup')}>
                                            <Link
                                                to={{
                                                    pathname: vendor === true ? "/vendor/manage/zoom_view" : "/coc/manage/zoom_view",
                                                    search: `?ip=${row.private_ip}&tab=graph`,
                                                    hash: null,
                                                    state: {
                                                        lip: '',
                                                        wip: '',
                                                        tab: "backup",
                                                    }
                                                }}
                                            >
                                                View backups
                                            </Link>
                                        </li>

                                        {vendor === false ? scheduleReboot === 1 ?
                                            <li onClick={handleScheduledTask} style={{ color: "red" }}>
                                                Sheduled Task
                                            </li> :
                                            null : <li onClick={handleScheduledTask} style={{ color: "red" }}>
                                            Sheduled Task
                                        </li>}

                                        {vendor === false ? reboot === 1 ?
                                            <li onClick={handleReboot} style={{ color: "red" }}>
                                                Restart
                                            </li> : null :
                                            <li onClick={handleReboot} style={{ color: "red" }}>
                                                Restart
                                            </li>}
                                    </ul>
                                </div>
                            </ClickAwayListener> :
                            null
                        }
                    </> :
                    <MoreHorizIcon color="error" fontSize="small"
                        style={{ fontSize: "1.5rem" }}
                        key={`notifyIcon-${index}`} />
                }
                <div id={`dashbaord-action-box-${index}`} style={{ top: "10px", position: "absolute" }}></div>
            </div>
        </div>
    </>)
}
