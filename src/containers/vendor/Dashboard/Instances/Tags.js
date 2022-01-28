
import React from 'react';

import { connect } from 'react-redux';
// import { WithContext as ReactTags } from 'react-tag-input';
import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InputTags from '../../../../components/Tags/Tags'
import * as action from '../../../../store/actions/vendor/index'

const useStyles = makeStyles(theme => ({
    pageContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: " 5px 20px",
        width: "100%",
        [theme.breakpoints.up("md")]: {
            minWidth: "500px"
        }
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
    contentRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: "5px 10px",
        minWidth: "400px",
    },
    heading: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: "40px",
        paddingright: "20px",
        paddingTop: "15px",
        paddingBottom: "0px",
    },
    tag_container: {
        position: "relative",
        width: "100%",
    },
    selected: {
        border: "0.0625em solid #707070",
        borderRadius: "5px",
        padding: "5px",
        display: "flex",
        alignItems: "center",
        width: "100%",
    },
    addedTag: {
        border: "0.0625em",
        backgroundColor: "#5A7081",
        color: "#FFFFFF",
        borderRadius: "5px",
        padding: "2px 5px",
        margin: "0 2px",
        fontSize: "12px",
    },
    tagRemoveBtn: {
        border: "none",
        backgroundColor: "transparent",
        color: "#fff",
        paddingLeft: "2px"
    },
    tagInputField: {
        border: "none",
        backgroundColor: "transparent",
    }
}));

const Keys = {
    TAB: 9,
    SPACE: 32,
    COMMA: 188,
};


const Tags = React.memo((props) => {

    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const submitHandler = (tags) => {
        props.modifyVMs(tags, props.rowNo);
        const id = JSON.parse(localStorage.getItem('vuid'));
        props.handleClose();
    };

    return (
        <Dialog
            open={props.open}
            fullScreen={fullScreen}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
        >
            <div className={classes.closeIcon}>
                <IconButton onClick={props.handleClose} color="inherit" size="small">
                    <CloseIcon />
                </IconButton>
            </div>
            <div className={classes.heading}>
                <p style={{ fontSize: "13px", font: 600, color: "#333" }}>MANAGE TAGS</p>
                <p style={{ fontSize: "13px", font: 600, color: "#333", marginLeft: "10px" }}>Tags are helpful for grouping the instances</p>
            </div>
            <DialogContent>
                <div className={classes.pageContent}>
                    <div style={{ width: "100%", }}>
                        <InputTags tagArr={props.tagsArray} submitHandler={submitHandler} />
                    </div>
                </div>
            </DialogContent>
        </Dialog >
    )
})

const mapStateToProps = (state) => {
    return {
        token: state.auth_reducer.token,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Tags);

