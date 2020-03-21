const express = require('express');
const db = require('./models');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/employees', (req, res) => {
  db.Employee.findAll({})
  .then(Employees => res.json(Employees));
});

app.post('/employees', (req, res) => {
  db.Employee.create(req.body)
  .then(response => {
    res.json(response)
  });
});

app.put('/updateEmployee/:id', (req,res) => {
  db.Employee.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(response => {
    res.json(response);
  });
});

app.delete('/removeEmployee/:id', (req, res) => {
  db.Employee.destroy({
    where: {
      id: req.params.id
    }
  }).then(response => {
    res.json(response);
  })
})

// =============================================================
const PORT = process.env.PORT || 8080;
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
