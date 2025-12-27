import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <h1 className="home-heading">Elevate Interview Preparation</h1>
      <p className="home-description">
        Get ready for your dream job with personalized Mock Interview Practice designed to mimic real-life scenarios.
      </p>
      <Link to="/mock-interview-page">
        <button type="button" className="find-jobs-button">
          Start Mock Interview
        </button>
      </Link>
      <div className="challenge-card-container">
        <h1 className="challenge-heading">Daily Challenge🔥</h1>
        <p>Complete your daily challenges to get goodies and get a chance to get company tour.</p>
        <Link to="/daily-challenge">
          <button className='find-jobs-button'>Start</button>
        </Link>
      </div>
    </div>
  </>
)

export default Home