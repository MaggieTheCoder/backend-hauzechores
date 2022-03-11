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
<<<<<<< HEAD
=======

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
>>>>>>> 552cd99019980fe1fbfb8d1e09d06da0aad09c9e
