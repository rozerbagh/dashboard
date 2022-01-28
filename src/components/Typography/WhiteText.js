import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import styles from "../../assets/jss/jsStyles/components/typographyStyle.js";

const useStyles = makeStyles(styles);

export default function Warning(props) {
    const classes = useStyles();
    const { children } = props;
    return (
        <label className={classes.whiteText}>
            {children}
        </label>
    );
}

Warning.propTypes = {
    children: PropTypes.node
};
