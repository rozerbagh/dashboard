import React, { useEffect, useState } from 'react';

import * as formatter from '../../Functions/Formatter'
import loadable from '@loadable/component';
const UplotReact = loadable.lib(() => import('uplot-react'))

const RAMChart = (props) => {

	const { chartWidth, onChangeSideBar, ...rest } = props;
	const [data, setdata] = useState([props.time_str, props.ramdata, props.warn, props.crit])
	const [tooltipsParams, setTooltipParams] = useState({
		YlabelArr: ['Used'],
		yParameter: '%',
	});
	const [opts, setOpts] = useState({
		title: "RAM-Performance",
		width: 500,
		height: 350,
		// ...getSize(elesize),
		plugins: [
			formatter.tooltipsPlugin(tooltipsParams.YlabelArr, tooltipsParams.yParameter),
		],
		scales: {
			y: {
				auto: false,
				range: [0, Math.max(...props.ramdata) > 50 ? 100 : Math.max(...props.ramdata) <= 50 &&
					Math.max(...props.ramdata) > 30 ? 50 : Math.max(...props.ramdata) <= 30 &&
						Math.max(...props.ramdata) > 25 ? Math.max(...props.ramdata) + 10 : Math.max(...props.ramdata) <= 25 && Math.max(...props.ramdata) > 5 ? Math.max(...props.ramdata) + 5 : Math.max(...props.ramdata) <= 5 && Math.max(...props.ramdata) > 1 ? 10 : 1],
				// range: [0, Math.max(...props.ramdata) > 50 ? 100 : 50],
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
				show: Math.max(...props.ramdata) > Math.max(...props.warn) ? true : false,

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
				show: Math.max(...props.ramdata) > Math.max(...props.crit) ? true : false,

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

	return <>
		{/* <div ref={el => el = el} id="ram-uplot"></div> */}
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

export default RAMChart