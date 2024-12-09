const express = require('express');
const cors = require('cors');

const app = express();
// const path = require('path');
const PORT = process.env.PORT || 8000;

app.use(cors({
  // origin: 'http://localhost:8080',
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    message: 'LeFlash API connected'
  });
})

require('./app/routes/auth.route')(app)
require('./app/routes/user.route')(app)

const db = require('./app/models');
db.mongoose
  .connect(db.url, {
  })
  .then((result) => {
    console.log('Database Connected');
    console.log(db.url);

  }).catch((err) => {
    console.log('Cannot connect to database!', err);
    process.exit()
  })

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);

})
