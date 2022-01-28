import React, { useState, Suspense, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'
import clsx from 'clsx';
import loadable from '@loadable/component'
// @material-ui/core
import { makeStyles, fade, withStyles, lighten } from "@material-ui/core/styles";
import { confirmAlert } from 'react-confirm-alert'; // Import
import SuccessAlert from '../../../../components/Alerts/Success/success';
import ErrorAlert from '../../../../components/Alerts/Error/Error'

import EditForm from '../../../../components/Forms/EditForms';
import Password from '../../../../components/Forms/PawssordChange';
import VendorsCustomers from './VendorsCustomers';
import * as action from '../../../../store/actions/vendor/index';
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

const createcustomers = (id, customers_name, flag) => ({ id, customers_name, flag })

function VendorsTable(props) {

    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [customers, setCustomers] = React.useState([]);
    // Active menu dialog with instance and role
    const [activeAnchorEl, setActiveAnchorEl] = React.useState(null);

    const [openActionBox, setOpenActionBox] = React.useState(false);

    const [openEdit, setOpenEdit] = React.useState(false);
    const [openLog, setOpenLog] = React.useState(false);
    const [openPassword, setOpenPassword] = React.useState(false);
    const [openRoles, setOpenRoles] = React.useState(false);
    const [openMapCustomer, setOpenMapCustomer] = React.useState(false);

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
        setOpenActionBox(true)
    };

    const handleInActiveMenuClose = () => {
        setInActiveAnchorEl(null);
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const totalLength = props.rows.length;

    // Map Customer changes
    const [vendorCustomersID, setVendorCustomersID] = useState('')
    const handleMapCustomerOpen = (e, id) => {
        setOpenMapCustomer(true);
        setVendorCustomersID(id)
        props.onFetchingMapCustomers(props.token, id);
        setActiveAnchorEl(null);
    }
    const handleMapCustomerClose = () => {
        setOpenMapCustomer(false)
    }
    useMemo(() => {
        const inst = [];
        props.customers.map(ele => {
            inst.push(createcustomers(ele.userId, ele.name, ele.flag))
        })
        setCustomers(inst);
    }, [props.customers]);

    const submitcustomersHandler = (customersIDs) => {
        // console.log(customersIDs)
        props.onUpdatingMapCustomers(props.token, vendorCustomersID, customersIDs);
        setOpenMapCustomer(false)
    }

    // Edit components functionality //
    const [editName, setEditName] = useState('');
    const [editPhone, setEditPhone] = useState('');
    const [editEmail, setEditEmail] = useState('');

    const [vendorEditID, setVendorEditID] = useState('');
    const [editSatus, setEditStatus] = useState(0);
    const [userStatus, setUserStatus] = useState(0);

    const handleEditOpen = (e, id, name, email, phone) => {
        setVendorEditID(id);
        props.onFetchingEditData(props.token, id);
        setEditName(name);
        setEditEmail(email);
        setEditPhone(phone);
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

    const handleEditSubmitHandler = (sub_name, sub_email, sub_phone, status) => {
        props.onUpdatingEditData(props.token, vendorEditID, sub_name, sub_email, sub_phone);
        props.updateVendorlist(sub_name, sub_email, sub_phone, userStatus, vendorEditID)
        handleEditClose();
    }
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

    // Delete
    const handleDeleteUsers = (e, id) => {

        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='react-confirm-alert-body' style={{ zIndex: "9999" }}>
                        <ConfirmAlertText>Are you sure want to delete User ?</ConfirmAlertText>
                        <ConfirmButtons>
                            <SuccessBtn
                                onClick={() => {
                                    onClose();
                                    props.onDeletingSubUsers(props.token, id)
                                    setActiveAnchorEl(null);
                                    setInActiveAnchorEl(null);
                                    // props.onFetchingUnseenNotifications(props.token)

                                }}
                            >
                                Delete
                            </SuccessBtn>
                            <CancelBtn
                                onClick={() => {
                                    onClose();
                                    setActiveAnchorEl(null);
                                    setInActiveAnchorEl(null);
                                    return <ErrorAlert message="operation has been cancled" />
                                }}>
                                Cancel
                            </CancelBtn>
                        </ConfirmButtons>

                    </div>
                );
            }
        });
    }

    // Verify Mail
    const handleMailVerification = (e, vid) => {
        props.onVerifyingMail(props.token, vid);
        setInActiveAnchorEl(null);
    }

    const [currTooltipIndex, setCurrTooltipIndex] = useState(-1);
    const [openMenu, setOpenMenu] = useState(null);
    const handlMenuClick = (e, i) => {
        i === currTooltipIndex ? setCurrTooltipIndex(-1) : setCurrTooltipIndex(i);
        setOpenMenu(e.currentTarget)
    }

    const handleCloseTooltipAction = () => {
        setCurrTooltipIndex(-1)
    }

    return (
        <div className={classes.root}>
            <Suspense fallback={<div>Table Loading...</div>}>
                <UserTable
                    handleCloseTooltipAction={handleCloseTooltipAction}
                    currTooltipIndex={currTooltipIndex}
                    rows={props.rows}
                    handleAddUserButton={props.handleAddVendor}
                    vendor={true}
                    handlMenuClick={handlMenuClick}
                    handleMapCustomerOpen={handleMapCustomerOpen}
                    handleEditOpen={handleEditOpen}
                    handlePasswordOpen={handlePasswordOpen}
                    handleMailVerification={handleMailVerification}
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
                    id={vendorEditID}
                    editData={props.editData}
                    loader={props.editLoader}
                    status={userStatus}
                    submitHandler={handleEditSubmitHandler}
                    vendor={true}
                /> : null}

            {props.updateMsg !== null ? <SuccessAlert message={props.updateMsg} /> : null}
            {props.editerrorMsg !== null ? <ErrorAlert message={props.editerrorMsg} /> : null}

            {openPassword ? <Password
                open={openPassword}
                passwordId={passwordId}
                handlePasswordClose={handlePasswordClose}
                submitPassword={handleSubmitPassword}
            /> : null}

            {openMapCustomer ? <VendorsCustomers
                customers={[]}
                open={openMapCustomer}
                handleInstanacesClose={handleMapCustomerClose}
                loader={props.customersLoader}
                customers={customers}
                submitCustomersHandler={submitcustomersHandler} /> : null}

            {props.mailVerificationSuccess !== null ? <SuccessAlert message={props.mailVerificationSuccess} /> : null}
            {props.mailVerificationsFail !== null ? <ErrorAlert message={props.mailVerificationsFail} /> : null}

            {props.assign_inst_SucMsg !== null ? <SuccessAlert message={props.assign_inst_SucMsg} /> : null}
            {props.assign_inst_ErrMsg !== null ? <ErrorAlert message={props.assign_inst_ErrMsg} /> : null}

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

        editLoader: state.vendorUser.loading_for_edit,
        editData: state.vendorUser.edit_info,
        updateMsg: state.vendorUser.edit_success_msg,
        editerrorMsg: state.vendorUser.edit_error_msg,

        logLoader: state.vendorUser.loading_for_log,
        logData: state.vendorUser.log_info,

        customers: state.vendorUser.customers_list,
        customersLoader: state.vendorUser.loading_customers,

        assign_inst_SucMsg: state.vendorUser.assign_inst_successMsg,
        assign_inst_ErrMsg: state.vendorUser.assign_inst_errorMsg,


        pwd_changed: state.vendorUser.pwd_changed_success,
        pwd_dont_changed: state.vendorUser.pwd_changed_fail,

        mailLoader: state.vendorUser.loading_mail_verification,
        mailVerificationSuccess: state.vendorUser.verify_mail_suc_msg,
        mailVerificationsFail: state.vendorUser.verify_mail_err_msg,

        deleteSucMsg: state.vendorUser.delete_success_msg,
        deleteErrMsg: state.vendorUser.delete_error_msg,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchingEditData: (token, vid) => dispatch(action.edit_sub_users(token, vid)),
        onFetchingMapCustomers: (token, vid) => dispatch(action.fetch_map_customers(token, vid)),
        onUpdatingMapCustomers: (token, vid, ids) => dispatch(action.mapping_customers(token, vid, ids)),
        onDeletingSubUsers: (token, vid) => dispatch(action.delete_sub_vendors(token, vid)),
        onVerifyingMail: (token, vid) => dispatch(action.verify_mail(token, vid)),
        onUpdatingEditData: (token, vid, sub_name, sub_email, sub_phone) => dispatch(action.update_sub_users(token, vid, sub_name, sub_email, sub_phone)),
        onUpdatingPassword: (token, vid, password) => dispatch(action.change_sub_vendors_password(token, vid, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorsTable);
