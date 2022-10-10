const mongoose = require("mongoose")
require("dotenv").config({ path: "./config/.env" })

mongoose
  .connect(process.env.MONGO_DB_CONNECT)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connec to MongoDB", err))
