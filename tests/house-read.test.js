const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const getDb = require('../src/services/db');

describe('read houses', () => {
    let db;
    let houses;

    beforeEach(async ()=> {
        db = await getDb();
        await Promise.all([ 
         db.query("INSERT INTO House (housename, invitecode) VALUES(?, ?)" , ["Maggieshouse", "randomgeneratedword1"]),
         db.query("INSERT INTO House (housename, invitecode) VALUES(?, ?)" , ["Rachelshouse", "randomgeneratedword2"]),
         db.query("INSERT INTO House (housename, invitecode) VALUES(?, ?)", ["Mariashouse", "randomgeneratedword3"]),
        ]);
[houses] = await db.query("SELECT * FROM House");
    });


    afterEach(async ()=> {
        await db.query('DELETE FROM House');
        await db.close();
    });
    describe('/houses', () => {
        describe('GET', () => {
it("returns all houses from the database", async () => {
    const res = await request(app).get('/houses').send();
    expect(res.status).to.equal(200);
    expect(res.body.length).to.equal(3);

    res.body.forEach((houseRecord) => {
        const expected = houses.find((item) => item.id === houseRecord.id);
        expect(houseRecord).to.deep.equal(expected)
    })
}

        )});

});
describe("/houses/:houseID", ()=> {
    describe("GET", () => {
        it('returns house with correct id', async () => {
            const expected = houses[0];
            const res = await request(app).get(`/houses/${expected.id}`).send();
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal(expected);
        })
    })
})


    });



