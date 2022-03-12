const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const getDb = require('../src/services/db');

describe('delete house', () => {
    let db;
    let houses;

    beforeEach(async ()=> {
        db = await getDb();
        await Promise.all([ 
         db.query("INSERT INTO House (housename, inviteCode) VALUES(?, ?)" , ["Maggieshouse", "randomgeneratedword1"]),
         db.query("INSERT INTO House (housename, inviteCode) VALUES(?, ?)" , ["Rachelshouse", "randomgeneratedword2"]),
         db.query("INSERT INTO House (housename, inviteCode) VALUES(?, ?)", ["Mariashouse", "randomgeneratedword3"]),
        ]);
[houses] = await db.query("SELECT * FROM House");
    });
    afterEach(async ()=> {
        await db.query('DELETE FROM House');
        await db.close();
    });
    describe('/houses/:houseID', ()=> {
        describe('DELETE', () => {
            it('deletes a house with the correct id', async ()=> {
                const house = houses[0];
                const houseToDelete =house.houseID;
                const res = await request(app).delete(`/houses/${houseToDelete}`).send();
                
                const [[deletedHouse]] = await db.query("SELECT * FROM House WHERE id = ?", [house.houseID]);
                expect(res.status).to.equal(200);
                expect(!!deletedHouse).to.be.false;

            })
        })
    })
});

