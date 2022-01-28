import React, { useState, useEffect, useMemo } from "react";
import { connect } from 'react-redux';

// @material-ui/core
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import Redirection from '../../../components/Alerts/Alert/Modal'; // Import
// core components
import Card from "../../../components/Card/Card";
import WhiteText from '../../../components/Typography/WhiteText';
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";
import Loader from '../../../components/UI/Loader/Loader';
import ErrorAlert from '../../../components/Alerts/Error/Error';
import WarningAlert from '../../../components/Alerts/Warning/Warn';
import DashboardTable from './Instances/DashboardInstances';
import WarnModal from '../../../components/Modals/WarnDialogBox';
import CritModal from '../../../components/Modals/CritDialogBox';
import * as WidgetBox from '../../../components/Card/DashboardCard'
import * as action from '../../../store/actions/vendor/index';

import styles from "../../../assets/jss/jsStyles/views/dashboardStyle";

const useStyles = makeStyles(styles);


const createDashboardLists = (power_status, vm_os, hostname, server_hostanme, public_ip, vendor_name, tagsArr, bandwidth, backup, m_type, vendor_flag, inst_details, cpu, ram, disk, private_ip, vmid, vendor_id) => {
	return {
		power_status,
		vm_os,
		hostname, server_hostanme,
		public_ip,
		vendor_name,
		tagsArr,
		bandwidth,
		backup, m_type,
		vendor_flag,
		inst_details,
		cpu, ram, disk,
		private_ip,
		vmid,
		vendor_id,
	}
}

const Dashboard = (props) => {
	const classes = useStyles();

	const [vmData, setVmData] = useState([]);

	// link state
	const [_id, setID] = useState(null);
	const [email, setEmail] = useState(null);
	const [phone, setPhone] = useState(null);
	const [company, setCompany] = useState(null);
	const [demoAlert, setDemoAlert] = useState(null);

	useEffect(() => {
		if (props.location.state !== null && props.location.state !== undefined) {
			const id = props.location.state.id
			const email = props.location.state.email
			const phone = props.location.state.phone
			const company = props.location.state.company
			setID(id)
			setEmail(email)
			setPhone(phone)
			setCompany(company)
			props.onSettingCustomers(email, id, company, true);
			props.onFetchingVMData(props.token, id);
		} else {
			const vuid = JSON.parse(localStorage.getItem('vuid'));
			const vname = JSON.parse(localStorage.getItem('vname'));
			const vemail = JSON.parse(localStorage.getItem('vemail'));
			props.onSettingCustomers(vemail.email, vuid.vid, vname.name, true);
			props.onFetchingVMData(props.token, vuid.vid);
		}

	}, [props.location.state]);

	useEffect(() => {
		const vuid = JSON.parse(localStorage.getItem('vuid'));
		const vname = JSON.parse(localStorage.getItem('vname'));
		const vemail = JSON.parse(localStorage.getItem('vemail'));
		props.onSettingCustomers(vemail.email, vuid.vid, vname.name, true);
		props.onFetchingVMData(props.token, vuid.vid);
	}, [])

	let ips = [];
	useEffect(() => {
		const vm_datas = [];
		props.vm_data.map((vm, index) => {
			ips.push(vm.lan_ip);
			vm_datas.push(createDashboardLists(
				vm.power_status,
				vm.vm_os,
				vm.vm_hostname,
				vm.vm_server_hostname,
				vm.wan_ip,
				vm.vendor_name,
				vm.tags,
				vm.bandwidth,
				vm.vm_backup,
				vm.m_type,
				vm.vendor_flag,
				vm.network,
				vm.cpu,
				vm.ram,
				vm.disk,
				vm.lan_ip,
				vm.host_id,
				vm.vendor_id
			))
		})


		for (var index in vm_datas) {
			var nxt_i = index + 1;
			for (nxt_i in vm_datas) {
				if (vm_datas[index].bandwidth > vm_datas[nxt_i].bandwidth) {
					let temp = vm_datas[index];
					vm_datas[index] = vm_datas[nxt_i];
					vm_datas[nxt_i] = temp;
				}
			}
		}
		setVmData(vm_datas);
	}, [props.vm_data])

	const [totalInstances, setTotalInstances] = useState(0)
	const [upInstances, setUpInstances] = useState(0)
	const [downInstances, setDownInstances] = useState(0);


	const [warns, setWarns] = useState([]);
	const [openWranModal, setOpenWarnModa] = useState(false)
	const [crits, setCrits] = useState([]);
	const [openCritModal, setOpenCritModa] = useState(false)
	const [serviceTotal, setserviceTotal] = useState(0);
	const [serviceOk, setServiceOk] = useState(0);
	const [serviceWarn, setServicewarn] = useState(0);
	const [serviceCrit, setServiceCrit] = useState(0);
	useEffect(() => {
		let up = 0;
		let down = 0;
		for (var k = 0; k < props.vm_data.length; k++) {
			if (props.vm_data[k].power_status == 'POWERED_ON') {
				up++;
				setUpInstances(up)
			} else {
				down++;

				setDownInstances(down)
			}
		}
		setTotalInstances(props.vm_data.length);

	}, [props.vm_data])


	useEffect(() => {
		const serviceDetails = props.serviceDetails;
		const warn = [];
		const crit = [];
		let total = 0, ok = 0, warns = 0, crits = 0;
		serviceDetails.map((service, index) => {
			service.config.map((ele, i) => {
				total += 1;
				var sniceDate = new Date(ele.last_time * 1000);
				var date = sniceDate.getDate();
				var month = sniceDate.getMonth() + 1;
				var year = sniceDate.getFullYear();
				var hours = sniceDate.getHours();
				var minutes = sniceDate.getMinutes();
				var seconds = sniceDate.getSeconds();

				// Hours format
				if (hours < 10) {
					hours = `0${hours}`
				} else {
					hours = hours
				}
				// Minutes format
				if (minutes < 10) {
					minutes = `0${minutes}`
				} else {
					minutes = minutes
				}
				// seconds format
				if (seconds < 10) {
					seconds = `0${seconds}`
				} else {
					seconds = seconds
				}

				if (ele.state.trim() == 'OK') {
					ok += 1;
				} else if (ele.state.trim() == 'WARN') {
					warns += 1;
					warn.push({
						date: `${date}/${month}/${year} - ${hours}:${minutes}:${seconds}`,
						name: service.name,
						title: ele.title,
						details: ele.details,
						id: Math.random().toString(),
					})
				} else if (ele.state.trim() == 'CRIT') {
					crits += 1;

					crit.push({
						date: `${date}/${month}/${year} - ${hours}:${minutes}:${seconds}`,
						name: service.name,
						title: ele.title,
						details: ele.details,
						id: Math.random().toString(),
					})

				}
			})

		})
		setWarns(warn);
		setCrits(crit);

		setserviceTotal(total)
		setServiceOk(ok)
		setServicewarn(warns)
		setServiceCrit(crits)

	}, [props.serviceDetails])


	const handleClosewarnModal = () => {
		setOpenWarnModa(false)
	}
	const handleCloseCritModal = () => {
		setOpenCritModa(false)
	}

	const handleModifyVMTags = (arr, index) => {
		const data = [...vmData];
		vmData.map((ele, i) => {
			if (i === index) {
				data[index].tagsArr = arr
			}
		})
		setVmData(data);
		setDemoAlert(<WarningAlert message="Demo account but Tags are added" />)
		setTimeout(() => setDemoAlert(null), 5000)
	}

	const handleInstanceNameChange = (name, index) => {
		const data = [...vmData];
		vmData.map((ele, i) => {
			if (i === index) {
				data[index].hostname = name;
			}
		})
		setVmData(data)
	}

	const handleVendorFlag = index => {
		const data = [...vmData];
		vmData.map((ele, i) => {
			if (i === index) {
				data[index].vendor_flag = 0;
			}
		})
		setVmData(data)
	}

	return (
		<>
			<WidgetBox.MainGrid>

				<WidgetBox.WidgetCard>
					<WidgetBox.CardLabel>Instances</WidgetBox.CardLabel>
					<CardBody>
						<WidgetBox.TotalBox>
							<WhiteText>Total</WhiteText> <WhiteText>{totalInstances}</WhiteText>
						</WidgetBox.TotalBox>
						<WidgetBox.OKBOX>
							<WhiteText>Up</WhiteText>  <WhiteText>{upInstances}</WhiteText>
						</WidgetBox.OKBOX>
						<WidgetBox.DownBox>
							<WhiteText>Down</WhiteText> <WhiteText>{downInstances}</WhiteText>
						</WidgetBox.DownBox>
					</CardBody>
				</WidgetBox.WidgetCard>

				<WidgetBox.WidgetCard>
					<CardHeader>
						<WidgetBox.CardLabel>Services</WidgetBox.CardLabel>
					</CardHeader>
					<CardBody>
						<WidgetBox.TotalBox >
							<WhiteText className="white_text">Total</WhiteText> {
								props.serviceBoxLoader ?
									<Loader whiteSmallLoader />
									: <WhiteText className="white_text">{serviceTotal}</WhiteText>
							}
						</WidgetBox.TotalBox>
						<WidgetBox.OKBOX>
							<WhiteText className="white_text">Ok</WhiteText> {
								props.serviceBoxLoader ?
									<Loader whiteSmallLoader />
									: <WhiteText className="white_text">{serviceOk}</WhiteText>
							}
						</WidgetBox.OKBOX>
						<WidgetBox.DownBox onClick={() => setOpenWarnModa(true)} style={{ cursor: "pointer" }}>
							<WhiteText className="white_text">Warn</WhiteText> {
								props.serviceBoxLoader ?
									<Loader whiteSmallLoader />
									: <WhiteText className="white_text"
									>{serviceWarn}</WhiteText>
							}
						</WidgetBox.DownBox>
						<WidgetBox.WarnBOX onClick={() => setOpenCritModa(true)} style={{ cursor: "pointer" }}>
							<WhiteText className="white_text">Crit</WhiteText> {
								props.serviceBoxLoader ?
									<Loader whiteSmallLoader />
									: <WhiteText className="white_text">{serviceCrit}</WhiteText>
							}
						</WidgetBox.WarnBOX>
					</CardBody>
				</WidgetBox.WidgetCard>


				<WidgetBox.WidgetCard style={{
					textAlign: "center",
					alignItems: "center",
					minHeight: "7rem"
				}}>
					<Typography variant="caption">Vendor Panel</Typography>
					<Typography variant="caption">{props.vendor_name}</Typography>
				</WidgetBox.WidgetCard>

			</WidgetBox.MainGrid>

			{/* displaying instances */}
			<Grid container>
				<Grid item xs={12} sm={12} md={12}>
					<Card><DashboardTable vms={vmData}
						modify_vm_data={handleModifyVMTags}
						modifyInstnaceName={handleInstanceNameChange}
						modifyVendorFlag={handleVendorFlag}
					/></Card>
				</Grid>
			</Grid>

			{openWranModal ? <WarnModal
				open={openWranModal}
				warnings={warns}
				handleClose={handleClosewarnModal}
			/> : null}

			{openCritModal ? <CritModal
				open={openCritModal}
				criticals={crits}
				handleClose={handleCloseCritModal}
			/> : null}
			{demoAlert}
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		token: state.auth_reducer.token,
		vid: state.auth_reducer.uid,
		vendor_name: state.auth_reducer.company_name,
		vm_data: state.vendorDashboard.vm_data,
		vmLoader: state.vendorDashboard.vmLoader,
		serviceBoxLoader: state.vendorDashboard.serviceBoxLoader,
		vmError: state.vendorDashboard.vm_error,
		serviceDetails: state.vendorDashboard.service_details,
		customer_id: state.vendorDashboard.customer_id,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchingVMData: (token, id) => dispatch(action.fetch_vm(token, id)),
		onSettingCustomers: (email, id, name, bool) => dispatch(action.set_customers(email, id, name, bool)),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);