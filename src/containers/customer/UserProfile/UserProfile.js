import React, { useEffect, useMemo, useState } from "react";

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import clsx from 'clsx';
import styled from 'styled-components'
// @material-ui/core components
// @material-ui/core components
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

// @material-ui/icon
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// core components
import Tooltip from '../../../components/ToolTip/Tooltip'
import * as Button from "../../../components/CustomButtons/CustomButtons";
import {
  validateEmail,
  validateName,
  validatePhone,
  validatePassword,
} from "../../../components/Functions/Formatter";
import Card from "../../../components/Card/Card.js";
import Redirection from '../../../components/Alerts/Alert/Modal';
import * as action from '../../../store/actions/customer/index';

import UserDetails from './UserDetails';
import { FiUser, FiAlertCircle } from "react-icons/fi";
import SuccessAlert from '../../../components/Alerts/Success/success';
import WarningAlert from '../../../components/Alerts/Warning/Warn';
import ErrorAlert from '../../../components/Alerts/Error/Error';
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
const invalidPassHint = "Password should have 8 characters at least 1 special characters 1 lowercase 1 upercase and 1 number"
const UserProfile = (props) => {
  const [demoAlert, setDemoAlert] = useState(null);
  const [userDetail, setUserDetails] = useState({})
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [name, setName] = useState('')
  const [passwordError, setPasswordError] = useState(null);
  const [password, setPassword] = useState({
    oldpassword: {
      value: '',
      valid: false,
      showPassword: false,
    },
    newpassword: {
      value: '',
      valid: false,
      showPassword: false,
    },
    confirmPassword: {
      value: '',
      valid: false,
      showPassword: false,
    }
  });

  const inputChangedHandler = (event, type) => {
    sessionStorage.setItem('reset_password', event.target.value)
    const pass_word = event.target.value
    if (type == 'old_password') {
      setPassword({
        ...password,
        oldpassword: {
          ...password.oldpassword,
          value: pass_word,
          valid: validatePassword(pass_word)
        }
      });

    } else if (type == 'new_password') {
      setPassword({
        ...password,
        newpassword: {
          ...password.newpassword,
          value: pass_word,
          valid: validatePassword(pass_word)
        }
      });

    } else {
      setPassword({
        ...password,
        confirmPassword: {
          ...password.confirmPassword,
          value: pass_word,
          valid: validatePassword(pass_word)
        }
      })
    }

  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = (type) => {
    if (type == 'old_password') {
      setPassword({
        ...password,
        oldpassword: {
          ...password.oldpassword,
          showPassword: !password.oldpassword.showPassword
        }
      })
    } else if (type == 'new_password') {
      setPassword({
        ...password,
        newpassword: {
          ...password.newpassword,
          showPassword: !password.newpassword.showPassword
        }
      })
    } else {
      setPassword({
        ...password,
        confirmPassword: {
          ...password.confirmPassword,
          showPassword: !password.confirmPassword.showPassword
        }
      })
    };
  };

  const submitChangedPassword = (event) => {
    event.preventDefault();
    setDemoAlert(<WarningAlert message="Demo Account" />)
    setTimeout(() => setDemoAlert(null), 5000)
    const newpass = password.newpassword.value;
    const cnfnewpass = password.confirmPassword.value;
    const oldpass = password.oldpassword.value;
    newpass === cnfnewpass ? props.onUpdatingPassword(props.token, newpass, cnfnewpass, oldpass) :
      setPasswordError(<ErrorAlert message="Password didn't Matched" />);
    setTimeout(() => setPasswordError(<></>), 6000)

    setPassword(prevState => ({
      ...prevState,
      oldpassword: {
        ...prevState.oldpassword,
        value: '',
      },
      newpassword: {
        ...prevState.newpassword,
        value: '',
      },
      confirmPassword: {
        ...prevState.confirmPassword,
        value: '',
      }
    }));
  }

  const submitChangedName = (event) => {
    event.preventDefault();
    props.onUpdatingName(props.token, name);
    setUserDetails(prevState => ({
      ...prevState,
      user_name: name,
    }))
    setDemoAlert(<WarningAlert message="Demo Account" />)
    setTimeout(() => setDemoAlert(null), 5000)
  }

  useEffect(() => {
    props.onFetchingProfileDetails(props.token);
  }, []);

  useEffect(() => {
    const name = props.userDetails.user_name
    setName(name);

    setUserDetails({
      company_name: props.userDetails.company_name,
      userKey: props.userDetails.userKey,
      user_address: props.userDetails.user_address,
      user_address_zipcode: props.userDetails.user_address_zipcode,
      user_name: props.userDetails.user_name,
      user_email: props.userDetails.user_email,
      user_phone: props.userDetails.user_phone,
    })
  }, [props.userDetails]);

  useEffect(() => {
    if (password.newpassword.value === password.confirmPassword.value &&
      password.newpassword.valid &&
      password.confirmPassword.valid) {
      setBtnDisabled(false)
    } else {
      setBtnDisabled(true)
    }
  }, [password.newpassword.value, password.confirmPassword.value]);

  return (
    <>
      {
        props.error === 'logout' ? <Redirection
          linkRoute="/logout"
          bodyText="Other session is active and you are logged out. Please login again."
          btnText="Ok" /> :
          props.error === 'Your roles have been updated. Login again.' ? <Redirection
            linkRoute="/logout"
            bodyText="Your roles have been updated. Login again."
            btnText="Ok" /> : props.error !== null ||
              props.error !== 'Your roles have been updated. Login again.' ||
              props.error !== 'logout' ?
            null :
            <ErrorAlert message={props.error} />
      }
      <Card>
        <Typography variant="h5">Profile Details</Typography>

        <UserDetails profileDetails={userDetail} />

        <Typography variant="h5">Profile Settings</Typography>
        <Grid container
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start" spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <div style={{ padding: "0px 10px" }}>
              <TextField
                margin="normal"
                fullWidth
                id="previous-password"
                label="Old Password"
                variant="outlined"
                value={password.oldpassword.value || ''}
                onChange={(event) => inputChangedHandler(event, 'old_password')}
                type={password.oldpassword.showPassword ? 'text' : 'password'}
                onPaste={e => {
                  e.preventDefault();
                  return false;
                }}
              />
            </div>

            <div style={{ padding: "0px 10px" }}>
              <TextField
                margin="normal"
                fullWidth
                id="new-password"
                label="New Password"
                variant="outlined"
                value={password.newpassword.value || ''}
                onChange={(event) => inputChangedHandler(event, 'new_password')}
                type={password.newpassword.showPassword ? 'text' : 'password'}
                error={password.newpassword.value === '' ? false :
                  password.newpassword.valid ? false : true}
                onPaste={e => {
                  e.preventDefault();
                  return false;
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {(password.newpassword.valid ||
                        password.newpassword.value === '') &&
                        password.newpassword.value === password.confirmPassword.value ? <></> :
                        <Tooltip
                          content={
                            password.newpassword.valid === false && password.confirmPassword.value === '' ?
                              invalidPassHint :
                              password.newpassword.value !== password.confirmPassword.value ?
                                'Password didn\'t match' :
                                invalidPassHint}
                          direction="top">
                          <FiAlertCircle className="danger_text pointer body-text font500" />
                        </Tooltip>}
                    </InputAdornment>)
                }}
              />
            </div>

            <div style={{ padding: "0px 10px" }}>
              <TextField
                margin="normal"
                fullWidth
                id="new-confirm-password"
                label="Confirm Password"
                variant="outlined"
                value={password.confirmPassword.value || ''}
                onChange={(event) => inputChangedHandler(event, 'confrim_password')}
                type={password.confirmPassword.showPassword ? 'text' : 'password'}
                error={password.confirmPassword.value === '' ? false :
                  password.confirmPassword.valid ? false : true}
                onPaste={e => {
                  e.preventDefault();
                  return false;
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {(password.confirmPassword.valid ||
                        password.confirmPassword.value === '') &&
                        password.newpassword.value === password.confirmPassword.value ? <></> :
                        <Tooltip
                          content={
                            password.confirmPassword.valid === false && password.newpassword.value === '' ?
                              invalidPassHint :
                              password.confirmPassword.value !== password.newpassword.value ?
                                'Password didn\'t match' :
                                invalidPassHint}
                          direction="top">
                          <FiAlertCircle className="danger_text pointer body-text font500" />
                        </Tooltip>}
                    </InputAdornment>)
                }}
              />
            </div>

            <div style={{ padding: "0px 10px", float: "right" }}>
              <Button.MainPrimaryButton
                disabled={btnDisabled}
                onClick={submitChangedPassword}>
                Change Password
              </Button.MainPrimaryButton>
            </div>

          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <div style={{ padding: "0px 10px" }}>
              <TextField
                fullWidth
                margin="normal"
                id="name"
                label="Name"
                variant="outlined"
                value={name || ''}
                onChange={(event) => handleNameChange(event)}
                type="text"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiUser />
                    </InputAdornment>)
                }}
              />
            </div>
            <div style={{ padding: "0px 10px", float: "right" }}>
              <Button.MainPrimaryButton
                onClick={submitChangedName}>
                Change Name
              </Button.MainPrimaryButton>
            </div>
          </Grid>
        </Grid>
      </Card>
      {props.name_successMessage !== null ? <SuccessAlert message={props.name_successMessage} /> : null}
      {props.name_errorMessage !== null ? <ErrorAlert message={props.name_errorMessage} /> : null}

      {props.pwd_successMessage !== null ? <SuccessAlert message={props.pwd_successMessage} /> : null}
      {props.pwd_errorMessage !== null ? <ErrorAlert message={props.pwd_errorMessage} /> : null}

      {props.uploadImg_successMessage !== null ? <SuccessAlert message={props.uploadImg_successMessage} /> : null}
      {props.uploadImg_errorMessage !== null ? <ErrorAlert message={props.uploadImg_errorMessage} /> : null}
      {passwordError}
      {demoAlert}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.auth_reducer.token,
    userDetails: state.customerProfile.user_details,

    loader: state.customerProfile.loading,
    error: state.customerProfile.error,

    name_successMessage: state.customerProfile.pwd_change_suc_msg,
    name_errorMessage: state.customerProfile.pwd_change_err_msg,

    pwd_successMessage: state.customerProfile.name_change_suc_msg,
    pwd_errorMessage: state.customerProfile.name_change_err_msg,

    uploadImg_successMessage: state.customerProfile.upload_img_suc_msg,
    uploadImg_errorMessage: state.customerProfile.upload_img_err_msg

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchingProfileDetails: (token) => dispatch(action.fetch_user_details(token)),
    onUpdatingPassword: (token, password, confirm_password, old_password) => dispatch(action.update_password(token, password,
      confirm_password, old_password)),
    onUpdatingName: (token, user_name) => dispatch(action.update_name(token, user_name)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);