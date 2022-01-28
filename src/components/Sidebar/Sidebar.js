/*eslint-disable*/
import React from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as FiIcons from "react-icons/fi";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import styles from "../../assets/jss/jsStyles/components/sidebarStyle.js";
import SubMenu from './SubMenu';

const Logo = styled.img`
  position: relative;
  margin: 0.5rem auto;
  height: 2.4rem;
  transition: 0.3s;
`;


const SidebarNav = styled.nav`
  position: relative;
  width: 100%;
`

const CocLink = styled(Link)`
  position: relative;
  margin: 0.5rem auto;
  height: 2.5rem;
`;
const useStyles = makeStyles(styles);

function activeRoute(routeName) {
  return window.location.href.indexOf(routeName) > -1 ? true : false;
}

const Sidebar = React.memo((props) => {
  const { color,
    logo,
    image,
    logoText,
    vendor,
    routes,
    handleSidebarToggler,
    handleSidebarOpen,
    isSidebarOpen,
    sidebarOpen,
    hoverOpen,
    hoverClose, ...rest } = props;

  const classes = useStyles();

  const [sideBar, setSideBar] = React.useState(true);

  const [activeNav, setActiveNav] = React.useState();

  // verifies if routeName is the one active (in browser input)

  const showSideBar = () => setSideBar(!sideBar);

  const [subNav, setSubNav] = React.useState(false);
  const [openKey, setOpenKey] = React.useState(routes[0].menuKey);
  const showSubMenus = (e, key) => {
    openKey !== key ? setOpenKey(key) : setOpenKey('');
    setSubNav((prev) => !prev);
    handleSidebarOpen()
  }


  return (
    // <div className={clsx(classes.sidebar, {
    //   [classes.sidebarOpen]: sidebarOpen,
    //   [classes.sidebarClose]: !sidebarOpen,
    // })}>
    <div className={`sidebar ${sidebarOpen ? 'sidebarOpen' : 'sidebarClose'}`}>

      <CocLink to={vendor === true ? "/vendor/maindashboard" : "/coc/dashboard"}>
        {sidebarOpen ? "Rozer" : "R"}
      </CocLink>

      <div className={classes.hambugerContainer}>
        {sidebarOpen ? <FiIcons.FiArrowLeft onClick={handleSidebarToggler} className={classes.hambugerIcon} /> :
          <FiIcons.FiArrowRight onClick={handleSidebarToggler} className={classes.hambugerIcon} />}
      </div>

      <SidebarNav>
        <ul className={classes.navMenuList}>
          {routes.map((route, index) => {
            var activePro;
            var selectSubMenu;
            if (route.path == "#") {
              route.subMenu.map((ele, i) => {
                activePro = activeRoute(ele.path);
                if (activePro == true) {
                  selectSubMenu = i
                }
              })
            } else {
              activePro = activeRoute(route.path);
            }

            return <SubMenu
              {...rest}
              route={route} key={`main - menu - ${index} `}
              isSidebarOpen={sidebarOpen}
              sideDropID={`sideDrop - ${index} `}
              {...rest}
              selectedSubMenu={selectSubMenu}
              selected={activePro}
              subNav={subNav}
              openKey={openKey}
              showSubNav={showSubMenus} />
          })}
        </ul>
      </SidebarNav>
    </div>
  )
})

export default Sidebar;