import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

import * as ButtonColor from '@material-ui/core/colors';

export const MainPrimaryButton = withStyles((theme) => ({
    root: {
        textTransform: "initial",
        fontWeight: 400,
        color: theme.palette.getContrastText(ButtonColor.blue[500]),
        backgroundColor: ButtonColor.blue[500],
        borderRadius: "0.5rem",
        fontSize: "0.8rem",
        padding: "0.3rem 1rem",
        '&:hover': {
            backgroundColor: ButtonColor.blue[700],
        },
        '&:disabled': {
            backgroundColor: ButtonColor.blue[300],
            color: theme.palette.getContrastText(ButtonColor.blue[300]),
        }
    },
}))(Button);

export const DashedLinePrimaryButton = withStyles((theme) => ({
    root: {
        textTransform: "initial",
        color: ButtonColor.blue[500],
        borderStyle: "dashed",
        padding: "0.3rem 1rem",
        fontSize: "0.8rem",
        '&:hover': {
            backgroundColor: ButtonColor.lightBlue[50],
            borderStyle: "dashed",
        },
    },
}))(Button);

export const LightPrimaryButton = withStyles((theme) => ({
    root: {
        textTransform: "initial",
        color: theme.palette.getContrastText(ButtonColor.blue[300]),
        backgroundColor: ButtonColor.blue[300],
        padding: "0.3rem 1rem",
        fontSize: "0.8rem",
        '&:hover': {
            backgroundColor: ButtonColor.blue[500],
        },
    },
}))(Button);

export const MainSecondaryButton = withStyles((theme) => ({
    root: {
        textTransform: "initial",
        color: theme.palette.common.white,
        borderRadius: "0.5rem",
        padding: "0.3rem 1rem",
        fontSize: "0.8rem",
        backgroundColor: ButtonColor.green["A400"],
        '&:hover': {
            backgroundColor: ButtonColor.green["A700"],
        },
    },
}))(Button);

export const MainTertiaryButton = withStyles((theme) => ({
    root: {
        textTransform: "initial",
        color: theme.palette.getContrastText(ButtonColor.grey[500]),
        backgroundColor: ButtonColor.grey[500],
        borderRadius: "0.5rem",
        fontSize: "0.8rem",
        padding: "0.3rem 1rem",
        '&:hover': {
            backgroundColor: ButtonColor.grey[400],
            color: theme.palette.getContrastText(ButtonColor.grey[400]),
        },
    },
}))(Button);

export const LighSecondaryButton = withStyles((theme) => ({
    root: {
        textTransform: "initial",
        color: theme.palette.getContrastText(ButtonColor.green[300]),
        backgroundColor: ButtonColor.green[300],
        padding: "0.3rem 1rem",
        fontSize: "0.8rem",
        '&:hover': {
            backgroundColor: ButtonColor.green[500],
        },
    },
}))(Button);

export const DarkPrimaryButton = withStyles((theme) => ({
    root: {
        textTransform: "initial",
        color: theme.palette.getContrastText(ButtonColor.blue[700]),
        backgroundColor: ButtonColor.blue[700],
        padding: "0.3rem 1rem",
        fontSize: "0.8rem",
        '&:hover': {
            backgroundColor: ButtonColor.blue[900],
        },
    },
}))(Button);

export const containedDangerButton = withStyles((theme) => ({
    root: {
        textTransform: "initial",
        color: theme.palette.getContrastText(ButtonColor.red[600]),
        backgroundColor: ButtonColor.red[600],
        borderColor: ButtonColor.red[600],
        borderRadius: "0.5rem",
        margin: "0 10px",
        padding: "0.3rem 1rem",
        fontSize: "0.8rem",
        '&:hover': {
            backgroundColor: ButtonColor.red[700],
            borderColor: ButtonColor.red[700],
        },
    },
}))(Button);

export const outlineDangerButton = withStyles((theme) => ({
    root: {
        textTransform: "initial",
        color: ButtonColor.deepOrange["A400"],
        backgroundColor: "transparent",
        borderColor: ButtonColor.deepOrange["A400"],
        borderRadius: "0.5rem",
        padding: "0.3rem 1rem",
        fontSize: "0.8rem",
        '&:hover': {
            backgroundColor: ButtonColor.deepOrange[100],
            borderColor: ButtonColor.deepOrange[100],
            color: theme.palette.getContrastText(ButtonColor.deepOrange[100]),
        },
    },
}))(Button);

export const textDangerButton = withStyles((theme) => ({
    root: {
        textTransform: "initial",
        color: ButtonColor.deepOrange[700],
        backgroundColor: "transparent",
        borderColor: ButtonColor.deepOrange[50],
        borderRadius: "0.5rem",
        padding: "0.3rem 1rem",
        fontSize: "0.8rem",
        margin: theme.spacing(0),
        '&:hover': {
            backgroundColor: ButtonColor.deepOrange[50],
            borderColor: ButtonColor.deepOrange[50],
            color: theme.palette.getContrastText(ButtonColor.deepOrange[50]),
        },
    },
}))(Button);

export const TextPrimaryButton = withStyles((theme) => ({
    root: {
        textTransform: "initial",
        color: ButtonColor.blue[700],
        backgroundColor: "transparent",
        borderColor: "none",
        margin: theme.spacing(0),
        textTransform: "initial",
        borderRadius: "0.5rem",
        padding: "0.3rem 1rem",
        fontSize: "0.8rem",
        fontWeight: 500,
        '&:hover': {
            backgroundColor: ButtonColor.blue[50],
            borderColor: ButtonColor.blue[50],
            color: theme.palette.getContrastText(ButtonColor.blue[50]),
        },
    },
}))(Button);

export const UploadButton = withStyles((theme) => ({
    root: {
        textTransform: "initial",
        fontSize: "12px",
        fontWeight: 400,
        color: ButtonColor.blue[500],
        backgroundColor: "transparent",
        '&:hover': {
            color: ButtonColor.blue[700],
        },
    },
}))(Button);

