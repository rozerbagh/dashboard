import {
  blackColor,
  whiteColor,
  hexToRgb
} from "../../variables";

const cardStyle = {
  card: {
    border: "0",
    margin: "1em",
    borderRadius: "0.8em",
    padding: "1em",
    color: "rgba(" + hexToRgb(blackColor) + ", 0.87)",
    background: whiteColor,
    width: "100%",
    boxShadow: "0 0 0.5em #d6f0fd",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    minWidth: "0",
    wordWrap: "break-word",
    fontSize: "0.75rem"
  },
  dashboardCard: {
    border: "0",
    margin: "1em",
    borderRadius: "0.8em",
    padding: "12px",
    background: whiteColor,
    width: "inherit",
    boxShadow: "0 0 0.5em #d6f0fd",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    fontSize: "0.75rem"
  },
  cardPlain: {
    background: "transparent",
    boxShadow: "none"
  },
  cardProfile: {
    marginTop: "30px",
    textAlign: "center"
  },
  cardChart: {
    "& p": {
      marginTop: "0px",
      paddingTop: "0px"
    }
  }
};

export default cardStyle;
