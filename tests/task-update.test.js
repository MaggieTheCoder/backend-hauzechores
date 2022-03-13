const app = require('../src/app');
const getDb = require('../src/services/db');
const { expect } = require('chai');
const request = require('supertest');

describe('update tasks', () => {
  let db;
  let tasks;

  beforeEach(async () => {
    db = await getDb();
    await Promise.all([
      db.query('INSERT INTO Task(userID, taskname) VALUES(?,?)', [
        '1',
        'sweep the kitchen',
      ]),
      db.query('INSERT INTO Task(userID,taskname) VALUES(?,?)', [
        '2',
        'vacuum the lounge',
      ]),
      db.query('INSERT INTO Task(userID,taskname) VALUES(?,?)', [
        '3',
        'polish the silver',
      ]),
    ]);

    [tasks] = await db.query('SELECT * FROM Task');
  });

  afterEach(async () => {
    await db.query('DELETE FROM Task');
    await db.close();
  });

  describe('tasks/:id', () => {
    describe('PATCH', () => {
      it('updates a single task with the correct id', async () => {
        const task = tasks[0];
        console.log(task);

        const res = await request(app)
          .patch(`/tasks/${task.id}`)
          .send({ userID: 2 });
        expect(res.status).to.equal(200);

        const [[fromDb]] = await db.query('SELECT * FROM Task WHERE id=?', [
          task.id,
        ]);

        console.log(fromDb);
        expect(fromDb.userID).to.equal(2);
      });

      it('returns a 404 if the task is not in the database', async () => {
        const res = await request(app)
          .patch('/tasks/999999')
          .send({ taskname: 'new task' });

        expect(res.status).to.equal(404);
      });
    });
  });
});
