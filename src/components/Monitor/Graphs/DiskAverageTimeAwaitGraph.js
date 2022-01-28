import React, { useEffect, useState } from 'react';

import * as formatter from '../../Functions/Formatter'
import loadable from '@loadable/component';
const UplotReact = loadable.lib(() => import('uplot-react'))

const DiskAvgTimeAwait = (props) => {

    const { chartWidth, onChangeSideBar } = props;
    const [tooltipsParams, setTooltipParams] = useState({
        YlabelArr: ['Read', 'Write'],
        yParameter: ''
    })
    const [opts, setOpts] = useState({
        title: "Disk Average Time Await",
        width: 500,
        height: 350,
        plugins: [
            formatter.tooltipsPlugin(tooltipsParams.YlabelArr, tooltipsParams.yParameter),
        ],
        scales: {
            y: {
                auto: false,
                range: [0, Math.max(...props.DAWTWriteData) < 1 ? Math.max(...props.DAWTWriteData) + 1 :
                    Math.max(...props.DAWTWriteData) > 1 && Math.max(...props.DAWTWriteData) < 10 ?
                        25 : Math.max(...props.DAWTWriteData) + 50],
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
                label: "Read",
                value: (self, rawValue) => rawValue.toFixed(2) + "n/s",

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
                label: "Write",
                value: (self, rawValue) => rawValue.toFixed(2) + "n/s",

                // series style
                stroke: "#ff9a00",
                width: 1,
                fill: "rgb(255,154,0,0.2)",
                // dash: [10, 5],
            },
        ],
        axes: [
            {},
            {
                values: (u, vals, space) => vals.map(v => +v.toFixed(1) + "n/s"),
            },
        ],
    });
    const [data, setdata] = useState([props.time_str, props.DAWTReadData, props.DAWTWriteData]);

    const getElementSize = (id) => {
        return {
            width: id.clientWidth,
            height: 350,
        }
    }

    useEffect(() => {
        setOpts(prevState => ({
            ...prevState,
            width: parseInt(chartWidth) - parseInt(chartWidth * 10 / 100),
            height: 350,
        }))
    }, [chartWidth, onChangeSideBar])

    // let u
    // const el = document.getElementById("disk-avg-time-await-uplot")

    // useEffect(() => {
    //     u = new uPlot(opts, data, el);
    //     u.destroy();
    //     u = null;
    //     u = new uPlot(opts, data, el);
    // }, [opts.width])

    return <>
        {/* <div ref={el => el = el} id="disk-avg-time-await-uplot"></div> */}
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
}

export default DiskAvgTimeAwait