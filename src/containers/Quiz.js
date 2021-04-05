import React,{useState,useEffect} from "react"
import styled from "styled-components";
import {Link} from "react-router-dom";

//MAP
import Mexico from "@svg-maps/mexico";
import { SVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";
import "./Quiz.css";

//ARROW
import Arrow from '@elsdoerfer/react-arrow';

//REACT BOOTSTRAP 
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card"

//CUSTOM COMPENENTS
import Button from "../components/Button";

const Title = styled.div`
    text-align:center;
    font-size: 2.75rem;
    padding: 3rem 0 0.25rem 0;
    letter-spacing: 2px;
    font-weight: 500;
`;
function Quiz() {
    const [state, setState] = useState("");
    const [question, setQuestion] = useState(1);
    const [endOfQuiz, setEndOfQuiz] = useState(false);
    const [userResponse, setUserResponse] = useState("");
    const [userErrors, setUserErrors] = useState([]);

    //FETCH THE QUIZ QUESTION
    useEffect( ()=>{
        async function fetchQuestion(){
            let response = await fetch(`/learn/${question}`);
            response = await response.json();
            setState(response.state);
        }
        if (question<33){
            fetchQuestion();
        }
        else{
            setEndOfQuiz(true);
        }

        
    }, [question]);

    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        // setUserResponse(userResponse.trim());
        // setUserResponse(userResponse.toLowerCase());
        console.log(userResponse);
        const stateOnMap = document.getElementById(state.abv);
        if ( (userResponse.trim().toLowerCase() === state.state.toLowerCase()) || (userResponse.trim() === state.state) ){
            stateOnMap.classList.remove("svg-map__location");
            stateOnMap.classList.add("svg-map-right");
        }
        else{
            stateOnMap.classList.remove("svg-map__location");
            stateOnMap.classList.add("svg-map-wrong");
            setUserErrors([...userErrors, state]);
        }
        setQuestion(question+1);
        // setValidated(true);
        setUserResponse("");
    };

  return (
    <>
        {endOfQuiz ? 
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

        :
            <Container>
                <Row>
                    <Col xl={12}>
                        <Title>
                            Identify the State
                        </Title>
                    </Col>
                </Row>
                <Row className="justify-content-center mx-auto w-75 py-4 mt-5">
                    <SVGMap id="mexico-map" map={Mexico} />
                </Row> 
                <div className={state.questionClass}>
                    <Arrow
                            angle={255}
                            length={state.arrowLength}
                            style={{
                            width: `${state.arrowWidth}`
                            }}
                        />   
                    <Form noValidate validated={validated} onSubmit={handleSubmit} style={{display:"inline-block"}}>
                        <Form.Group>
                            <Form.Control  
                                id="user-input" 
                                className="state-input"
                                type="text" 
                                placeholder="State"  
                                value = {userResponse}
                                onChange={(e) => setUserResponse(e.target.value)} 
                                required 
                            />
                            <Form.Control.Feedback type="valid">
                                Please enter a state.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </div>   
            </Container>
        
        }
               

     </>


  );
}

export default Quiz;