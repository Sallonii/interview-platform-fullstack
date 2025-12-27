import {Switch, Route, BrowserRouter} from 'react-router-dom'
import LoginForm from './component/LoginForm'
import Home from './component/Home'
import ProtectedRoute from './component/ProtectedRoute'
import QuestionBank from './component/QuestionBank'
import BookMarks from './component/BookMarks'
import MockInterviewPage from './component/MockInterviewPage'
import MockInterview from './component/MockInterview'
import DailyChallenge from './component/DailyChallenge'
import './App.css';

const App = () => (

  <BrowserRouter>
    <Switch>
      <Route exact path='/login' component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/question-bank" component={QuestionBank} />
      <ProtectedRoute exact path="/bookmarks" component={BookMarks} />
      <ProtectedRoute exact path="/mock-interview-page" component={MockInterviewPage} />
      <ProtectedRoute exact path="/mock-interview" component={MockInterview} />
      <ProtectedRoute exact path="/daily-challenge" component={DailyChallenge} />
    </Switch>
  </BrowserRouter>
)

export default App