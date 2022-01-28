import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'
import { CSVLink } from "react-csv";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { confirmAlert } from '../../../../components/Alerts/Alert/Confirm';

import EachInstance from '../../../../components/Tables/ManageInstancesTable';
import ErrorAlert from '../../../../components/Alerts/Error/Error';
import WarningAlert from '../../../../components/Alerts/Warning/Warn';
import * as formatter from '../../../../components/Functions/Formatter'
import ServicesModal from '../../../../components/Modals/ServicesModal';
import NotificationsModal from '../../../../components/Modals/NotificationasModal';
import ScheduledTask from '../../../../components/Modals/ScheduledTask';
import InstantReboot from '../../../../components/Modals/instantReboot';

import * as action from '../../../../store/actions/customer/index';
import { FaFileCsv } from "react-icons/fa";
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

    let dateTime = date.getTime() / 1000;

    const [sheduledDates, setSheduledDates] = useState(new Date(dateTime * 1000));

    const [sheduledTime, setSheduledTime] = useState(new Date(dateTime * 1000).getTime());

    const handleSheduledTaskDateChange = (date) => {
        setSheduledDates(date);
        setSheduledTime(new Date(sheduledDates).getTime())
    };

    const sheduledTaskSubmitHandler = () => {
        const task = sessionStorage.getItem('current_instance_task_value')
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='react-confirm-alert-body' style={{ zIndex: "9999" }}>
                        <ConfirmAlertText>{hostname} is going to reboot.</ConfirmAlertText>
                        <ConfirmAlertText>Are you sure want to continue ?</ConfirmAlertText>
                        <ConfirmButtons>
                            <CancelBtn
                                onClick={() => {
                                    onClose();
                                    return <ErrorAlert message="operation has been cancled" />
                                }}>
                                Cancel
                            </CancelBtn>
                            <SuccessBtn
                                onClick={() => {

                                    onClose();
                                    setDemoAlert(<WarningAlert message="Demo Account" />)
                                    setTimeout(() => setDemoAlert(null), 5000)
                                    handleScheduledTaskClose()
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
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='react-confirm-alert-body' style={{ zIndex: "9999" }}>
                        <ConfirmAlertText>{hostname} is going to reboot.</ConfirmAlertText>
                        <ConfirmAlertText>Are you sure want to continue ?</ConfirmAlertText>
                        <ConfirmButtons>
                            <CancelBtn
                                onClick={() => {
                                    onClose();
                                    return <ErrorAlert message="operation has been cancled" />
                                }}>
                                Cancel
                            </CancelBtn>
                            <SuccessBtn
                                onClick={() => {
                                    onClose();
                                    setDemoAlert(<WarningAlert message="Demo Account" />)
                                    setTimeout(() => setDemoAlert(null), 5000)
                                    handleRebootClose()
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

    // Opening and closing of the dropdown menu //
    const [anchorEl, setAnchorEl] = useState(null);
    const [currTooltipIndex, setCurrTooltipIndex] = useState(-1);
    const [tooltipTarget, setTooltipTarget] = useState(null);

    const handleActionClick = (event, i, rowData) => {
        i === currTooltipIndex ? setCurrTooltipIndex(-1) : setCurrTooltipIndex(i);
        setAnchorEl(event.currentTarget);
        setVmid(rowData.vmid)
        setScheduledTaskIndex(i);
        setSheduledTaskData(rowData);
        setmodalIndex(i);
        setRebootModalData(rowData);
        setHostname(rowData.hostname);
        setPrivateIP(rowData.private_ip);
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
        setServiceIndex(i)
        setPublicIP(public_ip);
        setHostname(host_name);
        setOpen(true);
    };

    const handleServiceClose = () => {
        setOpen(false);
    };

    const fetchNotify = (event, ip) => {
        setOpenNotifications(true);
        const skip = 0;
        const limit = 10;
        props.onFetchingNotifications(props.token, skip, limit, formatter.convertIPStr(ip));
    }

    return (
        <>
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
                        scheduleReboot={props.roles.schedule_reboot}
                        reboot={props.roles.restart}
                        handleScheduledTask={openSheduledTask}
                        handleReboot={handleRebootOpen}
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
                key={`${Math.random().toString()}`}
                open={openNotifications}
                handleClose={handleCloseNotifications}
                isNotifications={props.instanceNotifications}
                loader={props.notifyLoader}
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
        </>
    );
})
const mapStateToProps = state => {
    return {
        token: state.auth_reducer.token,
        roles: state.auth_reducer.user_roles,
        instanceNotifications: state.customerInstances.instance_notifications,
        notifyLoader: state.customerInstances.notifyLoading,
        error: state.customerInstances.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchingNotifications: (token, skip, limit, ip) => dispatch(action.fetchInstanceNotifications(token, skip, limit, ip)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstanceTable);
