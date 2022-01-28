import React from 'react';

import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

export default function CloudConnectsTAble(props) {
    const { staticContext,
        row,
        index,
        handleEdit,
        currTooltipIndex,
        handleCloseTooltipAction,
        handleActionClick,
        ...rest } = props;
    return (
        <div className="cloud_connect_row" {...rest}>
            <div className="center-text">
                <Icon>
                    {
                        row.state == "Active" ?
                            <FiberManualRecordIcon color="secondary" style={{ fontSize: "0.8rem" }} /> :
                            <FiberManualRecordIcon color="error" style={{ fontSize: "0.8rem" }} />
                    }
                </Icon>
            </div>
            <div>{row.hostname}</div>
            <div>{row.net_mask}</div>
            <div>
                <span className="tags_btn_word">
                    Tags
                </span>
            </div>
            <div>{row.ip_addr}</div>
            <div>{row.mac_addr}</div>
            <div>{row.vlan}</div>
            <div className="center-text">{row.bandwidth_size} Mbps</div>
            <div>{row.location_a}</div>
            <div>{row.location_b}</div>
            <div>{row.circuit_id}</div>
            <div>
                <div className="center-text pos-rel">
                    <>
                        <IconButton
                            size="small"
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleActionClick}
                        // onClick={(e) => handleToolTipAction(e, index)}
                        >
                            <MoreHorizIcon color="primary" fontSize="small"
                                style={{ fontSize: "1.5rem" }}
                                key={`notifyIcon-${index}`} />
                        </IconButton>
                        {currTooltipIndex === index ?
                            <ClickAwayListener onClickAway={handleCloseTooltipAction}>
                                <div className="ToolTip cc-action-box">
                                    <ul>
                                        <li onClick={handleEdit}>Edit Connects</li>
                                    </ul>
                                </div>
                            </ClickAwayListener> :
                            null
                        }
                    </>

                </div>
            </div>
        </div>
    )
}
