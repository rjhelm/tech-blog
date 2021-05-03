// import express router object
const router = require("express").Router();
// point at the correct files and import our routes
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");
const dashboardRoutes = require("./dashboard-routes.js");
// direct to the route determined by user 
router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);
// if no route response throw error 
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
