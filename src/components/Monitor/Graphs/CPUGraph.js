import React, { useEffect, useState, Suspense } from 'react';
import * as formatter from '../../Functions/Formatter'
import loadable from '@loadable/component';
import { setDate } from 'date-fns';
const UplotReact = loadable.lib(() => import('uplot-react'))
// import UplotReact from 'uplot-react';

const CPUChart = React.memo((props) => {

    const { chartWidth, onChangeSideBar, ...rest } = props;
    const time = [];
    const to = new Date();
    const initialdata = [];
    let from = 1;
    for (var i = 15; i >= 1; i--) {
        from = i * 1000 * 60;
        time.push(to.getTime() - from)
        initialdata.push(from)
    }
    const [tooltipsParams, setTooltipParams] = useState({
        YlabelArr: ['Used'],
        yParameter: '%'
    })

    const [data, setdata] = useState([time, initialdata, initialdata, initialdata]);
    const [opts, setOpts] = useState({
        title: "CPU-Utilization",
        width: 500,
        height: 350,
        plugins: [
            formatter.tooltipsPlugin(tooltipsParams.YlabelArr, tooltipsParams.yParameter),
        ],
        scales: {
            x: {
                time: true,
            },
            y: {
                auto: false,
                range: [0, Math.max(...initialdata)],
            },
        },
        focus: {
            alpha: 0.3,
        },
        cursor: formatter.cursorOpts,
        series: [
            {
                show: true,
                size: 0,
                labelSize: 0,
                ticks: {
                    show: true,

                }
            },
            {
                // initial toggled state (optional)
                show: true,
                spanGaps: false,
                // in-legend display
                label: "Used",
                value: (self, rawValue) => rawValue.toFixed(2) + "%",

                // series style
                stroke: "#007bff",
                width: 1,
                fill: "rgb(0,123,255, 0.2)",
                fontSize: 10,
                // dash: [10, 5],
            },
            {
                // initial toggled state (optional)
                show: Math.max(...props.cpudata) > Math.max(...props.warn) ? true : false,

                spanGaps: false,

                // in-legend display
                label: "Warn",
                value: (self, rawValue) => rawValue + "%",

                // series style
                stroke: "#f6c23e",
                width: 2,
                fill: "rgb(0,123,255, 0)",
                fontSize: 10,
            },
            {
                // initial toggled state (optional)
                show: Math.max(...props.cpudata) > Math.max(...props.crit) ? true : false,

                spanGaps: false,

                // in-legend display
                label: "Crit",
                value: (self, rawValue) => rawValue + "%",

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
                values: (u, vals, space) => vals.map(v => +v.toFixed(1) + "%"),
            },
        ],
    });
    useEffect(() => {
        setdata([props.time_str, props.cpudata, props.warn, props.crit])

        setOpts(prevState => ({
            ...prevState,
            scales: {
                y: {
                    auto: false,
                    range: [0, Math.max(...props.cpudata) > 50 ? 100 :
                        Math.max(...props.cpudata) <= 50 && Math.max(...props.cpudata) > 30 ? 50 :
                            Math.max(...props.cpudata) <= 30 && Math.max(...props.cpudata) > 25 ?
                                Math.max(...props.cpudata) + 10 : Math.max(...props.cpudata) <= 25 &&
                                    Math.max(...props.cpudata) > 5 ? Math.max(...props.cpudata) + 5 :
                                    Math.max(...props.cpudata) <= 5 && Math.max(...props.cpudata) > 1 ? 10 : 1],
                },
            },
        }));
    }, [props.time_str, props.cpudata, props.warn, props.crit])

    useEffect(() => {
        // console.log(opts.series)
        setOpts(prevState => ({
            ...prevState,
            // width: getElementSize(chartWidth).width,
            // height: getElementSize(chartWidth).height,
            width: parseInt(chartWidth) - parseInt(chartWidth * 10 / 100),
            height: 350,
        }));
        // console.log(chartWidth * 10 / 100)
    }, [chartWidth, onChangeSideBar]);

    return <>
        {/* <div ref={el => el = el} id="cpu-uplot"></div> */}
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