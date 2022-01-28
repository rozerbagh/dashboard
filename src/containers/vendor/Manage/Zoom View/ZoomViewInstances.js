import React, { useState, useEffect, useMemo } from 'react';

import { connect } from 'react-redux'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Loader from "../../../../components/UI/Loader/Loader";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        borderBottom: "1px solid #ccc",
        borderRadius: 0,
    },
    loaderContainer: {
        position: "relative",
        margin: "0 auto",
        width: "60px",
        height: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
});



const ZoomViewInstances = (props) => {

    const { staticContext, instancesList, lan_ip, updateZoomView, ...rest } = props

    const classes = useStyles();
    const [instances, setInstances] = useState([]);

    const [lanIP, setLanIP] = useState('');

    useEffect(() => {
        setInstances(instancesList);
        // if (instancesList.length > 0) {
        //     setLanIP(instancesList[0].lan_ip)
        // }
    }, [instancesList]);

    const handleIPchange = (lanip, wanip) => {
        // console.log(lanip, wanip, instancesList)
        sessionStorage.setItem('curr_selected_lip', lanip)
        sessionStorage.setItem('curr_selected_wip', wanip)
        updateZoomView(lanip, wanip);
        setLanIP(lanip)
    }

    useMemo(() => {
        const lip = sessionStorage.getItem('curr_selected_lip')
        const wip = sessionStorage.getItem('curr_selected_wip')
        setLanIP(lan_ip);
    }, [lan_ip]);

    return (
        <div className={classes.root}>
            {props.loader ?
                <div className={classes.loaderContainer}>
                    <Loader bigLoader style={{ margin: "0 auto" }} />
                </div> : <>
                    {instances.map((inst, index) => {
                        return <div {...rest}
                            key={inst.host_id}
                            style={{
                                cursor: "pointer",
                                whiteSpace: "nowrap",
                                padding: "2px 0px",
                                color: lanIP === inst.lan_ip ? "#007bff" : "inherit",
                                fontSize: "0.9em",
                                fontWeight: 400,
                            }}
                            onClick={() => handleIPchange(inst.lan_ip, inst.wan_ip)}
                        >
                            {inst.vm_hostname}
                        </div>
                    })}</>}

        </div>
    )
}


export default ZoomViewInstances;
