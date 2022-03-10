const getDb = require('../services/db.js');

exports.create = async (req, res) => {
  const db = await getDb();
  const { housename, inviteCode } = req.body;

  try {
    await db.query('INSERT INTO House (housename, inviteCode) VALUES (?, ?)', [
      housename,
      inviteCode,
    ]);

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500).json(error);
  }
  db.close();
};
