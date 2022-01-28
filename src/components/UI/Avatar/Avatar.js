import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(0),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

export default function ImageAvatar(props) {
    const classes = useStyles();

    let profileDP;

    if (props.imageDP) {
        profileDP = <Avatar className={classes.small} alt={props.name} src={props.imgUrl} />
    } else{
        profileDP = <Avatar className={classes.small}>{props.text}</Avatar>
    }
    return (
        <div className={classes.root}>
            {profileDP}
        </div>
    );
}
