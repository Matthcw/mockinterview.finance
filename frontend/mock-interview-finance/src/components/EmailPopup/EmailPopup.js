import './EmailPopup.css'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function EmailPopup(props){
    const [email, setEmail] = useState("");
    const navigate = useNavigate()
    const label = (<span><b>Scheduling Interview For:</b> {props.scheduledTime && props.scheduledTime.toString()}</span>)
    return (
        <div id="popupOverlay">
            <div id="emailPopup">
                <div id="header">
                    <span></span>
                    <span id="title">Enter Your Email</span>
                    <span id="close" onClick={() => props.close()}>X</span>
                </div>
                <div>{props.scheduledTime && label}</div>

                <div id="main">
                    <input id="emailTextBox" type="text" 
                    placeholder="you@example.com" onChange={handleEmailChange}></input>
                </div>
                
                <div id="footer">
                <span></span>
                <span className="btn" onClick={createUserAndScheduleInterview}>Confirm</span>
                </div>
            </div>
        </div>

    )

    function handleEmailChange(e) {
        setEmail(e.target.value)
    }

    async function createUserAndScheduleInterview() {
        // Create User if not already created
        const id = await createUser()
        console.log(id)
        props.setIsLoggedInState(true)
        props.setUserIdState(id)
        if(props.closeParent) {
            await proposeInterview(id, props.scheduledTime)

            props.closeParent()
        } else {
            props.close()
        }

        // Propose Interview
        console.log("scheduled")
        navigate("/interviews")
    }

    function createUser() {
        return fetch("http://localhost:3001/user", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:email})})
            .then(res => res.json())
            .then(
                (result) => {
                    return result.userId
                },
                (error) => {
                    console.log(error)
            });
    }

    function proposeInterview(userId, time) {
        return fetch("http://localhost:3001/interview", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId: userId, time: time})})
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    // return result.userId
                },
                (error) => {
                    console.log(error)
            });
    }
}


export default EmailPopup;