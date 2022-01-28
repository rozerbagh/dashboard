import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import OtpInput from 'react-otp-input';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Input from '../components/UI/Input/Input';
import * as Button from '../components/CustomButtons/CustomButtons';
import Timer from './Timer';
import logo from '../assets/img/logo.svg';
import cover from '../assets/img/forgot_password.svg';
import { FiChevronsLeft, FiMail } from "react-icons/fi";
import ResetPassword from './ResetPassword';
import Loader from '../components/UI/Loader/Loader';

import * as actions from '../store/actions/auth';

const LoginWrapper = styled.div`
    max-width: 1100px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    height: 100vh;
    margin: 0 auto;
    align-items: center;
    @media screen and (max-width: 720px){
        grid-template-columns: 1fr;
    }
`;

const LoginRightContainer = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    @media screen and (max-width: 720px){
        padding: 30px;
        align-items: center;
    }
`
const LoginLeftContainer = styled.div`
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
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
    color: #007bff;
    margin: 0px 10px;
    font-size: 12px;

    &:hover {
        color: #0e4ec5;
    }
`

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        [theme.breakpoints.up('sm')]: {
            height: "100vh",
        },
        maxWidth: "1100px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "10px",
        position: "relative",
        margin: "0 auto",
        [theme.breakpoints.down('sm')]: {
            display: "grid",
            gridTemplateColumns: "1fr",
            height: "inherit",
            overflow: "scroll"
        },
    },
    right_wrapper: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "baseline",
    },
    right_footer_link: {
        display: "flex",
    },
    left_wrapper: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "baseline",
        paddingLeft: theme.spacing(15),
        // backgroundColor:theme.palette.primary.light
    }
}))
const ForgotPassword = (props) => {

    const classes = useStyles();
    const [mail, setEmail] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Enter Email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false,
            icon: <FiMail />,
        },
        emailSent: false,
    })

    const [otp, setOtp] = useState('')

    const checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }
    const inputChangedHandler = (event) => {
        setEmail({
            ...mail,
            email: {
                ...mail.email,
                value: event.target.value
            }
        })
    }

    const handleOTPChange = otp => setOtp(otp);

    const submitHandler = (event, type) => {
        event.preventDefault();
        if (type == 'otp') {
            const email = mail.email.value;
            const o_t_p = otp;
            console.log(o_t_p, email)
            props.onForgetPasswordOTP(otp, email);
        } else if (type == 'email') {
            setEmail({
                ...mail,
                emailSent: true,
            });
            const email = mail.email.value
            props.onForgetPasswordEmail(email);
        }
    }

    return (
        <div>
            <LoginWrapper>
                <LoginLeftContainer>
                    <div style={{ alignItems: "baseline", width: "100%" }}>
                        <img src={logo} alt="logo" style={{ width: "20%" }} />
                        <h3>Cloud Services</h3>
                    </div>
                    <img src={cover} alt="cover" width="80%" />
                    <FooterLink >
                        <FooterEachLink href="#">Terms & Conditoins</FooterEachLink>
                        <FooterEachLink href="#">FAQs</FooterEachLink>
                        <FooterEachLink href="#">Help</FooterEachLink>
                    </FooterLink>
                </LoginLeftContainer>

                <LoginRightContainer>
                    <div style={{
                        width: "100%",
                        position: "absolute",
                        top: "50px",
                        left: "0px",
                    }}>
                        <Link to="/login"><FiChevronsLeft />Back</Link>
                    </div>
                    {
                        props.otpmailValidate ? <ResetPassword /> :
                            <div style={{ width: "100%", }}>
                                <div style={{ margin: "10px 0" }}>
                                    <Typography variant="body2">
                                        {props.emailValid ?
                                            'OTP has been send to your registered Email' : ''}
                                    </Typography>
                                    <h3>{props.emailValid ? 'Enter OTP !' : 'Forgot Password !'}</h3>
                                    <Typography variant="body2">
                                        {props.emailValid ?
                                            'Enter the OTP to reset your Password!' :
                                            'Enter your Email & get OTP to reset your Password!'}
                                    </Typography>
                                </div>

                                <form>
                                    {props.emailValid ?
                                        <div>
                                            <OtpInput
                                                value={otp}
                                                onChange={handleOTPChange}
                                                numInputs={6}
                                                separator={<span></span>}
                                                inputStyle={{
                                                    margin: "20px 5px",
                                                    padding: "10px",
                                                    border: "1px solid #132739",
                                                    borderRadius: "6px",
                                                    fontSize: "18px",
                                                    width: "50px",
                                                    backgroundColor: "transparent",
                                                }}
                                            />
                                            <Timer />
                                        </div> :
                                        <Input
                                            icon={mail.email.icon}
                                            elementType={mail.email.elementType}
                                            elementConfig={mail.email.elementConfig}
                                            value={mail.email.value}
                                            invalid={!mail.email.valid}
                                            touched={mail.email.touched}
                                            changed={inputChangedHandler}
                                            fullwidth
                                        />
                                    }
                                    <Button.MainPrimaryButton
                                        fullWidth
                                        onClick={(e) => props.emailValid ? submitHandler(e, 'otp') : submitHandler(e, 'email')
                                        }
                                    >
                                        {props.fp_loading ? <div>
                                            <Loader whiteSmallLoader />
                                        </div> : props.emailValid ? 'Submit OTP' : 'Generate OTP'}
                                    </Button.MainPrimaryButton>
                                </form>
                                <div style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                }}>
                                    <Link to="/login">
                                        <Typography variant="body2">Already Have Login</Typography>
                                    </Link>
                                </div>
                            </div>
                    }
                </LoginRightContainer>
            </LoginWrapper>
            {props.resetSucceced ? <Redirect to="login" /> : null}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.auth_reducer.token,
        uid: state.auth_reducer.uid,
        error: state.auth_reducer.error,
        isAutheticated: state.auth_reducer.token !== null,
        authRedirectPath: state.auth_reducer.authRedirectPath,

        emailValid: state.auth_reducer.fpemailvalid,

        otpmsg: state.auth_reducer.fpotpmsg,

        fp_loading: state.auth_reducer.fploading,

        otpmailValidate: state.auth_reducer.fpOTPvalid,

        resetSucceced: state.auth_reducer.resetPasswordSuccess,
    }
}

const mapsDispatchToProps = dispatch => {
    return {
        onForgetPasswordEmail: (email) => dispatch(actions.forgot_Password_Email(email)),
        onForgetPasswordOTP: (otp, email) => dispatch(actions.forgot_Password_OTP(otp, email)),
        // onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/dashboard'))
    }
}

export default connect(mapStateToProps, mapsDispatchToProps)(ForgotPassword);