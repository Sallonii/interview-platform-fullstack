import {Component} from 'react'


import './index.css'

class Register extends Component {
  state = {errorMessage: '', showError: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onRegister = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const apiUrl = 'https://interview-platform-backend-gnqj.onrender.com/register'
    const userDetails = {username, password}
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }   
    const response = await fetch(apiUrl, option)
    const data = await response.json()

    if (response.ok === true) {
      const {history} = this.props
      history.replace('/login')
    }else{
      this.setState({showError: true, errorMessage: data.error_msg})
    }
  }

  render() {
    const {errorMessage, showError} = this.state

    return (
      <div className="bg-container">
        <div className='platform-info'>
          <h1>Prepare Smarter. Interview Better</h1>
          <p>Practice real interview questions and build confidence with timed mock interviews.</p>
          <p>
            🎯 Curated interview questions<br/>

            ⏱️ Timed mock interview mode<br/>

            ⭐ Bookmark important questions<br/>

            📊 Daily Challenges<br/>
          </p>
          <h2>Practice • Improve • Get Hired</h2>
        </div>
        <div className='form-main-container'>
          <form className="form-container" onSubmit={this.onRegister}>
          <div className="input-container">
            <div className="input-item">
              <label htmlFor="username">USERNAME</label>
              <input
                placeholder="Username"
                id="username"
                type="text"
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-item">
              <label htmlFor="password">PASSWORD</label>
              <input
                placeholder="Password"
                id="password"
                type="password"
                onChange={this.onChangePassword}
              />
            </div>
          </div>
          <button type="submit" className="login-button">
            Register
          </button>
          {showError && <p className="error-message">{`*${errorMessage}`}</p>}
          <a className="login-link" href="/login">Login</a>
        </form>
        </div>
      </div>
    )
  }
}

export default Register