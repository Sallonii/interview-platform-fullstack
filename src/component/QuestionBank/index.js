import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import {TailSpin} from 'react-loader-spinner'
import Cookies from 'js-cookie'
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import './index.css'

const questionBankConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN PROGRESS',
  failure: 'FAILURE',
}

class QuestionBank extends Component{
  state = {
    questions: [],
    questionStatus: questionBankConstant.initial
  } 

  componentDidMount(){
    this.setState({questionStatus: questionBankConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    fetch("http://localhost:3000/question-bank", {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Unauthorized')
      }
      return response.json()
    })
    .then(data => {
      this.setState({
        questions: data,
        questionStatus: questionBankConstant.success,
      })
    })
    .catch(() => {
      this.setState({ questionStatus: questionBankConstant.failure })
    })
  }


  onClickBookmark = async (id) => {
    const jwtToken = Cookies.get("jwt_token")
  const response = await fetch(
    `http://localhost:3000/questions/${id}/bookmark`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
  )
  const data = await response.json()

  this.setState(prevState => ({
    questions: prevState.questions.map(each =>
      each.id === id
        ? { ...each, isBookmarked: data.isBookmarked }
        : each
    )
  }))
}

renderQuestions = () => {
  const { questions } = this.state
  
  return(
        <ul className="questions-list">
          {questions.map(question => (
            <li key={question.id} className="question-card">
              <h3>{question.question_title}</h3>
              <div className='question-info'>
                <p>{question.category}</p>
                <p>{question.difficulty}</p>
                <button className="bookmark-button"
                onClick={() => this.onClickBookmark(question.id)}
                >
                  {question.isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                </button>
              </div>
            </li>
          ))}
        </ul>
  )
}

renderLoadingView = () => {
  return(
  <div className='loader-container'>
            <TailSpin
              height="60"
              width="60"
              color="#3b82f6"
              ariaLabel="loading"
            />
            <p>Loading questions...</p>
  </div>
  )
}

renderFailureView = () => (
    <div className="failure-view-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <Link to='/'>
      <button
        type="button"
        className="retry-button"
      >
        Back To Home
      </button></Link>
    </div>
  )

renderQuestionItem = () => {
    const {questionStatus} = this.state

    switch (questionStatus) {
      case questionBankConstant.inProgress:
        return this.renderLoadingView()
      case questionBankConstant.failure:
        return this.renderFailureView()
      case questionBankConstant.success:
        return this.renderQuestions()
      default:
        return null
    }
  }

  render() {
  const { questions } = this.state

  return (
    <div className="question-bank-container">
      <Header />
      <h1>Question Bank</h1>
      {this.renderQuestionItem()}
    </div>
  )
}
}

export default QuestionBank