const app = require('../src/app');
const getDb = require('../src/services/db');
const { expect } = require('chai');
const request = require('supertest');
const userRouter = require('../src/routes/user');

describe('read tasks', () => {
  let db;

  let tasks;

  beforeEach(async () => {
    db = await getDb();

    await Promise.all([
      db.query('INSERT INTO Task(userID, taskname) VALUES(?,?)', [
        '1',
        'sweep the kitchen',
      ]),
      db.query('INSERT INTO Task(userID, taskname) VALUES(?,?)', [
        '2',
        'vacuum the lounge',
      ]),
      db.query('INSERT INTO Task(userID, taskname) VALUES(?,?)', [
        '3',
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
      it('returns all tasks in the database', () => {
        const result = await request(app).get('tasks');

        expect(result.status).to.equal(200);
        expect(result.body.length).to.equal(3);

        result.body.forEach((task) => {
          const fromTests = tasks.find((test) => {
            return test.id === task.id;
          });
        });
      });
    });
  });
});
