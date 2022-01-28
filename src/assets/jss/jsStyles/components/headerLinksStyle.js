import {
  defaultFont,
  dangerColor,
  whiteColor
} from "../../variables";

const headerLinksStyle = theme => ({
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  searchWrapper: {
    marginRight: theme.spacing(1)
  },
  navlinks: {
    display: "flex",
    alignItems: "center"
  },
  small_dp: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large_dp: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  createTicket: {
    backgroundColor: "#007bff",
    position: "absolute",
    textAlign: "center",
    padding: "0.2em",
    color: "#ffffff",
    bottom: "-100%",
    borderRadius: "0.5em",
    cursor: "pointer",
    width: "100%",
    "&::before": {
      content: '',
      position: "absolute",
      width: "16px",
      height: "16px",
      top: "0",
      left: "0",
      marginLeft: "-8px",
      borderTop: "1px solid #007bff",
      borderLeft: "1px solid #007bff",
      borderRight: "1px solid transparent",
      borderBottom: "1px solid transparent",
      transform: "rotate(45deg)",
      backgroundColor: "#fff",
      marginTop: "-8px",
      borderRadius: "1px",
      zIndex: "2029"
    }
  }
});

export default headerLinksStyle;
