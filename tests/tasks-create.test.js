const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const getDb = require('../src/services/db');

describe('create task', () => {
  let db;
  beforeEach(async () => (db = await getDb()));

  afterEach(async () => {
    await db.query('DELETE FROM Task');
    await db.close();
  });

  describe('/tasks', () => {
    describe('POST', () => {
      it('creates a new task in the database', async () => {
        const res = await request(app).post('/tasks').send({
          userID: '1',
          taskname: 'dust the living room',
        });

        const taskEntry = await db.query(
          `SELECT * FROM Task WHERE taskname = 'dust the living room'`
        );

        expect(res.status).to.equal(201);
        expect(taskEntry.userID).to.equal('1');
        expect(taskEntry.taskname).to.equal('dust the living room');
      });
    });
  });
});
