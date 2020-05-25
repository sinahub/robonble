var express = require('express');
var router = express.Router();

var Robo = require('../controllers/ActionController');

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log(`Placing Robo on the table`);
  res.sendStatus(200);
});

router.get('/v1.0/PLACE/:x?/:y?/:f?', async (req, res, next) => {
  let { x, y, f } = req.params;
  console.log(`Placing Robo on the table (${x},${y},${f})`);
  try {
    let result = Robo.setup(x, y, f);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get('/v1.0/MOVE', async (req, res, next) => {
  let { x, y, f } = req.params;
  console.log(`Moving Robo on the table`);
  try {
    let result = Robo.move();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
router.get('/v1.0/LEFT', Robo.left);
router.get('/v1.0/RIGHT', Robo.right);
router.get('/v1.0/REPORT', async (req, res) => {
  let { x, y, f } = req.params;
  console.log('Retriving the report');
  try {
    let result = Robo.setup(x, y, f);
    res.send(result);
  } catch (error) {
    console.log(error);
    if (error.indexOf("Invalid id") > -1) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(500);
  }
});

module.exports = router;