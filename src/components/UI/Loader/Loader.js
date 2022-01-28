import React from 'react';

import { CircularProgress, LinearProgress } from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    customRoot: {
        position: 'relative',
    },
    smallLoader:{
        width: "10px"
    },
    bottom: {
        color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
      },
      top: {
        color: '#1a90ff',
        animationDuration: '850ms',
        position: 'absolute',
        left: 0,
      },
      circle: {
        strokeLinecap: 'round',
      },
}));

function CustomCircularProgress(props) {
    const classes = useStyles();
  
    return (
      <div className={classes.customRoot}>
        <CircularProgress
          variant="determinate"
          className={classes.bottom}
          size={40}
          thickness={4}
          {...props}
          value={100}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          className={classes.top}
          classes={{
            circle: classes.circle,
          }}
          size={40}
          thickness={4}
          {...props}
        />
      </div>
    );
  }

function Loader(props) {

    const classes = useStyles();
    let loader;
    if(props.whiteSmallLoader){
        loader = <CircularProgress color="secondary" size="20px" thickness={4}/>
    } else if (props.smallLoader) {
        loader = <CircularProgress color="inherit" size="20px" thickness={4} />
    } else if (props.bigLoader){
        loader = <CustomCircularProgress />
    }
    return (
        <div>
            {loader}
        </div>
    )
}

export default Loader;
