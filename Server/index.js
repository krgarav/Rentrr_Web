const express = require("express");

//middleware
const app = express();

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
