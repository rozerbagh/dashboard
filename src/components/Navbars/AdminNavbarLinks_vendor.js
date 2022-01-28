import React, { useEffect, useMemo } from "react";
import { connect } from 'react-redux';
import classNames from "classnames";
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

// import Avatar from '../UI/Avatar/Avatar';
import SearchBar from '../UI/SerachBox/VendorSearchBar';
// @material-ui/icons
import {
  FiChevronDown, FiSearch, FiUser, FiBell, FiSmile, FiMeh, FiFrown, FiHelpCircle, FiPower,
  FiAlertCircle
} from "react-icons/fi";
import { AiFillCaretDown } from "react-icons/ai";
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
// core components

import styles from "../../assets/jss/jsStyles/components/headerLinksStyle.js";
import * as actions from '../../store/actions/vendor/index';

const useStyles = makeStyles(styles);

const StyledDivider = withStyles((theme) => ({
  root: {
    margin: "auto 8px",
    height: "2rem",
    backgroundColor: "#333333"
  }
}))(Divider)

const EachNotifyBox = styled.div`
  background-color: ${p => p.updated === false ? '#e5f0ff' : 'transparent'};
  margin: 0.8rem 0;
  display: grid;
  grid-template-columns: 1fr auto;
  border-radius: 0.5rem;
  padding: 0.8rem;
  gap: 0.5rem;
  align-items: baseline;
`

const AlertIcon = styled(FiAlertCircle)`
  font-size: 1.2rem;
  color: #007bff;
  font-weight: 500;
`

const NotifyTitle = styled.span`
  font-size: 1.3rem;
  color: #007bff;
`;

const NotifyDesc = styled.p`
  font-size: 0.7rem;
  width: 100%;
  border-bottom: 1px solid #ccc;
`;

const NotifyFooter = styled.div`
  display: flex;
  width:100%;
  margin-top: 0.2rem;
  font-size: 0.7rem;
  justify-content: space-between;
`

function AdminNavbarLinks(props) {
  const classes = useStyles();
  const [notifications, setNotification] = React.useState([]);
  const [noOfNotifications, setNoOfNotifications] = React.useState(0);
  const [openNotification, setOpenNotification] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(null);
  const [openTicketButton, setOpenTicketButton] = React.useState(false)

  const handleClickNotification = (event) => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };

  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };


  useEffect(() => {
    const arr = [];
    let notifies = 0;
    props.notifications.map(ele => {
      var notificationDate = new Date(ele.ndate);
      var date = notificationDate.getDate();
      var month = notificationDate.getMonth();
      var year = notificationDate.getFullYear();
      var hours = notificationDate.getHours();
      var minutes = notificationDate.getMinutes();
      var seconds = notificationDate.getSeconds();
      // Hours format
      if (hours < 10) {
        hours = `0${hours}`
      } else {
        hours = hours
      }
      // Minutes format
      if (minutes < 10) {
        minutes = `0${minutes}`
      } else {
        minutes = minutes
      }
      // seconds format
      if (seconds < 10) {
        seconds = `0${seconds}`
      } else {
        seconds = seconds
      }

      if (date <= 9) {
        date = `0${date}`
      } else {
        date = date;
      }
      if (month <= 9) {
        month = `0${month}`;
      } else {
        month = month;
      }


      if (ele.seen_flag === 1) {
        notifies++;
      } else {
        notifies = notifies
      }
      arr.push({
        id: Math.random() + ele.ndate,
        seen: ele.seen_flag,
        title: ele.title,
        description: ele.desc,
        link: ele.link,
        date: `${date}/${month}/${year} - ${hours}:${minutes}:${seconds}`
      })
    })
    setNotification(arr);
    setNoOfNotifications(notifies);
  }, [props.notifications]);


  return (
    <div className={classes.navbar}>
      <div className={classes.searchWrapper}>
        <SearchBar />
      </div>

      <div className={classes.navlinks}>
        <span style={{ marginRight: "1.2rem" }}>
          <Typography variant="body2">{props.vendor_name}</Typography>
        </span>

        <StyledDivider orientation="vertical" flexItem />
        <div>
          <a href="https://zybisys.com/contact.html" target="_blank">
            <IconButton
              color={window.innerWidth > 959 ? "inherit" : "commom.white"}
              className={classes.IconButtonLink}
            >
              <FiHelpCircle className={classes.icons} />
            </IconButton>
          </a>

        </div>

        <StyledDivider orientation="vertical" flexItem />

        <div className={classes.manager}>
          <IconButton
            color={window.innerWidth > 959 ? "inherit" : "commom.white"}
            // simple={!(window.innerWidth > 959)}
            aria-owns={openNotification ? "notification-menu-list-grow" : null}
            aria-haspopup="true"
            onClick={handleClickNotification}
            className={classes.IconButtonLink}
          >
            <Badge badgeContent={noOfNotifications} color="primary">
              <NotificationsActiveOutlinedIcon className={classes.icons} />
            </Badge>
          </IconButton>
          {openNotification ? <div className="notifications-box scroller">
            <ClickAwayListener onClickAway={handleCloseNotification}>
              <div>
                <p className="span-margin popup-header">
                  Notifications
                </p>
                {notifications.map(ele => {
                  return <EachNotifyBox key={ele.id}
                    updated={ele.seen === 1 ? false : true}
                  >
                    <AlertIcon />
                    <div>
                      <NotifyTitle>{ele.title}</NotifyTitle>
                      <NotifyDesc>{ele.description}</NotifyDesc>
                      <NotifyFooter>
                        <strong>{ele.date}</strong>
                        <Link to={ele.link} target="_blank">link</Link>
                      </NotifyFooter>
                    </div>

                  </EachNotifyBox>
                })}
              </div>
            </ClickAwayListener>
          </div> : null}

        </div>

        <StyledDivider orientation="vertical" flexItem />

        <div className={classes.manager} id="user-name-actions">

          <Button
            color={window.innerWidth > 959 ? "inherit" : "commom.white"}
            aria-owns={openProfile ? "profile-menu-list-grow" : null}
            aria-haspopup="true"
            onClick={handleClickProfile}
            className={classes.IconButtonLink}
          >
            <Avatar src={props.user_img} alt={props.name} className={classes.small_dp} />
            <div style={{ marginLeft: "10px", textTransform: "capitalize" }}>{props.name}</div>
            <FiChevronDown />
          </Button>
          <Poppers
            open={Boolean(openProfile)}
            anchorEl={openProfile}
            transition
            disablePortal
            className={
              classNames({ [classes.popperClose]: !openProfile }) +
              " " +
              classes.popperNav
            }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="profile-menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleCloseProfile}>
                    <MenuList role="menu">
                      <MenuItem
                        onClick={handleCloseProfile}
                        className={classes.dropdownItem}
                      >
                        <NavLink to="/vendor/vprofile" style={{ textAlign: "left", color: "gray" }}>
                          <FiUser style={{ marginRight: "5px" }} />Profile
                        </NavLink>
                      </MenuItem>
                      <Divider light />
                      <MenuItem
                        onClick={handleCloseProfile}
                        className={classes.dropdownItem}
                      >
                        <NavLink to="/logout" style={{ textAlign: "left", color: "gray" }}>
                          <FiPower style={{ marginRight: "5px" }} />Logout
                        </NavLink>

                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>

        </div>
      </div>

    </div >
  );
}


const mapStateToProps = (state) => {
  return {
    token: state.auth_reducer.token,
    vendor_name: state.auth_reducer.company_name,
    id: state.auth_reducer.uid,
    name: state.auth_reducer.user_name,
    user_img: state.auth_reducer.user_avatar,
    notifications: state.vendorCommon.notifications_arr,
    unseenNotifications: state.vendorCommon.unseen_notifications_arr,
    updateNotifySucMsg: state.vendorCommon.update_suc_notification_msg,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminNavbarLinks);