import React,{useEffect, useState} from "react";
import "./Learnpage.css";
import styled from "styled-components";
import {Link} from "react-router-dom";

//REACT BOOTSTRAP 
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const Title = styled.div`
    text-align:center;
    font-size: 3rem;
    padding: 4rem 0 1.5rem 0;
    letter-spacing: 2px;
    font-weight: 650;
`;


function LearnPage() {
    const [mexicanStates, setMexicanStates] = useState([]);
    useEffect( ()=>{
        async function fetchState(){
            let response = await fetch("/get_states");
            response = await response.json();
            setMexicanStates(response.states);
        }
        fetchState();
    },[])
  return (
    <Container>
        <Row>
            <Col xl={12}>
                <Title>
                    Mexican States
                </Title>
            </Col>
        </Row>

        <Row className="pt-4">
            {mexicanStates.map((state)=>{
                return (
                    <Col key={state.id} xl={3} className="py-2">
                        <Link to={`/learn/${state.id}`}>
                            <Card className="state-card">
                                <Card.Img variant="top" className ="even-card-img" src={state.img} />
                                <Card.Body>
                                    <Card.Title className="card-title text-center fw-bold">{state.state}</Card.Title>
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

export default LearnPage;