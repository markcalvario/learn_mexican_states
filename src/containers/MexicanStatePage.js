import React from "react";
import "./Learnpage.css";
import styled from "styled-components";
import {Link} from "react-router-dom";

import States from "../data/MexicanStates";
//REACT BOOTSTRAP 
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const Title = styled.div`
    text-align:center;
    font-size: 2.75rem;
    padding: 4rem 0 1.5rem 0;
    letter-spacing: 2px;
`;


function MexicanStatePage(props) {
  return (
    <Container>
        <Row>
            <Col xl={12}>
                <Title>
                    State
                    {console.log(props)}
                </Title>
            </Col>
        </Row>
        <Row className="pt-4">
            {States.map((state)=>{
                return (
                    <Col key={state.id} xl={3} className="py-2">
                        <Link to={`/learn/${state.id}`}>
                            <Card>
                                <Card.Img variant="top" className ="even-card-img" src={state.img} />
                                <Card.Body>
                                    <Card.Title className="text-dark text-center fw-bold">{state.state}</Card.Title>
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

export default MexicanStatePage;