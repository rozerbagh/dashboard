import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import * as Buttons from '../../../components/CustomButtons/CustomButtons'
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles(theme => ({
    profileBox: {
        position: "relative",
        padding: "1em 0.7em",
        borderColor: theme.palette.grey[400],
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "5px",
        width: "100%",
    },
    profileLabel: {
        position: "absolute",
        top: "-7px",
        left: "10px",
        backgroundColor: theme.palette.common.white,
        fontWeight: "500",
        padding: "0px 2px",
        lineHeight: "12px"
    },
}));

const TextStyle = styled.span`
    font-weight: 500;
    font-size: 0.8rem;
`

function VendorDetails(props) {
    const classes = useStyles();

    return (
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start">
            <Grid item xs={12} sm={4} md={4}>
                <div style={{ padding: "5px 10px" }}>
                    <div className={classes.profileBox}>
                        <span className={classes.profileLabel}>Company Name</span>
                        <TextStyle variant="body2">{props.profileDetails.company_name}</TextStyle>
                    </div>
                </div>

                <div style={{ padding: "5px 10px" }}>
                    <div className={classes.profileBox}>
                        <span className={classes.profileLabel}>User ID</span>
                        <TextStyle variant="body2">{props.profileDetails.userKey}</TextStyle>
                    </div>
                </div>

                <div style={{ padding: "5px 10px" }}>
                    <div className={classes.profileBox}>
                        <span className={classes.profileLabel}>Address</span>
                        <TextStyle variant="body2">{props.profileDetails.user_address == "" ?
                            "---" : props.profileDetails.user_address}</TextStyle>
                    </div>
                </div>

                <div style={{ padding: "5px 10px" }}>
                    <div className={classes.profileBox}>
                        <span className={classes.profileLabel}>Zipcode</span>
                        <TextStyle variant="body2">{props.profileDetails.user_address_zipcode == "" ?
                            "---" :
                            props.profileDetails.user_address_zipcode}</TextStyle>
                    </div>
                </div>

            </Grid>
            <Grid item xs={12} sm={4} md={4}>
                <div style={{ padding: "5px 10px" }}>
                    {props.editing ? props.nameTextfield :
                        <div className={classes.profileBox}>
                            <span className={classes.profileLabel}>Name</span>
                            <TextStyle variant="body2">{props.profileDetails.user_name}</TextStyle>
                        </div>
                    }
                </div>

                <div style={{ padding: "5px 10px" }}>
                    {props.editing ? props.emailTextfield :
                        <div className={classes.profileBox}>
                            <span className={classes.profileLabel}>Email</span>
                            <TextStyle variant="body2">{props.profileDetails.user_email}</TextStyle>
                        </div>
                    }

                </div>

                <div style={{ padding: "5px 10px" }}>
                    {props.editing ? props.phoneTextfield :
                        <div className={classes.profileBox}>
                            <span className={classes.profileLabel}>Phone</span>
                            <TextStyle variant="body2">{props.profileDetails.user_phone}</TextStyle>
                        </div>
                    }
                </div>
                <div style={{ width: "100%", padding: "5px 10px", display: "flex", justifyContent: "flex-end" }}>
                    {
                        props.editing ? <>
                            <Buttons.MainTertiaryButton style={{ marginRight: "10px" }}
                                onClick={props.handleEditingState}
                            >
                                Cancel
                            </Buttons.MainTertiaryButton>
                            <Buttons.MainSecondaryButton
                                disabled={props.validName === true &&
                                    props.validEmail === true &&
                                    props.validPhone === true ?
                                    false : true}
                                onClick={props.submitHandler}
                            >
                                Save
                            </Buttons.MainSecondaryButton>
                        </> : <Buttons.MainTertiaryButton
                            onClick={props.handleEditingState}
                        >
                            Edit
                        </Buttons.MainTertiaryButton>
                    }
                </div>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
                <form onSubmit={props.submitPasswordHandler}>
                    <div style={{ padding: "5px 10px" }}>
                        {props.oldpassword}
                    </div>
                    <div style={{ padding: "5px 10px" }}>
                        {props.password}
                    </div>
                    <div style={{ padding: "5px 10px" }}>
                        {props.cnfpassword}
                    </div>
                    <div style={{
                        width: "100%",
                        padding: "5px 10px",
                        display: "flex",
                        justifyContent: "flex-end"
                    }}>
                        <Buttons.MainPrimaryButton
                            disabled={props.validPassword === false ? true : false}
                            onClick={props.submitPasswordHandler}>
                            Change Password
                        </Buttons.MainPrimaryButton>
                    </div>
                </form>
            </Grid>
        </Grid>

    )
}

export default VendorDetails
