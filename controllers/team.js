const Team = require("../models/team").Team;

module.exports = {
  //create team
  createTeam: (req, res, next) => {
    const { teamName, manager, stadium } = req.body;
    // let logoUrl = "";
    if (!teamName || !manager || !stadium) {
      return res.status(400).json({ msg: "All fields are required" })
    } else {
      const team = new Team({
        teamName,
        manager,
        stadium
      });
      team.save()
        .then(team => {
          res.json(team)
        })
        .catch(err => res.json({ msg: "Team creation failed", err }))
    }
  },

  //view all team 
  getAllTeam: (req, res, next) => {
    Team.find({})
      .then(teams => {
        res.json(teams)
      })
      .catch(err => {
        return res.json({ msg: err.message || "Error occured" })
      })
  },


  //deleting a team
  deleteTeam: (req, res, next) => {
    const teamId = req.params.id;
    console.log(teamId)
    Team.findById(teamId)
      .then(team => {
        team.remove()
          .then(() => {
            res.json({ success: true, message: "Team Deleted Succesfully!!!" });
          })
          .catch(err => res.json({ success: false, message: "Could not delete team" }));
      })
      .catch(err => {
        res.json({ success: false, message: "This Team doesnt exists" })

      })
  },

  //editing a team
  editTeam: (req, res, next) => {
    const { teamName, manager, stadium } = req.body;
    const teamId = req.params.id;
    Team.findByIdAndUpdate(teamId, { new: true })
      .then(team => {
        if (!team) {
          return res.status(404).json({
            message: "Team not found"
          })
        }
        team.teamName = teamName;
        team.manager = manager;
        team.stadium = stadium;
        team.save()
          .then(editedTeam => {
            return res.status(200).json({ editedTeam })

          })
          .catch(err => {
            res.json({ success: false, message: "Team was not updated" })

          })
          // res.send(team)
      })

  },

  searchTeams: async(req, res) => {
    try {
      const teamName = req.body.teamName;
      const team = await Team.findOne({ teamName: teamName }, (err, team) => {
        if (err) {
          res.status(404).json({
            status: "Error",
            message: "Team not found"
          })
        }
      });

      if (team === undefined || team === null) {
        res.status(404).json({
          status: "Error",
          message: "An error occurred no teams found"
        })
      }
      return res.status(200).json({
        status: "Success",
        message: "Successfully found teams",
        data: { team }
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        status: "Error",
        message: "An error occurred, no teams found"
      });
    }
  }
}