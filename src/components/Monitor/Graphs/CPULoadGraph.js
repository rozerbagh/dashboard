import React, { useEffect, useState, useMemo } from 'react';

import * as formatter from '../../Functions/Formatter'
import loadable from '@loadable/component';
const UplotReact = loadable.lib(() => import('uplot-react'))

const CPUChart = React.memo((props) => {

    const { chartWidth, onChangeSideBar, ...rest } = props;
    const [data, setdata] = useState([
        props.time_str,
        props.total,
        props.total5,
        props.total1,
        props.crit,
        props.warn,
    ]);
    const [tooltipsParams, setTooltipParams] = useState({
        YlabelArr: ['15 min', '5 min', '1 min'],
        yParameter: ''
    })

    const [opts, setOpts] = useState({
        title: `CPU-Load | ${props.cpuCore[0]} Cores`,
        width: 500,
        height: 350,
        plugins: [
            formatter.tooltipsPlugin(tooltipsParams.YlabelArr, tooltipsParams.yParameter),
        ],
        scales: {
            y: {
                auto: false,
                range: [0, Math.max(...props.total) > 50 ? 100 : Math.max(...props.total) <= 50 &&
                    Math.max(...props.total) > 30 ? 50 : Math.max(...props.total) <= 30 &&
                        Math.max(...props.total) > 25 ? Math.max(...props.total) + 10 : Math.max(...props.total) <= 25 && Math.max(...props.total) > 5 ? Math.max(...props.total) + 5 : Math.max(...props.total) <= 5 && Math.max(...props.total) > 1 ? 10 : 1],
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
                label: "15 min",
                // value: (self, rawValue) => rawValue.toFixed(2),

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
                label: "5 min",
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
                label: "1 min",
                // value: (self, rawValue) => rawValue.toFixed(2),

                // series style
                stroke: "#00ff44",
                width: 1,
                fill: "rgb(0,255,68,0.2)",
                // dash: [10, 5],
            },
            {
                // initial toggled state (optional)
                show: Math.max(...props.total) > Math.max(...props.warn) ? true : false,

                spanGaps: false,

                // in-legend display
                label: "Warn",
                // value: (self, rawValue) => rawValue + "%",

                // series style
                stroke: "#f6c23e",
                width: 2,
                fill: "rgb(0,123,255, 0)",
                fontSize: 10,
            },
            {
                // initial toggled state (optional)
                show: Math.max(...props.total) > Math.max(...props.crit) ? true : false,

                spanGaps: false,

                // in-legend display
                label: "Crit",
                // value: (self, rawValue) => rawValue + "%",

                // series style
                stroke: "#e74a3b",
                width: 2,
                fill: "rgb(0,123,255, 0.2)",
                fontSize: 10,
            }
        ],
        axes: [
            {},
            {
                values: (u, vals, space) => vals.map(v => +v.toFixed(1)),
            },
        ],
    });

    const getElementSize = (id) => {
        return {
            width: id.clientWidth,
            height: 350,
        }
    }

    useEffect(() => {
        setOpts(prevState => ({
            ...prevState,
            // width: getElementSize(chartWidth).width,
            // height: getElementSize(chartWidth).height,
            width: parseInt(chartWidth) - parseInt(chartWidth * 10 / 100),
            height: 350,
        }))
    }, [chartWidth, onChangeSideBar])

    return <>
        {/* <div ref={el => el = el} id="cpu-load-uplot"></div> */}
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

export default CPUChart