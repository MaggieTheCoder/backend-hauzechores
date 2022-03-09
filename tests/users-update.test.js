const app = require('../src/app');
const getDb = require('../src/services/db');
const { expect } = require('chai');
const request = require('supertest');

describe('update users', () => {
  let db;

  let users;

  beforeEach(async () => {
    db = await getDb();

    await Promise.all([
      db.query('INSERT INTO User(email, houseID) VALUES(?,?)', [
        'test1@email.com',
        1,
      ]),
      db.query('INSERT INTO User(email, houseID) VALUES(?,?)', [
        'test2@email.com',
        2,
      ]),
      db.query('INSERT INTO User(email, houseID) VALUES(?,?)', [
        'test3@email.com',
        3,
      ]),
    ]);

    [users] = await db.query('SELECT * FROM User');
  });

  afterEach(async () => {
    await db.query('DELETE FROM User');
    await db.close();
  });

  describe('/user/:id', () => {
    describe('PATCH', () => {
      it('Updates a single user with the correct Id', async () => {
        const user = users[0];
        const userId = user.id;
        const result = await request(app)
          .patch(`/users/${userId}`)
          .send({ email: 'updatedemail@email.com', houseID: 4 });
        const [[updatedUser]] = await db.query(
          'SELECT * FROM User WHERE id=?',
          userId
        );

        expect(result.status).to.equal(200);
        expect(updatedUser.email).to.equal('updatedemail@email.com');
        expect(updatedUser.houseID).to.equal(4);
      });

      it('Response should equal 404 when trying to update an artist that does not exist', async () => {
        const result = await request(app)
          .patch(`/users/9999999`)
          .send({ email: 'updatedemail@email.com', houseID: 4 });

        expect(result.status).to.equal(404);
      });
    });
  });
});
