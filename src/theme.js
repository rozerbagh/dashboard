import { createMuiTheme } from '@material-ui/core';

import {
    defaultFont,
    primaryColor,
    primaryLightColor,
    warningColor,
    dangerColor,
    successColor,
    infoColor,
    roseColor,
    grayColor,
    blackColor,
    whiteColor,
} from './assets/jss/variables';
import { blue } from "@material-ui/core/colors";

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: primaryColor[0],
            light: primaryLightColor[0],
            '@media (max-width:600px)': {
                main: primaryColor[0],
                light: primaryLightColor[0],
            },
        },
        secondary: {
            light: successColor[1],
            main: successColor[0],
            dark: successColor[2],
        },
        info: {
            main: infoColor[0],
        },
    },
    mixins: {
        toolbar: {
            minHeight: 45
        }
    },
    typography: {
        fontFamily: defaultFont,
        h1: {
            fontFamily: defaultFont,
        },
        h2: {
            fontFamily: defaultFont,
        },
        h3: {
            fontFamily: defaultFont,
        },
        h4: {
            fontFamily: defaultFont,
        },
        h5: {
            fontFamily: defaultFont,
        },
        h6: {
            fontFamily: defaultFont,
            textTransform: "initial",
        },
        subtitle1: {
            fontFamily: defaultFont,
            fontWeight: 400,
        },
        subtitle2: {
            fontFamily: defaultFont,
            textTransform: "capitalize",
            fontWeight: 400,
        },
        body1: {
            fontFamily: defaultFont,
            fontSize: "0.8rem",
            color: "#132739",
        },
        body2: {
            fontFamily: defaultFont,
            fontSize: "0.8rem",
        },
        caption: {
            fontFamily: defaultFont,
            textTransform: "capitalize",
            color: "#0B2339",
            fontSize: "1rem",
            fontWeight: 400,
        },
        overline: {
            fontFamily: defaultFont,
        },
    },
    overrides: {
        // For overriding the date time pickers styles
        MuiPickerBasePicker: {
            container: {
                width: "200px",
            },
            pickerView: {
                height: "100px",
            }
        },
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: blue.A200,
                height: "60px",
                display: "flex",
                flexDirection: "column",
            },
        },
        MuiPickersCalendarHeader: {
            switchHeader: {
                // backgroundColor: blue.A200,
                // color: "white",
            },
        },
        MuiPickersDay: {
            day: {
                color: blue.A700,
                fontSize: "10px",
            },
            daySelected: {
                backgroundColor: blue["400"],
            },
            dayDisabled: {
                color: blue["100"],
            },
            current: {
                color: blue["900"],
            },
        },
        MuiPickersModal: {
            dialogAction: {
                color: blue["400"],
            },
        },

        MuiToolbar: {
            gutters: {
                paddingLeft: "0px",
                paddingRight: "0px",
                padding: "0px",
                '@media (min-width: 600px) ': {
                    paddingLeft: "0px",
                    paddingRight: "20px",
                }
            },
            regular: {
                minHeight: "3rem"
            }
        },
        MuiGrid: {
            container: {
                padding: "0px",
                margin: "0px",
            }
        },
        MuiCheckbox: {
            root: {
                margin: "0px",
                padding: "0px",
            }
        },
        MuiCircularProgress: {
            root: {

            },
            colorSecondary: {
                color: "#fff"
            },
        },
        MuiInputBase: {
            root: {
                fontSize: "0.8rem",
            },
        },
        MuiInputLabel: {
            root: {
                fontSize: "0.8rem",
            },
        },
        MuiOutlinedInput: {
            input: {
                padding: "1rem 0.7rem",
            }
        },
        MuiInputLabel: {
            outlined: {
                fontSize: "0.8rem",
                transform: "translate(0.7rem, 1rem) scale(1)"
            }
        },
        MuiSelect: {
            root: {
                width: "100%",
                fontSize: "0.8rem"
            },
            selectMenu: {
                minHeight: "0.8em",
                maxHeight: "0.8em",
            }
        },
        MuiMenuItem: {
            root: {
                fontSize: "0.8rem",
            },
        },
        MuiButton: {
            containedSecondary: {
                color: "#fff",
                textTransform: "initial"
            }
        },
        MuiTableCell: {
            body: {
                padding: "10px"
            }
        },
        MuiSelect: {
            root: {
                paddingTop: "10px",
                paddingBottom: "10px",
            }
        },
        MuiTableCell: {
            root: {
                padding: "5px",
            }
        },
        MuiDialog: {
            paperWidthSm: {
                maxWidth: "70%"
            },
            paper: {
                margin: "60px",
            },
            paperScrollPaper: {
                overflow: "none",
                overflowY: "scroll",
                overflowX: "none",
                position: "relative",
                "&::-webkit-scrollbar-track": {
                    boxShadow: "inset 0 0 0.2em #007bffa4",
                    marginRight: "1em",
                    borderRadius: "1em",
                },

                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#007bff",
                    borderRadius: "1em",
                },

                "&::-webkit-scrollbar": {
                    width: "0.2em",
                },
            }
        },
        MuiDialogContent: {
            root: {
                overflow: "none",
                overflowY: "none",
                overflowX: "none",
            }
        },
        MuiPickerBasePicker: {
            container: {
                fontSize: "0.8rem",
            }
        },
        MuiTab: {
            root: {
                textTransform: "capitalize",
            }
        },
        MuiTabs: {
            root: {
                border: "none",
            }
        },
    },
    props: {

    }
});