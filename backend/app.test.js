const request = require('supertest')
const app = require('./app');

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
});


beforeAll(async () => {
  console.log('create tables')
  await pool.query(`
  DROP Table IF EXISTS interviews;
  DROP Table IF EXISTS users;
  DROP Table IF EXISTS feedback;
  `);

  await pool.query(`
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
})


afterAll(() => {
  console.log('drop tables')
  return pool.query(`
  DROP Table interviews;
  DROP Table users;
  DROP Table feedback;
  `);
})

describe('GET /interviews', () => {
    beforeAll(() => {
      console.log("insert data to interviews")
      return pool.query(`
      INSERT INTO interviews (id, user_id, scheduled_time) 
      VALUES ('c2d29867-3d0b-d497-9191-18a9d8ee7830', 'b2d29867-3d0b-d497-9191-18a9d8ee7830', now());`);
    });

    it('returns an array of interviews', async () => {
      console.log("the test")
      return request(app)
        .get('/interviews?userId=b2d29867-3d0b-d497-9191-18a9d8ee7830')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(String),
                scheduled_time: expect.any(String),
                user_id: expect.any(String)
              }),
            ])
          );
        });
    });

    it('returns an array of interviews with feedback', async () => {
      console.log("the test")
      return request(app)
        .get('/interviews?userId=b2d29867-3d0b-d497-9191-18a9d8ee7830')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(String),
                scheduled_time: expect.any(String),
                user_id: expect.any(String),
                feedback: expect.any(String)
              }),
            ])
          );
        });
    });
  });

  describe('POST /interview', () => {
    afterEach(() => {
      return pool.query(`TRUNCATE Table interviews;`)
    });

    it('creates an new interview', () => {
      return request(app)
        .post('/interview')
        .send({"userId": "a2d29867-3d0b-d497-9191-18a9d8ee7830", "time": "2020-08-08T13:00:00"})
        .expect(201)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              interviewId: expect.any(String),
              message: expect.any(String)
            })
          )
        });
    });

    it('updates an existing interview', async () => {
      await pool.query(`
      INSERT INTO interviews (id, user_id, scheduled_time) 
      VALUES ('c2d29867-3d0b-d497-9191-18a9d8ee7830', 'b2d29867-3d0b-d497-9191-18a9d8ee7830', '2020-08-08T13:00:00');`);

      return request(app)
        .post('/interview')
        .send({"userId": "a2d29867-3d0b-d497-9191-18a9d8ee7830", "time": "2020-08-08T13:00:00"})
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              interviewId: expect.any(String),
              message: expect.any(String)
            })
          )
        });
    });
  });


  describe('POST /user', () => {
    afterEach(() => {
      return pool.query(`TRUNCATE Table users;`)
    });

    it('creates an new user', () => {
      return request(app)
        .post('/user')
        .send({"email": "jim@yahoo.com"})
        .expect(201)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              userId: expect.any(String),
              message: expect.any(String)
            })
          )
        });
    });


    it('creating an existing user returns the id', async () => {
      await request(app)
        .post('/user')
        .send({"email": "jim@yahoo.com"});


      await request(app)
        .post('/user')
        .send({"email": "jim@yahoo.com"})
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              userId: expect.any(String),
              message: expect.any(String)
            })
          )
        });

      // await request(app)
      //   .post('/user')
      //   .send({"email": "jim@yahoo.com"})
      //   .expect(400)
      //   .then((response) => {
      //     expect(response.body).toEqual(
      //       expect.objectContaining({
      //         error: "Key (email)=(jim@yahoo.com) already exists."
      //       })
      //     )
      //   });
    });
  });

  describe('POST /feedback', () => {
    afterEach(() => {
      return pool.query(`TRUNCATE Table interviews;`)
    });

    it('creates an new user', () => {
      return request(app)
        .post('/feedback')
        .send(
          {
            "interviewId": "b2d29867-3d0b-d497-9191-18a9d8ee7830", 
            "feedbackText": "Great job!",
            "forUserId": "a2d29867-3d0b-d497-9191-18a9d8ee7830"
          })
        .expect(201)
        .then((response) => {
          expect(response.text).toContain("Feedback added with ID:")
        });
    });
  });

