
const hexToRgb = input => {
  input = input + "";
  input = input.replace("#", "");
  let hexRegex = /[0-9A-Fa-f]/g;
  if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
    throw new Error("input is not a valid hex color.");
  }
  if (input.length === 3) {
    let first = input[0];
    let second = input[1];
    let last = input[2];
    input = first + first + second + second + last + last;
  }
  input = input.toUpperCase();
  let first = input[0] + input[1];
  let second = input[2] + input[3];
  let last = input[4] + input[5];
  return (
    parseInt(first, 16) +
    ", " +
    parseInt(second, 16) +
    ", " +
    parseInt(last, 16)
  );
};

// ##############################
// // // Variables - Styles that are used on more than one component
// #############################

const drawerWidth = 240;

const transition = {
  transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)",
};

const headerContainer = {
  fontSize: "1rem",
};

const container = {
  fontSize: "0.7rem",
  padding: "0.2rem",
  width: "100%",
  position: "relative"
};

const defaultFont = {
  fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
};

const primaryColor = ["#12ED63", "#2F87FF", "#2A89FB", "#25fa9a", "#4DB6AC"];
const primaryLightColor = ["#66a7ff", "#75b4ff", "#6bffbc", "#c375ff"];
const successColor = ["#46db49", "#66bb6a", "#47b34c", "#6fbf19"];
const warningColor = ["#EFA724", "#fcd926", "#fb8c00", "#F1BF33"];
const dangerColor = ["#F73C39", "#FC521E", "#EF5350", "#f55a4e"];
const infoColor = ["#903ae0", "#4a74f0", "#5189d6", "#9b5bf0"];
const roseColor = ["#e91e63", "#ec407a", "#d81b60", "#eb3573"];
const grayColor = [
  "#2D5469",
  "#5A7081",
  "#D8D8D8",
  "#AAAAAA",
  "#D2D2D2",
  "#EAEAFF",
  "#b4b4b4",
  "#555555",
  "#333",
  "#a9afbb",
  "#eee",
  "#e7e7e7"
];
const blackColor = "#000000";
const whiteColor = "#FFFFFF";

const boxShadow = {
  boxShadow:
    "0 10px 30px -12px rgba(" +
    hexToRgb(blackColor) +
    ", 0.42), 0 4px 25px 0px rgba(" +
    hexToRgb(blackColor) +
    ", 0.12), 0 8px 10px -5px rgba(" +
    hexToRgb(blackColor) +
    ", 0.2)"
};

const primaryBoxShadow = {
  boxShadow:
    "0 4px 20px 0 rgba(" +
    hexToRgb(blackColor) +
    ",.14), 0 7px 10px -5px rgba(" +
    hexToRgb(primaryColor[0]) +
    ",.4)"
};
const infoBoxShadow = {
  boxShadow:
    "0 4px 20px 0 rgba(" +
    hexToRgb(blackColor) +
    ",.14), 0 7px 10px -5px rgba(" +
    hexToRgb(infoColor[0]) +
    ",.4)"
};
const successBoxShadow = {
  boxShadow:
    "0 4px 20px 0 rgba(" +
    hexToRgb(blackColor) +
    ",.14), 0 7px 10px -5px rgba(" +
    hexToRgb(successColor[0]) +
    ",.4)"
};
const warningBoxShadow = {
  boxShadow:
    "0 4px 20px 0 rgba(" +
    hexToRgb(blackColor) +
    ",.14), 0 7px 10px -5px rgba(" +
    hexToRgb(warningColor[0]) +
    ",.4)"
};
const dangerBoxShadow = {
  boxShadow:
    "0 4px 20px 0 rgba(" +
    hexToRgb(blackColor) +
    ",.14), 0 7px 10px -5px rgba(" +
    hexToRgb(dangerColor[0]) +
    ",.4)"
};
const roseBoxShadow = {
  boxShadow:
    "0 4px 20px 0 rgba(" +
    hexToRgb(blackColor) +
    ",.14), 0 7px 10px -5px rgba(" +
    hexToRgb(roseColor[0]) +
    ",.4)"
};

const warningCardHeader = {
  background: warningColor[3],
  // "linear-gradient(60deg, " + warningColor[1] + ", " + warningColor[3] + ")",
  // ...warningBoxShadow
};
const successCardHeader = {
  // background: "linear-gradient(60deg, " + successColor[1] + ", " + successColor[2] + ")",
  background: successColor[1],
  color: whiteColor,
  // ...successBoxShadow
};
const dangerCardHeader = {
  // background: "linear-gradient(60deg, " + dangerColor[1] + ", " + dangerColor[2] + ")",
  background: dangerColor[2],
  color: whiteColor,
  // ...dangerBoxShadow
};
const infoCardHeader = {
  background:
    "linear-gradient(60deg, " + infoColor[1] + ", " + infoColor[2] + ")",
  color: whiteColor,
  // ...infoBoxShadow
};
const primaryCardHeader = {
  // background: "linear-gradient(60deg, " + primaryColor[1] + ", " + primaryColor[2] + ")",
  background: primaryColor[1],
  color: whiteColor,
  // ...primaryBoxShadow
};
const subPrimaryCardHeader = {
  // background: "linear-gradient(60deg, " + primaryColor[1] + ", " + primaryColor[2] + ")",
  background: primaryColor[3],
  color: whiteColor,
  // ...primaryBoxShadow
};
const roseCardHeader = {
  background:
    "linear-gradient(60deg, " + roseColor[1] + ", " + roseColor[2] + ")",
  color: whiteColor,
  // ...roseBoxShadow
};

const cardActions = {
  margin: "0 20px 10px",
  paddingTop: "10px",
  borderTop: "1px solid " + grayColor[10],
  height: "auto",
  ...defaultFont
};

const cardHeader = {
  borderRadius: "3px",
};

const card = {
  position: "relative",
  width: "100%",
  margin: "25px 0",
  boxShadow: "0 1px 4px 0 rgba(" + hexToRgb(blackColor) + ", 0.14)",
  borderRadius: "3px",
  color: "rgba(" + hexToRgb(blackColor) + ", 0.87)",
  background: whiteColor
};

const defaultBoxShadow = {
  border: "0",
  borderRadius: "3px",
  boxShadow:
    "0 10px 20px -12px rgba(" +
    hexToRgb(blackColor) +
    ", 0.42), 0 3px 20px 0px rgba(" +
    hexToRgb(blackColor) +
    ", 0.12), 0 8px 10px -5px rgba(" +
    hexToRgb(blackColor) +
    ", 0.2)",
  padding: "10px 0",
  transition: "all 150ms ease 0s"
};

const title = {
  color: grayColor[2],
  textDecoration: "none",
  fontWeight: "300",
  marginTop: "30px",
  marginBottom: "25px",
  minHeight: "32px",
  fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  "& small": {
    color: grayColor[1],
    fontWeight: "400",
    lineHeight: "1"
  }
};

const cardTitle = {
  ...title,
  marginTop: "0",
  marginBottom: "3px",
  minHeight: "auto",
  "& a": {
    ...title,
    marginTop: ".625rem",
    marginBottom: "0.75rem",
    minHeight: "auto"
  }
};

const cardSubtitle = {
  marginTop: "-.375rem"
};

const cardLink = {
  "& + $cardLink": {
    marginLeft: "1.25rem"
  }
};

export {
  hexToRgb,
  //variables
  drawerWidth,
  transition,
  headerContainer,
  container,
  boxShadow,
  card,
  defaultFont,

  primaryLightColor,
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  blackColor,
  whiteColor,


  primaryBoxShadow,
  infoBoxShadow,
  successBoxShadow,
  warningBoxShadow,
  dangerBoxShadow,
  roseBoxShadow,
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  subPrimaryCardHeader,
  roseCardHeader,
  cardActions,
  cardHeader,
  defaultBoxShadow,
  title,
  cardTitle,
  cardSubtitle,
  cardLink
};
