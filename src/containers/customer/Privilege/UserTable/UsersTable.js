import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'
import loadable from '@loadable/component'
// @material-ui/core
import makeStyles from "@material-ui/core/styles/makeStyles";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import SuccessAlert from '../../../../components/Alerts/Success/success';
import ErrorAlert from '../../../../components/Alerts/Error/Error'
import EditForm from '../../../../components/Forms/EditForms';
import Logs from './Logs';
import Password from '../../../../components/Forms/PawssordChange';
import UserRoles from './UserRoles';
import UserInstances from './UsersInstances'
import * as action from '../../../../store/actions/customer/index';
import { updateStatement } from 'typescript';
const UserTable = loadable(() => import('../../../../components/Tables/PrivilegeTable'));


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

const createdLogs = (date, details) => {
    return { date, details }
}

const createRoles = (flag, report_name, reportId) => {
    return { flag, report_name, reportId }
}

const createInstances = (lan_ip, instances_name, flag) => ({ lan_ip, instances_name, flag })

function UsersTable(props) {

    const classes = useStyles();
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [instancess, setinstancess] = React.useState([]);
    const [userRoles, setUserRoles] = React.useState([]);
    const [userRolesServiceID, setUserRolesServiceID] = React.useState('');

    const [openEdit, setOpenEdit] = React.useState(false);
    const [openLog, setOpenLog] = React.useState(false);
    const [openPassword, setOpenPassword] = React.useState(false);
    const [openRoles, setOpenRoles] = React.useState(false);
    const [openInstances, setOpenInstances] = React.useState(false);

    const [currTooltipIndex, setCurrTooltipIndex] = useState(-1);
    const [openMenu, setOpenMenu] = useState(null);
    const handlMenuClick = (e, i) => {
        i === currTooltipIndex ? setCurrTooltipIndex(-1) : setCurrTooltipIndex(i);
        setOpenMenu(e.currentTarget)
    }

    const handleCloseTooltipAction = () => {
        setCurrTooltipIndex(-1)
    }

    // Active menu dialog without instance and role
    const [activeAnchorEl, setActiveAnchorEl] = React.useState(null);
    const handleActiveMenuClick = (event) => {
        setActiveAnchorEl(event.currentTarget);
    };

    const handleActiveMenuClose = () => {
        setActiveAnchorEl(null);
    };
    // In Active menu dialog without instance and role
    const [inActiveAnchorEl, setInActiveAnchorEl] = React.useState(null);

    const handleInActiveMenuClick = (event) => {
        setInActiveAnchorEl(event.currentTarget);
        // setOpenActionBox(true)
    };

    const handleInActiveMenuClose = () => {
        setInActiveAnchorEl(null);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const totalLength = props.rows.length;


    // Roles changes;
    const [currentUserRoleId, setCurrentUserRolesId] = React.useState('')
    const handleRolesOpen = (e, id) => {
        props.onFetchingRoles(props.token, id)
        setCurrentUserRolesId(id)
        setOpenRoles(true);
        setActiveAnchorEl(null);
    }
    const handleRolesClose = () => {
        setOpenRoles(false)
    }

    useEffect(() => {
        const roless = [];
        const roles = props.roles
        roles.map((role) => {
            setUserRolesServiceID(role.serviceId)
            role.reports.map((report, i) => {
                roless.push(createRoles(report.flag, report.report_name, report.reportId))
            })
        })
        setUserRoles(roless)
    }, [props.roles])

    const submitRolesHandler = () => {
        const reports = sessionStorage.getItem('current_users_role_id');
        props.onUpdatingRoles(props.token, userRolesServiceID, reports, currentUserRoleId);
        setOpenRoles(false)
    }

    // Instanace changes
    const [userInstancesId, setUserInstancesId] = useState('')
    const handleInstancesOpen = (e, id) => {
        setOpenInstances(true);
        setUserInstancesId(id)
        props.onFetchingInstances(props.token, id);
        setActiveAnchorEl(null);
    }
    const handleInstancesClose = () => {
        setOpenInstances(false)
    }
    useMemo(() => {
        const inst = [];
        const data = props.instances
        data.map(ele => {
            inst.push(createInstances(ele.lan_ip, ele.vm_hostname_alias, ele.flag))
        })
        setinstancess(inst);
    }, [props.instances]);

    const submitInstancesHandler = () => {
        const ips = sessionStorage.getItem('current_users_instances_ips')
        props.onUpdatingInstances(props.token, userInstancesId, ips);
        setOpenInstances(false)
    }

    const [userEditId, setUserEditId] = useState('');
    const [userStatus, setUserStatus] = useState(0);

    const handleEditOpen = (e, id) => {
        setUserEditId(id);
        props.onFetchingEditData(props.token, id);
        setOpenEdit(true);
        setActiveAnchorEl(null);
        setInActiveAnchorEl(null);
    }
    const handleEditClose = () => {
        setOpenEdit(false)
    }
    useEffect(() => {
        const data = props.editData
        setUserStatus(data.status)
    }, [props.editData])
    // Edit components functionality //

    // Password changes
    const [passwordId, setPasswordId] = React.useState('')
    const handlePasswordOpen = (e, id) => {
        setOpenPassword(true);
        setPasswordId(id);
        setActiveAnchorEl(null);
        setInActiveAnchorEl(null);
    }
    const handlePasswordClose = () => {
        setOpenPassword(false)
    }

    const handleSubmitPassword = (password) => {
        props.onUpdatingPassword(props.token, passwordId, password);
        handlePasswordClose()
    }

    // Logs components functionality
    const handleLogsOpen = (e, id) => {
        props.onFetchingLogData(props.token, id)
        setOpenLog(true);
        setActiveAnchorEl(null);
        setInActiveAnchorEl(null);
    }

    const handleLogsClose = () => {
        setOpenLog(false)
    }
    const logss = [];
    useEffect(() => {
        const logData = props.logData
        logData.map((log, index) => {
            const timestamp = log._id.toString().substring(0, 8)
            const date = new Date(parseInt(timestamp, 16) * 1000);
            const dates = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
            logss.push(createdLogs(dates, log.message))
        })
    }, [props.logData]);

    // Delete
    const handleDeleteUsers = (e, id) => {

        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='react-confirm-alert-body' style={{ zIndex: "9999" }}>
                        <ConfirmAlertText>Are you sure want to delete User ?</ConfirmAlertText>
                        <ConfirmButtons>
                            <CancelBtn
                                onClick={() => {
                                    onClose();
                                    setActiveAnchorEl(null);
                                    setInActiveAnchorEl(null);
                                    return <ErrorAlert message="operation has been canceled" />
                                }}>
                                No
                            </CancelBtn>
                            <SuccessBtn
                                onClick={() => {
                                    onClose();
                                    setActiveAnchorEl(null);
                                    setInActiveAnchorEl(null);
                                    props.onDeletingSubUsers('xxx', 'uid')
                                    props.rows.splice(currTooltipIndex, 1)
                                    // props.onFetchingUnseenNotifications(props.token)
                                }}
                            >
                                Yes
                            </SuccessBtn>
                        </ConfirmButtons>
                    </div>
                );
            }
        });
    }

    const handleEditSubmitHandler = (sub_name, sub_email, sub_phone, status) => {
        props.updateUserlist(sub_name, sub_email, sub_phone, status, userEditId)
        handleEditClose();
    }

    // Verify Mail
    const handleMailVerification = (e, mail) => {
        props.onVerifyingMail(props.token, mail);
        setInActiveAnchorEl(null);
    }


    return (
        <div className={classes.root}>
            <Suspense fallback={<div>Table Loading...</div>}>
                <UserTable
                    handleCloseTooltipAction={handleCloseTooltipAction}
                    currTooltipIndex={currTooltipIndex}
                    vendor={false}
                    rows={props.rows}
                    handleAddUserButton={props.handleAddUser}
                    handlMenuClick={handlMenuClick}
                    handleInstancesOpen={handleInstancesOpen}
                    handleRolesOpen={handleRolesOpen}
                    handleEditOpen={handleEditOpen}
                    handlePasswordOpen={handlePasswordOpen}
                    handleMailVerification={handleMailVerification}
                    handleLogsOpen={handleLogsOpen}
                    handleDeleteUsers={handleDeleteUsers}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Suspense>
            {openEdit ?
                <EditForm
                    sucmsg={props.updateMsg}
                    open={openEdit}
                    handleEditClose={handleEditClose}
                    id={userEditId}
                    editData={props.editData}
                    loader={props.editLoader}
                    status={userStatus}
                    submitHandler={handleEditSubmitHandler}
                    vendor={false}
                /> : null}
            {props.updateMsg !== null ? <SuccessAlert message={props.updateMsg} /> : null}
            {props.editerrorMsg !== null ? <ErrorAlert message={props.editerrorMsg} /> : null}

            {openLog ?
                <Logs
                    open={openLog}
                    handleLogsClose={handleLogsClose}
                    loader={props.logLoader}
                    logs={props.logData}
                /> : null}

            {openPassword ? <Password
                open={openPassword}
                passwordId={passwordId}
                handlePasswordClose={handlePasswordClose}
                submitPassword={handleSubmitPassword}
            /> : null}

            {openRoles ? <UserRoles
                open={openRoles}
                handleRolesClose={handleRolesClose}
                roles={userRoles}
                loader={props.rolesLoader}
                submitRolesHandler={submitRolesHandler} /> : null}
            {openInstances ? <UserInstances
                open={openInstances}
                handleInstanacesClose={handleInstancesClose}
                loader={props.instancesLoader}
                instances={instancess}
                submitInstancesHandler={submitInstancesHandler} /> : null}

            {props.mailVerificationSuccess !== null ? <SuccessAlert message={props.mailVerificationSuccess} /> : null}
            {props.mailVerificationsFail !== null ? <ErrorAlert message={props.mailVerificationsFail} /> : null}

            {props.assign_inst_SucMsg !== null ? <SuccessAlert message={props.assign_inst_SucMsg} /> : null}
            {props.assign_inst_ErrMsg !== null ? <ErrorAlert message={props.assign_inst_ErrMsg} /> : null}

            {props.assign_roles_SucMsg !== null ? <SuccessAlert message={props.assign_roles_SucMsg} /> : null}
            {props.assign_roles_ErrMsg !== null ? <ErrorAlert message={props.assign_roles_ErrMsg} /> : null}

            {props.pwd_changed !== null ? <SuccessAlert message={props.pwd_changed} /> : null}
            {props.pwd_dont_changed !== null ? <ErrorAlert message={props.pwd_dont_changed} /> : null}

            {props.deleteSucMsg !== null ? <SuccessAlert message={props.deleteSucMsg} /> : null}
            {props.deleteErrMsg !== null ? <ErrorAlert message={props.deleteErrMsg} /> : null}

        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        token: state.auth_reducer.token,
        uid: state.auth_reducer.uid,

        editLoader: state.customerUser.loading_for_edit,
        editData: state.customerUser.edit_info,
        updateMsg: state.customerUser.edit_success_msg,
        editerrorMsg: state.customerUser.edit_error_msg,

        logLoader: state.customerUser.loading_for_log,
        logData: state.customerUser.log_info,

        instances: state.customerUser.instances_list,
        instancesLoader: state.customerUser.loading_instances,

        assign_inst_SucMsg: state.customerUser.assign_inst_successMsg,
        assign_inst_ErrMsg: state.customerUser.assign_inst_errorMsg,

        roles: state.customerUser.roles_list,
        rolesLoader: state.customerUser.loading_roles,
        assign_roles_SucMsg: state.customerUser.assign_role_SucMessage,
        assign_roles_ErrMsg: state.customerUser.assign_role_ErrMessage,


        pwd_changed: state.customerUser.pwd_changed_success,
        pwd_dont_changed: state.customerUser.pwd_changed_fail,

        mailLoader: state.customerUser.loading_mail_verification,
        mailVerificationSuccess: state.customerUser.verify_mail_suc_msg,
        mailVerificationsFail: state.customerUser.verify_mail_err_msg,

        deleteSucMsg: state.customerUser.delete_success_msg,
        deleteErrMsg: state.customerUser.delete_error_msg,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchingEditData: (token, uid) => dispatch(action.edit_sub_users(token, uid)),
        onUpdatingEditData: (token, uid, sub_name, sub_email, sub_phone, sub_status) => dispatch(action.update_sub_users(token, uid, sub_name, sub_email, sub_phone, sub_status)),
        onFetchingLogData: (token, uid) => dispatch(action.log_sub_users(token, uid)),
        onFetchingRoles: (token, uid) => dispatch(action.fetch_roles(token, uid)),
        onUpdatingRoles: (token, serviceId, reports, id) => dispatch(action.assign_roles(token, serviceId, reports, id)),
        onFetchingInstances: (token, uid) => dispatch(action.fetch_users_instances(token, uid)),
        onUpdatingInstances: (token, uid, ips) => dispatch(action.assign_instances(token, uid, ips)),
        onDeletingSubUsers: (token, uid) => dispatch(action.delete_sub_users(token, uid)),
        onVerifyingMail: (token, mail) => dispatch(action.verify_mail(token, mail)),
        onUpdatingPassword: (token, uid, password) => dispatch(action.change_sub_users_password(token, uid, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
