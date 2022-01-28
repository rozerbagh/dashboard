import React, { useState } from 'react';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import * as Button from 'components/CustomButtons/CustomButtons';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import PublishIcon from '@material-ui/icons/Publish';

import * as action from '../../../store/actions/customer/index';

const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        padding: "5px 10px",
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
    uploadButton: {
        zIndex: 5,
        position: "absolute",
        width: "300px",
        height: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
}));

function UploadImage(props) {
    const classes = useStyles();

    const [profileImage, setProfileImage] = useState(null);
    const [profileThumbImage, setProfileThumbImage] = useState(null);
    const [btnColor, setBtnColor] = useState('primary')

    const handleChange = (event) => {
        setProfileImage(URL.createObjectURL(event.target.files[0]));
        // setProfileThumbImage(URL.createObjectURL(event.target.files[1]));
        setBtnColor('default')
    }

    const uploadImageHandler = (event) => {
        event.preventDefault();
        props.onUploadingImage(props.token, profileImage, profileImage)
    }

    return (
        <div className={classes.root}>
            <div className={classes.uploadButton}>
                <input
                    accept="image/*"
                    className={classes.input}
                    onChange={handleChange}
                    id="upload-image"
                    multiple
                    type="file"
                />
                <label htmlFor="upload-image">
                    <IconButton color={btnColor} aria-label="upload picture"
                        component="span">
                        <PhotoCamera />
                    </IconButton>
                </label>
                <IconButton color={btnColor} onClick={uploadImageHandler}>
                    <PublishIcon />
                </IconButton>
            </div>

            <div style={{
                position: "relative",
                width: "300px",
                height: "300px",
                border: "1px solid #ccc",
                // objectFit: "cover",
                borderRadius: "5px",
                zIndex: "1",
                backgroundImage: `url(${profileImage})`,
                backgroundSize: "cover",
            }}>
                {/* <img src={profileImage} style={{ height: "100px", }} /> */}
            </div>

        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        token: state.auth_reducer.token,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUploadingImage: (token, img, thumbImg) => dispatch(action.upload_image(token, img, thumbImg)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadImage);