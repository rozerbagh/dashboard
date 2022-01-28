import React from 'react'
import { Link, Redirect } from 'react-router-dom';

import Popup from "reactjs-popup";
import { makeStyles, fade, withStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse"
import Icon from "@material-ui/core/Icon"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Controller from '../TooltipBoxes/Controller';
import Select from '../TooltipBoxes/Select'
import { FaUbuntu, FaWindows } from "react-icons/fa";
import { DiRedhat } from "react-icons/di";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';
import ProgressBar from "../UI/Loader/ProgressBar";
import SuccessAlert from '../Alerts/Success/success';
import ErrorAlert from '../Alerts/Error/Error';
import CentOS from '../../assets/img/centos.png';
import { FaFileCsv } from "react-icons/fa";
import * as formatter from '../Functions/Formatter';

import styles from "../../assets/jss/jsStyles/views/dashboardStyle.js";
const useStyles = makeStyles(styles);
function DashboardTables(props) {
    const storeTheIPS = (private_ip, public_ip, tab) => {
        localStorage.setItem('from_dashboardtograph_lip', formatter.convertIPStr(private_ip));
        localStorage.setItem('from_dashboardtograph_wip', formatter.convertIPStr(public_ip));
        localStorage.setItem('from_dashboardtograph_tab', tab);
    }
    const {
        staticContext,
        anchorEl,
        row,
        index,
        currTooltipIndex,
        handleActionClick,
        handleOpenTags,
        openListTag,
        handleCloseListTags,
        scheduleReboot,
        reboot,
        currIndex,
        vendorAssign,
        handleClose,
        handleCurrentIndex,
        handleToolTipAction,
        handleCloseTooltipAction,
        handleTags,
        handleEditInstances,
        handleScheduledTask,
        handleReboot,
        handleRemoveVendor,
        ...rest
    } = props;
    const classes = useStyles();
    return (
        <>
            <div className="coc-dashboard-row" {...rest}>
                <div className="center-text">
                    <Icon>
                        {
                            row.power_status == "POWERED_ON" ?
                                <FiberManualRecordIcon color="secondary" style={{ fontSize: "0.8rem" }} /> :
                                <FiberManualRecordIcon color="error" style={{ fontSize: "0.8rem" }} />
                        }
                    </Icon>
                </div>
                <div className="center-text">
                    {
                        row.vm_os.toLowerCase().includes(('WINDOWS').toLowerCase()) ?
                            <Icon color="primary" style={{ fontSize: "1.5rem" }}>
                                <FaWindows />
                            </Icon> : row.vm_os.toLowerCase().includes(('CENTOS').toLowerCase()) ?
                                <Icon >
                                    <img src={CentOS} alt="cent_os" style={{ width: "1.5rem" }} />
                                </Icon> : row.vm_os.toLowerCase().includes(('RHEL').toLowerCase()) ?
                                    <Icon color="error">
                                        <DiRedhat style={{ fontSize: "1.5rem" }} />
                                    </Icon> :
                                    <Icon color="error" style={{ fontSize: "1.5rem" }}><FaUbuntu /></Icon>
                    }
                </div>
                <div onClick={() => handleCurrentIndex(index)} className="pointer">
                    <Typography variant="body2">
                        {row.hostname}
                    </Typography>
                </div>
                <div><Typography variant="body2">{row.private_ip}</Typography></div>
                <div><Typography variant="body2">{row.public_ip}</Typography></div>
                <div><Typography variant="body2">{row.vendor_name.split(" ")[0]}</Typography></div>
                <div>
                    {row.tagsArr.length === 0 ?
                        <span className={classes.tags_btn_word}
                            onClick={props.handleTags}>
                            Add Tags
                        </span> : <div>
                            {row.tagsArr[0] == 'Add Tags' ? <span className={classes.tags_btn_word}
                                onClick={props.handleTags}>
                                Add Tags</span> :
                                <Link to={vendorAssign === true ?
                                    `/vendor/dashboard/tag/${row.tagsArr[0]}` :
                                    `/coc/dashboard/tag/${row.tagsArr[0]}`}
                                    key={`link_${row.tagsArr[0]}_no-${0}`}>
                                    <span className={classes.tags_btn_word}
                                        key={`tags-no-${0}`}>
                                        {row.tagsArr[0]}
                                    </span>
                                </Link>}
                            {row.tagsArr.length === 1 ? null :
                                <Popup
                                    trigger={
                                        <span style={{ cursor: "pointer" }} onClick={handleOpenTags} key={`tags-no-btn-${index}`}>
                                            +{row.tagsArr.length - 1}
                                        </span>
                                    }
                                    position="top center"
                                    on="hover"
                                >
                                    <div className="Tag_ToolTip">
                                        {row.tagsArr.map((tag, i) => {
                                            if (i !== 0) {
                                                return <Link to={vendorAssign === true ? `/vendor/dashboard/tag/${tag}` :
                                                    `/coc/dashboard/tag/${tag}`}
                                                    key={`tagslist_link_${i}`}>
                                                    <span style={{
                                                        margin: "0 2px",
                                                        color: "white"
                                                    }}
                                                        key={`tagslist-no-${i}`}>
                                                        {tag}
                                                    </span>
                                                </Link>
                                            }
                                        })}
                                    </div>
                                </Popup>}
                        </div>
                    }
                </div>
                <div><ProgressBar bandwidth={true} barWidth={row.bandwidth} /></div>
                <div className="center-text">
                    {row.backup == 0 ?
                        <BackupOutlinedIcon color="inherit" style={{ opacity: "0.1" }} />
                        : <BackupOutlinedIcon color="primary" />
                    }
                </div>
                <div style={{ position: "relative" }} className="center-text">
                    {row.private_ip !== '' && row.private_ip !== null && row.private_ip !== undefined ?
                        <>
                            <IconButton
                                size="small"
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={handleActionClick}
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
                                            <li onClick={handleTags}>Edit Tags</li>
                                            <li onClick={handleEditInstances}>Edit Instance</li>
                                            <li onClick={handleScheduledTask} style={{ color: "red" }}>
                                                Sheduled Task
                                            </li>
                                            <li onClick={handleReboot} style={{ color: "red" }}>
                                                Restart
                                            </li>
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
            <Collapse in={currIndex === index} timeout="auto" unmountOnExit key={`key-for-instance-network-${index}`}>
                <div className={classes.root}>
                    <Typography variant="body2"
                        className={classes.hostname} key={`key-for-instance-hostname-network-${index}`}>
                        <strong>Hostname:</strong> {row.hostname}
                    </Typography>

                    <Typography variant="body2"
                        className={classes.os} key={`key-for-instance-os-network-${index}`}>
                        <strong>OS:</strong> {row.vm_os}
                    </Typography>
                    <Typography variant="body2" key={`key-for-instance-capacity-network-${index}`}
                        className={classes.capacity}>
                        <strong>Capacity:</strong> {row.cpu} | {row.ram} | {row.disk}
                    </Typography>

                    <Typography variant="body2" key={`key-for-instance-publicIP-network-${index}`}
                        className={classes.publicIp}>
                        <strong>Public IP:</strong> {row.public_ip}
                    </Typography>
                    <Typography variant="body2" key={`key-for-instance-privateIP-network-${index}`}
                        className={classes.privateIP}>
                        <strong>Private IP:</strong> {row.private_ip}
                    </Typography>
                    <div className={classes.Ips}>
                        {row.inst_details.map((inst, i) => (
                            <Typography variant="body2" key={`key-for-instance-ips-network-${i + index}`}>
                                <strong>Private IP</strong> : {inst.ip} {inst.name}
                            </Typography>
                        ))}
                    </div>

                </div>
            </Collapse>

        </>)
}

export default DashboardTables
