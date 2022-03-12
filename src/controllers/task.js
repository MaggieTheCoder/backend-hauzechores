const getDb = require('../services/db.js');

exports.create = async (req, res) => {
  const db = await getDb();
  const { userID, taskname, houseID } = req.body;

  try {
    await db.query(
      'INSERT INTO Task (taskname, userID, houseID) VALUE (?, ?, ?)',
      [taskname, userID, houseID]
    );

    res.sendStatus(201);
  } catch (error) {
    res.status(500).json(error);
  }
  db.close();
};
