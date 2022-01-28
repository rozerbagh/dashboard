import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux'
import styled from 'styled-components';
import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
// @ core components
import CloseIcon from '@material-ui/icons/Close';
import { FiMonitor } from "react-icons/fi";
import * as CustomButton from '../../../../components/CustomButtons/CustomButtons';

import { confirmAlert } from 'react-confirm-alert'; // Import
import ErrorAlert from '../../../../components/Alerts/Error/Error';
import * as action from '../../../../store/actions/customer/index'
import styles from "../../../../assets/jss/jsStyles/views/dashboardStyle.js";
const useStyles = makeStyles(styles);

const EditBox = styled.div`
    width: 30rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

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

const EditInstance = React.memo((props) => {

    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [inputInstanceName, setInputInstanceName] = useState('');
    const handleChange = (event) => {
        setInputInstanceName(event.target.value);
    }

    const submitHandler = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='react-confirm-alert-body' style={{ zIndex: "9999" }}>
                        <ConfirmAlertText>
                            Do you want to change the instance name?
                        </ConfirmAlertText>
                        <ConfirmButtons>

                            <CancelBtn
                                onClick={() => {
                                    onClose();
                                    return <ErrorAlert message="operation has been cancled" />
                                }}>
                                No
                            </CancelBtn>
                            <SuccessBtn
                                onClick={() => {
                                    onClose();
                                    props.modifyInstnaceName(inputInstanceName, props.rowNo)
                                    props.handleClose();
                                }}
                            >
                                Yes
                            </SuccessBtn>
                        </ConfirmButtons>
                    </div>
                );
            }
        });
    }

    return (
        <Dialog
            open={props.open}
            fullScreen={fullScreen}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title">
            <div className={classes.closeIcon}>
                <IconButton onClick={props.handleClose} color="inherit" size="small">
                    <CloseIcon />
                </IconButton>
            </div>
            <DialogContent>
                <EditBox >
                    <TextField
                        variant="outlined"
                        fullWidth
                        className={classes.margin}
                        disabled
                        value={props.instance_name}
                        label="Current Instance Name"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FiMonitor />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <br />
                    <br />
                    <TextField
                        variant="outlined"
                        className={classes.margin}
                        fullWidth
                        value={inputInstanceName}
                        onChange={handleChange}
                        id="input-with-icon-textfield"
                        label="Enter Instance Name"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FiMonitor />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <br />
                    <br />
                    <CustomButton.MainSecondaryButton
                        onClick={submitHandler}>
                        Change Name
                    </CustomButton.MainSecondaryButton>
                </EditBox>
            </DialogContent>
        </Dialog >
    )
})

const mapStateToProps = (state) => {
    return {
        token: state.auth_reducer.token,
        loading: state.rebootTheMachineTask.loading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onEditingTask: (token, vmid, vmalias) => dispatch(),
    }
}
export default connect(mapStateToProps, null)(EditInstance);
