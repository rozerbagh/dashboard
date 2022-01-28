import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/img/logo.svg';
import cover from '../assets/img/vendor_accept.svg';
import Loader from '../components/UI/Loader/Loader';
import * as actions from '../store/actions/auth';

const Wrapper = styled.div`
    max-width: 1200px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    height: 100vh;
    margin: 0 auto;
    align-items: center;
    @media screen and (max-width: 720px){
        grid-template-columns: 1fr;
    }
`;

const RightContainer = styled.div`
    padding: 0px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    @media screen and (max-width: 720px){
        padding: 30px;
        align-items: center;
    }
`
const LeftContainer = styled.div`
    padding: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    @media screen and (max-width: 720px){
        padding: 0px;
    }
`

const BoldText = styled.div`
    font-weight: bold;
    color: #2F87FF;
    font-size: 1.5rem;
    max-width: 450px;
`;

function VendorAccept(props) {
    const company_name = props.location.search.split("=")[1];
    const { token } = useParams();
    React.useEffect(() => {
        props.onAcceptingVendor(token);
    }, [])

    return (
        <Wrapper>
            <LeftContainer>
                <img src={cover} alt="cover" width="100%" />
            </LeftContainer>
            <RightContainer>
                {props.loading ? <Loader bigLoader style={{ margin: "200px auto" }} /> :
                    <>
                        <h3>You have accepted the instances access request from</h3>
                        <BoldText> {company_name.split("%20").join(' ')} </BoldText>
                        <p>{props.success_msg !== null ? props.success_msg : 'Invite accepted.'}</p>
                    </>}

            </RightContainer>
        </Wrapper>
    )
}


const mapStateToProps = (state) => {
    return {
        loading: state.auth_reducer.loading,
        success_msg: state.auth_reducer.success_msg,
        error: state.auth_reducer.error,
    }
}

const mapsDispatchToProps = dispatch => {
    return {
        onAcceptingVendor: (token) => dispatch(actions.vendor_accept(token)),
    }
}

export default connect(mapStateToProps, mapsDispatchToProps)(VendorAccept);