const express = require('express');
const bodyParser = require('body-parser');
const notesRoutes = require('./routes/notes');
require('dotenv').config(); 

const app = express();

app.use(bodyParser.json()); 


app.use('/notes', notesRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});


const PORT = process.env.PORT || 7856;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
