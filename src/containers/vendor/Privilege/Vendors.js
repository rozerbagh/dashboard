import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import styled from 'styled-components'

import { Redirect } from 'react-router-dom';
// @material-ui/core components
import { makeStyles, Grid } from "@material-ui/core";
// core components
import SuccessAlert from "../../../components/Alerts/Success/success"
import ErrorAlert from "../../../components/Alerts/Error/Error"
import GridItem from "../../../components/Grid/GridItem.js";
import Card from "../../../components/Card/Card"
import Redirection from '../../../components/Alerts/Alert/Modal';
import VendorsTable from "./VendorTable/VendorsTable";

import * as action from '../../../store/actions/vendor/index';

import VendorForm from '../../../components/Forms/AddForms';

const Container = styled.div`
  width: 500px;
  height:500px;
  background-color: #007bff;
`;

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

const ConfirmAlertText = styled.p`
    font-size: 1rem;
    text-align: center;
`;

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

function createData(key, name, email, phone, status, id) {
  return {
    key, name, email, phone, status, id
  };
}

const useStyles = makeStyles(styles);

const Users = (props) => {
  const classes = useStyles();

  const [subVendorList, setSubVendorList] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleAddVendor = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fecthedData = [];
    props.subVendorList.map((vendor, index) => {
      let key = vendor.vendor_key
      let name = vendor.vendor_name;
      let email = vendor.vendor_email
      let phone = vendor.vendor_phone;
      let status = vendor.vendor_status;
      let id = vendor.id;
      fecthedData.push({
        key: key,
        name: name,
        email: email,
        phone: phone,
        status: status,
        id: id,
      });
    })
    setSubVendorList(fecthedData)
  }, [props.subVendorList])

  const updateVendorState = (name, email, phone, status, id) => {
    let state = [...subVendorList];
    state.map((ele, index) => {
      if (ele.id === id) {
        state[index].name = name;
        state[index].email = email;
        state[index].phone = phone;
        state[index].status = status;
        state[index].id = id;
      }
    })
    setSubVendorList(state);
  }


  useEffect(() => {
    props.onFetchingSubVendorsList(props.token);
  }, []);

  useEffect(() => {
    props.onSettingCustomers(props.customer_name, props.customer_id, props.customer_phone, false)
    // setRedirect(null);
  }, [])

  const submitHandler = (sub_name, sub_email, sub_phone) => {
    props.onAddingSubUsers(props.token, sub_name, sub_email, sub_phone);
    setOpen(false);
  }

  return (
    <>
      {props.userError === 'logout' ? <Redirection
        linkRoute="/logout"
        bodyText="Other session is active and you are logged out. Please login again."
        btnText="Ok" /> :
        props.userError === 'Your roles have been updated. Login again.' ? <Redirection
          linkRoute="/logout"
          bodyText="Your roles have been updated. Login again."
          btnText="Ok" /> :
          (props.userError !== 'Your roles have been updated. Login again.' ||
            props.userError !== 'logout') && props.userError !== null ?
            <ErrorAlert message={props.userError} /> :
            <Grid container>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <VendorsTable
                    rows={subVendorList}
                    handleAddVendor={handleAddVendor}
                    updateVendorlist={updateVendorState} />
                </Card>
              </GridItem>

              <VendorForm open={open}
                handleClose={handleClose}
                submitHandler={submitHandler}
              />
              {props.addingUserSuccesMsg !== null ? <SuccessAlert message={props.addingUserSuccesMsg} /> : null}
              {props.addingUserErrorMsg !== null ? <ErrorAlert message={props.addingUserErrorMsg} /> : null}
            </Grid>}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.auth_reducer.token,
    uid: state.auth_reducer.uid,
    subVendorList: state.vendorUser.sub_vendors_list,
    loader: state.vendorUser.loading,
    userError: state.vendorUser.vendor_error,

    addingUserSuccesMsg: state.vendorUser.success_mesage,
    addingUserErrorMsg: state.vendorUser.error,

    customer_name: state.vendorCommon.customer_name,
    customer_id: state.vendorCommon.customer_id,
    customer_phone: state.vendorCommon.customer_phone,

    inside_customer: state.vendorCommon.insideCustomer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchingSubVendorsList: (token) => dispatch(action.fetchSubVendors(token)),
    onAddingSubUsers: (token, sub_name, sub_email, sub_phone) => dispatch(action.add_sub_vendors(token, sub_name, sub_email, sub_phone)),
    onSettingCustomers: (email, id, name, bool) => dispatch(action.set_customers(email, id, name, bool)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);