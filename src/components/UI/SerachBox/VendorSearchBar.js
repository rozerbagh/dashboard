import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as formatter from '../../Functions/Formatter';
// @material/core components
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import InputBase from '@material-ui/core/InputBase';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import { FiSearch } from "react-icons/fi";
import List from './NameList';
import * as action from '../../../store/actions/vendor/index';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: "10px",
        backgroundColor: "transparent",
        border: "1px solid #eee",
        '&:hover': {
            boxShadow: "0 0 5px #eee",
        },
        width: '100%',
        alignItems: "baseline",
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(0),
            paddingLeft: theme.spacing(0),
            width: 'auto',
            paddingTop: theme.spacing(0),
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 1),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        height: "inherit",
        paddingTop: "0.3rem",
        paddingBottom: "0.3rem",
        paddingRight: "0",
        paddingLeft: "2rem",
        transition: theme.transitions.create('width'),
        backgroundColor: "transaparent",
        width: '100%',
        outline: "none",
        border: "none",
        [theme.breakpoints.up('md')]: {
            width: '60ch',
        },
        "&:hover,&:focus": {
            outline: "none",
            border: "none",
        }
    },
    searchResults: {
        borderRadius: "5px",
        boxShadow: "2px 2px 4px #aaaaaa",
        position: "absolute",
        top: "5px",
        left: "-250px",
        backgroundColor: "#ffffff",
        maxHeight: "500px",
        overflow: "none",
        overflowY: "auto",
    }
}));

const StyledMenuList = withStyles((theme) => ({
    root: {
        marginTop: theme.spacing(1)
    }
}))(MenuList)

const StyledMenu = withStyles((theme) => ({
    root: {
        fontSize: "1rem",
    }
}))(MenuItem)
const SearchBar = React.memo((props) => {
    const classes = useStyles();

    const [input, setInput] = React.useState('');

    const [openSearchBox, setOpenSearchBox] = React.useState(null);
    // const [anchorEl, setAnchorEl] = React.useState(null);

    const menuId = 'primary-search-account-menu';

    const [searchRedirect, setSearchRedirect] = React.useState(null);

    const handleSearchChange = (event) => {
        const inputValue = event.target.value;
        event.preventDefault();
        setInput(inputValue);
        if (props.inside_customer === true) {
            if (inputValue.length >= 3) {
                const id = JSON.parse(localStorage.getItem('vuid'));
                props.onSearching(props.token, id.vid, inputValue);
                setOpenSearchBox(event.currentTarget);
            } else {
                setOpenSearchBox(false);
            }

        } else {
            if (inputValue.length >= 3) {
                props.onSearchingCustomer(props.token, inputValue);
                setOpenSearchBox(event.currentTarget);
            } else {
                setOpenSearchBox(false);
            }
        }
        setSearchRedirect(null)
    }

    const handleCloseSearchBox = () => {
        setOpenSearchBox(null);
        setInput('')
    };

    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <FiSearch />
            </div>
            <InputBase
                className={classes.inputInput}
                variant="outlined"
                autoFocus={false}
                placeholder={props.inside_customer === true ?
                    "Enter Hostname or IP Name" :
                    "Enter Customer Name"}
                value={input}
                onChange={handleSearchChange}
                id="search-instance-box"
            />
            <Popper
                open={Boolean(openSearchBox)}
                anchorEl={openSearchBox}
                transition
                disablePortal
                aria-labelledby="search-instance-box"
            >
                <div className={classes.searchResults}>
                    <ClickAwayListener onClickAway={handleCloseSearchBox}>
                        <StyledMenuList role="menu">
                            {props.searchList.map((searchItem, i) => {
                                return <StyledMenu key={`ips-alias-${i}`}
                                    onClick={() => setInput('')}
                                >
                                    {props.inside_customer === true ?
                                        <Link to={{
                                            pathname: "/vendor/manage/zoom_view",
                                            search: '',
                                            hash: null,
                                            state: {
                                                lip: '',
                                                wip: '',
                                                tab: "services",
                                            }
                                        }} onClick={handleCloseSearchBox}>
                                            <List name={searchItem.vm_hostname_alias} />
                                        </Link>
                                        :
                                        <Link to={{
                                            pathname: '/vendor/dashboard',
                                            search: null,
                                            hash: null,
                                            state: {
                                                id: searchItem._id,
                                                email: searchItem.user_email,
                                                phone: searchItem.user_phone,
                                                company: searchItem.company_name
                                            }

                                        }} onClick={handleCloseSearchBox}>
                                            <List name={searchItem.company_name} />
                                        </Link>
                                    }
                                </StyledMenu>
                            })}
                        </StyledMenuList>
                    </ClickAwayListener>
                </div>
            </Popper>
            <input
                type="text"
                autoComplete="on"
                value=""
                onFocus={() => { }}
                style={{ display: 'none', opacity: 0, position: 'absolute' }}
                readOnly={true}
            />
        </div>
    );
})


const mapStateToProps = (state) => {
    return {
        token: state.auth_reducer.token,
        vid: state.auth_reducer.uid,
        panel: state.auth_reducer.coc_panel,
        searchList: state.vendorCommon.searched_list,
        inside_customer: state.vendorCommon.insideCustomer,

        customer_name: state.vendorCommon.customer_name,
        customer_id: state.vendorCommon.customer_id,
        customer_phone: state.vendorCommon.customer_phone,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchingCustomer: (token, name) => dispatch(action.searchingCustomer(token, name)),
        onSearching: (token, id, name) => dispatch(action.searching(token, id, name)),
        onSettingCustomers: (email, id, name, bool) => dispatch(action.set_customers(email, id, name, bool)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
