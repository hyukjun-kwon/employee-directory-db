const express = require('express');
const db = require('./models');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/employees', (req, res) => {
  db.Employee.findAll({})
  .then(Employees => res.json(Employees));
});

app.get('/findEmployee/:id', (req, res) => {
  db.Employee.findOne({
    where: {
      id: req.params.id
    }
  }).then(response => res.json(response));
});

app.post('/employees', (req, res) => {
  db.Employee.create(req.body)
  .then(response => res.json(response));
});

app.put('/updateEmployee/:id', (req, res) => {
  db.Employee.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(response => res.json(response));
});

app.delete('/removeEmployee/:id', (req, res) => {
  db.Employee.destroy({
    where: {
      id: req.params.id
    }
  }).then(response => res.json(response));
});

// =============================================================
const PORT = process.env.PORT || 8080;
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, () => console.log("App listening on PORT " + PORT));
});
