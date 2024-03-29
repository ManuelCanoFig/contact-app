const express = require('express');
//const connectDB = require('./config/db');
const morgan = require('morgan');
const app = express();

//Connect to the DB
//connectDB();

//init Middleware
//app.use(express.json({ extended: false }));

app.get('/', (req, res) => { res.json({ msg: 'Hello World!' }) });

//Define routes
//app.use('/api/users', require('./routes/users'));
//app.use('/api/contacts', require('./routes/contacts'));
//app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.use(morgan('tiny'));