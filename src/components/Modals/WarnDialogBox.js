import React, { useState, useEffect } from 'react';

import styled from 'styled-components'
import useTheme from "@material-ui/core/styles/useTheme";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { FiX } from 'react-icons/fi';

const CustomModal = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 75%;
    height: 80vh;
    padding: 1em;
    border-radius: 5px;
    position: relative;
    background-color: #ffffff;
    
`;

const Box = styled.div`
    max-height: 70vh;
    margin: 5px;
    z-index: 101;
    font-size: 0.8rem;
    overflow: none;
    overflow-y: scroll;
    color: #081b2c;
    position: relative;
    &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 0.2em #007bffa4;
        margin-right: 1em;
        border-radius: 1em;
    };

    &::-webkit-scrollbar-thumb{
        background-color: #007bff;
        border-radius: 1em;
    };

    &::-webkit-scrollbar{
        width: 0.2em;
    };
`
const Row = styled.div`
    display: grid;
    grid-template-columns: 0.5fr 2fr 2fr 1.5fr 7fr;
    grid-template-rows: auto;
    gap: 0.8em;
    padding: 0.1em;
    padding-left: 1.2em;
    align-items: center;
    border-radius: 0.7em;
    &:nth-child(odd){
        background-color: #ebf3ff;
    }
    &:nth-child(1){
        font-weight: 500;
    }
`
const OrangeText = styled.span`
    color: orangered;
`
const CloseButton = styled(FiX)`
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 1.2em;
    z-index: 999;
    cursor:pointer;
`
const Title = styled.span`
    font-size: 1.4rem;
`

const BodyText = styled.span`
    font-weight: 500;
`
const WarningDetails = (props) => {

    const theme = useTheme();

    return (
        <div>

            <CustomModal
                // className={classes.modal}
                open={props.open}
                onClose={props.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <Wrapper>
                        <div>
                            <Title>Total Warning Services</Title>
                            <CloseButton onClick={props.handleClose} />
                        </div>

                        <Box>
                            <Row>
                                <OrangeText>State</OrangeText>
                                <BodyText>Since</BodyText>
                                <BodyText>Instance</BodyText>
                                <BodyText>Service</BodyText>
                                <BodyText>Status Details</BodyText>
                            </Row>
                            {
                                props.warnings.map((ele, index) => {
                                    return <Row key={ele.id}>
                                        <OrangeText>WARN</OrangeText>
                                        <BodyText>{ele.date}</BodyText>
                                        <BodyText>{ele.name}</BodyText>
                                        <BodyText>{ele.title}</BodyText>
                                        <BodyText>{ele.details}</BodyText>
                                    </Row>
                                })
                            }
                        </Box>
                    </Wrapper>
                </Fade>
            </CustomModal>

            {/* <Dialog
                key={`warn-modal`}
                open={props.open}
                fullScreen={fullScreen}
                onClose={props.handleClose}>
                <DialogContent>
                    <Box>
                        <Row>
                            <OrangeText>State</OrangeText>
                            <BodyText>Since</BodyText>
                            <BodyText>Instance</BodyText>
                            <BodyText>Service</BodyText>
                            <BodyText>Status Details</BodyText>
                        </Row>
                        {
                            props.warnings.map((ele, index) => {
                                return <Row key={ele.id}>
                                    <OrangeText>WARN</OrangeText>
                                    <BodyText>{ele.date}</BodyText>
                                    <BodyText>{ele.name}</BodyText>
                                    <BodyText>{ele.title}</BodyText>
                                    <BodyText>{ele.details}</BodyText>
                                </Row>
                            })
                        }
                    </Box>
                </DialogContent>
            </Dialog > */}
        </div>
    )
}

export default WarningDetails;
