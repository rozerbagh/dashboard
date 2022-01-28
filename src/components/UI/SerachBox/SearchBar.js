import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
// @material/core components
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import { FiSearch } from "react-icons/fi";
import List from './NameList'
import * as customerAction from '../../../store/actions/customer/index'
import * as formatter from '../../Functions/Formatter';

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
    const [searchDatas, setSearchDatas] = useState([]);
    const [input, setInput] = React.useState('');

    const [openSearchBox, setOpenSearchBox] = React.useState(null);

    const menuId = 'primary-search-account-menu';

    const handleSearchChange = (event) => {
        const inputValue = event.target.value;
        event.preventDefault();
        setInput(inputValue);
        if (inputValue.length >= 3) {
            props.onSearchingIPs(props.token, inputValue);
            setOpenSearchBox(event.currentTarget);
        } else {
            setOpenSearchBox(false);
        }

    }
    const handleCloseSearchBox = () => {
        setOpenSearchBox(null);
    };

    useEffect(() => {
        if (props.searchList.length > 0) {
            const values = props.searchList.filter(ele => {
                if (input.length > 0) {
                    if ((ele.vm_hostname_alias).toLowerCase().includes(input.toLowerCase())) {
                        return ele
                    } else {
                        // return ele;
                    }
                } else {
                    return ele
                }

            });
            setSearchDatas(values)
        }
    }, [input, props.searchList])

    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <FiSearch />
            </div>
            <InputBase
                type="text"
                className={classes.inputInput}
                variant="outlined"
                autoFocus={false}
                placeholder="Enter Hostname or IP to search"
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
                            {searchDatas.length === 0 ?
                                <StyledMenu key={Math.random().toString()}
                                    className={classes.dropdownItem}
                                >
                                    <span style={{ fontSize: "16px", color: "coral", fontWeight: 400 }}>
                                        No Recoreds Found !
                                    </span>

                                </StyledMenu> :
                                searchDatas.map((search, i) => {
                                    return <StyledMenu key={`ips-alias-${i}`}
                                        className={classes.dropdownItem}
                                        onClick={() => setInput('')}
                                    >
                                        <Link
                                            to={{
                                                pathname: "/coc/manage/zoom_view",
                                                search: '',
                                                hash: null,
                                                state: {
                                                    lip: '',
                                                    wip: '',
                                                    tab: "services",
                                                }
                                            }} onClick={handleCloseSearchBox}>
                                            <List name={search.vm_hostname_alias} />
                                        </Link>

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
        searchList: state.customerCommon.searched_list,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchingIPs: (token, name) => dispatch(customerAction.searching(token, name)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
