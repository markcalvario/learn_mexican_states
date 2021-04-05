import React,{useState, useEffect} from "react";
import "./Learnpage.css";
import styled from "styled-components";
import {useParams} from "react-router-dom";

//REACT BOOTSTRAP 
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//CUSTOM COMPONENTS
import Button from "../components/Button";

const Title = styled.div`
    text-align:center;
    font-size: 2.75rem;
    padding: 4rem 0 1.5rem 0;
    letter-spacing: 2px;
`;
const IMG = styled.img`
    height: 400px;
    width: 400px;
    padding: 4rem 0 1.5rem 0;
    object-fit: cover;
`;

function MexicanStatePage() {
    let { id } = useParams();
    const [mexicanState, setMexicanState] = useState({});
    useEffect( ()=>{
        async function fetchState(){
            let response = await fetch(`/learn/${id}`);
            response = await response.json();
            setMexicanState(response.state);
        }
        fetchState();
    },[])
    return (
    <Container>
        <Row>
            <Col xl={6}>
                <IMG src={mexicanState.img}></IMG>
            </Col>
            <Col xl={6}>
                <Title>
                    {mexicanState.state}
                </Title>
            </Col>
        </Row>
        <Row>
            {mexicanState.id !== 1? 
                <Col xl={6}>
                    <Button link={`/learn/${mexicanState.id-1}`} text="back"/>
                </Col>
                    
                :
                <></>
            }
            {mexicanState.id !== 32? mexicanState.id===1 ? 
                <Col xl={12} className="justify-content-end d-flex">
                        <Button link={`/learn/${mexicanState.id+1}`} text="next"/>
                </Col>
                :    
                <Col xl={6} className="justify-content-end d-flex">
                        <Button link={`/learn/${mexicanState.id+1}`} text="next"/>
                </Col>
                :
                <></>
            }
        </Row>
        
    </Container>
  );
}

export default MexicanStatePage;