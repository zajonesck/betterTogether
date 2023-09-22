require("dotenv").config();

const { app } = require("./routes/index");

// Use process.env.PORT if it's available (in Heroku's environment), otherwise fall back to 3000
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
