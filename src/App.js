import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from "./containers/Homepage";
import LearnPage from "./containers/Learnpage";
import NavBar from "./components/Navbar";
import MexicanStatePage from "./containers/MexicanStatePage";
import StartQuiz from "./containers/StartQuiz";
import Quiz from "./containers/Quiz";
import QuizResults from "./containers/QuizResults";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <NavBar/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/learn' component={LearnPage} />
          <Route exact path='/learn/:id' component={MexicanStatePage} />
          <Route exact path='/quiz' component={StartQuiz} />
          <Route exact path='/quiz/start' component={Quiz} />
          <Route exact path='/quiz_results' component={QuizResults} />
        </Switch>
      </Router>
  );
}

export default App;
