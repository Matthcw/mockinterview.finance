import logo from '../../assets/logo.svg';
import '../../App.css';
import Popup from 'reactjs-popup';
import ShedulePopup from '../../components/SchedulePopup/SchedulePopup.js'
import EmailPopup from '../../components/EmailPopup/EmailPopup';
import { useNavigate } from "react-router-dom";
function Home(props) {
  const navigate = useNavigate()
  if (props.isLoggedIn) {
    navigate("/interviews")
  }
  console.log(props)
  return (
    <div className="App">
      <header className="App-header">
        <h1>
        Free Peer-To-Peer Finance Mock Interviews 
        </h1>
        <Popup trigger={
        
        <div className='btn'>
          Interview For Free
        </div>} modal nested>
          { close => (<ShedulePopup 
          setIsLoggedInState={props.setIsLoggedInState} 
          setUserIdState={props.setUserIdState} 
          close={close} />)}
    
        </Popup>

        <Popup trigger={
        
        <div className='btn'>
        View Your Interviews
      </div>} modal nested>
          { close => (<EmailPopup 
          setIsLoggedInState={props.setIsLoggedInState} 
          setUserIdState={props.setUserIdState} 
          close={close} />)}
    
        </Popup>

       
      </header>
      </div>
  );
}

function triggerPopup() {
  alert('hi');
}

export default Home;
