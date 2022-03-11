const app = require('../src/app');
const getDb = require('../src/services/db');
const { expect } = require('chai');
const request = require('supertest');

describe('read tasks', () => {
  let db;

  let tasks;

  beforeEach(async () => {
    db = await getDb();
    //create a user
    await db.query('INSERT INTO User(email, houseID) VALUES(?,?)', [
      'testemail@gmail.com',
      'green-monkey-rock',
    ]);
    [[user]] = await db.query('SELECT * FROM User');
    //create some tasks :)
    await Promise.all([
      db.query('INSERT INTO Task(userID, taskname) VALUES(?,?)', [
        user.id,
        'sweep the kitchen',
      ]),
      db.query('INSERT INTO Task(userID, taskname) VALUES(?,?)', [
        user.id,
        'vacuum the lounge',
      ]),
      db.query('INSERT INTO Task(userID, taskname) VALUES(?,?)', [
        user.id,
        'polish the silver',
      ]),
    ]);
    [tasks] = await db.query('SELECT * FROM Task');
  });

  afterEach(async () => {
    await db.query('DELETE FROM Task');
    await db.close();
  });

  describe('/tasks', () => {
    describe('GET', () => {
      it('returns all tasks in the database', async () => {
        const result = await request(app).get('/tasks');

        expect(result.status).to.equal(200);

        result.body.forEach((task) => {
          const fromTests = tasks.find((test) => {
            return test.id === task.id;
          });
          expect(task).to.deep.equal(fromTests);
        });
      });
    });
  });
});
