const loginPage = {
    loginContainer: {
        position: "relative",
        display: "grid",
        gridTemplateRows: 'auto',
        gridTemplateColumns: "1fr 1fr",
    },
    rightBox: {
        display: "flex",
        flexDirections: "column",
        textAlign: 'left'
    },
    leftBox: {
        display: "flex",
        flexDirections: "column",
        textAlign: 'left'
    },
    linkWrap: {
        "& p": {
            marginTop: "0px",
            paddingTop: "0px"
        }
    }
}


export default loginPage;