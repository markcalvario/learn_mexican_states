import React from "react"
import Button from "../components/Button";
import styled from "styled-components";
//REACT BOOTSTRAP 
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Title = styled.div`
    text-align:center;
    font-size: 3.2rem;
    padding: 4rem 0 0.35rem 0;
    letter-spacing: 3px;
    font-weight: 650;
`;
const SubTitle = styled.div`
    text-align:center;
    font-size: 1.2rem;
    width: 45%;
    margin: 0 auto;
    padding: 0.5rem 0 2.5rem 0;
`;

function StartQuiz() {
  return (
    <Container>
        <Row>
            <Col xl={12}>
                <Title>
                    Feeling confident?
                </Title>
                <SubTitle>
                    Test your Mexican state geography.
                    
                </SubTitle>
            </Col>
        </Row>
        <Row className="pt-4">
            <Col xl={12} className="justify-content-center d-flex">
                <Button link="/quiz/start" text="start quiz"/>
            </Col>
        </Row>
    </Container>
  );
}

export default StartQuiz;