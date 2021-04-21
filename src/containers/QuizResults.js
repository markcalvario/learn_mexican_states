import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
//REACT BOOTSTRAP 
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const Title = styled.div`
    text-align:center;
    font-size: 2.75rem;
    padding: 3rem 0 0.25rem 0;
    letter-spacing: 2px;
    font-weight: 500;
`;

function QuizResults({userErrors}) {
  return (
    <Container>
       <Row>  
            <Col xl={12} >
                <Title>
                    Your results: <br/> {32-userErrors.length}/32
                </Title>
            </Col>
        </Row>
        <Row className="py-5">
            <Col xl={6} className="justify-content-end d-flex">
                    <Button link="/quiz/start" text="Try again"/>
            </Col>
            <Col xl={6}>
                <Button link="/learn" text="Learn"/>
            </Col>
        </Row>
        <Row className="pt-4">
            <Col xl={12} className="pb-3">
                <h4 className="border-bottom border-dark w-25 text-uppercase">Your Errors:</h4>
            </Col>
            {userErrors.map((mexicanState)=>{
                return (
                    <Col key={mexicanState.id} xl={3} className="py-3">
                        <Link to={`/learn/${mexicanState.id}`}>
                            <Card>
                                <Card.Img variant="top" className ="even-card-img" src={mexicanState.img} />
                                <Card.Body>
                                    <Card.Title className="text-dark text-center fw-bold">{mexicanState.state}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                )
            })}
        </Row>
    </Container>
  );
}

export default QuizResults;