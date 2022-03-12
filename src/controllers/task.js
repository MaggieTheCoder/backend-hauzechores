const getDb = require('../services/db.js');

exports.create = async (req, res) => {
  const db = await getDb();
  const { userID, taskname } = req.body;

  try {
    await db.query('INSERT INTO Task (userID, taskname) VALUE (?, ?)', [
      userID,
      taskname,
    ]);

    res.sendStatus(201);
  } catch (error) {
    res.status(500).json(error);
  }
  db.close();
};

exports.getAll = async (req, res) => {
  const db = await getDb();

  try {
    const result = await db.query('SELECT * FROM Task');

    const [tasks] = result;
    res.status(200).send(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getTaskByUserId = async (req, res) => {
  const db = await getDb();
  const userID = req.params.userid;

  try {
    const result = await db.query('SELECT * FROM Task WHERE userID=?', [
      userID,
    ]);

    const [[task]] = result;

    if (task) {
      res.status(200).send(task);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
  db.close();
};

exports.updateTaskById = async (req, res) => {
  const db = await getDb();
  const id = req.params.id;
  const data = req.body;

  try {
    const [[task]] = await db.query('SELECT * FROM Task WHERE id=?', [id]);

    if (task) {
      await db.query('UPDATE Task SET ? WHERE id=?', [data, id]);
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(500).json(error);
  }
  db.close();
};

exports.deleteById = async (req, res) => {
  const db = await getDb();
  const id = req.params.id;

  try {
    const [[task]] = await db.query('SELECT * FROM Task WHERE id=?', [id]);

    if (task) {
      await db.query('DELETE FROM Task WHERE id=?'[id]);
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
  db.close();
};
