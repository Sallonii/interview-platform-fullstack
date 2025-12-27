import {Link, withRouter} from 'react-router-dom'

import {IoIosHome, IoIosLogOut} from 'react-icons/io'
import {FaBook} from 'react-icons/fa'
import {MdBookmarkBorder} from "react-icons/md"

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <ul className="nav-link-container desktop-nav-item">
        <li className="nav-link">
          <Link to="/" className="nav-item">
            <IoIosHome size="15" /> Home
          </Link>
        </li>
        <li className="nav-link">
          <Link to="/question-bank" className="nav-item">
           <FaBook   size="15" /> Question Bank
          </Link>
        </li>
        <li className="nav-link">
          <Link to="/bookmarks" className="nav-item">
            <MdBookmarkBorder />BookMarks
          </Link>
        </li>
      </ul>
      <button
        type="button"
        className="logout-btn"
        onClick={onLogout}
      >
        <IoIosLogOut size="15" />Log Out
      </button>
    </div>
  )
}

export default withRouter(Header)