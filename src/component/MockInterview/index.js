import {Component} from 'react'
import './index.css'

class MockInterview extends Component{
  state = {
    timeLeft: 10,
    currentQuestion: 0,
    questions: [
      {
        title: "HTML – Create a Basic Form",
        description: "Write HTML code to create a form with input fields for name and email, and a submit button."
      },
      {
        title: "CSS – Center a Div",
        description: "Write CSS to center a div both horizontally and vertically on the page."
      },
      {
        title: "JavaScript – Reverse a String",
        description: "Write a JavaScript function that takes a string as input and returns the reversed string."
      },
      {
        title: "Python – Find Largest Number",
        description: "Write a Python program to find the largest number in a given list."
      },
    ]
  };

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.setState(prevState => {
        if (prevState.timeLeft <= 1){
          clearInterval(this.timerId)
          this.goToHome()
          return {timeLeft: 0}
        }
        return {timeLeft: prevState.timeLeft - 1}
      });
    }, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.timerId)
  }

  formatTime = () => {
    const {timeLeft} = this.state

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds: seconds}`;
  };

  onSubmit = () => {
    const {isSubmitted} = this.state
    this.setState({isSubmitted: true})
    
  }

  onNextAnswer = () => {
    const { currentQuestion, questions } = this.state;

    if (currentQuestion < questions.length - 1) {
      this.setState({ currentQuestion: currentQuestion + 1 });
    }
  };

  goToHome = () => {
    const {history} = this.props
    history.push('/')
  }
  
  render() {
    const {questions, currentQuestion, isSubmitted} = this.state
    const current = questions[currentQuestion]

  return (
    <div className="mock-interview-container">
      {
        isSubmitted? (
          <div className="submitted-main-container">
            <div>
              <h1>Submitted✅</h1>
              <p>Your answers are submitted</p>
              <button className="submit-btn" onClick={this.goToHome}>Back To Home</button>
            </div>
          </div>
        ) : (
          <>
          <div className="mock-interview-header">
            <h1>Timed Mock Interview</h1>
            <div className="timer-and-button-container">
                <p className="timer">{this.formatTime()}</p>
                <button className="submit-btn" onClick={this.onSubmit}>Submit</button>
            </div>
        </div>
        <div className="question-card-holder">
          <div className="question-card-container">
            <div className="question-heading-container">
              <div>
                <h1>{current.title}</h1>
                <p>{current.description}</p>
              </div>
              <div>
                <p>Q:{currentQuestion + 1}/4</p>
              <button className="submit-btn" onClick={this.onNextAnswer}>Next</button>
              </div>
            </div>
            <textarea className="text-area" placeholder="Type your answer here..." />
          </div>
        </div>
        </>
        )
      }
    </div>
  )
}
}

export default MockInterview