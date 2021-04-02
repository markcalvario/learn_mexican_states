import React from "react"
import Button from "../components/Button";
import styled from "styled-components";
//REACT BOOTSTRAP 
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


import MexicanStatesMap from "../img/mexico_map.png";
const Title = styled.div`
    text-align:center;
    font-size: 2.75rem;
    padding: 4rem 0 1.5rem 0;
    letter-spacing: 2px;
`;
const IMG = styled.img`
    height: 50%;
    width: 100%;
    object-fit: cover;
`;

function HomePage() {
  return (
    <Container>
        <Row>
            <Col xl={12}>
                <Title>
                    Memorize the Mexican States
                </Title>
            </Col>
        </Row>
        <Row className="pt-4">
            <Col xl={6} className="justify-content-end d-flex">
                    <Button link="/learn" text="learn"/>
            </Col>
            <Col xl={6}>
                <Button link="/quiz" text="quiz"/>
            </Col>
        </Row>
        <Row className="justify-content-center mx-auto w-50 py-4 mt-5">
            <IMG src={MexicanStatesMap}/>
        </Row>
    </Container>
  );
}

export default HomePage;