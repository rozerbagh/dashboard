import React from 'react'
import styled from 'styled-components';
import { onConfirm } from 'react-confirm-pro';

const AlertWrapper = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 999999;
    opacity: 0;
    -webkit-animation: fadeIn 0.5s 0.2s forwards;
    -moz-animation: fadeIn 0.5s 0.2s forwards;
    -o-animation: fadeIn 0.5s 0.2s forwards;
    animation: fadeIn 0.5s 0.2s forwards;

    @-webkit-keyframes fadeIn {
        from {
            opacity: 0;
        };
        to {
            opacity: 1;
        };
    };

    @-moz-keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        };
    };

    @-o-keyframes fadeIn {
        from {
            opacity: 0;
        };
        to {
            opacity: 1;
        };
    };

    @keyframes fadeIn {
        from {
            opacity: 0;
        };
        to {
            opacity: 1;
        };
    };
`;

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

const CancelBtn = styled.button`
    outline: none;
    border: none;
    background-color: #EF5350;
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
`


function RedirectionModal(props) {

    const { linkRoute, bodyText, btnOkText, btnCancelText, ...rest } = props


    return <></>
}

export default RedirectionModal