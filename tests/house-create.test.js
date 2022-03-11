const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const getDb = require('../src/services/db');

describe('create house', () => {
    let db;
    beforeEach(async()=> (db = await getDb()));

    afterEach(async ()=> {
        await db.query('DELETE FROM House');
        await db.close();
    });

    describe('/houses', () => {
        describe('POST', () => {
it("creates a new house in the database", async () => {
    const res = await request(app).post('/houses').send({
        housename: "coding house",
      invitecode: "random-word-generated"
    });
    expect(res.status).to.equal(201);
    const [[houseEntries]] = await db.query(`SELECT * FROM House WHERE housename = "coding house" `);
    expect(houseEntries.housename).to.equal("coding house");
    expect(houseEntries.inviteCode).to.equal("random-word-generated");

});
        });
    });
} );