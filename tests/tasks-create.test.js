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

  describe('/task', () => {
    describe('POST', () => {
      it('creates a new task in the database', async () => {
        const res = await (
          await request(app).post('/task')
        ).send({
          taskname: 'dust the living room',
        });
        const taskEntry = await db.query(
          `SELECT * FROM Task WHERE taskname = 'dust the living room'`
        );
        console.log(taskEntry);
        expect(res.status).to.equal(201);
      });
    });
  });
});
