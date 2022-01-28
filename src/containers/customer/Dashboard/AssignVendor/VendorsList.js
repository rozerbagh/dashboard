import React, { useState, useEffect, useMemo } from "react";
import { connect } from 'react-redux';
import styled from 'styled-components'

// core components
import * as CustomBtn from '../../../../components/CustomButtons/CustomButtons'
import { Typography } from "@material-ui/core";
import * as action from '../../../../store/actions/customer/index'

const VendorCard = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: baseline;
    background-color: #EAF3FF;
    border-radius: 1em;
`;
const CardRow = styled.div`
    width: 100%;
    padding: 0.5em;
    display: grid;
    grid-template-columns: 1fr 2fr;
    border-radius: 0.3em;
    &:nth-child(odd) {
        background-color:#fff;
    }
`;

const AssignBtn = styled.button`
    padding:0.5em 1em;
    background-color: ${p => p.Assigned ? '#007bff' : '#aaaaaa'};
    cursor: pointer;
    color: #ffffff;
    border: none;
    border-radius: 0.4em;
    &:disabled {
        background-color: #aeccfc;
        color: #007bff;
    }
`;
const VendorCardd = (props) => {

    const [disableBtn, setDisableBtn] = useState(false);
    useEffect(() => {
        props.processing === true ? setDisableBtn(true) : setDisableBtn(false);
    }, [props.processing]);
    const assignVendor = (e) => {
        e.target.innerText = ' Loading...';
        setDisableBtn(true)
        setTimeout(() => {
            e.target.innerText = ' Assign';
            setDisableBtn(false)
        }, 5000)
        props.assignVendor()
    }
    return (
        <VendorCard>
            <CardRow>
                <Typography variant="body2">Comapny: </Typography>
                <Typography variant="body2">{props.ele.vendorId.vendor_company_name}</Typography>
            </CardRow>

            <CardRow>
                <Typography variant="body2">Address:</Typography>
                <div>
                    <Typography variant="body2">{props.ele.vendorId.vendor_city}</Typography>
                    <Typography variant="body2">{props.ele.vendorId.vendor_state}</Typography>
                    <Typography variant="body2">{props.ele.vendorId.vendor_country}</Typography>
                </div>
            </CardRow>

            <CardRow>
                <Typography variant="body2">Zipcode</Typography>
                <Typography variant="body2">{props.ele.vendorId.vendor_zipcode}</Typography>
            </CardRow>

            <CardRow>
                <Typography variant="body2">Status: </Typography>
                <Typography variant="body2">Active</Typography>
            </CardRow>

            {props.ele.vendorId.vendor_status == 1 ? <AssignBtn
                id={props.ele.vendorId._id}
                onClick={assignVendor}
                disabled={disableBtn}
                Assigned={props.ele.vendorId.vendor_status == 1 ? true : false}
            >
                {disableBtn ? 'Loading...' : 'Assign'}
            </AssignBtn> : <AssignBtn
                id={props.ele.vendorId._id}
                disabled={props.ele.vendorId.vendor_status == 1 ? false : true}
                Assigned={props.ele.vendorId.vendor_status == 1 ? true : false}
            >
                Pending
            </AssignBtn>}
        </VendorCard>


    );
}


export default VendorCardd;
