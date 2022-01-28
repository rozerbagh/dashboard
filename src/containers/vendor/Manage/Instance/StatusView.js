import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import makeStyles from "@material-ui/core/styles/makeStyles";

import Box from "@material-ui/core/Box"
import Paper from "@material-ui/core/Paper"
import Tabs from '@material-ui/core/Tabs';
import Tab from "@material-ui/core/Tab";

import styled from 'styled-components';
import Loader from "../../../../components/UI/Loader/Loader";
import GridItem from "../../../../components/Grid/GridItem.js";
import Card from "../../../../components/Card/Card.js";

import * as action from '../../../../store/actions/vendor/index';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        boxShadow: "none",
        borderBottom: "1px solid #eee"
    },
    tab: {
        width: "50%",
        textTransform: "capitalize",
    },
    loaderContainer: {
        position: "relative",
        margin: "0 auto",
        width: "500px",
        height: "500px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    AlignLeft: {
        marginTop: "10px",
        float: "right",
    },
    switch_label: {
        display: "flex",
        alignItems: "center",
    }
}));

function TabPanel(props) {
    const { children, value, index, ...rest } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...rest}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function createWarnData(label, title, details) {
    return { label, title, details };
}

function createCritData(label, title, details) {
    return { label, title, details };
}
const Styledtable = styled.table`
    padding: 0 2rem;
`;
const StyledRow = styled.tr`
    align-items: baseline;
    padding: 10px 5px;
`;

const StyledCell = styled.td`
    min-width: 8rem;
    align-items: baseline;
    &:nth-child(1){
        max-width: 5rem;
    }
    &:nth-child(2){
        white-space: nowrap;
    }
`
const TableText = styled.span`
    font-size: 0.8rem;
    font-weight: 400;
    margin: 0 5px;
`

function StatusView(props) {

    const classes = useStyles();
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [ipArr, setIpArr] = useState(props.ipArr);

    const [warns, setWarns] = useState([]);
    const [crits, setCrits] = useState([]);

    useEffect(() => {
        const newWarnArr = [];
        const newCritArr = [];
        props.vm_status.map((status, index) => {
            status.config.map((subStatus, index) => {
                if (subStatus.state == 'WARN') {
                    newWarnArr.push(createWarnData('Warning', subStatus.title, subStatus.details))
                } else if (subStatus.state == 'CRIT') {
                    newCritArr.push(createWarnData('Critical', subStatus.title, subStatus.details))
                }
            });
        });
        setWarns(newWarnArr)
        setCrits(newCritArr)

    }, [props.vm_status]);

    return (
        <GridItem xs={12} sm={12} md={12}>
            {props.statusLoader ? <div className={classes.loaderContainer}>
                <Loader bigLoader style={{ margin: "0 auto" }} />
            </div> :
                <Card>
                    <Paper className={classes.root}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="Warnings" fullWidth={true} className={classes.tab} />
                            <Tab label="Criticals" fullWidth={true} className={classes.tab} />
                        </Tabs>
                    </Paper>
                    <TabPanel value={value} index={0}>
                        <Styledtable aria-label="instances-table" aria-label="a dense table" size="small">
                            <tbody>
                                {warns.map((status, i) => {
                                    return <StyledRow key={i}>
                                        <StyledCell align="left" style={{ color: "orange" }}>
                                            <TableText>{status.label}</TableText>
                                        </StyledCell>
                                        <StyledCell align="left" style={{ width: "5rem" }}>
                                            <TableText>{status.title}</TableText>
                                        </StyledCell>
                                        <StyledCell align="left"><TableText>{status.details}</TableText></StyledCell>
                                    </StyledRow>
                                })}
                            </tbody>
                        </Styledtable>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Styledtable aria-label="instances-table" aria-label="a dense table" size="small">
                            <tbody>
                                {crits.map((status, i) => {
                                    return <StyledRow key={i}>
                                        <StyledCell align="left" style={{ color: "red" }}>
                                            <TableText>{status.label}</TableText>
                                        </StyledCell>
                                        <StyledCell align="left" style={{ width: "100px" }}>
                                            <TableText>{status.title}</TableText>
                                        </StyledCell>
                                        <StyledCell align="left">
                                            <TableText>{status.details}</TableText>
                                        </StyledCell>
                                    </StyledRow>
                                })}
                            </tbody>
                        </Styledtable>
                    </TabPanel>
                </Card>}
        </GridItem>
    )
}

const mapStateToProps = state => {
    return {
        token: state.auth_reducer.token,
        vm_status: state.vendorInstances.vm_status,
        statusLoader: state.vendorInstances.statusLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFecthingVmStatus: (token, id, ipArr) => dispatch(action.fetch_vm_status(token, id, ipArr))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusView);