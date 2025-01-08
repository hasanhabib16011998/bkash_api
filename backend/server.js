const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();
const mongoose = require('mongoose');
const uri = "mongodb://localhost:27017/payment_gateway"
// Middleware
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));
app.use(bodyParser.json());
dotenv.config();

// Routes
app.use('/api', require('./routes/route'));

app.get('/', (req, res) => {
    res.send({ message: 'Welcome to the Node.js Boilerplate API!' });
});


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log("Connected to MongoDB!");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
