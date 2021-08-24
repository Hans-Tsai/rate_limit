const express = require('express');
const router = express.Router();
const User = require('../models/User')

router.get('/:user', checkUser, async (req, res) => {
  await res.render('login');
});

async function checkUser(req, res, next) {
  const recentUser = req.params.user;
  if (recentUser) {
    if (recentUser !== 'admin') {
      const userInformation = await User.find({ name: recentUser,  createdAt: { $gte: Date.now() - 1000 * 60 * 10 }});
      const counter = userInformation.length;
      if (counter > 5)  res.status(429).send({ body: 'query times exceed limitation.' });
      res.status(200).send({ APIrequestTimes: counter });
      next();
    }
    next();
  }
  else {
    // user not login
    res.status(401).json({ message: 'Please log in first.' })
    next();
  }
};

module.exports = router;
