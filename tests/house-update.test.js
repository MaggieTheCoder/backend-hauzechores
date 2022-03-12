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
    describe('/houses/:houseID' , ()=> {
        describe('PATCH', () => {
            it("updates a house with the correcet id", async () => {
                const house = houses[0];
                const res = await request(app).patch(`/houses/${house.id}`).send({
                    housename: "new name" , invitecode: "newrandomcode"
                });
                const [[newHouseRecord]] = await db.query('SELECT * FROM House WHERE id =?', [house.id]);

                expect(res.status).to.equal(200);
                expect(newHouseRecord.housename).to.equal("new name");
            })
        })
    })

});

