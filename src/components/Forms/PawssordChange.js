import React from 'react';

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import IconButton from "@material-ui/core/IconButton"
import InputAdornment from "@material-ui/core/InputAdornment"
import TextField from "@material-ui/core/TextField"

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CloseIcon from '@material-ui/icons/Close';
import { validatePassword } from "../Functions/Formatter";
import Loader from "../UI/Loader/Loader";
import LockOpenIcon from '@material-ui/icons/LockOpen';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        width: "100%",
    },
    submitButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginBottom: "10px",
        paddingBottom: "10px",
    },
    closeIcon: {
        position: "absolute",
        top: "0px",
        right: 0,
    },
}));

function UserPassword(props) {

    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [valid, setValid] = React.useState(false)

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        validatePassword(event.target.value) ? setValid(true) : setValid(false)
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const submitHandler = () => {
        props.submitPassword(password)
    }

    return (
        <Dialog
            open={props.open}
            fullScreen={fullScreen}
            onClose={props.handlePasswordClose}
            aria-labelledby="user-password-dialog-form">

            {props.loader ?
                <Loader bigLoader style={{ margin: "150px" }} /> :
                <div style={{ width: "500px", }}>
                    <div className={classes.closeIcon}>
                        <IconButton onClick={props.handlePasswordClose} color="inherit" size="small">
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <DialogTitle id="user-password-form-title">New Password</DialogTitle>
                    <DialogContent>
                        <TextField
                            variant="outlined" fullWidth
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handlePasswordChange}
                            onPaste={e => {
                                e.preventDefault();
                                return false;
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>)
                            }}
                            autoComplete="off"
                        />
                        <Typography variant="body1">Password should contains 8 character, 1 special charater, 1 lowercase, 1 uppercase, 1 number</Typography>
                    </DialogContent>
                    <div className={classes.submitButton}>
                        <Button
                            disabled={valid ? false : true}
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={submitHandler}
                            endIcon={<LockOpenIcon />}>
                            Submit
                        </Button>
                    </div>
                </div>}
        </Dialog >
    )
}

export default UserPassword;
