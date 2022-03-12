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

        const res = await request(app)
          .patch(`/tasks/${task.id}`)
          .send({ taskname: 'water the plants' });

        expect(res.status).to.equal(200);

        const [[newTaskRecord]] = await db.query(
          'SELECT * FROM TASK WHERE id = ?'[task.id]
        );

        expect(newTaskRecord.name).to.equal('water the plants');
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
