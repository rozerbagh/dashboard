import React, { useEffect, useState } from 'react';

import * as formatter from '../../Functions/Formatter'
import loadable from '@loadable/component';
const UplotReact = loadable.lib(() => import('uplot-react'))

const DiskIOPS = (props) => {

	const [tooltipsParams, setTooltipParams] = useState({
		YlabelArr: ['Read', 'Write'],
		yParameter: ''
	})
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
	const [data, setdata] = useState([time, initialdata, initialdata]);
	const [opts, setOpts] = useState({
		title: "Disk IOPS",
		width: 500,
		height: 350,
		plugins: [
			formatter.tooltipsPlugin(tooltipsParams.YlabelArr, tooltipsParams.yParameter),
		],
		scales: {
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
			{},
			{
				// initial toggled state (optional)
				show: true,

				spanGaps: false,

				// in-legend display
				label: "Read",
				value: (self, rawValue) => rawValue.toFixed(2) + "/s",

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
				value: (self, rawValue) => rawValue.toFixed(2) + "/s",

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
				values: (u, vals, space) => vals.map(v => +v.toFixed(1) + "/s"),
			},
		],
	});
	useEffect(() => {
		setdata([props.time_str, props.DIOPSReadData, props.DIOPSWriteData])
		const maxVal = [];
		for (var i = 0; i < props.DIOPSReadData.length; i++) {
			maxVal.push(parseFloat(props.DIOPSReadData[i]))
		}
		for (var i = 0; i < props.DIOPSWriteData.length; i++) {
			maxVal.push(parseFloat(props.DIOPSWriteData[i]))
		}
		setOpts(prevState => ({
			...prevState,
			scales: {
				...prevState.scales,
				y: {
					...prevState.scales.y,
					range: [0, Math.max(...maxVal) > 100 ?
						Math.max(...maxVal) + 50 :
						Math.max(...maxVal) + 5]
				},
			},
		}))
	}, [props.time_str, props.DIOPSReadData, props.DIOPSWriteData])

	useEffect(() => {
		setOpts(prevState => ({
			...prevState,
			width: parseInt(chartWidth) - parseInt(chartWidth * 10 / 100),
			height: 350,
		}))
	}, [chartWidth, onChangeSideBar])

	return <>
		{/* <div ref={el => el = el} id="disk-iops-uplot"></div> */}
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

export default DiskIOPS