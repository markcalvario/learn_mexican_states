import React,{useState, useEffect} from "react";
import "./MexicanStatePage.css";
import styled from "styled-components";
import {useParams} from "react-router-dom";
//MAP
import Mexico from "@svg-maps/mexico";
import { SVGMap } from "react-svg-map";
//REACT BOOTSTRAP 
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//CUSTOM COMPONENTS
import Button from "../components/Button";

const Title = styled.div`
    text-align:center;
    font-size: 2.75rem;
    padding: 0rem 0 1.5rem 0;
    letter-spacing: 2px;
    font-weight: 700;
`;
const IMG = styled.img`
    height: 325px;
    width: 90%;
    padding: 1rem 0 1.5rem 0;
    object-fit: cover;
`;
const FunFactTitle = styled.p`
    font-weight: 700;
    font-size: 1.2rem;
    margin: 0;
`
const Description = styled.p`
    text-indent: 2.5rem;
    line-height: 1.5;
`;

function MexicanStatePage() {
    let { id } = useParams();
    const [mexicanState, setMexicanState] = useState("");
    

    useEffect( ()=>{
        async function fetchState(){
            let response = await fetch(`/learn/${id}`);
            response = await response.json();
            setMexicanState(response.state);
            document.getElementById(`${response.state.abv}`).classList.remove("svg-map__location");
            document.getElementById(`${response.state.abv}`).classList.add("svg-map-current");
        }
        fetchState();
    },[])
    return (
    <Container>
        <Row>
            {mexicanState.id !== 1? 
                <Col xl={6} className="pt-4 pb-3">
                    <Button link={`/learn/${mexicanState.id-1}`} text="back"/>
                </Col>
                :
                <></>
            }
            {mexicanState.id !== 32? mexicanState.id===1 ? 
                <Col xl={12} className="justify-content-end d-flex pt-4 pb-3">
                    
                        <Button link={`/learn/${mexicanState.id+1}`} text="next"/>
                </Col>
                :    
                <Col xl={6} className="justify-content-end d-flex pt-4 pb-3">
                    
                        <Button link={`/learn/${mexicanState.id+1}`} text="next"/>
                </Col>
                :
                <></>
            }
        </Row>
        <Row>
            <Col xl={5}>
                <IMG src={mexicanState.img}></IMG>
            </Col>
            <Col xl={7}>
                <Container>
                    <Col xl={12}>
                        <Title>
                            {mexicanState.state}
                        </Title>
                    </Col> 
                    <Col xl={12}>
                        <div>
                            <Description>{mexicanState.description}</Description>
                        </div>
                        <div>
                            <FunFactTitle className="pt-3 pb-2"> Fun Facts: </FunFactTitle>
                            <ul>
                                {mexicanState ? mexicanState.funFacts.map((fact, index)=>{
                                    return (
                                        <li key={index}>{fact}</li>
                                    )
                                }) : <></>}
                            </ul>
                        </div>
                        
                    </Col> 
                </Container>
            </Col>
        </Row>
        <Row className="justify-content-center d-flex w-100 ">
            <Col xl={12} className="justify-content-end d-flex">
                <SVGMap id="mexico-map" map={Mexico} />
            </Col>
        </Row>
        
        
    </Container>
  );
}

export default MexicanStatePage;