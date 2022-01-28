import React from "react";
import classNames from "classnames";
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
    MenuItem,
    MenuList,
    Grow,
    Paper,
    ClickAwayListener,
    Hidden,
    Button,
    Badge
} from "@material-ui/core";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton"
// @material-ui/icons
import { FiSmile, FiMeh, FiFrown } from "react-icons/fi";
// core components
import styles from "../../assets/jss/jsStyles/components/headerLinksStyle.js";

import SuccessAlerts from '../Alerts/Success/success'

import * as action from '../../store/actions/customer/index'

const useStyles = makeStyles(styles);

const StyledMenuList = withStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}))(MenuList)

const StyledMenu = withStyles((theme) => ({
    root: {
        fontSize: "1rem",
        display: "flex",
        flexDirection: "column",
    }
}))(MenuItem)

function Feedback(props) {
    const classes = useStyles();
    const [openFeedback, setOpenFeedback] = React.useState(null);

    const [feedback, setFeedback] = React.useState(null);

    const [rating, setRating] = React.useState(null)
    const handleClickFeedback = event => {
        if (openFeedback && openFeedback.contains(event.target)) {
            setOpenFeedback(null);
        } else {
            setOpenFeedback(event.currentTarget);
        }
    };
    const handleCloseFeedback = () => {
        setOpenFeedback(null);
    };

    const submitFeedbackHandler = (e, rating) => {
        e.preventDefault();
        setRating(rating)
        props.onGivingFeedback(props.token, rating)
        setTimeout(() => setFeedback(null), 5000);
        setOpenFeedback(null);
    }

    React.useEffect(() => {
        if (props.feedbacks !== null && props.feedbacks !== '') {
            if (rating == 4) {
                setFeedback('Thanks! for for valuable feedbacks')
            } else if (rating == 3) {
                setFeedback('Thanks! for your satifactory feedback')
            } else if (rating == 2) {
                setFeedback('Thanks! we will try ou best')
            } else if (rating == 1) {
                setFeedback('Thanks! for feedback ')
            }
        } else if (props.feedback_error !== null && props.feedback_error !== '') {
            setFeedback('Seems to be some error')
        }
        return () => { setFeedback(null) }
    }, [props.feedbacks, props.feedback_error])

    return (
        <div className={classes.manager}>
            <IconButton
                color={window.innerWidth > 959 ? "inherit" : "commom.white"}
                aria-haspopup="true"
                aria-owns={openFeedback ? "feedback-menu-list-grow" : null}
                onClick={handleClickFeedback}
                className={classes.IconButtonLink}
            >
                <FiSmile className={classes.icons} />
            </IconButton>
            <Poppers
                open={Boolean(openFeedback)}
                anchorEl={openFeedback}
                transition
                disablePortal
                className={
                    classNames({ [classes.popperClose]: !openFeedback }) +
                    " " +
                    classes.popperNav
                }
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        id="feedback-menu-list-grow" style={{
                            transformOrigin:
                                placement === "bottom" ? "center top" : "center bottom"
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleCloseFeedback}>
                                <div>
                                    <p className="span-margin blue-text body2-font">
                                        {/* How was the overall service experience ? */}
                                        How do you rate us ?
                                    </p>
                                    <StyledMenuList role="menu">
                                        <StyledMenu
                                            onClick={(e) => submitFeedbackHandler(e, 4)}
                                            className={classes.dropdownItem}
                                        >
                                            <FiSmile className="fi-simley" />
                                            <span className="fi-simley" style={{ fontSize: "0.6rem" }}>Excellent</span>
                                        </StyledMenu>
                                        <StyledMenu
                                            onClick={(e) => submitFeedbackHandler(e, 3)}
                                            className={classes.dropdownItem}
                                        >
                                            <FiMeh className="fi-good" />
                                            <span className="fi-good" style={{ fontSize: "0.6rem" }}>Good</span>
                                        </StyledMenu>
                                        <StyledMenu
                                            onClick={(e) => submitFeedbackHandler(e, 2)}
                                            className={classes.dropdownItem}
                                        >
                                            <FiMeh className="fi-avgerage" />
                                            <span className="fi-avgerage" style={{ fontSize: "0.6rem" }}>OK</span>
                                        </StyledMenu>
                                        <StyledMenu
                                            onClick={(e) => submitFeedbackHandler(e, 1)}
                                            className={classes.dropdownItem}
                                        >
                                            <FiFrown className="fi-meh" />
                                            <span className="fi-meh" style={{ fontSize: "0.6rem" }}>Poor</span>
                                        </StyledMenu>
                                    </StyledMenuList>

                                </div>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Poppers>
            {props.feedbacks !== null && props.feedbacks !== '' && feedback !== null ?
                <SuccessAlerts message={feedback} /> : null}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        token: state.auth_reducer.token,
        loader: state.customerCommon.feedbackLoader,
        rated: state.customerCommon.feedbackRated,
        feedbacks: state.customerCommon.feedback_message,
        feedback_error: state.customerCommon.feedback_error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGivingFeedback: (token, rate) => dispatch(action.feedbackRated(token, rate)),
        onRestingFeedback: () => dispatch(action.reset_feeback()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Feedback);