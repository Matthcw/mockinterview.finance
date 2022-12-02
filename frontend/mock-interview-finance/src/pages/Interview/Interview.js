import './Interview.css';
import Popup from 'reactjs-popup';
import FeedbackPopup from '../../components/FeedbackPopup/FeedbackPopup.js'

/*
Automatically start interview when both interviewees join
End interview when one person clicks end interview

*/
function Interview() {
  return (
    <div id="interviewPage">
      <div>
        <p id="title">
        Your Interview (00h:05m:02s) -&nbsp;    
        <Popup trigger={
        <input type="button" value="End Interview" />
            } modal>
                { close => (<FeedbackPopup close={close} />)}
        </Popup>                
        </p>
      </div>
      <div id="interview">
                <div id="left">
                  <div id="text">
                    Your messages
                  </div>
                  <div id="input">
                    <input type="text" placeholder="Send a message..."></input>
                    <input type="button" value="Send" />
                  </div>
                </div>
                <div id="right">
                  <div id="videos">

                  </div>
                </div>
            </div>
      </div>
  );
}

export default Interview;
