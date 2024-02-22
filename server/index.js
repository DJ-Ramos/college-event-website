const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors())

app.get('*', (req, res) => {
    res.sendFile('../client/public/index.html')
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`server has started on port ${process.env.PORT || 5000}`)
})

