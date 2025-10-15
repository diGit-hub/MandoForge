const express = require('express');
const connectDB = require('./config/db');
const jsonParser = require('./middleware/jsonParser');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();

app.use(jsonParser);
app.use('/api', userRoutes);

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at port ${PORT}`);
    });
  });
}