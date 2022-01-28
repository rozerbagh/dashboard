import React, { useState } from 'react';

import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { FaUbuntu, FaWindows, FaCentos, FaRegHdd } from "react-icons/fa";
import { DiRedhat } from "react-icons/di";
import { FiCpu } from "react-icons/fi";
import { CgSmartphoneRam } from "react-icons/cg";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import * as CustomButton from '../CustomButtons/CustomButtons';
import DateTime from '../UI/DateTimePicker/DateTime';
import styles from "../../assets/jss/jsStyles/views/dashboardStyle";
import CentOS from '../../assets/img/centos.png';
const useStyles = makeStyles(styles);
const ScheduledTask = (props) => {

    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [selectTask, setSelectTask] = useState('Reboot');

    const handleSelectTaskChange = (event) => {
        setSelectTask(event.target.value);
        sessionStorage.setItem('current_instance_task_value', event.target.value)
    };
    // console.log(props.details)
    return (
        <Dialog
            key={`sehduled-task-modal-no-${props.mainIndex}`}
            open={props.open}
            fullScreen={fullScreen}
            onClose={props.handleClose}>
            <DialogContent>
                <div className={classes.reboot_container}>
                    <Typography variant="subtitle2">Schedule Task</Typography>
                    <div className={classes.reboot_contentRow}>
                        {
                            props.details.vm_os.toLowerCase().includes(('WINDOWS').toLowerCase()) ?
                                <Icon color="primary" style={{ fontSize: "2.5rem" }}>
                                    <FaWindows />
                                </Icon> : props.details.vm_os.toLowerCase().includes(('CENTOS').toLowerCase()) ?
                                    < >
                                        <img src={CentOS} alt="cent_os" style={{ width: "2.5rem" }} />
                                    </> : props.details.vm_os.toLowerCase().includes(('RHEL').toLowerCase()) ?
                                        <Icon color="error">
                                            <DiRedhat style={{ fontSize: "2.5rem" }} />
                                        </Icon> :
                                        <Icon color="error" style={{ fontSize: "2.5rem" }}><FaUbuntu /></Icon>
                        }
                        <span className="icon-text-gap"></span>
                        <Typography variant="body1">{props.details.vm_os}</Typography>
                    </div>
                    <div className={classes.reboot_contentRow}>
                        <Icon>
                            {
                                props.details.power_status == "POWERED_ON" ?
                                    <FiberManualRecordIcon color="secondary" style={{ fontSize: "1rem" }} /> :
                                    <FiberManualRecordIcon color="error" style={{ fontSize: "1rem" }} />
                            }
                        </Icon>
                        <span style={{ margin: "0 10px" }}></span>
                        <Typography variant="body1">{props.details.server_hostanme}</Typography>
                    </div>

                    <div className={classes.reboot_contentRow}>
                        <div className={classes.config_row}>
                            <Icon><FiCpu /></Icon>
                            <span style={{ margin: "0 3px" }}></span>
                            <Typography variant="body1"> {props.details.cpu} core</Typography>
                        </div>
                        <div className={classes.config_row}>
                            <Icon><CgSmartphoneRam /></Icon>
                            <span style={{ margin: "0 3px" }}></span>
                            <Typography variant="body1">{props.details.ram} GB</Typography>
                        </div>
                        <div className={classes.config_row}>
                            <Icon ><FaRegHdd /></Icon>
                            <span style={{ margin: "0 3px" }}></span>
                            <Typography variant="body1">{props.details.disk} GB</Typography>
                        </div>
                    </div>
                    <div className={classes.reboot_contentRow}>
                        <Typography variant="body1" style={{ padding: "0 5px", }}>
                            <strong>Public IP: </strong> {props.details.public_ip}
                        </Typography>
                        <Typography variant="body1" style={{ padding: "0 5px", }}>
                            <strong>Private IP: </strong> {props.details.private_ip}</Typography>
                    </div>
                    <div className={classes.reboot_contentRow}>
                        <DateTime
                            exportDate={props.handleSheduledDateChange}
                            label="Sheduled Task"
                            propsDate={props.sheduledDates}
                            sheduled={true}
                            dateTypes="from" />

                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="outlined-task-native-simple">Task</InputLabel>
                            <Select
                                native
                                value={selectTask}
                                onChange={handleSelectTaskChange}
                                label="Shedule Task"
                            >
                                <option value='reboot'>Reboot</option>
                                <option value='format'>Format</option>
                            </Select>
                        </FormControl>
                    </div>

                    <div className={classes.reboot_contentRow}>
                        <CustomButton.containedDangerButton
                            fullWidth
                            onClick={props.handleClose}>
                            Cancel
                        </CustomButton.containedDangerButton>
                        <CustomButton.MainSecondaryButton
                            fullWidth
                            onClick={props.submitHandler}>
                            Submit
                        </CustomButton.MainSecondaryButton>
                    </div>
                </div>
            </DialogContent>
        </Dialog >
    )
}

export default ScheduledTask;
