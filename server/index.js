const express = require("express");
const app = express();
const cors = require('cors');

app.use(express.static(path.join(__dirname, '../client')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/public/index.html'))
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`server has started on port ${process.env.PORT || 5000}`)
})

