import React, { useEffect, useState } from "react";

import { connect } from 'react-redux';
import styled from 'styled-components'

// @material-ui/core components
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

// @material-ui/icon
import Tooltip from '../../../components/ToolTip/Tooltip'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// core components
import Redirection from '../../../components/Alerts/Alert/Modal';
import {
  validateEmail,
  validateName,
  validatePhone,
  validatePassword,
} from "../../../components/Functions/Formatter";
import Card from "../../../components/Card/Card";

import * as action from '../../../store/actions/vendor/index';

import VendorDetails from './VendorDetails';
import { FiUser, FiMail, FiPhone, FiAlertCircle } from "react-icons/fi";
import SuccessAlert from '../../../components/Alerts/Success/success'
import ErrorAlert from '../../../components/Alerts/Error/Error'

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
const VendorProfile = (props) => {
  const [userDetail, setUserDetails] = useState({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('');
  const [nameValidate, setNameValidated] = useState(false)
  const [emailValidate, setEmailValidate] = useState(false);
  const [phoneValidate, setPhoneValidate] = useState(false);
  const [id, setID] = useState('');
  const [editing, setEditing] = useState(false)
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
    setNameValidated(validateName(event.target.value))
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailValidate(validateEmail(event.target.value))
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    setPhoneValidate(validatePhone(event.target.value))
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
          showPassword: !password.newpassword.showPassword,
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
  const [pwdError, setPasswordError] = useState(<div></div>)
  const submitChangedPassword = (event) => {
    event.preventDefault();
    const newpass = password.newpassword.value;
    const cnfnewpass = password.confirmPassword.value;
    const oldpass = password.oldpassword.value;
    newpass === cnfnewpass ? props.onUpdatingPassword(props.token, userDetail.id, newpass, oldpass) :
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
    }))
  }

  const submitDetailHandler = (event) => {
    event.preventDefault();
    props.onUpdatingName(props.token, userDetail.id, name, email, phone);
    setUserDetails(prevState => ({
      ...prevState,
      user_name: name,
      user_email: email,
      user_phone: phone,
    }))
    setEditing(prevState => !prevState)
  }

  useEffect(() => {
    props.onFetchingProfileDetails(props.token, props.vid);
  }, []);

  useEffect(() => {
    const n = props.userDetails.vendor_name;
    const e = props.userDetails.vendor_email;
    const ph = props.userDetails.vendor_phone;
    setName(n);
    setEmail(e);
    setPhone(ph);
    if (n !== null && n !== undefined && e !== null && e !== undefined &&
      ph !== null && ph !== undefined) {
      setNameValidated(validateName(n))
      setEmailValidate(validateEmail(e))
      setPhoneValidate(validatePhone(ph))
    } else {
      setNameValidated(false)
      setEmailValidate(false)
      setPhoneValidate(false)
    }


    setUserDetails({
      company_name: props.userDetails.vendor_company_name,
      userKey: props.userDetails.vendor_key,
      user_address: `${props.userDetails.vendor_city}-${props.userDetails.vendor_state}`,
      user_address_zipcode: props.userDetails.vendor_zipcode,
      user_name: props.userDetails.vendor_name,
      user_email: props.userDetails.vendor_email,
      user_phone: props.userDetails.vendor_phone,
      id: props.userDetails.id,
    })
    setID(props.userDetails.id)
  }, [props.userDetails]);

  useEffect(() => {
    if (props.successMessage !== null) {
      setPassword({
        ...password,
        newpassword: {
          ...password.newpassword,
          value: '',
        }
      });
      setPassword({
        ...password,
        confirmPassword: {
          ...password.confirmPassword,
          value: '',
        }
      })
    }

  }, [props.successMessage])

  const NameTextfield = <TextField
    fullWidth
    id="name"
    label="Name"
    variant="outlined"
    value={name || ''}
    onChange={(event) => handleNameChange(event)}
    type="text"
    error={nameValidate === true ? false : phone === '' ? false : true}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <FiUser />
        </InputAdornment>)
    }}
  />;

  const EmailTextfield = <TextField
    fullWidth
    id="name"
    label="Email"
    variant="outlined"
    value={email || ''}
    onChange={(event) => handleEmailChange(event)}
    type="email"
    error={emailValidate === true ? false : phone === '' ? false : true}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <FiMail />
        </InputAdornment>)
    }}
  />;

  const PhoneTextfield = <TextField
    fullWidth
    id="name"
    label="Phone"
    variant="outlined"
    value={phone || ''}
    onChange={(event) => handlePhoneChange(event)}
    type="number"
    error={phoneValidate === true ? false : phone === '' ? false : true}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <FiPhone />
        </InputAdornment>)
    }}
  />;

  const OldPasswordTextFeild = <TextField
    fullWidth
    id="previous-password"
    label="Old Password"
    variant="outlined"
    value={password.oldpassword.value}
    onChange={(event) => inputChangedHandler(event, 'old_password')}
    type={password.oldpassword.showPassword ? 'text' : 'password'}
    onPaste={e => {
      e.preventDefault();
      return false;
    }}
  />;

  const PasswordTextfield = <TextField
    fullWidth
    id="new-password"
    label="New Password"
    variant="outlined"
    value={password.newpassword.value}
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
              content={password.newpassword.valid === false && password.confirmPassword.value === '' ?
                invalidPassHint :
                password.newpassword.value !== password.confirmPassword.value ?
                  'Password didn\'t match' :
                  invalidPassHint}
              direction="top">
              <FiAlertCircle className="danger_text pointer body-text font500" />
            </Tooltip>}
        </InputAdornment>)
    }}
  />;

  const ConfirmPasswordTextfield = <TextField
    fullWidth
    id="new-confirm-password"
    label="Confirm Password"
    variant="outlined"
    value={password.confirmPassword.value}
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
              content={password.confirmPassword.valid === false && password.newpassword.value === '' ?
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

  const editingHandler = () => {
    setEditing(prevState => !prevState)
  }

  return (
    <div>
      <Card>
        <Typography variant="caption" style={{ marginBottom: "15px" }}>Profile Details</Typography>

        <VendorDetails profileDetails={userDetail}
          editing={editing}
          nameTextfield={NameTextfield}
          emailTextfield={EmailTextfield}
          phoneTextfield={PhoneTextfield}
          submitHandler={submitDetailHandler}
          handleEditingState={editingHandler}
          oldpassword={OldPasswordTextFeild}
          password={PasswordTextfield}
          cnfpassword={ConfirmPasswordTextfield}
          submitPasswordHandler={submitChangedPassword}
          validName={nameValidate}
          validEmail={emailValidate}
          validPhone={phoneValidate}
          validPassword={
            password.newpassword.valid &&
            password.confirmPassword.valid &&
            password.newpassword.value === password.confirmPassword.value
          }
        />
      </Card>
      {pwdError}
      {props.successMessage !== null ? <SuccessAlert message={props.successMessage} /> : null}
      {props.errorMessage !== null ? <ErrorAlert message={props.errorMessage} /> : null}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.auth_reducer.token,
    vid: state.auth_reducer.uid,
    userDetails: state.vendorProfile.vendor_details,
    loader: state.vendorProfile.loading,
    error: state.vendorProfile.error,
    successMessage: state.vendorProfile.success_message,
    errorMessage: state.vendorProfile.error_message,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchingProfileDetails: (token, id) => dispatch(action.fetch_vendor_details(token, id)),
    onUpdatingPassword: (token, id, password, oldPassword) => dispatch(action.update_password(token, id, password, oldPassword)),
    onUpdatingName: (token, vid, name, email, phone) => dispatch(action.update_details(token, vid, name, email, phone)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorProfile);