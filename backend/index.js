const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const classRoutes = require('./routes/classRoutes')

const PORT = process.env.PORT || 4000;

app.use(express.static(__dirname + "/dist"))
app.get('/', (req, res) { res.redirect('/dist/index.html') });
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB Atlas');
});

app.use('/api', classRoutes)

const atlasConnectionUri = process.env.MONGODB_URL;
mongoose.connect(atlasConnectionUri, {
    dbName: 'subjects'
});

app.listen(PORT, () => {
    console.log(`Server is Running at ${PORT}`);
});
