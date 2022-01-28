import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Popper from "@material-ui/core/Popper"
import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import Typography from "@material-ui/core/Typography"

import { FiSearch } from "react-icons/fi";

import * as action from '../../../../store/actions/customer/index'

const OuterDiv = styled.div`
    padding: 0.5em;
    display: flex;
    justify-content:space-between;
    align-items:center;
`;

const SearchBox = styled.div`
    border-radius: 0.8rem;
    background-color: transparent;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    box-shadow: inset 0 0 5px #eee;
    border: 1px solid #eee;
    position: relative;
    &:hover{
        box-shadow: 0 0 5px #eee;
    }
`;
const Input = styled.input`
    border: none;
    padding-top: 1em;
    padding-bottom: 1em;
    padding-left: 2em;
    width: 100%;
`;
const SearchIcon = styled.div`
    padding-left: 1rem;
`;

const SearchLists = styled(Popper)`
    padding: 1em;
    top: 1em;
    left: 0;
    position: absolute;
    background-color: #ffffff;
    border: 1px solid #eee;
    width: 90%;
    z-index: 99;
`;

const ListItem = styled.li`
    color: blue;
    padding: 0.5em;
    width: 100%;
    background-color: #EAF3FF;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items:center;
`

const Button = styled.button`
    color: #fff;
    background-color: #007bff;
    padding: 0.5em;
    border: none;
    border-radius: 0.5em;
    cursor: pointer;
`;

const SearchedVendorText = styled.span`
    font-size: 17px;
    color: inherit;
    font-weight: 400;
    width: 200px;
`
const SearchBar = React.memo((props) => {

    const [input, setInput] = React.useState('');

    const [openSearchBox, setOpenSearchBox] = React.useState(null);
    // const [anchorEl, setAnchorEl] = React.useState(null);

    const menuId = 'primary-search-account-menu';

    const handleSearchChange = (event) => {
        const inputValue = event.target.value
        event.preventDefault();
        setInput(inputValue);
        if (inputValue.length >= 3) {
            props.onSearchingVendor(props.token, inputValue);
            setOpenSearchBox(event.currentTarget);
            props.searchCard(inputValue)
        } else {
            props.searchCard(inputValue)
        }
    }

    const handleCloseSearchBox = () => {
        setOpenSearchBox(null);
    };

    const AddVendorCard = (ele) => {
        props.searchCard('')
        setInput('')
        props.addVendorsList(ele);
    }


    return (
        <OuterDiv>
            <SearchedVendorText>Search vendors</SearchedVendorText>
            <SearchBox>
                <SearchIcon>
                    <FiSearch style={{ fontSize: "1.5rem" }} />
                </SearchIcon>
                <Input
                    placeholder="Search vendor Name"
                    value={input}
                    onChange={handleSearchChange}
                    id="search-instance-box"
                />
                <SearchLists
                    open={Boolean(openSearchBox)}
                    anchorEl={openSearchBox}
                    transition
                    disablePortal
                    aria-labelledby="search-instance-box">
                    <ClickAwayListener onClickAway={handleCloseSearchBox}>
                        <ul>
                            {/* <li>Zybisys</li> */}
                            {props.searchList.length > 0 ? props.searchList.map((ele, index) => {
                                return <ListItem onClick={() => AddVendorCard(ele)}
                                    key={`vendor-list-no-${index}`}>
                                    {ele.vendor_company_name}
                                </ListItem>
                            }) : <ListItem>
                                <span>No Record found</span> <Button
                                    onClick={props.handleVendorInviteForm}
                                >Invite Vendor</Button>
                            </ListItem>}
                        </ul>
                    </ClickAwayListener>
                </SearchLists>
            </SearchBox>
        </OuterDiv>
    );
})


const mapStateToProps = (state) => {
    return {
        token: state.auth_reducer.token,
        searchList: state.customerDashboard.searchedVendor,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchingVendor: (token, name) => dispatch(),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
