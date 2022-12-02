const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const db = require('./queries')

const cors = require("cors")

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', (req, res) => {
  res.send('Hi')
})


app.get('/interviews', db.getInterviews)
app.post('/user', db.createUser)
app.post('/interview', db.proposeInterview)
app.post('/feedback', db.submitFeedback)

module.exports = app

/*
Backend Functionalitty: 
- Propose an interview at a specific time (POST /interview)
  - If there is an interview that hasn't been matched, then match this interview.
- Cron job to go through proposed interviews and send email alerts when interview is near
- Create a user based on an email (POST /user)
- Add feedback to an interview (POST /feedback)
- List all interviews for user (GET /interviews)

Notes:
Give them the opportunity to schedule an interview at a certain time.

Database:
- A bunch of *Users* identified by an email
  - Users: ID | Email(unique)
- A bunch of *Interviews* associated with an email
  - Interviews: ID | UserID | ScheduledTime | IsInPast | OtherUserID
- *Feedback* associated with an interview
  - Feedback: ID | InterviewID | FeedbackText | ForUserID

Next steps:
- Write DB queries for the backend functionality <--- Done?
- Write endpoints for the DB queries <--- Done?
- *NEW* Add Unit tests to the backend functionality so I dont need to do manual tests!!!!
  - Express endpoint + Database <--- DONE
  - list interviews endpoint <--- DONE
  - propose interview endpoint <--- DONE
  - create user endpoint <--- DONE
  - submit feedback endpoint <--- DONE
- Spin up the server, test it using postman <--- In Progress...
  - Get UUID generator working <--- DONE
  - Initialize database on server startup <--- DONE
- Make frontend GET & POST to/from backend to 
  - Make a user 
  - Schedule an Interview
  - List Interviews + Feedback for user
  - Submit feedback for interviewed user
  - Backend send email email alerts for interview notifications
  - integrate webrtc for video chat

Backlog:
- Handle bad input by sending a descriptive response
- Prevent user from booking an interview at the same time
*/
