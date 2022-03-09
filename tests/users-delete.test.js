const app = require('../src/app');
const request = require('supertest');
const { expect } = require('chai');
const getDb = require('../src/services/db');

describe('delete users', () => {
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

  describe('/users/:id', () => {
    describe('DELETE', () => {
      it('Should delete a user given the correct id', async () => {
        const userToDelete = users[0];
        const userToDeleteId = userToDelete.id;
        const result = await request(app).delete(`/users/${userToDeleteId}`);
        const [[deletedUser]] = await db.query(
          'SELECT * FROM User WHERE id=?',
          [userToDeleteId]
        );

        expect(result.status).to.equal(200);
        expect(Boolean(deletedUser)).to.be.false;
      });
    });
  });
});
