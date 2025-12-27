import {Component} from 'react'
import Header from '../Header'
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import './index.css'

class BookMarks extends Component{
  state = {
    questions: []
  } 

  componentDidMount(){
    fetch("https://interview-platform-backend-gnqj.onrender.com/question-bank")
    .then(response => response.json())
    .then(data => {
      this.setState({questions: data});
    });
  }

  onClickBookmark = async (id) => {
  const response = await fetch(
    `https://interview-platform-backend-gnqj.onrender.com/questions/${id}/bookmark`,
    {
      method: "PUT",
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

  render() {
  const { questions } = this.state
  const bookmarkedQuestions = questions.filter(
    question => question.isBookmarked === 1
  )

  return (
    <div className="bookmarks-container">
      <Header />
      <h1>BookMarked Questions</h1>

      {bookmarkedQuestions.length === 0 ? (
        <p>Loading questions...</p>
      ) : (
        <ul className="questions-list">
          {bookmarkedQuestions.map(question => (
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
      )}
    </div>
  )
}
}

export default BookMarks