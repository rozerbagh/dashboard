import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import {
    Checkbox,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import * as Button from '../components/CustomButtons/CustomButtons';
import * as actions from '../store/actions/auth';
import logo from '../assets/img/logo.svg';
import cover from '../assets/img/vendor_forgot_password.svg';
import Loader from '../components/UI/Loader/Loader';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    @media screen and (max-width: 720px){
        grid-template-columns: 1fr;
    }
`;

const Box = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: baseline;
`;

const CheckboxLabel = styled.div`
    display: grid;
    grid-template-columns: 0.5fr 4fr;
    gap: 5px;
    align-items: center;
`;

const CoverImage = styled.img`
    max-height: 400px;
    margin: 0 auto;
`;

const Logo = styled.img`
    width: 120px;
`;

const ErrorMessage = styled.span`
    font-size: 0.8rem;
    color: red;
`;

const Heading = styled.h3`
    font-weight: 500;
    margin: 8px 0;
    font-size: 1.4rem;
    line-height: 1.5rem;
`;

const FooterLinks = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 4px 10px;
`;

const FooterLink = styled.a`
    color: #007bff;
    margin: 0px 10px;
    font-size: 12px;

    &:hover {
        color: #0e4ec5;
    }
`

const ResetPassword = (props) => {
    const { token } = useParams()
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

    const [error, setError] = useState('');

    const [eightChar, setEightChar] = useState(false)
    const [oneUC, setOneUC] = useState(false)
    const [oneLC, setOneLC] = useState(false)
    const [oneSC, setOneSC] = useState(false)
    const [oneNum, setOneNum] = useState(false)

    const checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }
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

        }
    }

    useEffect(() => {
        let numberRegex = /[0-9]/;
        let lowerCaseRegex = /[a-z]/;
        let upperCaseRegex = /[A-Z]/;
        let splCharRegex = /[!@#$%^&*]/;
        if (upperCaseRegex.test(password.newpassword.value)) {
            setOneUC(true)
        } else {
            setOneUC(false)
        }

        if (lowerCaseRegex.test(password.newpassword.value)) {
            setOneLC(true)
        } else {
            setOneLC(false)
        }

        if (numberRegex.test(password.newpassword.value)) {
            setOneNum(true)
        } else {
            setOneNum(false)
        }

        if (splCharRegex.test(password.newpassword.value)) {
            setOneSC(true)
        } else {
            setOneSC(false)
        }

        if (password.newpassword.value.length >= 8) {
            setEightChar(true)
        } else {
            setEightChar(false)
        }
    }, [password.newpassword.value])

    useEffect(() => {
        setError(props.errorMessage)
    }, [props.errorMessage])

    const submitHandler = (event) => {
        event.preventDefault();
        const pass_word = password.newpassword.value;
        const cnf_pass_word = password.confirmPassword.value;

        eightChar && oneUC && oneLC && oneSC && oneNum && pass_word === cnf_pass_word ?
            props.onSettingPassword(token, pass_word, cnf_pass_word) :
            eightChar === false ? setError('Minimum Eight Character Required') :
                oneUC === false ? setError('At least one Capitalize character required') :
                    oneLC === false ? setError('At least one lowercase character required') :
                        oneSC === false ? setError('At least one special character required') :
                            oneNum === false ? setError('At least one numeric value required') :
                                setError(null)


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
    const [redirect, setRedirect] = useState(null);
    useEffect(() => {
        props.success_msg !== null ? setRedirect(<Redirect to="/login" />) : setRedirect(null);
        return () => setRedirect(null)
    }, [props.success_msg])



    return (
        <Wrapper>
            <Box>
                <div style={{ alignItems: "baseline", width: "100%" }}>
                    <Logo src={logo} alt="logo" />
                    <Heading>Cloud Services</Heading>
                </div>
                <CoverImage src={cover} alt="cover" />
                <FooterLinks>
                    <FooterLink href="#">Terms & Conditoins</FooterLink>
                    <FooterLink href="#">FAQs</FooterLink>
                    <FooterLink href="#">Help</FooterLink>
                </FooterLinks>
            </Box>

            <Box>
                <ErrorMessage>{error}</ErrorMessage>
                <Heading>Reset Password</Heading>
                <Box>
                    <CheckboxLabel>
                        <Checkbox checked={eightChar} />
                        <Typography variant="body2">Minimum 8 Charaters</Typography>
                    </CheckboxLabel>

                    <CheckboxLabel>
                        <Checkbox checked={oneUC} />
                        <Typography variant="body2">1 uppercase</Typography>
                    </CheckboxLabel>

                    <CheckboxLabel>
                        <Checkbox checked={oneLC} />
                        <Typography variant="body2">1 lowercase</Typography>
                    </CheckboxLabel>

                    <CheckboxLabel>
                        <Checkbox checked={oneSC} />
                        <Typography variant="body2">1 special characters</Typography>
                    </CheckboxLabel>

                    <CheckboxLabel>
                        <Checkbox checked={oneNum} />
                        <Typography variant="body2">1 number</Typography>
                    </CheckboxLabel>
                </Box>
                <form onSubmit={submitHandler}>
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
                    <Button.MainPrimaryButton
                        margin="normal"
                        fullWidth
                        type="submit"
                        onSubmit={submitHandler}
                        disabled={eightChar && oneUC && oneLC && oneSC && oneNum &&
                            password.newpassword.value === password.confirmPassword.value ?
                            false : true}
                    > Set Password
                    </Button.MainPrimaryButton>
                </form>
            </Box>
            {redirect}
        </Wrapper>
    )
}

const mapStateToProps = (state) => {
    return {
        // token: state.auth_reducer.token,
        resettoken: state.auth_reducer.resetToken,
        uid: state.auth_reducer.uid,
        success_msg: state.auth_reducer.set_password_success_msg,
        error: state.auth_reducer.error,
        isAutheticated: state.auth_reducer.token !== null,
        authRedirectPath: state.auth_reducer.authRedirectPath,
        errorMessage: state.auth_reducer.resetPassErrorMsg,
    }
}

const mapsDispatchToProps = dispatch => {
    return {
        onSettingPassword: (token, password, confirm_password) => dispatch(actions.vendor_set_password(token, password, confirm_password)),
        // onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/dashboard'))
    }
}

export default connect(mapStateToProps, mapsDispatchToProps)(ResetPassword);