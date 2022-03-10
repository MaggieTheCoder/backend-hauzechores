const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const getDb = require('../src/services/db');

describe('create task', () => {
  let db;
  let user;
  beforeEach(async () => {
    db = await getDb();
    await db.query('INSERT INTO User(email, houseID) VALUES(?,?)', [
      'testemail@gmail.com',
      'green-monkey-rock',
    ]);
    [[user]] = await db.query('SELECT * FROM User');
  });
  afterEach(async () => {
    await db.query('DELETE FROM Task');
    await db.close();
  });

  describe('/tasks', () => {
    describe('POST', () => {
      it('creates a new task in the database', async () => {
        const res = await request(app).post('/tasks').send({
          userID: user.id,
          taskname: 'dust the living room',
        });

        const [[taskEntry]] = await db.query(
          `SELECT * FROM Task WHERE taskname = 'dust the living room'`
        );

        expect(res.status).to.equal(201);
        expect(taskEntry.userID).to.equal(user.id);
        expect(taskEntry.taskname).to.equal('dust the living room');
      });
    });
  });
});
