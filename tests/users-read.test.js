const app = require('../src/app');
const getDb = require('../src/services/db');
const { expect } = require('chai');
const request = require('supertest');

describe('read users', () => {
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

  describe('/users', () => {
    describe('GET', () => {
      it('it returns all users in the database', async () => {
        const result = await request(app).get('/users');

        expect(result.status).to.equal(200);
        expect(result.body.length).to.equal(3);

        result.body.forEach((user) => {
          const fromTests = users.find((test) => {
            return test.id === user.id;
          });
          expect(user).to.deep.equal(fromTests);
        });
      });
    });

    describe('/users/:id', () => {
      it('Should return a single user with the correct ID', async () => {
        const expectedUser = users[0];
        const expectedUserId = expectedUser.id;
        const result = await request(app).get(`/users/${expectedUserId}`);

        expect(result.status).to.equal(200);
        expect(result.body).to.deep.equal(expectedUser);
      });

      it('Should return 404 if the user id is not in the database', async () => {
        const result = await request(app).get('/users/999999');

        expect(result.status).to.equal(404);
      });
    });
  });
});
