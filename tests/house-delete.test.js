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
    
    describe('DELETE /houses/:houseID', () => {
        it('deletes house record by id', async () => {
            const house = houses[0];
            const response = await request(app).delete(`/houses/${house.id}`);
            const [[deletedHouse]] = await db.query("SELECT * FROM House WHERE id = ?", [house.houseID]);

            expect(response.status).to.equal(200);
        expect(Boolean(deletedHouse)).to.be.false;
        });
    });
    
});

