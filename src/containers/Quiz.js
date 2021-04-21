import React,{useState,useEffect} from "react"
import styled from "styled-components";
import {Link} from "react-router-dom";

//Material UI
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
// import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card"

//CUSTOM COMPENENTS
import Button from "../components/Button";
// import Hint from "../components/Hint";
const Title = styled.div`
    text-align:center;
    font-size: 2.75rem;
    padding: 3rem 0 0.25rem 0;
    letter-spacing: 2px;
    font-weight: 500;
`;
const BoldText = styled.span`
    font-weight: 600;
    text-transform: uppercase;
`;
function Quiz() {
    const [state, setState] = useState("");
    const [question, setQuestion] = useState(0);
    const [endOfQuiz, setEndOfQuiz] = useState(false);
    const [userResponse, setUserResponse] = useState("");
    const [userErrors, setUserErrors] = useState([]);
    const [listOfQuestions,setListOfQuestions] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]);
    const [showHint, setShowHint] = useState(false);
    
    const [mexicanStates, setMexicanStates] = useState([]);
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array
    }
    useEffect ( ()=>{
        setListOfQuestions(shuffleArray(listOfQuestions));
        // console.log(listOfQuestions); 
        async function fetchAllStates(){
            let response = await fetch("/get_states");
            response = await response.json();
            let array_of_state_objects = response.states;
            // array_of_state_objects.map((s)=>{
            //     setMexicanStates( [ ...mexicanStates, s.state ] );
            // })
            setMexicanStates(array_of_state_objects);
        }
        fetchAllStates();
        
        
    },[])
    

    

    //FETCH THE QUIZ QUESTION
    useEffect( ()=>{
        async function fetchQuestion(){
            let response = await fetch(`/learn/${listOfQuestions[question]}`);
            response = await response.json();
            setState(response.state);
            // console.log(response.state)
        }
        if (question<32){
            fetchQuestion();
        }
        else{
            setEndOfQuiz(true);
        }
        
        
    }, [question]);

    const handleSubmit = (event) => {
        event.preventDefault();
        // setUserResponse(userResponse.trim());
        // setUserResponse(userResponse.toLowerCase());
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
        setShowHint(false);
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
                            Identify the State & Hit <BoldText>Enter</BoldText>
                        </Title>
                    
                    </Col>
                </Row>
                <Row>
        
                    <div className="hint-section" style={{width:"20%"}}>
                        <div>
                            <h6>Need a hint? <span onClick={()=> setShowHint(true)}>Click here</span></h6>
                        </div>
                        {showHint? 
                            <ul>
                                {state.funFacts.map((fact, index)=>{
                                    return (
                                        <li key={index}>{fact}</li>
                                    )
                                })}
                           
                            </ul>
                        
                        :<></>}
                    </div>
                </Row>
                <Row className="justify-content-center mx-auto w-75 py-4 mt-5">
                    <SVGMap id="mexico-map" map={Mexico} />
                </Row> 
                <div className={`${state.questionClass}`}>
                    <Arrow
                            angle={255}
                            length={state.arrowLength}
                            style={{
                            width: `${state.arrowWidth}`
                            }}
                        />   
                    {/* <Form onSubmit={handleSubmit} style={{display:"inline-block"}}>
                        <Form.Group>
                            <Form.Control  
                                id="user-input" 
                                className="state-input"
                                type="text" 
                                placeholder="State"  
                                value = {userResponse}
                                onChange={(e) => setUserResponse(e.target.value)} 
                                
                            />
                            <Form.Control.Feedback type="valid">
                                Please enter a state.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form> */}
                    <form className="autocomplete-input" onSubmit={handleSubmit}>
                        <Autocomplete className="autocomplete-input" 
                            id="combo-box-demo"
                            options={mexicanStates}
                            getOptionLabel={(option) => option.state}
                            onChange={(event, value) => value ? setUserResponse(value.state) : setUserResponse('')}
                            inputValue={userResponse}
                            renderInput={(params) => 
                                <TextField 
                                    {...params} 
                                    id="user-input" 
                                    label="State" 
                                    variant="outlined" 
                                    //defaultValue={userResponse}
                                    value={userResponse} 
                                    onChange={(e) => setUserResponse(e.target.value)} 
                                />
                            }
                        />
                    </form>
                    
                </div>   
            </Container>
        
        }
               

     </>


  );
}

export default Quiz;