var express = require('express');
var router = express.Router();
var Storage = require('./storage')

router.get('/', function (req, res) {
  console.log('en get')
  Storage.getAllData()
    .then(function (data){
      res.json(data)
    }). catch(function(error){
      res.sendStatus(500).json(error)
    })
})

router.get('/about', function (req, res) {
  res.send('PING');
})

router.get('/message', function(req, res){
  res.send('PING')
  res.end
})

router.post('/users', function(req, res){
  res.send('PING')
  res.end
})

router.post('/message', function(req, res){
  res.send('PING')
  res.end
})

module.exports = router;
