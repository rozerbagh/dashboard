import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// @material-ui/core components
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'

// core components
import Card from "../../../../components/Card/Card";
import WarningAlert from '../../../../components/Alerts/Warning/Warn'
import Loader from "../../../../components/UI/Loader/Loader";
import Breadcrumbs from '../../../../components/UI/Breadscrumbs/Breadscrumbs'
import InvoicesTable from "./InvoicesTable";
import PAYNOW from '../../../PayingModule/PAYNOW'
import * as formatter from "../../../../components/Functions/Formatter";
import * as action from '../../../../store/actions/customer/index';

const subroutes = [
    {
        label: "Home",
        link: "/coc/dashboard",
        subroutes: [],
    },
    {
        label: "Billings",
        link: "/coc/billings/invoices",
        subroutes: [
            { label: 'Payment History', link: "/coc/billings/payment_history" },
            { label: 'Invoices', link: "/coc/billings/invoices" },
        ]
    },
    {
        label: "Invoices",
        link: null,
        subroutes: [],
    }
]

const useStyles = makeStyles(theme => ({
    loaderContainer: {
        position: "relative",
        margin: "0 auto",
        width: "500px",
        height: "500px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
}))

const SuccessBtn = styled.button`
    outline: none;
    border: none;
    background-color: #31E8A9;
    padding: 0.3rem 0.9rem;;
    font-size: 1rem;
    color:#ffffff;
    margin: 0.1rem 0.5rem;
    border-radius: 5px;
    cursor: pointer;
`;

const ConfirmButtons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
`;

const ConfirmAlertText = styled.p`
    font-size: 1rem;
    text-align: center;
`;

const Invoices = (props) => {

    const classes = useStyles();
    const [invoices, setInvoices] = useState([]);
    const [dues, setDues] = useState(0)

    useEffect(() => {
        const userToken = localStorage.getItem('customer_user_token');
        props.onFetchingInvoicesLists(props.token);
    }, [])


    useEffect(() => {
        let balances = 0;
        const fetchedData = [];
        props.invoicesList.map((invoice, index) => {
            let status = '';
            let amount = '';
            let balance = '';
            if (invoice.status == 'paid') {
                status = `${invoice.status}`;
            } else if (invoice.status == 'overdue') {
                status = `${invoice.due_days}`;
            } else {
                status = `${invoice.status}`;
            }

            amount = `${formatter.addComa(invoice.total)}`;
            balance = `${formatter.addComa(invoice.balance)}`;

            balances += invoice.balance;
            localStorage.setItem('balance_dues', dues);

            // fetchedData.push(createData(index,
            //     invoice.reference_number,
            //     invoice.invoice_number,
            //     invoice.date,
            //     invoice.due_date,
            //     invoice.status,
            //     amount,
            //     balance,
            //     invoice.balance,
            //     invoice.my_invoice_url)
            // )

            fetchedData.push({
                i: index,
                order_no: invoice.reference_number,
                invoice_no: invoice.invoice_number,
                invoice_date: invoice.date,
                invoice_due_date: invoice.due_date,
                status: invoice.status,
                amount: amount,
                balance_due: balance,
                balance_amt: invoice.balance,
                pdfDownloadLink: invoice.my_invoice_url
            });
        })
        setInvoices(fetchedData)
        setDues(parseInt(balances))
    }, [props.invoicesList])


    const headings = [
        { id: 'order_no', numeric: false, disablePadding: false, label: 'Order No' },
        { id: 'invoice_no', numeric: false, disablePadding: false, label: 'Invoice No' },
        { id: 'invoice_date', numeric: false, disablePadding: false, label: 'Invoice Date' },
        { id: 'invoice_due_date', numeric: false, disablePadding: false, label: 'Invoice Due Date' },
        { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
        { id: 'amount', numeric: true, disablePadding: false, label: 'Amount' },
        { id: 'balance_due', numeric: true, disablePadding: false, label: 'Balance Due (INR)' },
    ];
    const [demoAlert, setDemoAlert] = useState(null);
    const pay_now = () => {
        // props.onPayingNow(props.token, dues)
        setDemoAlert(<WarningAlert message="Demo Account" />)
        setTimeout(() => setDemoAlert(null), 5000)
    }



    return (
        <>
            <Breadcrumbs links={subroutes} />
            <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                    {props.loading ?
                        <div className={classes.loaderContainer}>
                            <Loader bigLoader style={{ margin: "0 auto" }} />
                        </div> :
                        <Card>
                            <InvoicesTable
                                rows={invoices}
                                headCells={headings}
                                paynowFunction={() => pay_now()} />
                        </Card>
                    }
                </Grid>
                {demoAlert}
                {props.payLink ? <PAYNOW payLink={props.payLink} /> : null}
            </Grid>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.auth_reducer.token,
        invoicesList: state.customerBillings.invoices_list,
        payLink: state.customerBillings.paid_link,
        loading: state.customerBillings.loading,
        error: state.customerBillings.error,
        notificationsError: state.customerCommon.notifications_error_msg,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchingInvoicesLists: (token) => dispatch(action.fetchInvoices(token)),
        onPayingNow: (token, amount) => dispatch(action.payingnow(token, amount)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Invoices)
