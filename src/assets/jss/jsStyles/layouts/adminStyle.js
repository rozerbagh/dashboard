import {
  drawerWidth,
  transition,
} from "../../variables";

const appStyle = theme => ({
  wrapper: {
    position: "relative",
    display: "flex",
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#FBFBFF",
  },
  sideBar: {
    width: "20%"
  },
  mainPanel: {
    // [theme.breakpoints.up("md")]: {
    //   width: `calc(100% - ${drawerWidth}px)`
    // },
    position: "relative",
    ...transition,
    maxHeight: "100%",
    width: "inherit",
    height: '100vh',
  },
  container: {
    fontSize: "0.7rem",
    padding: "0.2rem",
    width: "100%",
    height: 'calc(100% - 3rem)',
    position: "relative",
    boxShadow: "inset 0em 0em 2em #ceebfa",
    overflowY: "scroll",
    overflowX: "hidden",
    '&::-webkit-scrollbar-track': {
      boxShadow: "inset 0 0 0.2em #007bffa4",
      borderRadius: "10px",
    },
    '&::-webkit-scrollbar': {
      width: "8px",
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: "#007bff",
      borderRadius: "10px",
    }
  },
  map: {
    marginTop: "70px"
  }
});

export default appStyle;
