const { v4: uuidv4 } = require('uuid');
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
});

//init database if not in test mode
if (process.env.NODE_ENV != "test") {
    const initDatabase = (() => {
        return pool.query(`
        CREATE TABLE IF NOT EXISTS interviews (
            id UUID PRIMARY KEY,
            user_id UUID NOT NULL,
            scheduled_time TIMESTAMP NOT NULL,
            other_user_id UUID
        );

        CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY,
            email VARCHAR(100) NOT NULL UNIQUE
        );

        CREATE TABLE IF NOT EXISTS feedback (
            id UUID PRIMARY KEY,
            interview_id UUID NOT NULL,
            feedback_text TEXT NOT NULL,
            for_user_id UUID NOT NULL
        );
        `);
    })()
}

const getInterviews = (request, response) => {
    console.log("GET /interviews - get interviews");
    console.log(request);
    const { userId } = request.query
    // Get Interviews for this user
    pool.query('SELECT * FROM interviews WHERE user_id = $1 or other_user_id = $1', [userId], (error, results) => {
    if (error) {
        console.log(error)
        return response.status(400).send(error.detail)
    }
    response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    console.log("POST /user - create user");
    console.log(request);
    const { email } = request.body
    const GENERATED_GUID = uuidv4();

    // If email exists return id
    pool.query('SELECT id FROM users WHERE email = $1', [email], (error, results) => {
        if (error) {
            console.log(error)
            return response.status(400).send({error: error.detail});        
          }

        if (results.rows.length == 0) {
            pool.query('INSERT INTO users (id, email) VALUES ($1, $2) RETURNING id', [GENERATED_GUID, email], (error, results) => {
                if (error) {
                    console.log(error)
                    return response.status(400).send({error: error.detail});        
                }
                response.status(201).send({
                    message: "User added successfully",
                    userId: results.rows[0].id
                })
            })
        } else {
            response.status(200).send({
                message: "User already exists",
                userId: results.rows[0].id
            }) 
        }
    }) 
}

const proposeInterview = (request, response) => {
    console.log("POST /interview - propose Interview");
    console.log(request);
    const { userId, time } = request.body
    // Get User ID for this email
    // Search for interview at this time, if it doesn't exist create it
    // If interview exists, update the interview's OtherUserID to this user's ID
    
    // Check if there is an available interview at this time
    pool.query(`SELECT * FROM interviews 
    WHERE scheduled_time = $1 
    AND other_user_id IS NULL 
    AND user_id != $2`, [time, userId], (error, results) => {
        if (error) {
            console.log(error)
            throw error
        }
        if (results.rows.length > 0) {
            const interviewId = results.rows[0].id
            // There is an available interview, update it
            pool.query('UPDATE interviews SET other_user_id = $1 WHERE id = $2', [userId, interviewId], (error, results) => {
                if (error) {
                    throw error
                }
                response.status(201).send(`Interview updated with ID: ${interviewId}`)
            })
        } else {
            const GENERATED_GUID = uuidv4();
            // There is no available interview, create one
            pool.query('INSERT INTO interviews (id, user_id, scheduled_time) VALUES ($1, $2, $3) RETURNING id', [GENERATED_GUID, userId, time], (error, results) => {
                if (error) {
                    throw error
                }
                response.status(201).send(`Interview added with ID: ${results.rows[0].id}`)
            })
        }
    })
        
}

const submitFeedback = (request, response) => {
    console.log("POST /feedback - submit feedback");
    console.log(request);
    const { interviewId, feedbackText, forUserId } = request.body
  
    const GENERATED_GUID = uuidv4();

    pool.query(`INSERT INTO feedback (id, interview_id, feedback_text, for_user_id) 
    VALUES ($1, $2, $3, $4) RETURNING id`, [GENERATED_GUID, interviewId, feedbackText, forUserId], (error, results) => {
      if (error) {
        console.log(error)
        throw error
      }
      response.status(201).send(`Feedback added with ID: ${results.rows[0].id}`)
    })
}

module.exports = {
    getInterviews,
    createUser,
    proposeInterview,
    submitFeedback
}