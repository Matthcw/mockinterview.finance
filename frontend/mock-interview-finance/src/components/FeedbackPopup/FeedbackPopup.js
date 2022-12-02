import './FeedbackPopup.css'
import { Link } from 'react-router-dom';

function FeedbackPopup(props){
    return (
        <div id="popupOverlay">
            <div id="feedbackPopup">
                <div id="header">
                    <span></span>
                    <span id="title">Give Feedback</span>
                    <span id="close" onClick={() => props.close()}>X</span>
                </div>
                <div id="main">
                    <textarea id="feedbackTextBox" placeholder="How did they do?"></textarea>
                </div>
                
                <div id="footer">
                <span></span>
                <span id="buttonLink">
                <Link to="/interviews">
                <span className="btn" onClick={() => props.close()}>Submit</span>
                </Link>
                </span>

                </div>
            </div>
        </div>

    )
}

export default FeedbackPopup;