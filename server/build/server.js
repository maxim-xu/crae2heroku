'use strict';

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

var router = _express2.default.Router();

var staticFiles = _express2.default.static(_path2.default.join(__dirname, '../../client/build'));
app.use(staticFiles);

router.get('/cities', function (req, res) {
  console.log('reading this from env > ' + process.env.MY_VARIABLE);
  var cities = [{ name: 'New York City', population: 8175133 }, { name: 'Los Angeles', population: 3792621 }, { name: 'Chicago', population: 2695598 }];
  res.json(cities);
});

app.use(router);

// any routes not picked up by the server api will be handled by the react router
app.use('/*', staticFiles);

app.set('port', process.env.PORT || 3001);
app.listen(app.get('port'), function () {
  console.log('Listening on ' + app.get('port'));
});