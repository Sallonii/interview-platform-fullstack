import {Component} from 'react'
import Header from '../Header'
import Cookies from 'js-cookie'
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import './index.css'

class BookMarks extends Component{
  state = {
    questions: []
  } 

  componentDidMount(){
    const jwtToken = Cookies.get('jwt_token')
        console.log(jwtToken)
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
          })
        })
  }

  onClickBookmark = async (id) => {
  const response = await fetch(
    `http://localhost:3000/questions/${id}/bookmark`,
    {
      method: "PUT"
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
      <h1 className="bookmarks-title">BookMarked Questions</h1>

      {bookmarkedQuestions.length === 0 ? (
        <p>No BookMarks</p>
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