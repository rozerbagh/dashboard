import {
  headerContainer,
  defaultFont,
  primaryColor,
  defaultBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  whiteColor,
  grayColor,
  drawerWidth
} from "../../variables";

const headerStyle = (theme) => ({
  appBar: {
    backgroundColor: "#fff",
    boxShadow: "1em 0.1em 0.3em #ceebfa",
    position: "sticky",
    width: "100%",
    zIndex: "99",
    color: grayColor[7],
    border: "none",
    transition: "all 150ms ease 0s",
    display: "flex",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarShift: {
    // marginLeft: theme.spacing(7) + 1,
    // width: `calc(100% - ${theme.spacing(7) + 1}px)`,
    width: "100%",
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  container: {
    
  },
  flex: {
    flex: 2
  },
  appResponsive: {
    top: "8px"
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
});

export default headerStyle;
