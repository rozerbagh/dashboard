import {
    drawerWidth,
    defaultFont,
    whiteColor,
    grayColor,
} from "../../variables";

const sidebarStyle = (theme) => ({
    sidebar: {
        height: '100vh',
        border: "none",
        position: "relative",
        zIndex: "1029",
        backgroundColor: "#ffffff",
        whiteSpace: 'nowrap',
        display: "flex",
        flexDirection: "column",
        alignItems: "baseline"
    },
    sidebarOpen: {
        width: drawerWidth,
        [theme.breakpoints.up('xl')]: {
            width: 300
        },
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    sidebarClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: '4rem',
        // [theme.breakpoints.up('sm')]: {
        //     width: '10rem',
        // },
        // [theme.breakpoints.up("xl")]: {
        //     width: '10rem',
        // },
    },
    hambugerContainer: {
        position: "relative",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    hambugerIcon: {
        fontSize: "1.2rem",
        position: "relative",
        margin: "0.8rem auto",
        cursor: "pointer",
    },
    navMenuList: {
        listStyle: "none",
        width: "100%",
    },
    navItem: {
        position: "relative",
        marginTop: "2rem",
        marginLeft: '0px',
        marginRight: '0px',
        marginBottom: '0px',
        textDecoration: "none",
        borderLeft: "4px solid #fff",
        "&:hover": {
            borderLeft: "4px solid #007bff"
        },
        "&:focus,&:visited,&": {
            color: whiteColor,
        }
    },
    subNavItem: {
        position: "relative",
        display: "block",
        textDecoration: "none",
        "&:hover": {
            color: "#007bff"
        },
        "&:focus,&:visited,&": {
            color: whiteColor,
        }
    },
    navItemLink: {
        width: "100%",
        transition: "all 300ms linear",
        position: "relative",
        display: "grid",
        gridTemplateColumns: "0.5fr auto 0.5fr",
        alignItems: "center",
        gap: "0px",
        padding: "5px 30px",
        ...defaultFont
    },
    navItemIcon: {
        border: "1px solid #ccc",
        fontSize: "2rem",
        textAlign: "center",
        fontWeight: "300",
        color: grayColor[0],
        gridArea: "1/1/span 1/span 1",
        marginLeft: "-5px",
    },

    navItemName: {
        border: "1px solid #ccc",
        textAlign: "left",
        fontWeight: "300",
        color: grayColor[0],
        gridArea: "1/2/span 1/span 2"
    },
    navItemDropdown: {
        border: "1px solid #ccc",
        alignItems: "left",
        fontWeight: "300",
        color: grayColor[0],
        gridArea: "1/3/span 1/span 3",

    },
    subNavContainer: {
        gridArea: "2/1/span 1/span 2"
    },
    subNavItemLink: {
        width: "100%",
        transition: "all 300ms linear",
        position: "relative",
        paddingLeft: "50px",
        backgroundColor: "transparent",
        ...defaultFont
    },

    moreLessIcon: {
        fontSize: "16px",
        float: "right",
        alignItems: "center",
        marginRight: "5px",
        textAlign: "center",
        verticalAlign: "middle",
        fontWeight: "300",
        color: grayColor[0],
    },
    navItemText: {
        ...defaultFont,
        margin: "0",
        color: `${p => p.activeNav ? '#007bff' : '#333'}`,
        textAlign: "center",
        fontWeight: "400",
        fontSize: "1rem",

    },
    subNavItemText: {
        ...defaultFont,
        color: grayColor[0],
        textAlign: "left",
        fontWeight: "400",
        fontSize: "0.8rem",
    },
    navLogo: {
        position: "relative",
        paddingLeft: "20px",
        paddingRight: "0px",
        paddingTop: "5px",
        paddingBottom: "5px",
        width: "10rem",
        [theme.breakpoints.up("xl")]: {
            width: "170px",
        },
    },
    smallNavLogo: {
        position: "relative",
        paddingLeft: "15px",
        paddingRight: "0px",
        paddingTop: "5px",
        paddingBottom: "5px",
        width: "10rem",
        [theme.breakpoints.up("xl")]: {
            width: "170px",
        },
    },
    logoLink: {
        ...defaultFont,
        textTransform: "uppercase",
        padding: "5px 0",
        display: "block",
        fontSize: "18px",
        textAlign: "left",
        fontWeight: "400",
        lineHeight: "30px",
        textDecoration: "none",
        backgroundColor: "transparent",
        "&,&:hover": {
            color: grayColor[0]
        }
    },
    logoImage: {
        width: "30px",
        display: "inline-block",
        maxHeight: "30px",
        marginLeft: "10px",
        marginRight: "15px"
    },
    whiteFont: {
        color: whiteColor
    },
    sidebarWrapper: {
        position: "relative",
        height: "calc(100vh - 5px)",
        overflowY: "auto",
        width: "200px",
        zIndex: "4",
        overflowScrolling: "touch"
    },
    activePro: {
        [theme.breakpoints.up("md")]: {
            position: "absolute",
            width: "100%",
            bottom: "13px"
        }
    }
});

export default sidebarStyle;
