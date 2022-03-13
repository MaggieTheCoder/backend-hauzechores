const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const getDb = require('../src/services/db');

describe('/scoreboard', () => {
  let db;
  beforeEach(async () => (db = await getDb()));
  afterEach(async () => {
    await db.query('DELETE FROM Scoreboard');
    await db.close();
  });
  describe('/scoreboard', () => {
    describe('POST', () => {
      it('creates a new score to the database', async () => {
        const res = await request(app).post('/scoreboard').send({
          score: 15,
          userID: 2,
          houseID: 'test house',
        });
        expect(res.status).to.equal(201);
        const [[scoreEntries]] = await db.query(
          `SELECT * FROM Scoreboard WHERE houseID = "test house"`
        );
        expect(scoreEntries.score).to.equal(15);
        expect(scoreEntries.userID).to.equal(2);
        expect(scoreEntries.houseID).to.equal('test house');
      });
    });
    describe('GET', () => {
      it('returns all scores from the database', async () => {
        let scores;
        await Promise.all([
          db.query(
            'INSERT INTO Scoreboard (score, userID, houseID) VALUES (?, ? , ?)',
            [14, 5, 'test house1']
          ),
          db.query(
            'INSERT INTO Scoreboard (score, userID, houseID) VALUES (?, ? , ?)',
            [15, 2, 'test house2']
          ),
        ]);
        [scores] = await db.query('SELECT * FROM Scoreboard');

        const res = await request(app).get('/scoreboard');
        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(2);

        res.body.forEach((scoreRecord) => {
          const expected = scores.find((item) => item.id === scoreRecord.id);
          expect(scoreRecord).to.deep.equal(expected);
        });
      });
    });
  });
});
