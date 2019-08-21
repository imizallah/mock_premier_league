const express = require("express");
const fixtureController = require("../controllers/fixtures");
const isAdmin = require("../middleware/isAdmin");
const Role = require("../controllers/role");
const authenticate = require("../middleware/auth")

const router = express.Router();


// Admin User CRUD Routes
router.post("/create", authenticate, isAdmin, fixtureController.createFixtures);
router.get("/view", authenticate, fixtureController.getAllFixtures);
router.put("/update/:id", authenticate, isAdmin, fixtureController.editFixtures);
router.delete("/delete/:id", authenticate, isAdmin, fixtureController.deleteFixtures);

// view pending fixtures
router.get('/pending', authenticate, fixtureController.pendingFixtures);

// view completed fixtures
router.get('/finished', authenticate, fixtureController.completedFixtures);


module.exports = router;