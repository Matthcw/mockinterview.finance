import logo from '../../assets/logo.svg';
import '../../App.css';
import Popup from 'reactjs-popup';
import ShedulePopup from '../../components/SchedulePopup/SchedulePopup.js'
import EmailPopup from '../../components/EmailPopup/EmailPopup';

function Home() {
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
          { close => (<ShedulePopup close={close} />)}
    
        </Popup>

        <Popup trigger={
        
        <div className='btn'>
        View Your Interviews
      </div>} modal nested>
          { close => (<EmailPopup close={close} />)}
    
        </Popup>

       
      </header>
      </div>
  );
}

function triggerPopup() {
  alert('hi');
}

export default Home;
