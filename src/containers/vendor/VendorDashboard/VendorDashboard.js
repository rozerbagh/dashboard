import React, { useState, useEffect, useMemo } from "react";
import { connect } from 'react-redux';
import styled from 'styled-components'
// @material-ui/core
import Loader from '../../../components/UI/Loader/Loader'
import Redirection from '../../../components/Alerts/Alert/Modal';
import SuccessAlert from '../../../components/Alerts/Success/success';
import ErrorAlert from '../../../components/Alerts/Error/Error';
import CustomerIcon from '../../../assets/img/customer.png'
import * as action from '../../../store/actions/vendor/index'
import VendorCard from './VendorsCard';
import { Card } from './VendorsCard';

const BlankCardText = styled.div`
    font-size: 0.9rem;
    font-weight: 400;
    color: #cccccc;
`;
const CardWrapper = styled.div`
    padding: 0.2rem 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 0.5rem;
`
const Heading = styled.span`
    font-size: 1.2rem;
    font-weight: 700;
    margin-left: 1rem;
    padding-top: 3rem;
`

const LoaderBox = styled.div`
    display: flex ;
    height:500px;
    width: 500px;
    margin: 0 auto;
    margin-top: 50px;
    justify-content: center;
    align-items: center;
`;

const CustomerImg = styled.img`
    width: 50px;
    opacity: 0.5;
`
const VendorAdminDashboard = (props) => {
    const [customers, setCustomers] = useState([]);

    const [deleID, setDelID] = useState('');
    const [deleting, setDeleting] = useState(false);
    const [instUp, setInstUp] = useState(0);
    const [instDown, setInstDown] = useState(0);

    const [servOk, setServOk] = useState(0);
    const [servWarn, setServWarn] = useState(0);
    const [serCrit, setServCrit] = useState(0);

    useEffect(() => {
        props.onFetchingVendors(props.token);
        // return () => console.log('Unmouted from the Vendor dashboard');
    }, []);

    useEffect(() => {
        props.onSettingCustomers(props.customer_name, props.customer_id, props.customer_phone, false);
    }, [])

    useEffect(() => {
        const arr = [];
        props.customer_list.map(ele => {
            let delIcon = false;
            let csswidthInst = 0;
            let csswidthInstDown = 0;
            let csswidthServ = 0;
            let csswidthWarnServ = 0;
            let csswidthCritServ = 0;

            ele.vm.up == 0 && ele.vm.down == 0 && ele.vm_service.total.ok == 0 &&
                ele.vm_service.total.warn == 0 && ele.vm_service.total.crit == 0 ?
                delIcon = true : delIcon = false;

            ele.vm.up == 0 ? ele.vm.up = 0.01 : ele.vm.up = ele.vm.up

            ele.vm.down == 0 ? ele.vm.down = 0.01 : ele.vm.down = ele.vm.down

            ele.vm_service.total.ok == 0 ? ele.vm_service.total.ok = 0.01 : ele.vm_service.total.ok = ele.vm_service.total.ok

            ele.vm_service.total.warn == 0 ? ele.vm_service.total.warn = 0.01 : ele.vm_service.total.warn = ele.vm_service.total.warn

            ele.vm_service.total.crit == 0 ? ele.vm_service.total.crit = 0.01 : ele.vm_service.total.crit = ele.vm_service.total.crit

            csswidthInst = (ele.vm.up / (parseInt(ele.vm.up) + parseInt(ele.vm.down))) * 100;
            csswidthInstDown = ((ele.vm.up + ele.vm.down) / (parseInt(ele.vm.up) + parseInt(ele.vm.down))) * 100;

            csswidthServ = (ele.vm_service.total.ok / (parseInt(ele.vm_service.total.ok) + parseInt(ele.vm_service.total.warn) + parseInt(ele.vm_service.total.crit))) * 100;

            csswidthWarnServ = ((ele.vm_service.total.ok + ele.vm_service.total.warn) / (parseInt(ele.vm_service.total.ok) + parseInt(ele.vm_service.total.warn) + parseInt(ele.vm_service.total.crit))) * 100;

            csswidthCritServ = ((ele.vm_service.total.ok + ele.vm_service.total.warn + ele.vm_service.total.crit) / (parseInt(ele.vm_service.total.ok) + parseInt(ele.vm_service.total.warn) + parseInt(ele.vm_service.total.crit))) * 100;

            csswidthInst = parseInt(csswidthInst);
            csswidthInstDown = parseInt(csswidthInstDown);
            csswidthServ = parseInt(csswidthServ);
            csswidthWarnServ = parseInt(csswidthWarnServ);
            csswidthCritServ = parseInt(csswidthCritServ);

            csswidthInst == NaN || csswidthInst === undefined || csswidthInst === null ? csswidthInst = 0 : csswidthInst = csswidthInst;

            csswidthInstDown == NaN || csswidthInstDown === undefined || csswidthInstDown === null ? csswidthInstDown = 0 : csswidthInstDown = csswidthInstDown;

            csswidthServ == NaN || csswidthServ === undefined || csswidthServ === null ? csswidthServ = 0 : csswidthServ = csswidthServ;

            csswidthWarnServ === NaN || csswidthWarnServ === undefined || csswidthWarnServ === null ? csswidthWarnServ = 0 : csswidthWarnServ = csswidthWarnServ;

            csswidthCritServ == NaN || csswidthCritServ === undefined || csswidthCritServ === null ? csswidthCritServ = 0 : csswidthCritServ = csswidthCritServ;

            // redirect details for link tag
            arr.push({
                id: Math.random() + ele.vm.up + ele.vm.down + ele.vm_service.total.ok + ele.vm_service.total.warn + ele.vm_service.total.crit,
                instUp: parseInt(ele.vm.up),
                instDown: parseInt(ele.vm.down),
                servOk: parseInt(ele.vm_service.total.ok),
                servWarn: parseInt(ele.vm_service.total.warn),
                servCrit: parseInt(ele.vm_service.total.crit),
                company: ele.customer.userId.company_name.split(' '),
                customer: ele.customer,
                _id: ele.customer.userId._id,
                email: ele.customer.userId.user_email,
                phone: ele.customer.userId.user_phone,
                company_name: ele.customer.userId.company_name,

                instUpWidth: csswidthInst,
                instDownWidth: csswidthInstDown,
                servOkWidth: csswidthServ,
                servWarnWidth: csswidthWarnServ,
                servCritWidth: csswidthCritServ,
                delIcon: delIcon,
            })
        })
        setCustomers(arr);
    }, [props.customer_list]);

    const handleDeleteCustomer = (id, uid) => {
        setDelID(id);
        setDeleting(true);
        const arr = [...customers];
        arr.splice(id, 1);
        setCustomers(arr);
        setDeleting(false);
    }

    // useEffect(() => {
    //     if (props.deleteSuccessMessage !== null) {
    //     } else {
    //         setDeleting(false);
    //         const arr = [...customers];
    //         setDeleting(false);
    //     }
    //     if (props.deleteErrorMessage !== null) {
    //         setDeleting(false);
    //     } else {
    //         setDeleting(false);
    //     }
    // }, [props.deleteSuccessMessage, props.deleteErrorMessage])


    return (
        <>
            {props.error === 'logout' ? <Redirection
                linkRoute="/logout"
                bodyText="Other session is active and you are logged out. Please login again."
                btnText="Ok" /> :
                props.error === 'Your roles have been updated. Login again.' ? <Redirection
                    linkRoute="/logout"
                    bodyText="Your roles have been updated. Login again."
                    btnText="Ok" /> :
                    props.error !== null ||
                        props.error !== 'Your roles have been updated. Login again.' ||
                        props.error !== 'logout' ? null :
                        <ErrorAlert message={props.error} />
            }

            {props.loader ?
                <LoaderBox>
                    <Loader bigLoader />
                </LoaderBox> :
                <>
                    <Heading>Customer Lists</Heading>
                    <CardWrapper>
                        {customers.map((elements, i) => {
                            return <VendorCard
                                refID={i}
                                key={elements.id}
                                vmUp={elements.instUp}
                                vmDown={elements.instDown}
                                serviceOk={elements.servOk}
                                serviceWarns={elements.servWarn}
                                serviceCrits={elements.servCrit}

                                inst_up_width={elements.instUpWidth}
                                inst_down_width={elements.instDownWidth}
                                serv_up_width={elements.servOkWidth}
                                serv_warn_width={elements.servWarnWidth}
                                serv_crit_width={elements.servCritWidth}

                                vuid={elements._id}
                                email={elements.email}
                                phone={elements.phone}
                                company_name={elements.company_name}
                                companyName={elements.company}
                                delIcon={elements.delIcon}
                                deleteCustomer={handleDeleteCustomer}
                                deleting={deleting}
                            />
                        })}
                        <Card style={{
                            minHeight: "250px", justifyContent: "center", alignItems: "center",
                            textAlign: "center"
                        }}>
                            <CustomerImg src={CustomerIcon} />
                            <BlankCardText>Your new Customer <br /> appears here</BlankCardText>
                        </Card>
                    </CardWrapper>
                </>
            }
            {props.deleteSuccessMessage !== null ? <SuccessAlert message={props.deleteSuccessMessage} /> : null}
            {props.deleteErrorMessage !== null ? <ErrorAlert message={props.deleteErrorMessage} /> : null}
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        token: state.auth_reducer.token,
        vid: state.auth_reducer.uid,
        loader: state.vendorDashboard.adminVendorLoader,
        error: state.vendorDashboard.adminVendorError,
        customer_list: state.vendorDashboard.customerList,

        customer_name: state.vendorCommon.customer_name,
        customer_id: state.vendorCommon.customer_id,
        customer_phone: state.vendorCommon.customer_phone,

        inside_customer: state.vendorCommon.insideCustomer,
        deleteSuccessMessage: state.vendorDashboard.deleteMessage,
        deleteErrorMessage: state.vendorDashboard.delCusError

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchingVendors: (token) => dispatch(action.fetch_customers(token)),
        onFetchingInstances: (token, id) => dispatch(action.fetch_vm(token, id)),
        onSettingCustomers: (email, id, name, bool) => dispatch(action.set_customers(email, id, name, bool)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(VendorAdminDashboard);