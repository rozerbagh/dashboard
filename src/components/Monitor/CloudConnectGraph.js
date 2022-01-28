import React, { useEffect, useState, useMemo } from 'react';

import * as formatter from '../Functions/Formatter'
import loadable from '@loadable/component';
const UplotReact = loadable.lib(() => import('uplot-react'))

const CloudConnectGraph = (props) => {


    const [YlabelArr, setYlabelArr] = useState(['Received', 'Transmitted']);
    const [yParameter, setYParameter] = useState('b/s');

    const { chartWidth } = props;

    const [data, setdata] = useState([]);
    const [opts, setOpts] = useState({
        title: "",
        width: 500,
        height: 350,
        plugins: [
            formatter.internetTooltipsPlugin(YlabelArr, yParameter),
        ],
        scales: {
            y: {
                auto: false,
                range: [0, Math.max(...props.transmit) + 100],
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
                label: "Received",
                value: (self, value) => {
                    value = value * 8;
                    var magabitdata = value / 1000000; // covert bit to Megabit
                    if (magabitdata < 1) {
                        value = magabitdata * 1000; // covert Megabit to Kilobit
                        return parseFloat(value.toFixed(2)) + ' Kbps';
                    } else if (magabitdata > 1000) {
                        value = magabitdata / 1000; // covert Megabit to Gigabit
                        return parseFloat(value.toFixed(2)) + ' Gbps';
                    } else {
                        value = magabitdata
                        return parseFloat(value.toFixed(2)) + ' Mbps';
                    }
                },

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
                label: "Transmitted",
                value: (self, value) => {
                    value = value * 8;
                    var magabitdata = value / 1000000; // covert bit to Megabit
                    if (magabitdata < 1) {
                        value = magabitdata * 1000; // covert Megabit to Kilobit
                        return parseFloat(value.toFixed(2)) + ' Kbps';
                    } else if (magabitdata > 1000) {
                        value = magabitdata / 1000; // covert Megabit to Gigabit
                        return parseFloat(value.toFixed(2)) + ' Gbps';
                    } else {
                        value = magabitdata
                        return parseFloat(value.toFixed(2)) + ' Mbps';
                    }
                },

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
                values: (u, vals, space) => vals.map(value => {
                    value = value * 8;
                    var magabitdata = value / 1000000; // covert bit to Megabit
                    if (magabitdata < 1) {
                        value = magabitdata * 1000; // covert Megabit to Kilobit
                        return parseFloat(value.toFixed(1)) + 'K/s';
                    } else if (magabitdata > 1000) {
                        value = magabitdata / 1000; // covert Megabit to Gigabit
                        return parseFloat(value.toFixed(1)) + 'G/s';
                    } else {
                        value = magabitdata
                        return parseFloat(value.toFixed(1)) + 'M/s';
                    }
                }),
            },
        ],
    });

    useEffect(() => {
        setdata(prevState => [...prevState, props.time_str, props.recived, props.transmit])
    }, [props.time_str, props.recived, props.transmit])

    useEffect(() => {
        setOpts(prevState => ({
            ...prevState,
            width: Math.floor(chartWidth),
            height: 350,
        }))
    }, [chartWidth])

    return <>
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

export default CloudConnectGraph