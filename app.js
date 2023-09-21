const express = require("express");
const connectDB = require("./config/dbConnection");
const app = express();
const indexRouter = require('./routes/index.routes')
require("dotenv").config();
app.use(express.json())
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const cors = require('cors')
connectDB()
app.use(cors())
app.get("/", (req, res) => {
  res.send("App is running");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/api",indexRouter)

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
