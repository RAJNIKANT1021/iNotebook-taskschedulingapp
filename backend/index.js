const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();

const app = express();
const port = 5000;

// Enable CORS with specific options
app.use(
  cors()
);

app.use(express.json()); // Middleware for parsing JSON request bodies

// Define your routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
