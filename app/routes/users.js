var express = require('express');
var router  = express.Router();
var User    = require('../models/user');

router.route('/')
  .post((req, res) => {
    /*User.findOne({email: req.body.user.email }, (err, user) => {

      if (err) res.json(err)

      if (user) {
        res.json({ 'user': user })
      } else {
        var user = new User()
        user.email = req.body.user.email
        user.role = req.body.user.roles[0]

        user.save((err) => {
          if (err)
            res.json(err)
          else
            res.json({ user })
        })
      }

    })*/
    res.json(req.user.app_metadata.roles[0])
  })
  .get((req, res) => {
    /*User.find((err, users) => {
      if (err) res.send(err)
      res.json({ users })
    })*/

    res.json(req.user)
  })

router.route('/:email')
  .get((req, res) => {
    User.findOne({ email: req.params.email }, (err, user) => {
      res.json(user)
    })
  })

module.exports = router;
