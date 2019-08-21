const Fixtures = require("../models/fixtures").Fixture;
// const Admin = require("../modelsuser");

module.exports = {
  //creating fixtures
  createFixtures: (req, res, next) => {
    let { home_team, away_team, home_team_scores, away_team_scores, venue, match_period, match_date } = req.body;
    const userId = req.params.id

    if (!home_team || !away_team || !home_team_scores || !away_team_scores || !venue || !match_period || !match_date) {
      return res.status(400).json({ msg: "All fields are required" })
    }

    if (match_period.toLowerCase() === "full time") {
      const fixture = new Fixtures({
        home_team,
        away_team,
        home_team_scores,
        away_team_scores,
        venue,
        match_period,
        match_status: "finished",
        match_date
      });
      fixture.save()
        .then(fixture => {
          res.json(fixture)
        })
        .catch(err => res.json({ msg: "Fixture creation failed: ", err }))
    } else {
      const fixture = new Fixtures({
        home_team,
        away_team,
        home_team_scores,
        away_team_scores,
        venue,
        match_period,
        match_status: "pending",
        match_date
      });
      fixture.save()
        .then(fixture => {
          res.json(fixture)
        })
        .catch(err => res.json({ msg: "Fixture creation failed: ", err }))
    }


  },

  //editing a fixtures
  editFixtures: (req, res, next) => {
    let { home_team, away_team, home_team_scores, away_team_scores, venue, match_period, match_date } = req.body;
    Fixtures.findById(req.params.id)
      .then(fixture => {
        if (!fixture) {
          return res.status(404).json({
            message: "Fitures not found"
          })
        }
        fixture.home_team = home_team;
        fixture.away_team = away_team;
        fixture.home_team_scores = home_team_scores;
        fixture.away_team_scores = away_team_scores;
        fixture.venue = venue;
        fixture.match_period = match_period;
        fixture.match_date = match_date;
        fixture.save()
          .then(editedFixture => {
            return res.status(200).json({ editedFixture })

          })
          .catch(err => {
            return res.json({ success: false, message: "Team was not updated" })

          })
      })
      .catch(err => {
        return res.json({ success: false, message: "No team with that ID" })

      })
  },

  //delete fixtures
  deleteFixtures: (req, res, next) => {
    const fixtureId = req.params.id;
    Fixtures.findById(fixtureId)
      .then(fixture => {
        fixture.remove()
          .then(() => {
            res.json({ success: true, msg: "Fixture deleted Succesfully!!!" });
          })
          .catch(err => res.json({ success: false, msg: "Unable to delete fixture because: ", err }));
      })
      .catch(err => {
        res.json({ success: false, message: "This fixture doesnt exists" })

      })
  },

  //View all fixtures
  getAllFixtures: (req, res, next) => {
    Fixtures.find({})
      .then(fixture => {
        res.json(fixture)
      })
      .catch(err => res.json({ msg: err.message || "Error occured while fetching fixtures", err }))
  },

  pendingFixtures: async(req, res) => {
    try {
      const fixtures = await Fixtures.find({ match_status: 'pending' });

      if (fixtures === undefined || fixtures.length === 0) {
        res.status(404).json({
          status: "Error",
          message: "No Pending fixtures found"
        })
      }

      res.status(200).json({
        status: "Success",
        message: "Pending fixtures found!!",
        data: { fixtures }
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        status: "Error",
        message: "An error occurred"
      });
    }
  },

  completedFixtures: async(req, res) => {
    try {
      const fixtures = await Fixtures.find({ match_status: 'finished' });
      if (fixtures === undefined || fixtures.length === 0) {
        res.status(404).json({
          status: "Error",
          message: "No fixtures found"
        })
      }

      res.status(200).json({
        status: "Success",
        message: "Fixtures found",
        data: { fixtures }
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        status: "Error",
        message: "An error occurred"
      });
    }
  },

  searchFixtures: async(req, res) => {
    try {
      const matchName = req.body.team;
      const fixtures = await Fixtures.find({ $or: [{ home_team: matchName }, { away_team: matchName }] });

      if (fixtures === undefined || fixtures.length === 0) {
        res.status(404).json({
          status: "Error",
          message: "No fixtures found"
        })
      }
      res.status(200).json({
        status: "Success",
        message: 'Successfully found fixtures',
        data: { fixtures }
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        status: "Error",
        message: "An error occurred"
      });
    }
  }


}