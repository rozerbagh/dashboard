import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';

import {
    Checkbox,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
    makeStyles
} from '@material-ui/core';
import Button from '../components/CustomButtons/Button';
import GridItem from "../components/Grid/GridItem";
import GridContainer from "../components/Grid/GridContainer";
import * as actions from '../store/actions/auth';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Loader from '../components/UI/Loader/Loader';

const useStyles = makeStyles(theme => ({
    valition_wrraper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "baseleine",
    },
    eachValidBox: {
        display: "grid",
        gridTemplateColumns: "0.5fr 4fr",
        gap: "5px",
        alignItems: "center",
    }
}))
const ResetPassword = (props) => {

    const classes = useStyles();
    const [password, setPassword] = useState({
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

    const [eightChar, setEightChar] = useState(false)
    const [oneUC, setOneUC] = useState(false)
    const [oneLC, setOneLC] = useState(false)
    const [oneSC, setOneSC] = useState(false)
    const [oneNum, setOneNum] = useState(false)

    const inputChangedHandler = (event, type) => {
        sessionStorage.setItem('reset_password', event.target.value)
        const pass_word = event.target.value
        if (type == 'new_password') {
            setPassword({
                ...password,
                newpassword: {
                    ...password.newpassword,
                    value: pass_word,
                }
            });
            // const valid_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

        } else {
            setPassword({
                ...password,
                confirmPassword: {
                    ...password.confirmPassword,
                    value: pass_word,
                }
            })
        }

        if (type == 'new_password') {
            let numberRegex = /[0-9]/;
            let lowerCaseRegex = /[a-z]/;
            let upperCaseRegex = /[A-Z]/;
            let splCharRegex = /[!@#$%^&*]/;

            if (upperCaseRegex.test(pass_word)) {
                setOneUC(true)
            } else {
                setOneUC(false)
            }

            if (lowerCaseRegex.test(pass_word)) {
                setOneLC(true)
            } else {
                setOneLC(false)
            }

            if (numberRegex.test(pass_word)) {
                setOneNum(true)
            } else {
                setOneNum(false)
            }

            if (splCharRegex.test(pass_word)) {
                setOneSC(true)
            } else {
                setOneSC(false)
            }

            if (pass_word.length >= 8) {
                setEightChar(true)
            } else {
                setEightChar(false)
            }
        }
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const pass_word = password.newpassword.value;
        const cnf_pass_word = password.confirmPassword.value
        // console.log(props.resettoken, pass_word, cnf_pass_word)
        props.onResetingPassword(props.resettoken, pass_word, cnf_pass_word)
    }

    const handleClickShowPassword = (type) => {
        if (type == 'new_password') {
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

    const handleMouseDownPassword = (event, type) => {
        event.preventDefault();
    };



    return (
        <div style={{ width: '70%' }}>
            <p style={{ color: "red", fontSize: "0.8rem" }}>{props.errorMessage}</p>
            <h3>Reset Password</h3>
            <div className={classes.valition_wrraper}>
                <div className={classes.eachValidBox}>
                    <Checkbox checked={eightChar} />
                    <Typography variant="body2">Minimum 8 Charaters</Typography>
                </div>
                <div className={classes.eachValidBox}>
                    <Checkbox checked={oneUC} />
                    <Typography variant="body2">1 uppercase</Typography>
                </div>
                <div className={classes.eachValidBox}>
                    <Checkbox checked={oneLC} />
                    <Typography variant="body2">1 lowercase</Typography>
                </div>
                <div className={classes.eachValidBox}>
                    <Checkbox checked={oneSC} />
                    <Typography variant="body2">1 special characters</Typography>
                </div>
                <div className={classes.eachValidBox}>
                    <Checkbox checked={oneNum} />
                    <Typography variant="body2">1 number</Typography>
                </div>
            </div>
            <form>
                <TextField
                    fullWidth
                    margin="normal"
                    id="new-password"
                    label="New Password"
                    variant="outlined"
                    value={password.newpassword.value}
                    onChange={(event) => inputChangedHandler(event, 'new_password')}
                    type={password.newpassword.showPassword ? 'text' : 'password'}
                    onPaste={e => {
                        e.preventDefault();
                        return false;
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => handleClickShowPassword('new_password')}
                                    onMouseDown={(e) => handleMouseDownPassword(e, 'new_password')}
                                    edge="end"
                                >
                                    {password.newpassword.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>)
                    }}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    id="new-confirm-password"
                    label="Confirm Password"
                    variant="outlined"
                    value={password.confirmPassword.value}
                    onChange={(event) => inputChangedHandler(event, 'confrim_password')}
                    type={password.confirmPassword.showPassword ? 'text' : 'password'}
                    onPaste={e => {
                        e.preventDefault();
                        return false;
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => handleClickShowPassword('confrim_password')}
                                    onMouseDown={(e) => handleMouseDownPassword(e, 'confrim_password')}
                                    edge="end"
                                >
                                    {password.confirmPassword.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>)
                    }}
                />
                <Button
                    color="primary"
                    type="submit"
                    round width100
                    onClick={submitHandler}
                > Submit Password
                </Button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.auth_reducer.token,
        resettoken: state.auth_reducer.resetToken,
        uid: state.auth_reducer.uid,
        error: state.auth_reducer.error,
        isAutheticated: state.auth_reducer.token !== null,
        authRedirectPath: state.auth_reducer.authRedirectPath,
        errorMessage: state.auth_reducer.resetPassErrorMsg,
    }
}

const mapsDispatchToProps = dispatch => {
    return {
        onResetingPassword: (token, password, confirm_password) => dispatch(actions.ResetPassword(token, password, confirm_password)),
        // onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/dashboard'))
    }
}

export default connect(mapStateToProps, mapsDispatchToProps)(ResetPassword);