import React, { useEffect, useState } from 'react';

import * as formatter from '../../Functions/Formatter'
import loadable from '@loadable/component';
const UplotReact = loadable.lib(() => import('uplot-react'))

const TCPConnChart = (props) => {

    const [maxValue, setMaxValue] = useState(0);
    const [tooltipsParams, setTooltipParams] = useState({
        YlabelArr: ['Listen', 'Time wait', 'Established'],
        yParameter: '',
    });

    const { chartWidth, onChangeSideBar, ...rest } = props;

    const [data, setdata] = useState([props.time_str,
    props.tcpConn_Listen,
    props.tcpConn_TimeWait,
    props.tcpConn_Established]);

    const [opts, setOpts] = useState({
        title: "TCP Connections",
        width: 500,
        height: 350,
        plugins: [
            formatter.tooltipsPlugin(tooltipsParams.YlabelArr, tooltipsParams.yParameter),
        ],
        scales: {
            y: {
                auto: false,
                range: [0, Math.max(...props.maxvalue) + 100],
            },
        },
        focus: {
            alpha: 0.3,
        },
        cursor: formatter.cursorOpts,
        series: [
            {},
            {
                // initial toggled state (optional)
                show: true,

                spanGaps: false,

                // in-legend display
                label: "Listen",
                // value: (self, rawValue) => rawValue.toFixed(2) + ` ${banwidthUnit}`,

                // series style
                stroke: "#007bff",
                width: 1,
                fill: "rgb(0,123,255, 0.2)",
                // dash: [10, 5],
            },
            {
                // initial toggled state (optional)
                show: true,

                spanGaps: false,

                // in-legend display
                label: "Time wait",
                // value: (self, rawValue) => rawValue.toFixed(2),

                // series style
                stroke: "#ff9a00",
                width: 1,
                fill: "rgb(255,154,0,0.2)",
                // dash: [10, 5],
            },
            {
                // initial toggled state (optional)
                show: true,

                spanGaps: false,

                // in-legend display
                label: "Established",
                // value: (self, rawValue) => rawValue.toFixed(2),

                // series style
                stroke: "#00ff44",
                width: 1,
                fill: "rgb(0,255,68,0.2)",
                // dash: [10, 5],
            },
        ],
        axes: [
            {},
            {
                values: (u, vals, space) => vals.map(v => +v.toFixed(1)),
            },
        ],
    });

    useEffect(() => {
        const maxVal = [];
        for (var i = 0; i < props.tcpConn_Listen.length; i++) {
            maxVal.push(parseFloat(props.tcpConn_Listen[i]))
        }
        for (var i = 0; i < props.tcpConn_TimeWait.length; i++) {
            maxVal.push(parseFloat(props.tcpConn_TimeWait[i]))
        }
        for (var i = 0; i < props.tcpConn_Established.length; i++) {
            maxVal.push(parseFloat(props.tcpConn_Established[i]))
        }
        setMaxValue(maxVal)
        setOpts(prevState => ({
            ...prevState,
            scales: {
                ...prevState.scales,
                y: {
                    ...prevState.scales.y,
                    range: [0, Math.max(...maxVal) + 50]
                },
            },
        }))
    }, [props.tcpConn_Listen, props.tcpConn_TimeWait, props.tcpConn_Established])

    useEffect(() => {
        setOpts(prevState => ({
            ...prevState,
            width: parseInt(chartWidth) - parseInt(chartWidth * 10 / 100),
            height: 350,
        }))
    }, [chartWidth, onChangeSideBar])

    return <>
        {/* <div ref={el => el = el} id="tcp_conn-uplot"></div> */}
        <UplotReact fallback={<div>Loading...</div>}
            children={
                ({ default: Uplot }) => <Uplot
                    options={opts}
                    data={data}
                    onCreate={(chart) => chart.setSize({
                        width: opts.width,
                        height: opts.height,
                    })}
                    onDelete={(chart) => { }}
                />
            }
        />
    </>;

}

export default TCPConnChart