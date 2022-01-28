import React, { useState, useEffect, useMemo } from "react";
import { connect } from 'react-redux';
import { Link, Redirect, useParams } from 'react-router-dom';
import styled from 'styled-components'

// @material-ui/core
import { makeStyles, withStyles, fade } from "@material-ui/core/styles";
import * as Button from '../../../../components/CustomButtons/CustomButtons'

// core components
import GridItem from "../../../../components/Grid/GridItem";
import GridContainer from "../../../../components/Grid/GridContainer";
import Card from "../../../../components/Card/Card";
import Loader from '../../../../components/UI/Loader/Loader';
import AddIcon from '@material-ui/icons/Add';

import SuccessAlert from '../../../../components/Alerts/Success/success'
import ErrorAlert from '../../../../components/Alerts/Error/Error'
import Redirection from '../../../../components/Alerts/Alert/Modal'

import ASVTale from './ASVTable';
import CustomerVmList from './CustomerVmList';
import SearchBar from './SearchVendor';
import VendorCard from './VendorsList';
import VendorFormModal from './FormModal';
import * as action from '../../../../store/actions/customer/index'
import * as formatter from '../../../../components/Functions/Formatter';
import styles from "../../../../assets/jss/jsStyles/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const AddButton = styled.div`
    position: absolute;
    right: 1em;
    top: 0.5em;
`;

const GridBox = styled.div`
    width: 100%5;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5em;
`;


const createASVList = (vm_os, vm_hostname, wan_ip, lan_ip) => {
    return { vm_os, vm_hostname, wan_ip, lan_ip }
}
const AssignVendor = (props) => {
    const classes = useStyles();

    const [asvData, setAsvData] = useState([]);
    const [asvIPs, setAsvIps] = useState([])
    const [updatedASVData, setUpdatedASVData] = useState([]);
    const [openUpdateVm, setOpenUpdateVm] = useState(false);

    const [openVendorInviteForm, setVendorInviteForm] = useState(false);

    const [vendorsList, setVendorsList] = useState([]);

    const [directedIP, setDirectedIp] = useState(props.location.search.split("=")[1])
    const [addVendorCount, setAddVendorCount] = useState(0);

    const [searchTerm, setSearchTerm] = useState(null)
    const ip = props.location.search.split("=")[1];

    const [assignVendor, setAssignVendor] = useState(false);
    useEffect(() => {
        props.assignVendor === true ? setAssignVendor(true) : setAssignVendor(false)
    }, [props.assignVendor])

    const [informAdditionVendor, setInformAdditionOfVendor] = useState(null)
    useEffect(() => {
        props.onFetchingASVData(props.token, directedIP);
        setAsvIps([formatter.convertStrToIP(directedIP)])
        props.onFetchingVendors(props.token);
    }, []);

    const asvArr = []
    useMemo(() => {
        props.asv_data.map(ele => asvArr.push(
            createASVList(ele.vm_os, ele.vm_hostname, ele.wan_ip, ele.lan_ip)
        ))
        setAsvData(asvArr)
    }, [props.asv_data])

    const handleCustomerVm = () => {
        props.onFetchingCustomersVM(props.token);
        setOpenUpdateVm(true);
    }
    const handleCloseCustomerVm = () => {
        setOpenUpdateVm(false);
    }

    // Functionality after editing the ticked data from the modal and setto the asv data
    const [modalTickedData, setModalTickedData] = useState([])
    const handleSelectedAsvData = (ips, arr) => {
        const asv_array = arr;
        setModalTickedData(arr);
        setAsvIps(ips)
    }
    const updatedAsvData = () => {
        setAsvData(modalTickedData)
        setOpenUpdateVm(false);
    }



    useEffect(() => {
        const arr = [];
        props.power_on_cvm.map((ele, i) => {
            if (formatter.convertStrToIP(directedIP) != ele.lan_ip) {
                arr.push(ele);
            }
        })
        setUpdatedASVData(arr)
    }, [props.power_on_cvm])

    const AssignVendors = (id) => {
        // setAssignVendor(true)
        props.onAssigningVms(props.token, id, asvIPs.toString())
    }


    const handleCloseVendorForm = () => {
        setVendorInviteForm(false);
    }

    useEffect(() => {
        const arr = [];
        props.vendors_list.map((ele, index) => {
            arr.push({
                _id: ele._id,
                vendorId: {
                    vendor_company_name: ele.vendorId.vendor_company_name,
                    vendor_name: ele.vendorId.vendor_name,
                    vendor_email: ele.vendorId.vendor_email,
                    vendor_phone: ele.vendorId.vendor_phone,
                    vendor_country: ele.vendorId.vendor_country,
                    vendor_state: ele.vendorId.vendor_state,
                    vendor_city: ele.vendorId.vendor_city,
                    vendor_status: ele.vendorId.vendor_status,
                    vendor_zipcode: ele.vendorId.vendor_zipcode,
                    _id: ele.vendorId._id,
                }
            })
        });
        setVendorsList(arr)
    }, [props.vendors_list]);

    const addVendorsIntoList = data => {
        let rendered = false;
        vendorsList.map(ele => {
            if (ele.vendorId.vendor_company_name === data.vendor_company_name) {
                rendered = true
                setAddVendorCount(2);
                setInformAdditionOfVendor(<ErrorAlert
                    message={`Vendor present, assign`} />)
                return;
            } else {

            }
        })
        setVendorsList(prevState => [...prevState,
        {
            _id: data.id,
            vendorId: {
                vendor_company_name: data.vendor_company_name,
                vendor_name: data.vendor_name == null ? '----------' : data.vendor_name,
                vendor_email: data.vendor_email == null ? '----------' : data.vendor_email,
                vendor_phone: data.vendor_phone == null ? '----------' : data.vendor_phone,
                vendor_country: data.vendor_country == null ? '----------' : data.vendor_country,
                vendor_state: data.vendor_state == null ? '----------' : data.vendor_state,
                vendor_city: data.vendor_city == null ? '----------' : data.vendor_city,
                vendor_status: data.vendor_status == null ? '----------' : data.vendor_status,
                vendor_zipcode: data.vendor_zipcode == null ? '----------' : data.vendor_zipcode,
                _id: data.id,
            }
        }
        ]);
        setAddVendorCount(prevState => prevState = prevState + 1);
    }

    const showRespectiveCard = searchTerm => {
        setSearchTerm(searchTerm)
    }

    return (
        <div>
            {props.error === 'logout' ? <Redirection
                linkRoute="/logout"
                bodyText="Other session is active and you are logged out. Please login again."
                btnText="Ok" /> :
                props.error === 'Your roles have been updated. Login again.' ? <Redirection
                    linkRoute="/logout"
                    bodyText="Your roles have been updated. Login again."
                    btnText="Ok" /> :
                    props.error !== null ||
                        props.error !== 'Your roles have been updated. Login again.' ||
                        props.error !== 'logout' ? null :
                        <ErrorAlert message={props.error} />
            }
            {props.loader ?
                <div className={classes.loaderContainer}>
                    <Loader bigLoader style={{ margin: "0 auto" }} />
                </div> : <div>
                    <GridContainer>
                        <GridItem>
                            <Card>
                                <AddButton>
                                    <Button.MainPrimaryButton
                                        variant="contained"
                                        color="primary"
                                        onClick={handleCustomerVm}
                                        startIcon={<AddIcon />}
                                        size="small"
                                    >
                                        Add Instances
                                    </Button.MainPrimaryButton>
                                </AddButton>
                                <ASVTale asvdata={asvData} modal={false}
                                    handleSelectedAsvData={handleSelectedAsvData} />
                            </Card>
                        </GridItem>
                        <GridItem>
                            <Card>
                                <SearchBar
                                    searchCard={showRespectiveCard}
                                    addVendorsList={addVendorsIntoList}
                                    handleVendorInviteForm={() => {
                                        setSearchTerm('')
                                        setVendorInviteForm(true)
                                    }} />
                            </Card>
                        </GridItem>

                        <GridItem>
                            <Card>
                                <span style={{ fontSize: "17px", fontWeight: 400 }}>Existing Vendors</span>
                                <GridBox>
                                    {vendorsList.filter((val, index) => {
                                        if (searchTerm === "" || searchTerm === null) {
                                            return val;
                                        } else if (val.vendorId.vendor_company_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                            return val;
                                        }
                                    }).map((ele, index) => {
                                        return <VendorCard
                                            key={`vendor-card-${index}`}
                                            ele={ele}
                                            index={index}
                                            assignVendor={() => AssignVendors(ele.vendorId._id)}
                                            message_loader={props.message_loader}
                                        />
                                    })}
                                </GridBox>
                            </Card>
                        </GridItem>
                    </GridContainer>

                    {openUpdateVm ? <CustomerVmList
                        directedip={directedIP}
                        open={openUpdateVm}
                        loader={props.updateLoader}
                        data={updatedASVData}
                        handleClose={handleCloseCustomerVm}
                        updatedAsvData={updatedAsvData}
                        handleSelectedAsvData={handleSelectedAsvData}
                    />
                        : null}

                    {openVendorInviteForm ? <VendorFormModal
                        open={openVendorInviteForm}
                        handleClose={handleCloseVendorForm}
                        success_msg={props.ad_vendor_success_msg}
                        errorMsg={props.ad_vendor_error_msg}
                    /> : null}

                    {props.addVendorLoader ? null :
                        props.ad_vendor_success_msg != null ?
                            <SuccessAlert message={props.ad_vendor_success_msg} /> : props.ad_vendor_error_msg != null ?
                                <ErrorAlert message={props.ad_vendor_error_msg} /> : null}
                </div>}

            {props.success_msg != null ? <SuccessAlert message={props.success_msg} /> : null}
            {props.error_msg != null ? <ErrorAlert message={props.error_msg} /> : null}
            {informAdditionVendor}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        token: state.auth_reducer.token,
        loader: state.customerDashboard.asvLoader,
        asv_data: state.customerDashboard.assign_vendor_list,
        error: state.customerDashboard.error,
        updateLoader: state.customerDashboard.asvUpadteLoading,
        power_on_cvm: state.customerDashboard.powerOnCustomerVm,

        message_loader: state.customerDashboard.msgLoading,
        success_msg: state.customerDashboard.assigningSuccessMsg,
        error_msg: state.customerDashboard.assigningErrorMsg,

        vendors_list: state.customerDashboard.vendorsLists,

        addVendorLoader: state.customerDashboard.addVendorLoader,
        ad_vendor_success_msg: state.customerDashboard.addVendorSucMsg,
        ad_vendor_error_msg: state.customerDashboard.addVendorErrMsg,

        assignVendor: state.customerDashboard.assinging_vendor
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchingASVData: (token, ip) => dispatch(),
        onFetchingCustomersVM: (token) => dispatch(),
        onFetchingVendors: (token) => dispatch(),
        onAssigningVms: (token, vid, ips) => dispatch(),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AssignVendor);

// ASV - assigned vendor data