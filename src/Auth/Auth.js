import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
// @material-ui/icon
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import ClientCaptcha from "react-client-captcha";
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import * as Button from '../components/CustomButtons/CustomButtons';
import cover from '../assets/img/auth_login.svg';
import * as actions from '../store/actions/auth';
import styled from 'styled-components';
import { FiMail, FiLock } from "react-icons/fi";

const MainDiv = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    
`;
const LoginWrapper = styled.div`
    max-width: 1100px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    border-radius: 10px;
    @media screen and (max-width: 720px){
        grid-template-columns: 1fr;
    }
`;

const LoginLeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    margin-left: 50px;
    max-width: 25rem;
    width:100%;
    padding: 20px;
    min-height: 30rem;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0 10px 100px  #dddddd;
    border-radius: 15px;
    @media screen and (max-width: 720px){
        margin-left: 0px;
        max-width: 100%;
        width:100%;
        padding: 20px;
        min-height: inherit;
        background-color: transparent;
        box-shadow: none;
        border-radius: 15px;
    }
`
const LoginRightContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height:100%;
    background-color: #FFFFFF;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    @media screen and (max-width: 720px){
        padding: 0 30px;
    }
`

const FooterLink = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 4px 10px;
`;

const FooterEachLink = styled.a`
    color: #041731;
    margin: 0px 10px;
    font-size: 12px;

    &:hover {
        color: #0e4ec5;
    }
`
const LoginLink = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const Auth = (props) => {
    const [COCPanel, setCOCPanel] = useState(null);
    const [email, setEmail] = useState('demo@demo.com');
    const [password, setPassword] = useState('Demo@123');
    const [showPassword, setShowPassword] = useState(false);

    const [checked, setChecked] = useState(false);
    const [captchaCode, setCaptchaCode] = useState('');
    const [inputCode, setInputCode] = useState('');
    const [customerCapctha, setCustomerCapctha] = useState(false);
    const [vendorCapctha, setVendorCapctha] = useState(false);

    const [captchaInvalidText, setCaptchaInvalidText] = useState('');

    const [customerError, setCustomerError] = useState(null);
    const [vendorError, setVendorError] = useState(null);

    const [customerSigning, setCustomerSigning] = useState(false)
    const [vendorSigning, setVendorSigning] = useState(false)
    // managing the state for the showing the error message as per the panel login type.
    useEffect(() => {
        setVendorError(props.vendor_auth_error)
        setCustomerError(null)
        setCustomerSigning(false)
        setVendorSigning(false)
    }, [props.vendor_auth_error])

    useEffect(() => {
        setCustomerError(props.customer_auth_error)
        setVendorError(null)
        setCustomerSigning(false)
        setVendorSigning(false)
    }, [props.customer_auth_error]);

    const inputChangedHandler = (event, controlName) => {
        if (controlName === 'email') {
            setEmail(event.target.value)
        } else if (controlName === 'password') {
            setPassword(event.target.value)
        }
    }
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changeCaptchaCode = (code) => {
        setCaptchaCode(code)
    }

    const retryCaptcha = () => {
        return true
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const emailValue = email;
        const passwordValue = password;
        setCustomerSigning(true);
        setVendorSigning(true);
        if (COCPanel === 'customer' && customerCapctha === true) {
            if (captchaCode === inputCode) {
                props.onAuth(emailValue, passwordValue, 'customer');
                setCaptchaInvalidText('')
            } else {
                retryCaptcha()
                setCaptchaInvalidText('Kindly Enter captcha correctly')
                setCustomerSigning(false)
                setVendorSigning(false)
            }
        } else if (COCPanel === 'vendor' && vendorCapctha === true) {
            if (captchaCode === inputCode) {
                props.onAuth(emailValue, passwordValue, 'vendor');
                setCaptchaInvalidText('')
            } else {
                setCaptchaInvalidText('Kindly Enter captcha correctly')
                setVendorSigning(false)
                setCustomerSigning(false)
            }
        } else {
            COCPanel === 'vendor' ?
                props.onAuth(emailValue, passwordValue, 'vendor') :
                props.onAuth(emailValue, passwordValue, 'customer')
            // props.onAuth(emailValue, passwordValue);
        }
        setVendorSigning(false)
        setCustomerSigning(false)
    }


    const handleChecked = (event) => {
        setChecked(event.target.checked);
    };

    useEffect(() => {
        if (COCPanel === 'vendor' && vendorError) {
            setVendorCapctha(true)
        } else if (COCPanel === 'customer' && customerError) {
            setCustomerCapctha(true)
        } else {
            setVendorCapctha(false)
            setCustomerCapctha(false)
        }
    }, [vendorError, customerError]);

    React.useMemo(() => {
        setEmail('');
        setPassword('');
    }, [COCPanel]);

    return (
        <MainDiv>

            <LoginWrapper>
                <LoginRightContainer>
                    <img src={cover} alt="cover" width="100%" />

                    <FooterLink >
                        <FooterEachLink href="#">Terms & Conditoins</FooterEachLink>
                        <FooterEachLink href="#" target="_blank">
                            Blog
                        </FooterEachLink>
                        <FooterEachLink href="#">
                            Support
                        </FooterEachLink>
                    </FooterLink>
                </LoginRightContainer>

                {/* Left Container */}
                <LoginLeftContainer>
                    <div>
                        <Typography variant="h3">Welcome Back!</Typography>
                        <Typography variant="body2">Enter your Login credentials</Typography>
                    </div>

                    <div style={{ width: "100%" }}>
                        <form onSubmit={submitHandler}>
                            <TextField
                                fullWidth
                                margin="normal"
                                id="login-email"
                                label="Email"
                                variant="outlined"
                                value={email}
                                onChange={(event) => inputChangedHandler(event, 'email')}
                                type="text"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FiMail />
                                        </InputAdornment>)
                                }}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                id="login-password"
                                label="Password"
                                variant="outlined"
                                value={password}
                                onChange={(event) => inputChangedHandler(event, 'password')}
                                type={showPassword ? 'text' : 'password'}
                                onPaste={e => {
                                    e.preventDefault();
                                    return false;
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FiLock />
                                        </InputAdornment>),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => handleClickShowPassword()}
                                                onMouseDown={(e) => handleMouseDownPassword(e)}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>)
                                }}
                            />
                            <div style={{
                                display: "flex",
                                flexDirection: "row-reverse",
                                alignItems: "center",
                                marginBottom: "10px",
                                justifyContent: "space-between",
                            }}>
                                <div>
                                    <Typography variant="body2">
                                        {COCPanel === 'vendor' ?
                                            null : <Link to="/forgot_password">Forgot Password?</Link>}
                                    </Typography>
                                </div>
                            </div>
                            {COCPanel === 'vendor' && vendorError ?
                                <div style={{ margin: "5px 0", display: "flex", justifyContent: "space-between" }}>
                                    <ClientCaptcha captchaCode={code => changeCaptchaCode(code)}
                                        retry={true}
                                        charsCount={6}
                                        width={200} id="captcha"
                                    />
                                    <TextField
                                        margin="normal"
                                        id="captcha-input"
                                        variant="standard"
                                        value={inputCode}
                                        onChange={(e) => setInputCode(e.target.value)}
                                    />
                                </div> :
                                COCPanel === 'vendor' && customerError ? null :
                                    COCPanel === 'customer' && vendorError ? null :
                                        COCPanel === 'customer' && customerError ?
                                            <div style={{ margin: "5px 0", display: "flex", justifyContent: "space-between" }}>
                                                <ClientCaptcha captchaCode={code => setCaptchaCode(code)}
                                                    charsCount={6}
                                                    retry={true}
                                                    width={200} id="captcha"
                                                />
                                                <TextField
                                                    margin="normal"
                                                    id="captcha-input"
                                                    variant="standard"
                                                    value={inputCode}
                                                    onChange={(e) => setInputCode(e.target.value)}
                                                />
                                            </div> : null}

                            <span style={{
                                fontSize: "0.8rem",
                                fontWeight: 500,
                                color: "orangered"
                            }}>{captchaInvalidText}</span>
                        </form>

                    </div>
                    <Button.MainPrimaryButton
                        disabled={customerSigning ? true : false}
                        style={{ width: "100%" }}
                        type="submit" onClick={submitHandler}>
                        {customerSigning ? 'Signing...' : 'Login'}
                    </Button.MainPrimaryButton>
                    {props.isAuthenticated ? <Redirect to={
                        props.authRedirectPath.search !== '' && props.authRedirectPath.search !== null ?
                            `${props.authRedirectPath.path}${props.authRedirectPath.search}` :
                            props.authRedirectPath.path} /> : null}
                </LoginLeftContainer>
            </LoginWrapper>
            <input
                type="text"
                autoComplete="on"
                value=""
                onFocus={() => { }}
                style={{ display: 'none', opacity: 0, position: 'absolute' }}
                readOnly={true}
            />
        </MainDiv>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.auth_reducer.token,
        uid: state.auth_reducer.uid,
        cocPanel: state.auth_reducer.coc_panel,
        loading: state.auth_reducer.loading,
        error: state.auth_reducer.error,
        vendor_auth_error: state.auth_reducer.vendorAuthError,
        customer_auth_error: state.auth_reducer.customerAuthError,
        isAuthenticated: state.auth_reducer.token !== null,
        authRedirectPath: state.auth_reducer.authRedirectPath,
        coc_login_type: state.auth_reducer.login_coc_type
    }
}

const mapsDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, panelType) => dispatch(actions.auth(email, password, panelType)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
        onChangingCOCLoginType: (coc_login_type) => dispatch(actions.setLoginCOCPanel(coc_login_type))
    }
}

export default connect(mapStateToProps, mapsDispatchToProps)(Auth);