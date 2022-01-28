import React from 'react';
import { Link } from 'react-router-dom'
import logo from '../assets/img/logo.svg';
import cover from '../assets/img/welcome_sign_up.svg';



export default function Welcome_signup() {
    return (
        <div className="welcome-wrapper">
            <div style={{ width: "100%", height: "100vh", position: "fixed", zIndex: -1 }}>
                <img src={cover} className="welcome-img" />
            </div>
            <br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br />
            <h1>Welcome</h1>
            <h2>Your Mail Has Been verified !</h2>
            <p>Thank for signing up. You can enjoy our services.</p>
            <Link to="/login" style={{
                width: "300px",
                padding: "10px 15px",
                margin: "20px 0",
                border: "1px solid #20c9a6",
                borderRadius: "5px",
                backgroundColor: "#56f1d2",
                color: "white",
                transition: "0.3s",
                "&:hover": {
                    border: "none",
                    border: "1px solid #20c9a6",
                    backgroundColor: "#c8fcf1",
                    color: "#20c9a6"
                }
            }}>Home</Link>
        </div>
    )
}
