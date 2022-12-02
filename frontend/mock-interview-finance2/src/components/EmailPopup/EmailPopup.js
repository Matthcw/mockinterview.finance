import './EmailPopup.css'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function EmailPopup(props){
    const [email, setEmail] = useState("");
    const navigate = useNavigate()
    const label = "Scheduling Interview For: " + props.scheduledTime
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

        if(props.closeParent) {
            // Create User if not already created
            const id = await createUser()
            console.log(id)
            // Propose Interview
            await proposeInterview(id, props.scheduledTime)
            // props.closeParent()
        } else {
            props.close()
        }
        // navigate("/interviews")
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