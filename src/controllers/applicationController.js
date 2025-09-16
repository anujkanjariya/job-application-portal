const Application = require('../models/Application');

async function applyForJob(req, res) {
  try {
    await Application.create({
      user: req.user,
      job: req.params.jobId,
      resume: req.file.filename
    });
    res.send(`
      <script>
        alert("Application submitted successfully!");
        window.location.href = "/jobs";
      </script>
    `);
  } catch (err) {
    res.status(400).send("Application failed");
  }
}

// Show applications
async function getApplications(req, res) {
  try {
    const apps = await Application.find({ user: req.user }).populate('job');
    res.render('applications', { apps });
  } catch (err) {
    res.status(500).send("Failed to load applications");
  }
}

module.exports = {
  applyForJob,
  getApplications
};