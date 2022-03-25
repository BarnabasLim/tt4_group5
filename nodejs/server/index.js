// server/index.js

const express = require("express");
// Import routes
let apiRoutes = require("./api-routes");

const PORT = process.env.PORT || 3001;

// Initialise the app
const app = express();

app.use(
    express.urlencoded({
      extended: true
    })
  )
  
app.use(express.json())

// Use Api routes in the App
app.use(apiRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});