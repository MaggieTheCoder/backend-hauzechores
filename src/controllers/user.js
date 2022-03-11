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
    res.sendStatus(500).json(error);
  }
  db.close();
};

exports.getAll = async (req, res) => {
  const db = await getDb();
  try {
    const result = await db.query('SELECT * FROM User');
    const [users] = result;
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
  db.close();
};

exports.getById = async (req, res) => {
  const db = await getDb();
  const id = req.params.id;
  try {
    const result = await db.query('SELECT * FROM User WHERE id=?', [id]);
    const [[user]] = result;
    if (user) {
      res.status(200).send(user);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
  db.close();
};

exports.getUserByEmail = async (req, res) => {
  const db = await getDb();
  const email = req.params.email;
  try {
    const result = await db.query('SELECT * FROM User WHERE email=?', [email]);
    const [[user]] = result;
    if (user) {
      res.status(200).send(user);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
  }
  db.close();
};

exports.updateUserById = async (req, res) => {
  const db = await getDb();
  const id = req.params.id;
  const data = req.body;

  try {
    const [[user]] = await db.query('SELECT * FROM User WHERE id=?', [id]);

    if (user) {
      await db.query('UPDATE User SET ? WHERE id=?', [data, id]);
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(500).json(error);
  }
  db.close();
};

exports.updateUserByEmail = async (req, res) => {
  const db = await getDb();
  const email = req.query.email;
  const data = req.body;

  try {
    const [[user]] = await db.query('SELECT * FROM User WHERE email=?', [
      email,
    ]);
    if (user) {
      await db.query('UPDATE User SET ? WHERE email=?', [data, email]);
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.getByEmail = async (req, res) => {
  const db = await getDb();
  const email = req.query.email;
  console.log(email);

  try {
    console.log(email);
    const result = await db.query('SELECT * FROM User WHERE email=?', [email]);
    const [[user]] = result;
    if (user) {
      res.status(200).send(user);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
  db.close();
};

exports.deleteById = async (req, res) => {
  const db = await getDb();
  const id = req.params.id;
  try {
    const [[user]] = await db.query('SELECT * FROM User WHERE id=?', [id]);
    if (user) {
      await db.query('DELETE FROM User WHERE id=?', [id]);
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
