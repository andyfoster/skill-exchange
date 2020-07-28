const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

// Init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res, next) => {
  res.send('Welcome to Express');
});

// Define Routes
app.use('/api/v1/users', require('./routes/api/users'));
app.use('/api/v1/auth', require('./routes/api/auth'));
app.use('/api/v1/profile', require('./routes/api/profile'));
app.use('/api/v1/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
