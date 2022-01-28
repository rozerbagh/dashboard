import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";

import * as Formatter from '../Functions/Formatter'
import Loader from "../UI/Loader/Loader";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '0px',
    }
}))

const NotificationBox = styled.div`
    width: 40rem;
    min-height: 400px;
    padding: 1.5em;
    background-color: #fff;
    border-radius: 10px;
    position: relative;
    font-size: 0.7rem;
`;

const NotifyRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: auto;
    gap: 0.5em;
    padding: 0.5em 1em;
    border-radius: 0.5em;
    font-weight: 500;
    &:nth-child(even){
        background-color: #ebf3ff;
    }
`;

const EachBox = styled.div`
    padding: 0.5rem 0;
    border-bottom: 1px solid #02314B;
`;

const LoaderBox = styled.div`
    margin: 1rem;
    padding: 1rem;
`;

const Title = styled.h6`
    font-size: 1.5rem;
    font-weight: 600;
    color: #02314B;
    width: 100%;
    text-align: center;
`;

const NotifyTitle = styled.span`
    font-size: 0.8rem;
    font-weight: 600;
    color: #02314B;
    width: 100%;
    padding: 0.2rem 0;
    text-align: center;
`;

const HR = styled.hr`
    background-color: #02314B;
`;

const CloseBtn = styled.div`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    z-index: 9999;
`;

const BodyText = styled.span`
    font-size: 0.8rem;
`

export default function NotificationsModal(props) {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [showPreNotify, setShowPreNotify] = React.useState(false);
    const [toNotifications, setToNotifications] = React.useState([]);
    const [preNotifications, setPreNotifications] = React.useState([]);

    useEffect(() => {
        const todayNotify = [];
        const previousNotify = [];
        var today = new Date().getDate();
        var presentMon = new Date().getMonth();
        if (props.isNotifications.length == 0 || props.isNotifications == null) {
            setToNotifications([]);
            setPreNotifications([]);
        } else {
            props.isNotifications.map(ele => {
                var textArr = ele.cnotification;
                var date = new Date(ele.ntime);
                var day = date.getDate();
                var month = Formatter.getShortMonth(date.getMonth());
                var year = date.getFullYear();
                var dayOfTheWeek = Formatter.getShortDayOfTheWeek(date.getDay());
                var hour = date.getHours();
                var minutes = date.getMinutes();
                if (today == day && presentMon == month) {
                    todayNotify.push({
                        id: Math.random().toString(),
                        instance: textArr.host,
                        ip: textArr.ip,
                        service: textArr.service,
                        state: textArr.state,
                        message: textArr.message,
                        date: `${dayOfTheWeek} ${month} ${day} ${hour}:${minutes} IST ${year}`,
                    })
                } else if (today != day || presentMon != month) {
                    previousNotify.push({
                        id: Math.random().toString(),
                        instance: textArr.host,
                        ip: textArr.ip,
                        service: textArr.service,
                        state: textArr.state,
                        message: textArr.message,
                        date: `${dayOfTheWeek} ${month} ${day} ${hour}:${minutes} IST ${year}`,
                    })
                }
            })

            setToNotifications(todayNotify);
            setPreNotifications(previousNotify);
        }
    }, [props.isNotifications]);


    const handlePreNotifyOpen = () => {
        setShowPreNotify(!showPreNotify)
    }
    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="responsive-dialog-title"
            ><CloseBtn>
                    <CloseIcon onClick={props.handleClose} />
                </CloseBtn>
                {props.loader ? <LoaderBox>
                    <Loader bigLoader />
                </LoaderBox> :
                    <DialogContent>
                        {props.isNotifications.length == 0 || props.isNotifications == null ? "There is no notifications" :
                            <NotificationBox>
                                {toNotifications.length == 0 ? <NotifyTitle>
                                    {toNotifications.length == 0 ? 'Today there is no notifications' : 'Today Notifications'}
                                </NotifyTitle> :
                                    toNotifications.map((ele, index) => {
                                        return <div key={`${ele.id}${Math.random()}`}>
                                            <NotifyRow>
                                                <BodyText>Instance :</BodyText>
                                                <BodyText>{ele.instance}</BodyText>
                                            </NotifyRow>

                                            <NotifyRow>
                                                <BodyText>IP Address :</BodyText>
                                                <BodyText>{ele.ip}</BodyText>
                                            </NotifyRow>

                                            <NotifyRow>
                                                <BodyText>Service :</BodyText>
                                                <BodyText>{ele.service}</BodyText>
                                            </NotifyRow>

                                            <NotifyRow>
                                                <BodyText>State :</BodyText>
                                                <BodyText
                                                    style={{
                                                        color: ele.state == "CRITICAL" ? '#FF4F28' :
                                                            ele.state == "WARNING" ? '#FFBA3F' : '#13D391'
                                                    }}
                                                >{ele.state}</BodyText>
                                            </NotifyRow>
                                            <NotifyRow>
                                                <BodyText>Message :</BodyText>
                                                <BodyText>{ele.message}</BodyText>
                                            </NotifyRow>
                                            <NotifyRow>
                                                <BodyText>Date :</BodyText>
                                                <BodyText>{ele.date}</BodyText>
                                            </NotifyRow>
                                        </div>
                                    })}
                                <br /><HR /> <br />
                                <NotifyTitle style={{ cursor: "pointer", }}
                                    onClick={handlePreNotifyOpen}
                                >{showPreNotify == true ? 'Previous Notifications' : 'View Previous Notifications'}</NotifyTitle>
                                {showPreNotify ? preNotifications.map((ele, index) => {
                                    return <EachBox key={`${ele.id}_${index}`}>
                                        <NotifyRow>
                                            <BodyText>Instance :</BodyText>
                                            <BodyText>{ele.instance}</BodyText>
                                        </NotifyRow>

                                        <NotifyRow>
                                            <BodyText>IP Address :</BodyText>
                                            <BodyText>{ele.ip}</BodyText>
                                        </NotifyRow>

                                        <NotifyRow>
                                            <BodyText>Service :</BodyText>
                                            <BodyText>{ele.service}</BodyText>
                                        </NotifyRow>

                                        <NotifyRow>
                                            <BodyText>State :</BodyText>
                                            <BodyText
                                                style={{
                                                    color: ele.state == "CRITICAL" ? '#FF4F28' :
                                                        ele.state == "WARNING" ? '#FFBA3F' : '#13D391'
                                                }}
                                            >{ele.state}</BodyText>
                                        </NotifyRow>
                                        <NotifyRow>
                                            <BodyText>Message :</BodyText>
                                            <BodyText>{ele.message}</BodyText>
                                        </NotifyRow>
                                        <NotifyRow>
                                            <BodyText>Date :</BodyText>
                                            <BodyText>{ele.date}</BodyText>
                                        </NotifyRow>
                                    </EachBox>
                                }) : null}
                            </NotificationBox>
                        }
                    </DialogContent>

                }
            </Dialog>
        </div>
    );
}
