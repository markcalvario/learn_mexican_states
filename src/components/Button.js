import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

const ButtonComponent = styled.button`
    background-color: black;
    color: white;
    padding: .5em 4.5em;
    text-transform: uppercase;
    border: 1px solid black;
`;
const Text = styled.p`
    font-size: 1.5rem;
    margin: 0;
`;

const Button = ({link,text}) => {
  return (
      <Link to={link} onClick={() => {window.location.href=`${link}`}}>
        <ButtonComponent>
            <Text>{text}</Text>
        </ButtonComponent>
      </Link>
  );
}

export default Button;