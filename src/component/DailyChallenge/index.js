import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const DailyChallenge = () => (
  <>
    <Header />
    <div className="daily-challenge-container">
      <h1 className='daily-challenge-heading'>Coding Challenge of The Day!!</h1>
      <hr />
      <h2>Today's Challenge</h2>
      <h3>Binary Search Puzzle</h3>
      <div className='btn-container'>
        <button className='start-now-btn'>Start Now</button>
        <button className='solution-btn'>Solution</button>
      </div>
    </div>
  </>
)

export default DailyChallenge