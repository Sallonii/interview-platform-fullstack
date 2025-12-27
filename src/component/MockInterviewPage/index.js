import {Component} from 'react'
import Header from '../Header'
import {Link} from 'react-router-dom'
import './index.css'

class MockInterviewPage extends Component{
  
  render() {

  return (
    <div className="mock-interview-container">
      <Header />
      <div className="card-main-container">
        <h1 className="course-heading">Topics Covered:</h1>
        <div className="card-container">
            <div className="course-card">
                HTML
            </div>
            <div className="course-card">
                CSS
            </div>
            <div className="course-card">
                Javascript
            </div>
            <div className="course-card">
                Python
            </div>
        </div>
        <div className="note-container">
            <p>Instructions:</p>
            <p>Ensure a quiet environment before starting the mock interview.</p>
            <p>Read each question carefully before answering.</p>
            <p>30 minutes will be given for mock interview.</p>
            <p>Once the question is submitted you can't attempt again.</p>
        </div>
        <Link to="/mock-interview">
        <button className="start-mock-btn">
            Start
        </button>
        </Link>
      </div>
    </div>
  )
}
}

export default MockInterviewPage