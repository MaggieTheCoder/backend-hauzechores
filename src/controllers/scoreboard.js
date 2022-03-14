const getDb = require('../services/db.js');

/// CREATE SCOREBOARD

exports.create = async (req, res) => {
  const db = await getDb();
  const { score, username, userID, houseID } = req.body;

  try {
    await db.query(
      'INSERT INTO Scoreboard (score, username, userID, houseID ) VALUES (?, ?, ?, ?)',
      [score, username, userID, houseID]
    );

    res.status(201).json('created');
  } catch (error) {
    res.sendStatus(500).json(error);
  }
  db.close();
};

// get score by ID
exports.getByQuery = async (req, res) => {
  const db = await getDb();
  console.log(req.query);
  const [q] = Object.keys(req.query);
  console.log(q);
  const [value] = Object.values(req.query);
  console.log(value);

  try {
    const result = await db.query(`SELECT * FROM Scoreboard WHERE ${q}=?`, [
      value,
    ]);
    const [score] = result;
    if (score) {
      res.status(200).send(score);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
  db.close();
};

//// GET ALL SCORES
exports.getAllScores = async (req, res) => {
  const db = await getDb();

  try {
    const [result] = await db.query('SELECT * FROM Scoreboard');
    res.status(200).json(result);
    console.log(result);
  } catch (error) {
    res.status(500).json(error);
  }
  db.close();
};

//// UPDATE SCOREBOARD

exports.updateScore = async (req, res) => {
  const db = await getDb();
  const userID = req.params.userid;
  const data = req.body;

  try {
    const [[newscore]] = await db.query(
      'SELECT * FROM Scoreboard WHERE userID=?',
      [userID]
    );
    //   console.log(newscore.score)

    if (!newscore) {
      res.sendStatus(404);
    } else {
      await db.query('UPDATE Scoreboard SET ? WHERE UserID=?', [data, userID]);
      res.sendStatus(200);
    }
  } catch (err) {
    res.status(500).send(error);
  }
  db.close();
};
