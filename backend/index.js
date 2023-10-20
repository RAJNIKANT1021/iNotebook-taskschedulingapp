const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();

const app = express();
const port = 5000;

// Enable CORS with specific options
app.use(
  cors({
    origin: "https://inotebook-ur-cloud-notes.vercel.app", // Set your frontend URL here
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    preflightContinue: false, // By default, preflight requests are handled, so no need to set this explicitly
  })
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
