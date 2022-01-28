/*eslint-disable*/
import React from "react";
import { Link } from 'react-router-dom'
import styled from "styled-components";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import styles from "../../assets/jss/jsStyles/components/footerStyle.js";

const useStyles = makeStyles(styles);

const Footter = styled.footer`
  width: 100%;
  padding: 10px 20px;
  bottom: 0;
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &a{
    color: gray !important;
    transition: 0.3s;
    text-transform: uppercase;
    padding: 0 10px;
    font-size: 0.8rem;
    &:hover{
      color: blue !important;
    }
  }
`;

export default function Footer(props) {
  const classes = useStyles();
  return (
    <Footter>
      <Wrapper>
        <Link to="#blog">Blog</Link>
        <Link to="#home">Career</Link>
        <Link to="#company">Terms</Link>
        <Link to="#portfolio">Privacy</Link>
        <Link to="#portfolio">SLA</Link>
        <Link to="#portfolio">Support</Link>
        <Link to="#portfolio">API Documents</Link>
        <span>Copyright &copy; {new Date().getFullYear()}
          <a href="https://www.zybisys.com" target="_blank"> Zybisys</a>
        </span>
      </Wrapper>
    </Footter >
  );
}
