import {
  successColor,
  whiteColor,
  grayColor,
  hexToRgb
} from "../../variables";
import { fade } from "@material-ui/core/styles";
const dashboardStyle = theme => ({
  container: {
    fontSize: "0.7rem",
    padding: "0.2rem",
    width: "100%",
    height: 'calc(100% - 3rem)',
    position: "relative",
    boxShadow: "inset 0em 0em 2em #ceebfa",
    overflowY: "scroll",
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

  instanceRow: {
    display: "grid",
    gridTemplateColumns: "3em 3em 30em 10em 15em 8em 15em 6em 4em",
    gridTemplateRows: "auto",
    padding: "0.5em 1.5em",
    borderRadius: "0.7em",
  },
  loaderContainer: {
    position: "relative",
    margin: "0 auto",
    width: "500px",
    height: "600px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  table: {
    minWidth: 700,
  },
  heading: {
    padding: "5px 10px",
    color: " #132739"
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  cardBox: {
    padding: theme.spacing(1),
    border: "0",
    margin: "1em",
    borderRadius: "0.8em",
    background: "#fff",
    width: "100%",
    boxShadow: "0 0 0.5em #d6f0fd",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    wordWrap: "break-word",
    fontSize: "0.75rem"
  },
  cardHeader: {
    textTransform: "uppercase",
    fontSize: "1.1em",
    margin: " 0px"
  },
  link: {
    margin: "0px",
    padding: "0px",
    width: "100%"
  },
  paynowCard: {
    marginTop: "-8px",
    display: "flex",
    flexDirection: "column",
  },
  flexRow: {
    display: "flex",
    flexDirection: "space-between",
    width: "100%",
  },
  TicketsTopBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "0.95em",
  },
  tickets_child: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "3px 0",
    padding: "0px 5px",
    borderRadius: "0.5em",
  },

  pageContent: {
    margin: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
    [theme.breakpoints.up("md")]: {
      minWidth: "400px"
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
  reboot_pageContent: {
    margin: theme.spacing(0),
    padding: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      width: "400px"
    }
  },
  reboot_container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px"
  },
  reboot_contentRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px"
  },

  config_row: {
    display: "flex",
    alignItems: "center",
    padding: "0 10px",
  },
  tags_btn_word: {
    backgroundColor: "#5A7081",
    color: "white",
    padding: "5px",
    borderRadius: "3px",
    textAlign: "center",
    width: "3em",
    height: "auto",
    fontSize: "0.7rem",
    cursor: "pointer",
  },

  customRow: {
    width: "100%",
    '&:nth-of-type(even)': {
      backgroundColor: fade(theme.palette.primary.light, 0.15),
      border: "none",
      borderRadius: theme.spacing(1),
    },
  },


  root: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 2fr",
    // gridTemplateAreas: "vm_hostname vm_hostname vm_hostname vm_os vm_wan_ip network_info vm_capacity vm_lan_ip network_info",
    margin: "0.5rem 0.3rem",
    border: "1px solid #ccc",
    borderRadius: "0.5rem",
    padding: "1em",
    boxShadow: "0 0 10px #eeeeee",
  },
  hostname: {
    gridArea: "1/1/span 1/span 3",
    borderBottom: "1px solid #ccc",
    padding: "0.5em",
  },
  os: {
    gridArea: "2/1/span 1/span 1",
    padding: "0.5em",
  },
  capacity: {
    gridArea: "3/1/span 3/ span 1",
    padding: "0.5em",
  },
  publicIp: {
    gridArea: "2/2/span 2/ span 2",
    padding: "0.5em",
  },
  privateIP: {
    gridArea: "3/2/span 2/ span 2",
    padding: "0.5em",
  },
  Ips: {
    gridArea: "2/3/span 3/ span 3",
    padding: "0.5em",
  },

});

export default dashboardStyle;
