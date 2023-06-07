const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

//Using_Middleware
app.use(cors());
app.use(express.json());


// Default Route
app.get('/', (req, res) => {
    res.send('toy marketplace server is running sucessfully')
})

app.listen(port, () => {
    console.log(`toy marketplace server is running on port: ${port}`)
})