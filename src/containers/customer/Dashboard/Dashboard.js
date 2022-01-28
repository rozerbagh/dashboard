import React, { useState, useEffect, useMemo } from "react";
import { connect } from 'react-redux';
import { Link, useParams, Redirect, withRouter } from 'react-router-dom';

// @material-ui/core
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from '@material-ui/core/Grid'

import Redirection from '../../../components/Alerts/Alert/Modal'; // Import
// core components
import * as CustomBtn from '../../../components/CustomButtons/CustomButtons';
import Breadcrumbs from "../../../components/UI/Breadscrumbs/Breadscrumbs";
import Card from "../../../components/Card/Card";
import WarningAlert from '../../../components/Alerts/Warning/Warn';
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";
import Loader from '../../../components/UI/Loader/Loader';
import { FiActivity, FiMonitor, FiDatabase, FiHardDrive, FiFileText, FiFileMinus, FiCloud } from "react-icons/fi";
import ErrorAlert from '../../../components/Alerts/Error/Error'
import DashboardTable from './Instances/DashboardInstances';
import WarnModal from '../../../components/Modals/WarnDialogBox';
import CritModal from '../../../components/Modals/CritDialogBox';
import * as WidgetBox from '../../../components/Card/DashboardCard'
import * as formatter from '../../../components/Functions/Formatter'
import * as action from '../../../store/actions/customer/index';
import styles from "../../../assets/jss/jsStyles/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const subroutes = [
  {
    label: "Home",
    link: "/coc/dashboard",
    subroutes: [],
  },
  {
    label: "Dashboard",
    link: null,
    subroutes: [],
  }
]

const Dashboard = (props) => {

  const classes = useStyles();

  const [payingAmount, setPayimgAmount] = useState(0);
  const [vmData, setVmData] = useState([]);

  const [outstandingMsg, setOutstandingMsg] = useState({
    outstandingAmt: 0,
    currency_code: '',
    currency_symbol: '',
  });


  let ips = [];
  const vm_data = [];

  useEffect(() => {
    props.vm_data.map((vm, index) => {
      ips.push(vm.lan_ip);
      vm_data.push({
        power_status: vm.power_status,
        vm_os: vm.vm_os,
        hostname: vm.vm_hostname,
        server_hostanme: vm.vm_server_hostname,
        public_ip: vm.wan_ip,
        vendor_name: vm.vendor_name,
        tagsArr: vm.tags,
        bandwidth: vm.bandwidth,
        backup: vm.vm_backup,
        m_type: vm.m_type,
        vendor_flag: vm.vendor_flag,
        inst_details: vm.network,
        cpu: vm.cpu,
        ram: vm.ram,
        disk: vm.disk,
        private_ip: vm.lan_ip,
        vmid: vm.host_id,
        vendor_id: vm.vendor_id
      })
    })


    for (var index in vm_data) {
      var nxt_i = index + 1;
      for (nxt_i in vm_data) {
        if (vm_data[index].bandwidth > vm_data[nxt_i].bandwidth) {
          let temp = vm_data[index];
          vm_data[index] = vm_data[nxt_i];
          vm_data[nxt_i] = temp;
        }
      }
    }

    setVmData(vm_data);
  }, [props.vm_data])


  useEffect(() => {
    props.onFetchingVMData(props.token);
  }, []);

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
  const [demoAlert, setDemoAlert] = useState(null);

  useEffect(() => {
    let up = 0;
    let down = 0;
    for (var k = 0; k < props.vm_data.length; k++) {
      if (props.vm_data[k].power_status == 'POWERED_ON') {
        up++;
        setUpInstances(up);
      } else {
        down++;
        setDownInstances(down);
      }
    }
    setTotalInstances(props.vm_data.length);
  }, [props.vm_data])

  useEffect(() => {
    setOutstandingMsg(props.outstandingMsg);
    setPayimgAmount(parseInt(props.outstandingMsg.outstandingAmt));
  }, [props.outstandingMsg])

  useMemo(() => {
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

  }, [props.serviceDetails]);


  useEffect(() => {
    if (props.vm_updated === true) {
      props.onFetchingVMData(props.token);
      props.onFetchingOutstanding(props.token);
      props.onFetchingTicketsCount(props.token);
    } else {

    }
  }, [props.vm_updated])

  const handleClosewarnModal = () => {
    setOpenWarnModa(false)
  }
  const handleCloseCritModal = () => {
    setOpenCritModa(false)
  }

  const pay_now = () => {
    setDemoAlert(<WarningAlert message="Demo Account" />)
    setTimeout(() => setDemoAlert(null), 5000)
    // props.onPayingNow(props.token, payingAmount)
  }

  const handleModifyVMTags = (arr, index) => {
    const data = [...vmData];
    vmData.map((ele, i) => {
      if (i === index) {
        data[index].tagsArr = arr
      }
    })
    setVmData(data)
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

    setDemoAlert(<WarningAlert message="Demo accounts! Instance alias name changed" />)
    setTimeout(() => setDemoAlert(null), 5000)
  }

  const handleVendorFlag = index => {
    const data = [...vmData];
    vmData.map((ele, i) => {
      if (i === index) {
        data[index].vendor_flag = 0;
        data[index].vendor_name = '';
      }
    })
    setVmData(data)
  }

  return (
    <>
      <Breadcrumbs links={subroutes} />
      {props.vmError === 'logout' ? <Redirection
        linkRoute="/logout"
        bodyText="Other session is active and you are logged out. Please login again."
        btnText="Ok" /> :
        props.vmError === 'Your roles have been updated. Login again.' ? <Redirection
          linkRoute="/logout"
          bodyText="Your roles have been updated. Login again."
          btnText="Ok" /> :
          props.vmError !== null ? <ErrorAlert message={props.vmError} /> :
            props.vmLoader ?
              <div className={classes.loaderContainer}>
                <Loader bigLoader style={{ margin: "0 auto" }} />
              </div> :
              <>
                {demoAlert}
                <WidgetBox.MainGrid>
                  <WidgetBox.WidgetCard>
                    <WidgetBox.CardLabel>Instances</WidgetBox.CardLabel>
                    <CardBody>
                      <WidgetBox.TotalBox>
                        <WidgetBox.WhiteText>Total</WidgetBox.WhiteText> <WidgetBox.WhiteText>{totalInstances}</WidgetBox.WhiteText>
                      </WidgetBox.TotalBox>
                      <WidgetBox.OKBOX>
                        <WidgetBox.WhiteText>Up</WidgetBox.WhiteText>  <WidgetBox.WhiteText>{upInstances}</WidgetBox.WhiteText>
                      </WidgetBox.OKBOX>
                      <WidgetBox.DownBox>
                        <WidgetBox.WhiteText>Down</WidgetBox.WhiteText> <WidgetBox.WhiteText>{downInstances}</WidgetBox.WhiteText>
                      </WidgetBox.DownBox>
                    </CardBody>
                  </WidgetBox.WidgetCard>



                  <WidgetBox.WidgetCard >
                    <CardHeader>
                      <WidgetBox.CardLabel>Services</WidgetBox.CardLabel>
                    </CardHeader>
                    <CardBody>
                      <WidgetBox.TotalBox >
                        <WidgetBox.WhiteText className="white_text">Total</WidgetBox.WhiteText> {
                          props.serviceBoxLoader ?
                            <Loader whiteSmallLoader />
                            : <WidgetBox.WhiteText className="white_text">{serviceTotal}</WidgetBox.WhiteText>
                        }
                      </WidgetBox.TotalBox>
                      <WidgetBox.OKBOX>
                        <WidgetBox.WhiteText className="white_text">Ok</WidgetBox.WhiteText> {
                          props.serviceBoxLoader ?
                            <Loader whiteSmallLoader />
                            : <WidgetBox.WhiteText className="white_text">{serviceOk}</WidgetBox.WhiteText>
                        }
                      </WidgetBox.OKBOX>
                      <WidgetBox.WarnBOX onClick={() => setOpenWarnModa(true)} style={{ cursor: "pointer" }}>
                        <WidgetBox.WhiteText className="white_text">Warn</WidgetBox.WhiteText> {
                          props.serviceBoxLoader ?
                            <Loader whiteSmallLoader />
                            : <WidgetBox.WhiteText className="white_text"
                            >{serviceWarn}</WidgetBox.WhiteText>
                        }
                      </WidgetBox.WarnBOX>
                      <WidgetBox.DownBox onClick={() => setOpenCritModa(true)} style={{ cursor: "pointer" }}>
                        <WidgetBox.WhiteText className="white_text">Crit</WidgetBox.WhiteText> {
                          props.serviceBoxLoader ?
                            <Loader whiteSmallLoader />
                            : <WidgetBox.WhiteText className="white_text">{serviceCrit}</WidgetBox.WhiteText>
                        }
                      </WidgetBox.DownBox>
                    </CardBody>
                  </WidgetBox.WidgetCard>


                  <WidgetBox.WidgetCard className="ticket-wigdet">
                    <CardHeader>
                      <WidgetBox.CardLabel>Tickets</WidgetBox.CardLabel>
                    </CardHeader>
                    <Link to="#" className={classes.link}>
                      <WidgetBox.TicketsPending>
                        <span>Pending Tickets</span> <span>8</span>
                      </WidgetBox.TicketsPending>
                    </Link>
                    <Link to={{
                      pathname: "/coc/tickets",
                      search: `?closed`,
                      hash: '',
                      state: {
                        lip: '',
                        wip: '',
                        tab: "closed",
                      }
                    }} className={classes.link}>
                      <WidgetBox.TicketsClosed>
                        <span>Closed Tickets</span> <span>3</span>
                      </WidgetBox.TicketsClosed>
                    </Link>
                  </WidgetBox.WidgetCard>

                  <WidgetBox.WidgetCard className="ticket-wigdet">
                    <CardHeader>
                      <WidgetBox.CardLabel>Billing</WidgetBox.CardLabel>
                    </CardHeader>
                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                      <span className="font500 body-text">Total</span>
                      <div>
                        <span className="font500 body-text">Rs</span>
                        <span className="font500 body-text">{formatter.addComa(245635)}</span>
                      </div>
                    </div>
                    <CustomBtn.MainPrimaryButton
                      fullWidth
                      onClick={pay_now}
                      margin="normal"
                    >
                      Pay Now
                    </CustomBtn.MainPrimaryButton>
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

                <Grid container>
                  <Card>
                    <div className="service_cards_div">
                      <Link to="/coc/manage/instance">
                        <div className="service_cards">
                          <FiMonitor style={{ fontSize: "25px", color: "#02314B" }} />
                          <div className="h2">Instance</div>
                          <p>Manage your Instances, TAG’s, IP address and Notifications.</p>
                        </div>
                      </Link>
                      <Link to={{
                        pathname: "/coc/manage/zoom_view",
                        search: `?tab=backup`,
                        hash: '',
                        state: {
                          lip: '',
                          wip: '',
                          tab: "backup",
                        }
                      }}>
                        <div className="service_cards">
                          <FiHardDrive style={{ fontSize: "25px", color: "#02314B" }} />
                          <div className="h2">Backup</div>
                          <p>Point of recovery service for all your important data.</p>
                        </div>
                      </Link>

                      <Link to={{
                        pathname: "/coc/manage/zoom_view",
                        search: `?tab=internet`,
                        hash: '',
                        state: {
                          lip: '',
                          wip: '',
                          tab: "internet",
                        }
                      }}>
                        <div className="service_cards">
                          <FiActivity style={{ fontSize: "25px", color: "#02314B" }} />
                          <div className="h2">Monitoring</div>
                          <p>High level visibility on Compute, Internet, performance and Automation.</p>
                        </div>
                      </Link>
                      <Link to="/coc/billings/invoices">
                        <div className="service_cards">
                          <FiFileMinus style={{ fontSize: "25px", color: "#02314B" }} />
                          <div className="h2">Billing</div>
                          <p>Easy payment options, billing history and download invoices.</p>
                        </div>
                      </Link>
                      <Link to="/coc/reports/bandwidth">
                        <div className="service_cards">
                          <FiFileText style={{ fontSize: "25px", color: "#02314B" }} />
                          <div className="h2">Report</div>
                          <p>Realtime and historical report of your live instances.</p>
                        </div>
                      </Link>
                      <Link to="#">
                        <div className="service_cards">
                          <FiCloud style={{ fontSize: "25px", color: "#02314B" }} />
                          <div className="h2">API</div>
                          <p>Automate your daily activity using our RESTFull API. Coming Soon…!</p>
                        </div>
                      </Link>
                      <Link to="#">
                        <div className="service_cards">
                          <FiDatabase style={{ fontSize: "25px", color: "#02314B" }} />
                          <div className="h2">Storage</div>
                          <p>Object storage service for storing your files, images, videos. Coming
                            Soon…!</p>
                        </div>
                      </Link>
                    </div>
                  </Card>
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
              </>}

    </>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.auth_reducer.token,
    uid: state.auth_reducer.uid,
    roles: state.auth_reducer.user_roles,
    onLogoutPath: state.auth_reducer.authRedirectPath,
    vm_data: state.customerDashboard.vm_data,
    vm_updated: state.customerDashboard.vm_updated,
    vmLoader: state.customerDashboard.vmLoader,
    serviceBoxLoader: state.customerDashboard.serviceBoxLoader,
    vmError: state.customerDashboard.vm_error,
    outstandingMsg: state.customerDashboard.outstandingMsg,
    pending_ticket: state.customerDashboard.tickets_count.pending,
    closed_ticket: state.customerDashboard.tickets_count.closed,
    serviceDetails: state.customerDashboard.service_details,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchingVMData: (token) => dispatch(action.vm_fetched(token)),
    onFetchingUpdatedVMData: (token, uid) => dispatch(action.updates_existing_vm(token, uid)),
    onFetchingServiceStatus: (token, ips) => dispatch(action.fetchServiceStatus(token, ips)),
    onPayingNow: (token, amount) => dispatch(action.payingnow(token, amount)),
    onLogout: () => dispatch(action.logout()),
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));