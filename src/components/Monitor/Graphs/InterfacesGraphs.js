import React, { useEffect, useState, useMemo } from 'react';

import * as formatter from '../../Functions/Formatter'
import loadable from '@loadable/component';
const UplotReact = loadable.lib(() => import('uplot-react'))

const InterfacesPackets = React.memo((props) => {

    const { chartWidth, interfaceName, onChangeSideBar, ...rest } = props;
    const [tooltipsParams, setTooltipParams] = useState({
        YlabelArr: ['Unicast - In', 'Unicast - Out', 'Multicast - In', 'Multicast - Out'],
        yParameter: 'pkt/s',
    })
    const [data, setdata] = useState([
        props.time_str,
        props.inunicast,
        props.outunicast,
        props.inMulticast,
        props.outMulticast
    ]);
    const [opts, setOpts] = useState({
        title: `${interfaceName} - packets`,
        width: 500,
        height: 350,
        plugins: [
            formatter.tooltipsPlugin(tooltipsParams.YlabelArr, tooltipsParams.yParameter),
        ],
        scales: {
            y: {
                auto: false,
                range: [0, Math.max(...props.maxvalue) > 50 && Math.max(...props.maxvalue) <= 99 ?
                    100 : Math.max(...props.maxvalue) <= 50 &&
                        Math.max(...props.maxvalue) > 30 ? 50 : Math.max(...props.maxvalue) <= 30 &&
                            Math.max(...props.maxvalue) > 25 ? Math.max(...props.maxvalue) + 10 : Math.max(...props.maxvalue) <= 25 && Math.max(...props.maxvalue) > 5 ? Math.max(...props.maxvalue) + 5 : Math.max(...props.maxvalue) <= 5 && Math.max(...props.maxvalue) > 1 ? 10 :
                                Math.max(...props.maxvalue) + 150],
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
                label: "Unicast - In",
                value: (self, rawValue) => rawValue.toFixed(0) + `p/s`,

                // series style
                stroke: "#007bff",
                width: 1,
                fill: "rgb(0,123,255, 0.2)",
                fontSize: 10,
                // dash: [10, 5],
            },
            {
                // initial toggled state (optional)
                show: true,

                spanGaps: false,

                // in-legend display
                label: "Unicast - Out",
                value: (self, rawValue) => rawValue.toFixed(0) + "p/s",

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
                label: "Multicast - In",
                value: (self, rawValue) => rawValue.toFixed(0) + "p/s",

                // series style
                stroke: "#00ff44",
                width: 1,
                fill: "rgb(0,255,68,0.2)",
                fontSize: 10,
                // dash: [10, 5],
            },
            {
                // initial toggled state (optional)
                show: true,

                spanGaps: false,

                // in-legend display
                label: "Multicast - Out",
                value: (self, rawValue) => rawValue.toFixed(0) + "p/s",

                // series style
                stroke: "#6200ff",
                width: 1,
                fill: "rgb(98, 0, 255, 0.2)",
                // dash: [10, 5],
            },
        ],
        axes: [
            {},
            {
                values: (u, vals, space) => vals.map(v => {
                    return Math.abs(v) > 999 ?
                        Math.sign(v) * ((Math.abs(v) / 1000).toFixed(1)) + 'k' :
                        Math.sign(v) * Math.abs(v)

                }),
            },
        ],
    });

    useEffect(() => {
        setOpts(prevState => ({
            ...prevState,
            width: parseInt(chartWidth) - parseInt(chartWidth * 10 / 100),
            height: 350,
        }))
    }, [chartWidth, onChangeSideBar])


    return <>
        <div style={{ height: "30rem" }}>
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
        </div>
    </>;

})

export default InterfacesPackets