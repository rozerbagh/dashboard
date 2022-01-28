import React, { Fragment, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { CSVLink } from "react-csv";
// @material core components
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { confirmAlert } from 'react-confirm-alert'; // Import
import * as formatter from '../../../../components/Functions/Formatter'

import SuccessAlert from '../../../../components/Alerts/Success/success';
import ErrorAlert from '../../../../components/Alerts/Error/Error'
import WarningAlert from '../../../../components/Alerts/Warning/Warn';
import EachInstance from '../../../../components/Tables/ManageInstancesTable';
import ServicesModal from '../../../../components/Modals/ServicesModal';
import NotificationsModal from '../../../../components/Modals/NotificationasModal';
import ScheduledTask from '../../../../components/Modals/ScheduledTask';
import InstantReboot from '../../../../components/Modals/instantReboot';
import { FaFileCsv } from "react-icons/fa";
import * as action from '../../../../store/actions/vendor/index';
const SuccessBtn = styled.button`
    outline: none;
    border: none;
    background-color: #31E8A9;
    padding: 0.3rem 0.9rem;;
    font-size: 1rem;
    color:#ffffff;
    margin: 0.1rem 0.5rem;
    border-radius: 5px;
    cursor: pointer;
`;
const ConfirmButtons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
`;

const CancelBtn = styled.button`
    outline: none;
    border: none;
    background-color: #EF5350;
    padding: 0.3rem 0.9rem;;
    font-size: 1rem;
    color:#ffffff;
    margin: 0.1rem 0.5rem;
    border-radius: 5px;
    cursor: pointer;
`;

const ConfirmAlertText = styled.p`
    font-size: 1rem;
    text-align: center;
`


const InstanceTable = React.memo((props) => {

    const [dialogBoxInfo, setDialogBoxInfo] = useState([]);
    const [publicIP, setPublicIP] = useState('');
    const [privateIP, setPrivateIP] = useState('');
    const [serviceIndex, setServiceIndex] = useState(0);
    const [hostname, setHostname] = useState('');
    const [instanceName, setInstanceName] = useState('');
    const [open, setOpen] = useState(false);
    const [vmid, setVmid] = useState('');

    const [demoAlert, setDemoAlert] = useState(null);

    const [openNotifications, setOpenNotifications] = React.useState(false);

    // Scheduled All Functionality
    const [openScheduledTask, setOpenScheduledTask] = useState(false);
    const [openRebootModal, setOpenRebootModal] = useState(false);

    const [scheduledTaskIndex, setScheduledTaskIndex] = useState(0);
    const [modalIndex, setmodalIndex] = useState(0);

    const [sheduledTaskData, setSheduledTaskData] = useState({});
    const [rebootModalData, setRebootModalData] = useState({});

    const [flagForShedule, setFlagForSheduled] = useState(0);

    const openSheduledTask = (event) => {
        setOpenScheduledTask(true);
        handleClose();
        setFlagForSheduled(1);
    };

    const handleScheduledTaskClose = () => {
        setOpenScheduledTask(false);
    };

    let date = new Date();

    let dateTime = Math.floor(date.getTime() / 1000);

    const [sheduledDates, setSheduledDates] = useState(new Date(dateTime * 1000));

    const [sheduledTime, setSheduledTime] = useState(new Date(dateTime * 1000).getTime());

    const handleSheduledTaskDateChange = (date) => {
        setSheduledDates(date);
        setSheduledTime(new Date(sheduledDates).getTime())
    };

    const sheduledTaskSubmitHandler = () => {
        const id = JSON.parse(localStorage.getItem('vuid'));
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='react-confirm-alert-body' style={{ zIndex: "9999" }}>
                        <ConfirmAlertText>{instanceName} is going to reboot.</ConfirmAlertText>
                        <ConfirmAlertText>Are you sure want to continue ?</ConfirmAlertText>
                        <ConfirmButtons>
                            <CancelBtn
                                onClick={() => {
                                    onClose();
                                    return <ErrorAlert message="operation has been canceled" />
                                }}>
                                Cancel
                            </CancelBtn>
                            <SuccessBtn
                                onClick={() => {
                                    onClose();
                                    setDemoAlert(<WarningAlert message="Demo Account" />)
                                    setTimeout(() => setDemoAlert(null), 5000)
                                    handleScheduledTaskClose();
                                    // props.onFetchingUnseenNotifications(props.token, props.vid);
                                }}
                            >
                                Submit
                            </SuccessBtn>
                        </ConfirmButtons>
                    </div>
                );
            }
        });

    }

    // Reboot functionality

    const handleRebootOpen = (event) => {
        setOpenRebootModal(true);
        handleClose();
        setFlagForSheduled(0);
    }

    const handleRebootClose = () => {
        setOpenRebootModal(false);
    }

    const rebootSubmitHandler = () => {
        const id = JSON.parse(localStorage.getItem('vuid'));
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='react-confirm-alert-body' style={{ zIndex: "9999" }}>
                        <ConfirmAlertText>{instanceName} is going to reboot.</ConfirmAlertText>
                        <ConfirmAlertText>Are you sure want to continue ?</ConfirmAlertText>
                        <ConfirmButtons>
                            <SuccessBtn
                                onClick={() => {
                                    onClose();
                                    setOpenRebootModal(false);
                                    setDemoAlert(<WarningAlert message="Demo Account" />)
                                    setTimeout(() => setDemoAlert(null), 5000)
                                    // props.onFetchingUnseenNotifications(props.token, props.vid);
                                }}
                            >
                                Submit
                            </SuccessBtn>
                            <CancelBtn
                                onClick={() => {
                                    onClose();
                                    return <ErrorAlert message="operation has been canceled" />
                                }}>
                                Cancel
                            </CancelBtn>
                        </ConfirmButtons>

                    </div>
                );
            }
        });
    }

    // Opening and closing of the dropdown menu //
    const [anchorEl, setAnchorEl] = useState(null);
    const [currTooltipIndex, setCurrTooltipIndex] = useState(-1);
    const [tooltipTarget, setTooltipTarget] = useState(null);

    const handleActionClick = (event, i, rowData) => {
        i === currTooltipIndex ? setCurrTooltipIndex(-1) : setCurrTooltipIndex(i);
        setAnchorEl(event.currentTarget);
        setVmid(rowData.vmid);
        setInstanceName(rowData.hostname);
        setScheduledTaskIndex(i);
        setSheduledTaskData(rowData);
        setmodalIndex(i);
        setRebootModalData(rowData);
        setPrivateIP(rowData.private_ip)
    };

    const handleCloseTooltipAction = () => {
        setCurrTooltipIndex(-1)
    }

    const handleClose = () => {
        setAnchorEl(null);
    };
    // Opening and closing of the dropdown menu //
    const handleClickOpenNotifications = () => {
        setOpenNotifications(true);
    };

    const handleCloseNotifications = () => {
        setOpenNotifications(false);
    };

    const handleServiceClickOpen = (event, i, serArr, public_ip, host_name) => {
        setDialogBoxInfo(serArr);
        setServiceIndex(i);
        setPublicIP(public_ip);
        setHostname(host_name);
        setOpen(true);
    };

    const handleServiceClose = () => {
        setOpen(false);
    };

    const fetchNotify = (event, ip) => {
        setOpenNotifications(true)
        const skip = 0;
        const limit = 10;
        const id = JSON.parse(localStorage.getItem('vuid'))
        props.onFetchingNotifications(props.token, id.vid, skip, limit, formatter.convertIPStr(ip))
    }

    const loadTheZoomViewData = (lip, wip, tab) => {
        sessionStorage.setItem('curr_selected_lip', formatter.convertStrToIP(lip))
        sessionStorage.setItem('curr_selected_wip', formatter.convertStrToIP(wip))
        window.location.href = `/vendor/manage/zoom_view?ip=${lip}&tab=${tab}`
    }

    return (
        <Fragment>
            <div className="flex-width">
                <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                    <Typography variant="caption">Instances</Typography>
                    <div>
                        <CSVLink data={props.rows}
                            filename={`Dashboard-Intances.csv`}>
                            <IconButton color="primary" size="small">
                                <FaFileCsv style={{ color: "#007bff", fontSize: "1.5em", }} />
                            </IconButton>
                        </CSVLink>
                    </div>
                </div>
                <div className="coc-instance-row">
                    <div className="center-text font500">State</div>
                    <div className="center-text font500">OS</div>
                    <div className="left-text font500">Instance</div>
                    <div className="left-text font500">Private IP</div>
                    <div className="left-text font500">Public IP</div>
                    <div className="center-text font500 ok_text">OK</div>
                    <div className="center-text font500 warning_text">Warn</div>
                    <div className="center-text font500 danger_text">Crit</div>
                    <div className="center-text font500">Notification</div>
                    <div className="center-text font500">Action</div>
                </div>
                {props.rows.map((row, index) => (
                    <EachInstance
                        key={`instance-row-${index}`}
                        row={row}
                        index={index}
                        currTooltipIndex={currTooltipIndex}
                        handleServiceClickOpen={handleServiceClickOpen}
                        fetchNotify={fetchNotify}
                        handleActionClick={handleActionClick}
                        handleCloseTooltipAction={handleCloseTooltipAction}
                        handleScheduledTask={openSheduledTask}
                        handleReboot={handleRebootOpen}
                        vendor={true}
                    />
                ))}
            </div>

            {demoAlert}

            {open ? <ServicesModal key={`service-modal-no-${serviceIndex}`}
                serviceRows={dialogBoxInfo}
                open={open}
                handleClose={handleServiceClose}
                hostName={hostname}
                mainIndex={serviceIndex}
                wan_ip={publicIP} /> : null}

            {openNotifications ? <NotificationsModal
                open={openNotifications}
                handleClose={handleCloseNotifications}
                isNotifications={props.instanceNotifications}
                loader={false}
            />
                : null}

            {openScheduledTask ? <ScheduledTask
                key={`scheduledTask-modal-no-${scheduledTaskIndex}`}
                open={openScheduledTask}
                submitHandler={sheduledTaskSubmitHandler}
                handleClose={handleScheduledTaskClose}
                details={sheduledTaskData}
                sheduledDates={sheduledDates}
                handleSheduledDateChange={handleSheduledTaskDateChange} /> : null}

            {openRebootModal ? <InstantReboot key={`reboot-modal-no-${modalIndex}`}
                open={openRebootModal}
                handleClose={handleRebootClose}
                details={rebootModalData}
                submitHandler={rebootSubmitHandler} /> : null}


            {props.sheduledMsg !== null && props.sheduledMsg !== undefined ?
                <SuccessAlert message={props.sheduledMsg} /> : null}

            {props.errorSheduledMsg !== null && props.errorSheduledMsg !== undefined ?
                <ErrorAlert message={props.errorSheduledMsg} /> : null}

            {props.rebootMsg !== null && props.rebootMsg !== undefined ?
                <SuccessAlert message={props.rebootMsg} /> : null}

            {props.errorRebootMsg !== null && props.errorRebootMsg !== undefined ?
                <ErrorAlert message={props.errorRebootMsg} /> : null}
        </Fragment>
    );
})
const mapStateToProps = state => {
    return {
        token: state.auth_reducer.token,
        instanceNotifications: state.vendorInstances.instance_notifications,
        notifyLoader: state.vendorInstances.notifyLoading,
        error: state.vendorInstances.error,

        sheduledMsg: state.vrebootTheMachineTask.sheduledtaskMsg,
        rebootMsg: state.vrebootTheMachineTask.rebootSuccessMsg,

        errorSheduledMsg: state.vrebootTheMachineTask.error_sheduledtaskMsg,
        errorRebootMsg: state.vrebootTheMachineTask.error_rebootSuccessMsg,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchingNotifications: (token, id, skip, limit, ip) => dispatch(action.fetchInstanceNotifications(token, id, skip, limit, ip)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstanceTable);
