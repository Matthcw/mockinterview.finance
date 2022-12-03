import './SchedulePopup.css'
import Popup from 'reactjs-popup';
import EmailPopup from '../EmailPopup/EmailPopup.js'
import { useState } from 'react';

/*
1. Get list of possible times on the next 5 days <--- In Progress...
2. Let user select one time from this <--- DONE
3. When user submits their email
    a. Create user, and get the created ID
    b. Use created user ID to schedule and interview at the specified time
4. Make email popup separate from schedule popup
Find a way to make the time "buttons" toggle-able <--- DONE

Next steps:
Item 1 

Cool Features:
Highlight the times that have available interview times
    - using componentDidUpdate Hook
*/
function SchedulePopup(props){
    const times = ["08:00 AM", "10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM", "06:00 PM", "08:00 PM", "10:00 PM"];
    const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const MONTHS_OF_YEAR = [
        "Jan", "Feb", "Mar", "Apr", 
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"]
    const [time, setTime] = useState(0);
    const [activeTime, setActiveTime] = useState(null);
    const CURRENT_TIME = new Date();
    const column = (dayDate, i) => (<div className="column" key={i}>
    <div className="day">{DAYS_OF_WEEK[dayDate.getDay()]}</div>
    <div className="day">{dayDate.getDate()} {MONTHS_OF_YEAR[dayDate.getMonth()]}</div>
    <div className="times">
        {times.map(function(currTime, i) {
            let time = new Date(dayDate.getTime());
            time.setHours(8 + (i * 2));
            const isDisabled = CURRENT_TIME > time ? 'disabled' : null
            return <div className={`time ${isDisabled}`} onClick={(e) => selectTime(e, time, isDisabled)} key={i}>{currTime}</div>
        })}
    </div>
    </div>)
    /*
        Get current day, and display them in the columns.
        - For each column get the current day, and add times from 8 AM to 10PM
          If currenttime is < this slot, grey it out 


    */

    const days = [];
    let d = new Date();
    for (let i=0; i<5; i++) {
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);
        d.setDate(new Date().getDate() + i)
        days.push(d);
        d = new Date();
    }
    
    return (
        <div id="popupOverlay">
            <div id="schedulePopup">
                <div id="header">
                    <span></span>
                    <span id="title">Schedule Your Interview</span>
                    <span id="close" onClick={() => props.close()}>X</span>
                </div>
                <div id="main">
                    {days.map(function(day, i) {
                        return column(day, i)
                    })}
                </div>
                
                <div id="footer">
                <span></span>
                <Popup trigger={
                <span className="btn" onClick={() => props.close()}>Schedule</span>
                } modal nested closeOnDocumentClick>
          { close => (<EmailPopup 
          setIsLoggedInState={props.setIsLoggedInState} 
          setUserIdState={props.setUserIdState} 
          scheduledTime={time}
          close={close} closeParent={props.close}/>)}
    
  </Popup>
                </div>
            </div>
        </div>

    )
    function selectTime(e, currTime) {
        // Anti-Pattern Acknowledged:
        activeTime && activeTime.classList.remove("PINK")
        e.target.classList.add("PINK")
        setActiveTime(e.target)
        setTime(currTime)
        console.log(currTime)
        // alert(currTime)
    }
}


export default SchedulePopup;