const express = require('express');
const app = express();

// Routes
app.get("/", (req, res) => {
    res.send("Hello API");
})

app.listen(3333, () => {
    console.log(`Server is running at port 3333`);
})