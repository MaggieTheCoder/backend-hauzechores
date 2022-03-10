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

  try {}
};
