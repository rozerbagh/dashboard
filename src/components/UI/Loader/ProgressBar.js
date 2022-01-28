import React from 'react';
import styled from 'styled-components';
import { LinearProgress } from "@material-ui/core";
import { makeStyles, withStyles } from '@material-ui/core/styles';


const ProgressBox = styled.div`
    display : flex;
    align-items: center;
`;

const ProgressText = styled.span`
    font-size: 0.7rem;
    margin-right: 5px;
    font-weight: 500;
`;
const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 3,
        width: "50px",
    },
    colorPrimary: {
        backgroundColor: "#c3dcff",
    },
    bar: {
        borderRadius: 2,
        backgroundColor: '#1a90ff',
    },
}))(LinearProgress);

// Inspired by the former Facebook spinners.
const useStylesFacebook = makeStyles((theme) => ({
    root: {
        position: 'relative',
    },
    bottom: {
        color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    top: {
        color: '#1a90ff',
        animationDuration: '550ms',
        position: 'absolute',
        left: 0,
    },
    circle: {
        strokeLinecap: 'round',
    },
}));


function ProgressBar(props) {
    let progressBar;
    let value = props.barWidth * 8;
    let width = 50;
    let bandwidth;
    let csswidth = 0;
    let magabitdata = value / 1000000; // covert bit to Megabit
    if (props.bandwidth == true) {
        if (magabitdata < 1) {
            value = magabitdata * 1000; // covert Megabit to Kilobit
            bandwidth = parseFloat(value.toFixed(2)) + ' Kbps';
            csswidth = parseInt(((magabitdata / 5) * 50).toFixed(0))
        } else if (magabitdata > 1000) {
            value = magabitdata / 1000; // covert Megabit to Gigabit
            bandwidth = parseFloat(value.toFixed(2)) + ' Gbps';
            csswidth = parseInt(value.toFixed(0))
        } else {
            value = magabitdata
            if (value > 50) {
                bandwidth = parseFloat(value.toFixed(2)) + ' Mbps';
                csswidth = parseInt(((magabitdata / 1000) * 50).toFixed(0))
            } else if (value < 5) {
                bandwidth = parseFloat(value.toFixed(2)) + ' Mbps';
                csswidth = parseInt(value.toFixed(0))
            } else {
                bandwidth = parseFloat(value.toFixed(2)) + ' Mbps';
                csswidth = parseInt(value.toFixed(0))
            }

        }
        progressBar = <BorderLinearProgress variant="determinate" value={csswidth} />
    } else {
        bandwidth = 0;
        progressBar = <BorderLinearProgress variant="determinate" value={csswidth} />
    }
    return (
        <ProgressBox>
            <div>{progressBar}</div> <ProgressText>{bandwidth}</ProgressText>
        </ProgressBox>
    )
}

export default ProgressBar;
