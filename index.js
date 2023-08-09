const express = require("express");
const app = express();
const router = require("./routes/members");

const logger = require("./middleware/logger");

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Init middleware
app.use(logger);

// Member Api Routes
app.use("/api/members", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
