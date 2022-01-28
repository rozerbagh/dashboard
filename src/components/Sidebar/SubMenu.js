import React, { useState, useEffect } from 'react';

import Collapse from '@material-ui/core/Collapse';
import { NavLink, Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(({ staticContext, isSidebarOpen, active, children, ...rest }) => <NavLink {...rest}>{children}</NavLink>)`
    display: grid;
    color: #2D5469;
    grid-template-columns:${p => p.isSidebarOpen ? '0.8fr 2.2fr 0.3fr' : '1fr'} ;
    align-items: center;
    padding: ${p => p.isSidebarOpen ? '16px 20px' : '16px 20px'};
    list-style: none;
    margin-bottom: 0.5rem;
    text-decoration: none;
    border-left: ${p => p.active ? '4px solid #007bff' : '4px solid #fff'};
    transition: 0.2s ease-in-out all;
    &:hover {
        background: transparent;
        border-left: 4px solid #007bff;
        cursor: pointer;
        transition: 0.2s ease-in-out all;
    }
    &:active {
        background: transparent;
        border-left: 4px solid #007bff;
        cursor: pointer;
        transition: 0.2s ease-in-out all;
    }
`

const SidebarLinkLabel = styled(({ staticContext, isSidebarOpen, active, children, ...rest }) => <div {...rest}>{children}</div>)`
    display: grid;
    font-weight: 400;
    color: #2D5469;
    grid-template-columns:${p => p.isSidebarOpen ? '0.8fr 2.2fr 0.3fr' : '1fr'} ;
    align-items: center;
    padding: ${p => p.isSidebarOpen ? '16px 20px' : '16px 20px'};
    list-style: none;
    margin-bottom: 0.5rem;
    text-decoration: none;
    border-left: ${p => p.active ? '4px solid #007bff' : '4px solid #fff'};
    transition: 0.2s ease-in-out all;
    &:hover {
        background: transparent;
        border-left: 4px solid #007bff;
        cursor: pointer;
        transition: 0.2s ease-in-out all;
    }
    &:active {
        background: transparent;
        border-left: 4px solid #007bff;
        cursor: pointer;
        transition: 0.2s ease-in-out all;
    }
`

const SidebarLabel = styled(({ staticContext, isSidebarOpen, active, children, ...rest }) => <span {...rest}>{children}</span>)`
    font-size: 0.8rem;
    display: ${p => p.isSidebarOpen === true ? setTimeout(() => 'block', 1000) : 'none'};
    transition: 0.2s ease-in-out all;
    color: ${p => p.active ? '#007bff' : '#2D5469'};
`;


const SidebarDropIcon = styled(({ staticContext, isSidebarOpen, active, children, ...rest }) => <div {...rest}>{children}</div>)`
    display: ${p => p.isSidebarOpen === true ? 'block' : 'none'};
    transition: 0.2s ease-in-out all;
`

const DropdownLink = styled(NavLink)`
    background: transparent;
    display: grid;
    grid-template-columns: 0.8fr 2.2fr 0.3fr;
    align-items: center;
    text-decoration: none;
    padding-left: 1rem;
    &:hover {
        background: transparent;
        cursor: pointer;
    }
`
const IconDiv = styled(({ staticContext, isSidebarOpen, active, children, ...rest }) => <div {...rest}>{children}</div>)`
    color: ${p => p.active ? '#007bff' : '#2D5469'};
    transition: 0.2s ease-in-out all;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 0.8rem;
`;
const SubMenu = (props) => {

    const {
        classes,
        route,
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        selected,
        sideDropID,
        selectedSubMenu,
        subNav,
        openKey,
        showSubNav,
        ...rest } = props

    return (
        <>
            {route.path == '#' ? <SidebarLinkLabel onClick={(e) => showSubNav(e, route.menuKey)}
                isSidebarOpen={isSidebarOpen} active={selected}
            >
                <IconDiv active={route.subMenu ?
                    selectedSubMenu || selectedSubMenu == 0 ? true : false
                    : selected}
                >
                    <route.icon style={{ fontSize: "1.5rem" }} />
                </IconDiv>
                <SidebarLabel isSidebarOpen={isSidebarOpen}
                    active={route.subMenu ?
                        selectedSubMenu || selectedSubMenu == 0 ? true : false
                        : selected}
                >
                    {route.name}
                </SidebarLabel>
                <SidebarDropIcon isSidebarOpen={isSidebarOpen}>
                    {route.subMenu && openKey === route.menuKey && subNav ? <route.lessIcon style={{ fontSize: "0.8rem", }} /> :
                        route.subMenu ? <route.moreIcon style={{ fontSize: "0.8rem" }} /> : null}
                </SidebarDropIcon>
            </SidebarLinkLabel>
                :
                <SidebarLink to={route.path}
                    isSidebarOpen={isSidebarOpen} active={selected}
                >
                    <IconDiv active={route.subMenu ?
                        selectedSubMenu || selectedSubMenu == 0 ? true : false
                        : selected}
                    >
                        <route.icon style={{ fontSize: "1.5rem" }} />
                    </IconDiv>
                    <SidebarLabel isSidebarOpen={isSidebarOpen}
                        active={route.subMenu ?
                            selectedSubMenu || selectedSubMenu == 0 ? true : false
                            : selected}
                    >
                        {route.name}
                    </SidebarLabel>
                    <SidebarDropIcon isSidebarOpen={isSidebarOpen}>
                        {route.subMenu && subNav ? <route.lessIcon /> : route.subMenu ?
                            <route.moreIcon /> : null}
                    </SidebarDropIcon>
                </SidebarLink>
            }

            <Collapse in={openKey === route.menuKey}>
                {route.subMenu && openKey === route.menuKey ? route.subMenu.map((item, index) => {
                    return (
                        <DropdownLink
                            to={item.path} key={index}
                        >
                            <div></div>
                            <SidebarLabel isSidebarOpen={isSidebarOpen}
                                active={selectedSubMenu == index ? true : false}
                            >
                                {item.name}
                            </SidebarLabel>
                        </DropdownLink>
                    );
                }) : null}
            </Collapse>
        </>
    )
}

export default SubMenu;