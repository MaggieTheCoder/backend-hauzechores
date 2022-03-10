const getDb = require('../services/db.js');


/// CREATE HOUSE

exports.create = async (req, res) => {
  const db = await getDb();
  const { housename, houseID, inviteCode } = req.body;

  try {
    await db.query('INSERT INTO House (housename, houseID, inviteCode) VALUES (?, ?, ?)', [
      housename,
      houseID,
      inviteCode,
    ]);

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500).json(error);
  }
  db.close();
};


//// READ ALL HOUSES 

exports.getAll = async (req, res) => {
  const db = await getDb();
  try {
    const [houses] = await db.query('SELECT * FROM House');
    res.status(200).json(houses);
  }catch(error) {
    res.status(500).json(error);
  }
  db.close();
  };


//// READ HOUSE BY ID 

  exports.getById = async (req, res) => {
    const db = await getDb();
    const {houseID} = req.params;
     
    try {
      const [[house]] = await db.query('SELECT * FROM House WHERE id = ?', [houseID]);
      if(!house) {
        res.sendStatus(404);
      }else {
        res.status(200).json(house);
      }
    } catch (error) 
    {
      res.status(500).json(error);
    }
      db.close();
  };

  //// READ HOUSE BY INVITECODE

    exports.getByInvitecode = async (req, res) => {
    const db = await getDb();
    const houseID = req.params.houseID;
    
    try {
 const [[house]] = await db.query('SELECT * FROM House WHERE inviteCode = ?', [houseID]);

      if(!house) {
        
        res.sendStatus(404);
      }else {
        res.status(200).json(house);
      }
    } catch (error) 
    {
      console.log(error);
      res.status(500).json(error);
    }
    };

  //// UPDATE 

    exports.updateHouse = async (req, res) => {
      const db = await getDb();
      const houseID = req.params.houseID;
      const data = req.body;
    
      try {
        const [[house]] = await db.query('SELECT * FROM House WHERE id = ?', [houseID]);
    
        if (!house) {
          res.sendStatus(404);
        } else {
          await db.query('UPDATE House SET ? WHERE id = ?', [data, houseID]);
          res.status(200).json(house);
        }
      } catch (err) {
        res.status(500).send('error here');
      }
      db.close();
    };


     //// DELETE  
     
exports.deleteHouse = async (req, res) => {
  const db = await getDb();
  const houseID = req.params.houseID;


      try {
        const [[house]] = await db.query('SELECT * FROM House WHERE id = ?', [houseID]);
    
        if (!house) {
          res.sendStatus(404);
        } else {
          await db.query('DELETE FROM House WHERE id = ?', [houseID]);
          res.status(200)
            .json("deleted");
        }
      } catch (err) {
        res.status(500).send();
      }
      db.close();
    };






