const express = require("express");
const teamController = require("../controllers/team");
const isAdmin = require("../middleware/isAdmin");
const authenticate = require("../middleware/auth")
const Role = require("../controllers/role");
const upload = require("../middleware/upload");


const router = express.Router();


router.post("/create", authenticate, isAdmin, teamController.createTeam);
router.get("/view", authenticate, teamController.getAllTeam);
router.delete("/delete/:id", authenticate, isAdmin, teamController.deleteTeam);
router.put("/update/:id", authenticate, isAdmin, teamController.editTeam);



module.exports = router;