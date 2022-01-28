import React from 'react';
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import Grid from "@material-ui/core/Grid";
import UploadImage from './UploadImage';
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

function UserDetails(props) {
    const classes = useStyles();

    return (
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start">
            <Grid item xs={12} sm={5} md={5}>
                <div style={{ padding: "5px 10px" }}>
                    <div className={classes.profileBox}>
                        <div className={classes.profileLabel}>Company Name</div>
                        <TextStyle>{props.profileDetails.company_name}</TextStyle>
                    </div>
                </div>

                <div style={{ padding: "5px 10px" }}>
                    <div className={classes.profileBox}>
                        <div className={classes.profileLabel}>User ID</div>
                        <TextStyle>{props.profileDetails.userKey}</TextStyle>
                    </div>
                </div>

                <div style={{ padding: "5px 10px" }}>
                    <div className={classes.profileBox}>
                        <div className={classes.profileLabel}>Address</div>
                        <TextStyle>{props.profileDetails.user_address == "" ? "---" : props.profileDetails.user_address}</TextStyle>
                    </div>
                </div>

                <div style={{ padding: "5px 10px" }}>
                    <div className={classes.profileBox}>
                        <div className={classes.profileLabel}>Zipcode</div>
                        <TextStyle>{props.profileDetails.user_address_zipcode == "" ?
                            "---" :
                            props.profileDetails.user_address_zipcode}</TextStyle>
                    </div>
                </div>

            </Grid>
            <Grid item xs={12} sm={5} md={5}>
                <div style={{ padding: "5px 10px" }}>
                    <div className={classes.profileBox}>
                        <div className={classes.profileLabel}>Name</div>
                        <TextStyle>{props.profileDetails.user_name}</TextStyle>
                    </div>
                </div>

                <div style={{ padding: "5px 10px" }}>
                    <div className={classes.profileBox}>
                        <div className={classes.profileLabel}>Email</div>
                        <TextStyle>{props.profileDetails.user_email}</TextStyle>
                    </div>
                </div>

                <div style={{ padding: "5px 10px" }}>
                    <div className={classes.profileBox}>
                        <div className={classes.profileLabel}>Phone No.</div>
                        <TextStyle>{props.profileDetails.user_phone}</TextStyle>
                    </div>
                </div>

            </Grid>

            <Grid item xs={12} sm={2} md={2}>
                <UploadImage />
            </Grid>
        </Grid>

    )
}

export default UserDetails
