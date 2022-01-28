import React, { useEffect, useState, useMemo } from 'react';

import * as formatter from '../../Functions/Formatter'
import loadable from '@loadable/component';
const UplotReact = loadable.lib(() => import('uplot-react'))

const InterfacesBandwidth = React.memo((props) => {

    const { chartWidth, banwidthUnit, onChangeSideBar, ...rest } = props;
    const [tooltipsParams, setTooltipParams] = useState({
        YlabelArr: ['In', 'Out'],
        yParameter: `${banwidthUnit}`,
    })

    const [data, setdata] = useState([
        props.time_str,
        props.inBandwidth,
        props.outBandwidth,
    ]);
    const [opts, setOpts] = useState({
        title: `${props.interfaceName} - Bandwidth`,
        width: 500,
        height: 350,
        plugins: [
            formatter.tooltipsPlugin(tooltipsParams.YlabelArr, tooltipsParams.yParameter),
        ],
        scales: {
            y: {
                auto: false,
                range: [0, Math.max(...props.maxbandwidth) + 50],
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
                label: "Bandwidth - In",
                value: (self, rawValue) => rawValue.toFixed(2) + `${props.banwidthUnit}`,

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
                label: "Bandwidth - Out",
                value: (self, rawValue) => rawValue.toFixed(2) + `${props.banwidthUnit}`,

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
                values: (u, vals, space) => vals.map(v => v),
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
            width: parseInt(chartWidth) - parseInt(chartWidth * 10 / 100),
            height: 350,
        }))
    }, [chartWidth, onChangeSideBar])

    // let u
    // const el = document.getElementById(`interface-bandwidth-graph-${props.i}`)

    // useEffect(() => {
    //     u = new uPlot(opts, data, el);
    //     u.destroy();
    //     u = null;
    //     u = new uPlot(opts, data, el);
    // }, [opts.width])

    return <>
        {/* <div ref={el => el = el} id={`interface-bandwidth-graph-${props.i}`}></div> */}
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

export default InterfacesBandwidth