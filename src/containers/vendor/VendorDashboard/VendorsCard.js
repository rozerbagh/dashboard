import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from "@material-ui/core";
import styled from 'styled-components'
import Loader from '../../../components/UI/Loader/Loader'
import Tardejini from '../../../assets/img/cpm_logo/tradejini_logo.png'
import Aliceblue from '../../../assets/img/cpm_logo/aliceblue.png'
import Bellweather from '../../../assets/img/cpm_logo/bellweather.png'
import Composites from '../../../assets/img/cpm_logo/composite_insurance.png'
import Zebu from '../../../assets/img/cpm_logo/zebu.png';
import Zybisys from '../../../assets/img/cpm_logo/zybisys.png'
import { AiOutlineArrowRight, AiOutlineDelete } from 'react-icons/ai'
export const Card = styled.div`
    width: 100%;
    border-radius: 0.5em;
    padding: 1em;
    box-shadow: 0 0 5px #ceebfa;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: baseline;
    color: #081b2c;
    font-size: 0.7rem;
    position: relative;
    font-weight:500;
`;

const IntanceBox = styled.div`
    background-color: #F8F9FB;
    padding: 1em;
    border-radius: 0.2rem;
    width:100%;
    margin: 0.2rem 0;
`;
const ServiceBox = styled.div`
    background-color: #F8F9FB;
    padding: 1em;
    border-radius: 0.2rem;
    width:100%;
    margin: 0.2rem 0;
`
const ProgressLabel = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ProgressBar = styled.div`
    width: 100%;
    height: 0.9rem;
    background-color: #ececec;
    position: relative;
    border-radius:0.2rem;
`;

const BarOkLabel = styled.span`
    color: #ffffff;
    font-size: 0.7rem;
    position: absolute;
    text-align: center;
    width: 100%;
    top: -3px;
`;
const BarWarnLabel = styled.span`
    color: #ffffff;
    font-size: 0.7rem;
    position: absolute;
    text-align: center;
    right: 5px;
    top: -3px;
`;
const BarDownLabel = styled.span`
    color: #ffffff;
    font-size: 0.7rem;
    position: absolute;
    text-align: center;
    right: 5px;
    top: -3px;
`;

const UpProgressBar = styled.div`
    width: ${p => p.width + '%'};
    background-color: #2F87FF;
    position:absolute;
    top:0;
    bottom:0;
    left: 0;
    z-index:10;
    border-radius:0.2rem;
`;

const WarnProgressBar = styled.div`
    width: ${p => p.width + '%'};
    background-color: #F1BF33;
    position:absolute;
    top:0;
    bottom:0;
    left: 0;
    z-index:9;
    border-radius:0.2rem;
`;

const DownProgressBar = styled.div`
    width: ${p => p.width + '%'};
    background-color: #EF5350;
    position:absolute;
    top:0;
    bottom:0;
    left: 0;
    z-index:8;
    border-radius:0.2rem;
`;

const UpLabel = styled.div`
    color:#2F87FF;
    margin: 0 0.1rem;
    position:relative;
`;
const DownLabel = styled.div`
    color:#EF5350;
    margin: 0 0.1rem;
    position:relative;
`;
const WarnLabel = styled.div`
    color:#F1BF33;
    margin: 0 0.1rem;
    position:relative;
`;
const UpIndicator = styled.div`
    position:relative;
    background-color:#2F87FF;
    width: 8px;
    height:2px;
    border-radius:5px;
    margin:0 0.11em;
`;
const DownIndicator = styled.div`
    position:relative;
    background-color:#EF5350;
    width: 8px;
    height:2px;
    border-radius:5px;
    margin:0 0.1rem;
`;

const WarnIndicator = styled.div`
    position:relative;
    background-color:#F1BF33;
    width: 8px;
    height:2px;
    border-radius:5px;
    margin:0 0.1rem;
`;

const Logo = styled.img`
    height: 3em;
`;
const CompanyName = styled.span`
    font-size: 1.2rem;
    text-transform: capitalize;
    margin-left: 10px;
`;

const Title = styled.div`
    display: flex;
    align-items: center;
`;
const CardFooter = styled.div`
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    font-size: 1.2rem;
`;

const RightArrow = styled(AiOutlineArrowRight)`
    color: inherit;
`;

const DelIcon = styled(AiOutlineDelete)`
    font-weight: 600;
    color: #EF5350;
    cursor: pointer;
`

const DeletingText = styled.span`
    font-style: 0.8rem;
`;
function VendorCard(props) {

    return (
        <Card>
            <>
                {props.companyName[0] == 'ALICE' ?
                    < Title>
                        <div>
                            <Logo src={Aliceblue} />
                        </div>
                        <CompanyName>Alice Blue</CompanyName>
                    </Title> : props.companyName[0] == 'COMPOSITE' ?
                        <Title>
                            <div>
                                <Logo src={Composites} />
                            </div>
                            <CompanyName>Composite</CompanyName>
                        </Title> : props.companyName[0] == 'Zybisys' ?
                            <Title>
                                <div>
                                    <Logo src={Zybisys} />
                                </div>
                                <CompanyName>Zybisys</CompanyName>
                            </Title> : props.companyName[0] == 'TRADEJINI' ?
                                <Title>
                                    <div>
                                        <Logo src={Tardejini} />
                                    </div>
                                    <CompanyName>Tradejini</CompanyName>
                                </Title> : props.companyName[0] == 'ZEBU' ?
                                    <Title>
                                        <div>
                                            <Logo src={Zebu} />
                                        </div>
                                        <CompanyName>Zebu</CompanyName>
                                    </Title> : props.companyName[0] == 'BELLWETHER' ?
                                        <Title>
                                            <div>
                                                <Logo src={Bellweather} />
                                            </div>
                                            <CompanyName>Bellweather</CompanyName>
                                        </Title> : <Title>
                                            <div>
                                                <Avatar src="" alt={`${props.companyName[0]}`} />
                                            </div>
                                            <CompanyName>{props.companyName[0]}</CompanyName>
                                        </Title>}
            </>
            <IntanceBox>
                <ProgressLabel>
                    <span>Instances</span>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <UpLabel>{props.vmUp}</UpLabel>
                        <UpIndicator />
                        <UpLabel>UP</UpLabel>
                        <DownLabel>{props.vmDown}</DownLabel>
                        <DownIndicator />
                        <DownLabel>Down</DownLabel>
                    </div>
                </ProgressLabel>
                <ProgressBar>
                    <UpProgressBar width={
                        props.inst_up_width === NaN ? 0 : props.inst_up_width} >
                        <BarOkLabel>{props.vmUp}</BarOkLabel>
                    </UpProgressBar>
                    <DownProgressBar width={
                        props.inst_down_width === NaN ? 0 : props.inst_up_width} >
                        <BarDownLabel>{props.vmDown}</BarDownLabel>
                    </DownProgressBar>
                </ProgressBar>
            </IntanceBox>
            <ServiceBox>
                <ProgressLabel>
                    <span>Services</span>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <UpLabel>{props.serviceOk}</UpLabel>
                        <UpIndicator />
                        <UpLabel>Ok</UpLabel>

                        <WarnLabel>{props.serviceWarns}</WarnLabel>
                        <WarnIndicator />
                        <WarnLabel>Warn</WarnLabel>

                        <DownLabel>{props.serviceCrits}</DownLabel>
                        <DownIndicator />
                        <DownLabel>Crit</DownLabel>
                    </div>
                </ProgressLabel>
                <ProgressBar>
                    <UpProgressBar width={
                        props.serv_up_width === NaN ? 0 : props.serv_up_width}>
                        <BarOkLabel>{props.serviceOk}</BarOkLabel>
                    </UpProgressBar>
                    <WarnProgressBar width={
                        props.serv_warn_width === NaN ? 0 : props.serv_warn_width}>
                        <BarWarnLabel>{props.serviceWarns}</BarWarnLabel>
                    </WarnProgressBar>
                    <DownProgressBar width={
                        props.serv_crit_width === NaN ? 0 : props.serv_crit_width}>
                        <BarDownLabel>{props.serviceCrits}</BarDownLabel>
                    </DownProgressBar>
                </ProgressBar>
            </ServiceBox>

            <CardFooter>
                <Link to={{
                    pathname: '/vendor/dashboard',
                    search: null,
                    hash: null,
                    state: {
                        id: props.vuid,
                        email: props.email,
                        phone: props.phone,
                        company: props.company_name,
                    }
                }}><RightArrow /></Link>

                <div>
                    {props.delIcon ? props.deleting ? <DeletingText>Deleting...</DeletingText> :
                        <DelIcon onClick={() => props.deleteCustomer(props.refID, props.vuid)} /> :
                        null
                    }

                </div>
            </CardFooter>
        </Card>
    )
}

export default VendorCard;