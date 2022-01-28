import {
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  subPrimaryCardHeader,
  roseCardHeader,
  grayColor,
  whiteColor
} from "../../variables";

const cardIconStyle = {
  cardIcon: {
    "&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$subPrimaryCardHeader,&$roseCardHeader": {
      borderRadius: "0.7em",
      width: "5em",
      height: "5em",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      color: whiteColor,
    }
  },
  horizontalCardIcon: {
    "&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$subPrimaryCardHeader,&$roseCardHeader": {
      borderRadius: "0.7em",
      margin: "0",
      width: "100%",
      height: "2em",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      color: whiteColor
    }
  },
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  subPrimaryCardHeader,
  roseCardHeader,
  whiteColor
};

export default cardIconStyle;
