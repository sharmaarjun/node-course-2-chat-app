const path = require('path'); // inbuild library
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const port = process.env.PORT || 3000;

// console.log(__dirname + '/../public');  // earlier we used it
// console.log(publicPath); // now this will be used

var app = express();
app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});