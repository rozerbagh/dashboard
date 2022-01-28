import React, { Component } from 'react';

import OtpInput from 'react-otp-input';

export default class OTP extends Component {
    constructor(props) {
        super(props)
        this.state = {
            otp: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = otp => this.setState({ otp });
    render() {
        return (
            <OtpInput
                value={this.state.otp}
                onChange={this.handleChange}
                numInputs={6}
                separator={<span></span>}
                inputStyle={{
                    margin:"20px 5px",
                    padding: "10px",
                    border: "1px solid #132739",
                    borderRadius: "6px",
                    fontSize: "18px",
                    width: "50px",
                    backgroundColor:"transparent",
                }}
            />
        );
    }
}

