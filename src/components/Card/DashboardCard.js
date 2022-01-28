import styled from 'styled-components';
// import {
//     primaryColor,
//     primaryLightColor,
//     successColor,
//     warningColor,
//     dangerColor,
//     infoColor,
//     roseColor,
//     grayColor,
//     blackColor,
//     whiteColor,

// } from '../../assets/jss/variables'
export const totalColor = "#2F87FF";
export const MainGrid = styled.div`
    /* display: grid;
    grid-template-columns: auto auto 0.6fr 0.6fr;
    align-items: baseline; */
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    @media screen and (max-width: 720px){
        flex-direction: column;
    }
`;
export const WidgetCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: baseline;
    justify-content: center;
    padding: 12px 10px 10px 10px;
    box-shadow: 0 0 0.5em #d6f0fd;
    background-color: #ffffff;
    border-radius: 0.8rem;
    margin: 10px 15px 0 15px;
    @media screen and (max-width: 720px){
        width: 100%;
    }
`;

export const InstanceLabel = styled.span`
    font-weight: 500;
`;

export const CardLabel = styled.div`
    font-size: 0.9rem;
    font-weight: 500;
    color: #0B2339;
    text-transform: uppercase;
`;

export const TotalBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #12ED63;
    margin: 5px;
    border-radius: 0.5rem;
    width: 5em;
    height: 5em;
`;

export const OKBOX = styled.div`
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #4DB6AC;
    margin: 5px;
    border-radius: 0.5rem;
    width: 5em;
    height: 5em;
`;

export const DownBox = styled.div`
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #EF5350;
    margin: 5px;
    border-radius: 0.5rem;
    width: 5em;
    height: 5em;
`;

export const WarnBOX = styled.div`
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #F1BF33;
    margin: 5px;
    border-radius: 0.5rem;
    width: 5em;
    height: 5em;
`;

export const TicketsPending = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0;
    padding: 0px 0.5rem;
    border-radius: 0.5em;
    background-color: #F1BF33;
    color: #ffffff;
    font-size: 0.8rem;
    font-weight: 400;
`;

export const TicketsClosed = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
    padding: 0px 5px;
    border-radius: 0.5em;
    background-color: #EF5350;
    color: #ffffff;
    margin-bottom: 5px;
    font-size: 0.8rem;
    font-weight: 400;
`;

export const WhiteText = styled.label`
    color: #ffffff;
    font-size: 0.8rem;
    font-weight: 400;
`