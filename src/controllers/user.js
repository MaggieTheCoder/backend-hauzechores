const getDb = require('../services/db.js');

exports.create = async (req, res) => {
  const db = await getDb();
  const { email, houseID } = req.body;

  try {
    await db.query('INSERT INTO User (email, houseID) VALUES (?, ?)', [
      email,
      houseID,
    ]);

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500).json(err);
  }
  db.close();
};
