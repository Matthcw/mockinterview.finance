import logo from '../../assets/logo.svg';
import '../../App.css';
import './Interviews.css';
import { Link } from 'react-router-dom';

/*
Can only view your own only feedback after leaving feedback
*/

function Interviews() {
  return (
    <div id="interviewsPage">
      <div>
        <h2>
        Your Interviews
        </h2>
        </div>
        <div id="interviewsList">

          <div className="interview">
            <span>8 Nov 2022 12:30pm</span>
            <Link to="/interview">
            <div className="btn">Join Interview</div>
            </Link>
          </div>

          <div className="interview">
            <span>8 Nov 2022 10:30am</span>
            <div className="btn">View Feedback</div>
          </div>

          <div className="interview">
            <span>8 Nov 2022 08:30am</span>
            <div className="btn">View Feedback</div>
          </div>

        </div>
      </div>
  );
}

export default Interviews;
