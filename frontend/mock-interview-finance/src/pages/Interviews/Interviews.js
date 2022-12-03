import logo from '../../assets/logo.svg';
import '../../App.css';
import './Interviews.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState,  } from 'react';
/*
Can only view your own only feedback after leaving feedback
*/

function Interviews(props) {
  const navigate = useNavigate()
  console.log(props.isLoggedIn)
  if (!props.isLoggedIn) {
    navigate("/")
  }
  const CURRENT_TIME = new Date();
  const USER_ID = props.userId
  const [interviews, setInterviews] = useState([])
  useEffect(() => {
      //3642be46-f380-4259-a687-c7543bc1d4f6 
      async function doIt() { fetch("http://localhost:3001/interviews?userId=" + USER_ID)
        .then(res => res.json())
        .then(
            (result) => {
                setInterviews(result)
                console.log(result);
                return result;
            },
            (error) => {
                console.log(error)
        });
      }
      doIt();
    }, []);

  const viewFeedbackBtn = (feedback) => (<div className="btn">View Feedback</div>)
  const joinInterviewBtn = () => (<div className="btn">Join Interview</div>)
  const waitingText = (<span>Waiting for a match...</span>)
  const startInterview = (otherUserId) => otherUserId ? joinInterviewBtn() : waitingText
  const interviewDiv = (interviewTime, feedback, otherUserId) => (
    <div className="interview">
    <span>{interviewTime.toString()}</span>
    {interviewTime < CURRENT_TIME ? viewFeedbackBtn(feedback) : startInterview(otherUserId)}
  </div>
  )
  return (
    <div id="interviewsPage">
      <div>
        <h2>
        Your Interviews
        </h2>
        </div>
        <div id="interviewsList">
    Interviews: {interviews && interviews.length}
          {interviews.map(function(interview, i) {
              return interviewDiv(new Date(interview.scheduled_time), "feedback", interview.other_user_id)
          })}

        </div>
      </div>
  );
}
/*

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


*/
export default Interviews;
