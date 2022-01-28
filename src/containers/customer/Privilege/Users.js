import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import styled from 'styled-components'
// @material-ui/core components
import { makeStyles, Grid } from "@material-ui/core";
// core components
import Redirection from '../../../components/Alerts/Alert/Modal';
import SuccessAlert from "../../../components/Alerts/Success/success"
import ErrorAlert from "../../../components/Alerts/Error/Error";
import Breadcrumbs from '../../../components/UI/Breadscrumbs/Breadscrumbs';
import Card from "../../../components/Card/Card"
import WarningAlert from '../../../components/Alerts/Warning/Warn'
import UsersTable from "./UserTable/UsersTable";
import * as action from '../../../store/actions/customer/index';
import UserForm from '../../../components/Forms/AddForms';

const subroutes = [
  {
    label: "Home",
    link: "/coc/dashboard",
    subroutes: [],
  },
  {
    label: "Privilege",
    link: "/coc/privilege/users",
    subroutes: [
      { label: 'Users', link: "/coc/privilege/users" },
    ]
  },
  {
    label: "Users",
    link: null,
    subroutes: [],
  }
]

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

const useStyles = makeStyles(styles);

const Users = (props) => {
  const classes = useStyles();

  let [userslist, setUsersList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [demoAlert, setDemoAlert] = useState(null);

  const [alert, setAlert] = useState(null);

  const handleAddUser = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const userToken = localStorage.getItem('customer_user_token');
    props.onFetchingSubUsersList(props.token);
  }, []);

  const submitHandler = (sub_name, sub_email, sub_phone) => {
    setDemoAlert(<WarningAlert message="Demo Account" />)
    setTimeout(() => setDemoAlert(null), 5000)
    // props.onAddingSubUsers(props.token, props.uid, sub_name, sub_email, sub_phone, 1);
    setOpen(false);
  }

  useEffect(() => {
    const fecthedData = [];
    props.subUserList.map((user, index) => {
      let name = user.user_name;
      let email = user.user_email
      let phone = user.user_phone;
      let status = user.status;
      let id = user.id
      fecthedData.push({
        name: name,
        email: email,
        phone: phone,
        status: status,
        id: id,
      });
    })
    setUsersList(fecthedData)
  }, [props.subUserList]);

  const updateUserState = (name, email, phone, status, id) => {
    let state = [...userslist];
    state.map((ele, index) => {
      if (ele.id === id) {
        state[index].name = name;
        state[index].email = email;
        state[index].phone = phone;
        state[index].status = status;
        state[index].id = id;
      }
    })
    setUsersList(state);
  }

  return (
    <>
      <Breadcrumbs links={subroutes} />
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
            <Grid container style={{ minHeight: "80vh" }}>
              <>
                <Card>
                  <UsersTable
                    rows={userslist}
                    handleAddUser={handleAddUser}
                    updateUserlist={updateUserState} />
                </Card>
              </>
              <UserForm open={open}
                handleClose={handleClose}
                submitHandler={submitHandler}
              />
              {props.addingUserSuccesMsg !== null ? <SuccessAlert message={props.addingUserSuccesMsg} /> : null}
              {props.addingUserErrorMsg !== null ? <ErrorAlert message={props.addingUserErrorMsg} /> : null}
            </Grid>}
      {demoAlert}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.auth_reducer.token,
    uid: state.auth_reducer.uid,
    subUserList: state.customerUser.sub_users_list,
    loader: state.customerUser.loading,
    userError: state.customerUser.user_error,

    addingUserSuccesMsg: state.customerUser.adding_user_success,
    addingUserErrorMsg: state.customerUser.adding_user_error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchingSubUsersList: (token) => dispatch(action.fetchSubUsers(token)),
    onAddingSubUsers: (token, uid, sub_name, sub_email, sub_phone, iFlag) => dispatch(action.add_sub_users(token, uid, sub_name, sub_email, sub_phone, iFlag)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);