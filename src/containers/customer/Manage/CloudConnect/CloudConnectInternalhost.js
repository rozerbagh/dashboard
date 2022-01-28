import React from 'react';
import * as formatter from '../../../../components/Functions/Formatter'
import Collapse from "@material-ui/core/Collapse"
export default function CloudConnectsTAble(props) {
    const { staticContext,
        currInternalhostIndex,
        int_ext_loader,
        dropdowndata,
        row,
        index,
        handleClick,
        ...rest } = props;
    return (
        <>
            <div className="four_row" {...rest}>
                <div onClick={(e) => handleClick(e, row.ip, index)} className="pointer">{row.ip}</div>
                <div>{formatter.formatBytes(row.transmitted)}</div>
                <div>{formatter.formatBytes(row.received)}</div>
                <div>{formatter.formatBytes(row.total)}</div>
            </div>
            <Collapse in={currInternalhostIndex === index}>
                <div className="border-box">
                    <div className="five-row" key="int-ext-header">
                        <div className="center-text font500">Source IP</div>
                        <div className="center-text font500">Destination IP/Port</div>
                        <div className="center-text font500">Transmitted</div>
                        <div className="center-text font500">Received</div>
                        <div className="center-text font500">Total</div>
                    </div>
                    {int_ext_loader ?
                        <div style={{ margin: "0 auto", fontWeight: 500 }}>Loading...</div> :
                        dropdowndata.map((ele, index) => (
                            <div className="five-row" key={`int-ext-${index}`}>
                                <div>{ele.source_ip}</div>
                                <div>{ele.dest_ip_port}</div>
                                <div>{formatter.formatBytes(ele.transmitted)}</div>
                                <div>{formatter.formatBytes(ele.received)}</div>
                                <div>{formatter.formatBytes(ele.total)}</div>
                            </div>
                        ))}</div>
            </Collapse>
        </>
    )
}
