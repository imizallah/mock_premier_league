const express = require("express");
const router = express.Router();

const teamController = require("../controllers/team");
const fixtureController = require("../controllers/fixtures");
const authenticate = require("../middleware/auth")


// robustly search fixtures by team-name (Only the search API should be availble to the public.)
router.post("/fixture", fixtureController.searchFixtures);

// robustly search teams by team-name (Only the search API should be availble to the public.)
router.post("/team", authenticate, teamController.searchTeams);


module.exports = router;