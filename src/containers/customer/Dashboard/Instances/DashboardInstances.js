import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components'
import Popup from "reactjs-popup";
import { CSVLink } from "react-csv";
// @material-ui/core
import { makeStyles, fade, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import { confirmAlert } from '../../../../components/Alerts/Alert/Confirm';
// core components
import EachInstance from '../../../../components/Tables/DashboardTables'
import GridContainer from "../../../../components/Grid/GridContainer";
import ScheduledTask from '../../../../components/Modals/ScheduledTask';
import InstantReboot from '../../../../components/Modals/instantReboot';
import EditInstance from './EditInstance';
import Tags from './Tags';

// Actions dropdown components //
import SuccessAlert from '../../../../components/Alerts/Success/success';
import WarningAlert from '../../../../components/Alerts/Warning/Warn';
import ErrorAlert from '../../../../components/Alerts/Error/Error';
import { FaFileCsv } from "react-icons/fa";
import styles from "../../../../assets/jss/jsStyles/views/dashboardStyle.js";
import * as formatter from '../../../../components/Functions/Formatter'

import * as action from '../../../../store/actions/customer/index'
const useStyles = makeStyles(styles);
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
    margin-top: 10px;
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
    margin-bottom: 15px;
`

const InstancesRow = React.memo((props) => {
    const classes = useStyles();

    const [demoAlert, setDemoAlert] = useState(null);
    const [redirectZoomView, setRedirectZoomView] = useState(null);

    useEffect(() => {
        return () => setRedirectZoomView(null)
    }, [])

    const [anchorEl, setAnchorEl] = useState(null);
    const [vendorId, setVendorId] = useState('');
    const [vmid, setVmid] = useState('');



    const [publicIP, setPublicIP] = useState('');
    const [privateIP, setPrivateIP] = useState('');


    const [openScheduledTask, setOpenScheduledTask] = useState(false);
    const [openRebootModal, setOpenRebootModal] = useState(false);

    const [scheduledTaskIndex, setScheduledTaskIndex] = useState(0);
    const [modalIndex, setmodalIndex] = useState(0);

    const [sheduledTaskData, setSheduledTaskData] = useState({});
    const [rebootModalData, setRebootModalData] = useState({});


    // Edit tags
    const [openTagModal, setOpenTagModal] = useState(false);
    const [tags, setTags] = useState([]);
    const [tagIndex, setTagIndex] = useState(0);

    const handleTagsModalOpen = (event, row, i) => {
        setTagIndex(i)
        setPrivateIP(row.private_ip)
        setTags(row.tagsArr)
        setVmid(row.vmid)
        setOpenTagModal(true);
        setAnchorEl(null);
    }
    const handleTagsModalClose = () => {
        setOpenTagModal(false);
    }


    // Edit Instances 
    const [instanceName, setInstanceName] = useState('')
    const [openInstanceModal, setOpenInstancesModal] = useState(false);

    const handleInstanceModalOpen = (id, row) => {
        setOpenInstancesModal(true);
    }

    const handleInstanceModalClose = () => {
        setOpenInstancesModal(false);
    }

    const [currTooltipIndex, setCurrTooltipIndex] = useState(-1);
    const [tooltipTarget, setTooltipTarget] = useState(null);
    const handleActionClick = (event, i, rowData) => {
        i === currTooltipIndex ? setCurrTooltipIndex(-1) : setCurrTooltipIndex(i);
        // setAnchorEl(event.currentTarget);
        setScheduledTaskIndex(i);
        setSheduledTaskData(rowData);
        setmodalIndex(i);
        setRebootModalData(rowData);
        setTags(rowData.tagsArr);
        setVmid(rowData.vmid);
        setInstanceName(rowData.hostname);
        setVendorId(rowData.vendor_id);
        setPrivateIP(rowData.private_ip);
        setPublicIP(rowData.public_ip);
        setTooltipTarget(event.target)
    };

    const handleCloseTooltipAction = () => {
        setCurrTooltipIndex(-1)
    }

    const [openListTag, setOpenListTag] = useState(false)

    const handleOpenTags = () => {
        setOpenListTag(true)
    }

    const handleCloseListTag = () => {
        setOpenListTag(false)
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    // Remove vendor
    const handleRemoveVendor = (e, rowNo) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='react-confirm-alert-body' style={{ zIndex: "9999" }}>
                        <ConfirmAlertText>Are you sure want to remove vendor ?</ConfirmAlertText>
                        <ConfirmButtons>
                            <SuccessBtn
                                onClick={() => {
                                    onClose();
                                    setDemoAlert(<WarningAlert message="Demo Account" />)
                                    setTimeout(() => setDemoAlert(null), 5000)
                                    props.modifyVendorFlag(rowNo)
                                }}
                            >
                                Yes
                            </SuccessBtn>
                            <CancelBtn
                                onClick={() => {
                                    onClose();
                                    return <ErrorAlert message="operation has been cancled" />
                                }}>
                                No
                            </CancelBtn>
                        </ConfirmButtons>

                    </div>
                );
            }
        });

    }

    // Scheduled All Functionality

    const handleScheduledTaskClickOpen = (event) => {
        setOpenScheduledTask(true);
        handleMenuClose();
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
        const task = sessionStorage.getItem('current_instance_task_value')
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
                                    return <ErrorAlert message="operation has been cancled" />
                                }}>
                                Cancel
                            </CancelBtn>
                            <SuccessBtn
                                onClick={() => {
                                    onClose();
                                    setDemoAlert(<WarningAlert message="Demo Account" />)
                                    setTimeout(() => setDemoAlert(null), 5000)
                                    handleScheduledTaskClose();
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

    const handleRebootOpen = (id, row) => {
        setOpenRebootModal(true);
        handleMenuClose();
    }

    const handleRebootClose = () => {
        setOpenRebootModal(false);
    }

    const rebootSubmitHandler = () => {

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
                                    return <ErrorAlert message="operation has been cancled" />
                                }}>
                                Cancel
                            </CancelBtn>
                            <SuccessBtn
                                onClick={() => {
                                    setOpenRebootModal(false);
                                    setDemoAlert(<WarningAlert message="Demo Account" />)
                                    setTimeout(() => setDemoAlert(null), 5000)
                                    onClose();
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

    // Redirect as per performance and backups
    const linkZoomView = str => {
        setAnchorEl(null);
        setRedirectZoomView(<Redirect to={str} />)
    }

    const [currCollapsibleIndex, setCurrCollapsibleIndex] = useState(-1);
    const handleCurrentCollapsibleIndex = (i) => {
        i === currCollapsibleIndex ? setCurrCollapsibleIndex(-1) : setCurrCollapsibleIndex(i)

    };

    return (
        <GridContainer>
            <div className="flex-width">
                <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                    <Typography variant="caption">Instances</Typography>
                    <div>
                        <CSVLink data={props.vms}
                            filename={`Dashboard-Intances.csv`}>
                            <IconButton color="primary" size="small">
                                <FaFileCsv style={{ color: "#007bff", fontSize: "1.5em", }} />
                            </IconButton>
                        </CSVLink>
                    </div>
                </div>
                <div className="coc-dashboard-row">
                    <div className="center-text font500">State</div>
                    <div className="center-text font500">OS</div>
                    <div className="left-text font500">Instance</div>
                    <div className="left-text font500">Private IP</div>
                    <div className="left-text font500">Public IP</div>
                    <div className="left-text font500">Vendor Name</div>
                    <div className="left-text font500">Tags</div>
                    <div className="left-text font500">Bandwidth</div>
                    <div className="center-text font500">Backup</div>
                    <div className="center-text font500">Action</div>
                </div>

                {props.vms.map((row, index) => (
                    <EachInstance
                        handleTags={(event) => handleTagsModalOpen(event, row, index)}
                        handleOpenTags={handleOpenTags}
                        handleEditInstances={(event) => handleInstanceModalOpen(event)}
                        handleScheduledTask={(event) => handleScheduledTaskClickOpen(event)}
                        handleReboot={() => handleRebootOpen()}
                        key={`instances-details-no-${index}`}
                        id={`instances-details-no-${index}`}
                        row={row}
                        handleClose={handleMenuClose}
                        index={index}
                        anchorEl={anchorEl}
                        handleActionClick={(event) => handleActionClick(event, index, row)}
                        handleRemoveVendor={(event) => handleRemoveVendor(event, index)}
                        handleCloseListTags={handleCloseListTag}
                        openListTag={openListTag}
                        scheduleReboot={props.roles.schedule_reboot}
                        reboot={props.roles.restart}
                        // linkZoomview={linkZoomView}
                        currIndex={currCollapsibleIndex}
                        currTooltipIndex={currTooltipIndex}
                        handleCurrentIndex={handleCurrentCollapsibleIndex}
                        handleCloseTooltipAction={handleCloseTooltipAction}
                        vendorAssign={false}
                    />

                ))}
            </div>

            {demoAlert}
            {openScheduledTask ? <ScheduledTask key={`scheduledTask-modal-no-${scheduledTaskIndex}`}
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

            {openInstanceModal ? <EditInstance key={`instance-modal-no-${modalIndex}`}
                vmId={vmid}
                instance_name={instanceName}
                open={openInstanceModal}
                handleClose={handleInstanceModalClose}
                rowNo={modalIndex}
                modifyInstnaceName={props.modifyInstnaceName}
            /> : null}

            {openTagModal ? <Tags key={`tag-modal-no-${modalIndex}`}
                open={openTagModal}
                handleClose={handleTagsModalClose}
                private_ip={formatter.convertIPStr(privateIP)}
                tagsArray={tags}
                modifyVMs={props.modify_vm_data}
                rowNo={tagIndex}
            // submitHandler={rebootSubmitHandler}
            /> : null}

            {props.successRemoveVendorMsg !== null ? <SuccessAlert message={props.successRemoveVendorMsg} /> : null}
            {props.errorRemoveVendorMsg !== null ? <ErrorAlert message={props.errorRemoveVendorMsg} /> : null}

            {props.tagsSuccessMessage !== null ? <SuccessAlert message={props.tagsSuccessMessage} /> : null}
            {props.tagsErrorMessage !== null ? <ErrorAlert message={props.tagsErrorMessage} /> : null}

            {props.editInstanceMessage !== null ? <SuccessAlert message={props.editInstanceMessage} /> : null}
            {props.errorEditInstanceMessage !== null ? <ErrorAlert message={props.errorEditInstanceMessage} /> : null}

            {props.sheduledMsg !== null ? <SuccessAlert message={props.sheduledMsg} /> : null}
            {props.errorSheduledMsg !== null ? <ErrorAlert message={props.errorSheduledMsg} /> : null}
            {props.rebootMsg !== null ? <SuccessAlert message={props.rebootMsg} /> : null}
            {props.errorRebootMsg !== null ? <ErrorAlert message={props.errorRebootMsg} /> : null}

            {redirectZoomView}
        </GridContainer>
    )
})

const mapStateToProps = (state) => {
    return {
        token: state.auth_reducer.token,
        userFlag: state.auth_reducer.user_flag,
        roles: state.auth_reducer.user_roles,
        loading: state.rebootTheMachineTask.loading,

        editInstanceMessage: state.rebootTheMachineTask.editSuccessMsg,
        errorEditInstanceMessage: state.rebootTheMachineTask.errorEditMessage,

        tagsSuccessMessage: state.customerDashboard.tags_suc_msg,
        tagsErrorMessage: state.customerDashboard.tags_er_msg,

        successRemoveVendorMsg: state.customerDashboard.removeingVendorSuccessMsg,
        errorRemoveVendorMsg: state.customerDashboard.removeingVendorErrorMsg,

        sheduledMsg: state.rebootTheMachineTask.sheduledtaskMsg,
        rebootMsg: state.rebootTheMachineTask.rebootSuccessMsg,
        errorSheduledMsg: state.rebootTheMachineTask.error_sheduledtaskMsg,
        errorRebootMsg: state.rebootTheMachineTask.error_rebootSuccessMsg,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRemovingVendor: (token, vid, ip) => dispatch(),
        onShedulingTask: (token, task, vmid, atime, flag) => dispatch(),
        onRebootingTask: (token, task, vmid, atime, flag) => dispatch(),
        onFetchingUnseenNotifications: (token) => dispatch(),
    }
}
export default connect(mapStateToProps, null)(InstancesRow);