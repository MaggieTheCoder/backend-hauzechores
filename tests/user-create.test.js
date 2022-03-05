const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('create user', () => {
  let db;
  beforeEach(async () => (db = await getDb()));

  afterEach(async () => {
    await db.query('DELETE FROM User');
    await db.close();
  });
  describe('/users', () => {
    describe('POST', () => {
      it('creates a new user in the database', async () => {
        const res = await request(app).post('/users').send({
          email: 'jenny@hotmail.com',
          houseID: 1,
        });

        expect(res.status).to.equal(201);

        const [[userEntries]] = await db.query(`SELECT * FROM User WHERE `);

        expect(userEntries.email).to.equal('jenny@hotmail.com');
        expect(userEntries.houseID).to.equal(1);
      });
    });
  });
});
