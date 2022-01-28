import React, { useEffect, useState } from 'react';

import * as formatter from '../../Functions/Formatter'

import loadable from '@loadable/component';
const UplotReact = loadable.lib(() => import('uplot-react'))

const ThreadChart = (props) => {

    const [tooltipsParams, setTooltipParams] = useState({
        YlabelArr: ['Threads'],
        yParameter: '',
    });

    const { chartWidth, onChangeSideBar, ...rest } = props;

    const [data, setdata] = useState([props.time_str, props.threadsData]);

    const [opts, setOpts] = useState({
        title: "No of Threads",
        width: 500,
        height: 350,
        plugins: [
            formatter.tooltipsPlugin(tooltipsParams.YlabelArr, tooltipsParams.yParameter),
        ],
        scales: {
            y: {
                auto: false,
                range: [0, Math.max(...props.threadsData) < 100 ? Math.max(...props.threadsData) + 10 :
                    Math.max(...props.threadsData) > 1000 ? Math.max(...props.threadsData) + 200 :
                        Math.max(...props.threadsData) + 100],
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
                label: "No Of Threads",

                // series style
                stroke: "#007bff",
                width: 1,
                fill: "rgb(0,123,255, 0.2)",
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
        setOpts(prevState => ({
            ...prevState,
            // width: getElementSize(chartWidth).width,
            // height: getElementSize(chartWidth).height,
            width: parseInt(chartWidth) - parseInt(chartWidth * 10 / 100),
            height: 350,
        }))
    }, [chartWidth, onChangeSideBar])

    return <>
        {/* <div ref={el => el = el} id="cpu-uplot"></div> */}
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

export default ThreadChart