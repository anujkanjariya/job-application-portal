const Job = require('../models/Job');

async function seedJobs(req, res) {
  try {
    const count = await Job.countDocuments();
    if (count === 0) {
      await Job.insertMany([
        {
          title: 'NodeJs Developer',
          company: 'Potenz Technology',
          description: 'We are looking for a skilled NodeJs Developer to join our team. You will be RESTfull API building for web application',
          requirements: ['NodeJs', 'JavaScript', 'Express', 'MongoDb', 'Fresher'],
          salary: '20000',
          location: '207, Devashish Business Park, Premchand Nagar Rd, Bodakdev, Ahmedabad, Gujarat 380054',
          type: 'Full-time'
        },
        {
          title: 'FrontEnd Developer',
          company: 'IT Path Solutions',
          description: 'Join our growing team as a FrontEnd Developer. You will work on responsive and user attrective user interface.',
          requirements: ['ReactJs', 'JavaScript', 'css', '1+ years experience'],
          salary: '25000',
          location: '801, 8th floor Binori B Square, I BRTS road, Ambli Rd, Ahmedabad, Gujarat 380058',
          type: 'Full-time'
        },
        {
          title: 'Full Stack Developer',
          company: 'Accenture Pvt Ltd',
          description: 'Looking for a Full Stack Developer to work on exciting projects from frontend to backend.',
          requirements: ['React', 'Node.js', 'PostgreSQL', 'AWS', '4+ years experience'],
          salary: '50000',
          location: 'Remote',
          type: 'Full-time'
        },
        {
          title: 'UI/UX Designer',
          company: 'CMARIX',
          description: 'Creative UI/UX Designer needed to design beautiful and intuitive user interfaces.',
          requirements: ['Figma', 'Adobe Creative Suite', 'Prototyping', '2+ years experience'],
          salary: '27500',
          location: 'Sushil Nagar Society, Memnagar, Ahmedabad',
          type: 'Part-time'
        },
        {
          title: 'Data Analyst',
          company: 'Solution Analysts',
          description: 'Analyze large datasets to provide business insights and recommendations.',
          requirements: ['Python', 'SQL', 'Tableau', 'Statistics', '3+ years experience'],
          salary: '50000',
          location: 'Sattadhar Cross Rd, Ghatlodiya, Chanakyapuri, Ahmedabad',
          type: 'Full-time'
        }
      ]);
      return res.send("Sample jobs seeded successfully!");
    }
    res.send("Jobs already exist. Clear DB if you want to reseed.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error seeding jobs",error.message);
  }
}

async function getJobs(req, res) {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    // console.log(jobs);
    res.render('jobs', { jobs });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching jobs");
  }
}

module.exports = {
  seedJobs,
  getJobs
};