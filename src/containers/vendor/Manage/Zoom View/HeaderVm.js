import React from 'react';

// @material-ui/core components
import Typography from "@material-ui/core/Typography"
import Collapse from "@material-ui/core/Collapse"

import styled from 'styled-components';

const HeaderBox = styled.div`
    margin: 1em 0;
    padding: 0.5em 2em;
    border: 1px solid #d8e8fd;
    border-radius: 0.5em;
    background-color: #ebf3ff;
    color: #02314B;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
`;
const DetailBox = styled.div`
    margin-bottom: 1em;
    padding: 1em 2em;
    border-radius: 1em;
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;
    background-color: #fefefe;
    border: 1px solid #d8e8fd;
`;

const OperatingSystem = styled(Typography)`
    grid-area: 1/1/span 1/span 1;
`;

const Configuration = styled(Typography)`
    grid-area: 2/1/span 2/ span 1;
`;

const PublicIP = styled(Typography)`
    grid-area: 1/2/span 1/ span 2;
`;

const PrivateIP = styled(Typography)`
    grid-area: 2/2/span 1/ span 2;
`;

const Network = styled.div`
    grid-area: 1/3/span 2/ span 3;
`;

const VmHeader = (props) => {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    return (
        <div>
            <HeaderBox onClick={() => setOpen(!open)}>
                <Typography variant="body2" gutterBottom>
                    <strong>Hostname:</strong> {row.vm_server_hostname}
                </Typography>

                <Typography variant="body2">
                    <strong>Public IP:</strong> {row.wan_ip}
                </Typography>
            </HeaderBox>

            <Collapse in={open} timeout="auto" unmountOnExit key={`key-for-instance-network`}>
                <DetailBox>
                    <OperatingSystem variant="body2" key={`key-for-instance-os-network}`}>
                        <strong>os:</strong> {row.vm_os}
                    </OperatingSystem>
                    <Configuration variant="body2" key={`key-for-instance-capacity-network}`}>
                        <strong>capacity:</strong> {row.cpu} | {row.ram} | {row.disk}
                    </Configuration>

                    <PublicIP variant="body2" key={`key-for-instance-publicIP-network}`}>
                        <strong>Public IP:</strong> {row.wan_ip}
                    </PublicIP>
                    <PrivateIP variant="body2" key={`key-for-instance-privateIP-network}`}>
                        <strong>Private IP:</strong> {row.lan_ip}
                    </PrivateIP>
                    <Network>
                        {row.network.map((inst, i) => (
                            <Typography variant="body2" key={`key-for-instance-ips-network-${i}`}>
                                <strong>Private IP</strong> : {inst.ip} {inst.name}
                            </Typography>
                        ))}
                    </Network>
                </DetailBox>
            </Collapse>
        </div>

    )
}

export default VmHeader