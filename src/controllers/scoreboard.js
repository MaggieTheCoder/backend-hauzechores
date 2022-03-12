const getDb = require('../services/db.js');

/// CREATE SCOREBOARD

exports.create = async (req, res) => {
    const db = await getDb();
    const { score, username, userID, houseID } = req.body;
  
    try {
      await db.query('INSERT INTO Scoreboard (score, username, userID, houseID ) VALUES (?, ?, ?, ?)', [
        score,
        username,
        userID,
        houseID
      ]);
  
      res.status(201).json('created');
    } catch (error) {
      res.sendStatus(500).json(error);
    }
    db.close();
  };

  //// GET ALL SCORES 
  exports.getAllScores = async (req, res) => {
      const db = await getDb();

      try { const [result] = await db.query("SELECT * FROM Scoreboard");
      res.status(200).json(result)
      console.log(result)
  }
  catch (error) {
      res.status(500).json(error);
  }
  db.close();
  }





//// UPDATE SCOREBOARD

exports.updateScore = async (req, res) => {
    const db = await getDb();
    const id = req.params.id;
    const data = req.body;
  
    try {
      const [[newscore]] = await db.query('SELECT * FROM Scoreboard WHERE id = ?', [
        id,
      ]);
    //   console.log(newscore.score)
  
      if (!newscore) {
        res.sendStatus(404);
      } else {
        await db.query('UPDATE Scoreboard SET ? WHERE id = ?', [data, id]);
        res.status(200).json(`your new high score is ${data.score}`);
      }
    } catch (err) {
      res.status(500).send('error here');
    }
    db.close();
  };