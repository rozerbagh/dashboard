import React from "react";
import { connect } from 'react-redux'
import classNames from "classnames";
import clsx from 'clsx';
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import AdminNavbarLinks from "./AdminNavbarLinks";
import VendorAdminNavbarLinks from "./AdminNavbarLinks_vendor";

import styles from "../../assets/jss/jsStyles/components/headerStyle.js";

const useStyles = makeStyles(styles);

function Header(props) {
  const { sidebarOpen, ...rest } = props;
  const classes = useStyles();

  const { color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });
  return (
    <AppBar className={clsx(classes.appBar, {
      [classes.appBarShift]: !sidebarOpen,
    }, appBarClasses)}>
      <Toolbar>
        {props.cocPanelType === 'vendor' ? <VendorAdminNavbarLinks vendor={props.vendor} /> : <AdminNavbarLinks vendor={props.vendor} />}

        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}
Header.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object)
};
const mapStateToProps = state => {
  const panelType = localStorage.getItem('coc_panel');
  if (panelType === 'vendor') {
    return {
      cocPanelType: state.vendor_auth_reducer.coc_panel,
    }
  } else {
    return {
      cocPanelType: state.auth_reducer.coc_panel,
    }
  }
}

export default connect(mapStateToProps, null)(Header);

