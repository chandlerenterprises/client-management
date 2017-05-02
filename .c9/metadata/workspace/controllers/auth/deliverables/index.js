{"changed":true,"filter":false,"title":"index.js","tooltip":"/controllers/auth/deliverables/index.js","value":"var express = require('express');\nvar router = express.Router();\n\n/*\n \n DELIVERABLE CONTROLLER\n\n*/\n\n\nrouter.get('/request', function(req, res) {\n  require('./request')(req, res)\n})\n\nrouter.post('/accept', function(req, res) {\n  require('./accept')(req, res)\n})\n\nrouter.post('/add', function(req, res) {\n  require('./add')(req, res)\n})\n\nrouter.post('/remove', function(req, res) {\n  require('./remove')(req, res)\n})\n\n\n\nmodule.exports = router;","undoManager":{"mark":0,"position":60,"stack":[[{"start":{"row":0,"column":0},"end":{"row":35,"column":24},"action":"insert","lines":["var express = require('express');","var router = express.Router();","","/*"," "," UNASSINGED CONTROLLER","","*/","","router.get('/', function(req, res) {","  res.render('dev')","})","","router.get('/request', function(req, res) {","  require('./requestCom')(req, res)","})","","router.post('/accept', function(req, res) {","  require('./acceptCom')(req, res)","})","","router.post('/create', function(req, res) {","  require('./createCom')(req, res)","})","","router.post('/addDeliverable', function(req, res) {","  require('./addDeliverable')(req, res)","})","","router.post('/removeDeliverable', function(req, res) {","  require('./addDeliverable')(req, res)","})","","","","module.exports = router;"],"id":1}],[{"start":{"row":22,"column":21},"end":{"row":22,"column":22},"action":"remove","lines":["m"],"id":2}],[{"start":{"row":22,"column":20},"end":{"row":22,"column":21},"action":"remove","lines":["o"],"id":3}],[{"start":{"row":22,"column":19},"end":{"row":22,"column":20},"action":"remove","lines":["C"],"id":4}],[{"start":{"row":18,"column":21},"end":{"row":18,"column":22},"action":"remove","lines":["m"],"id":5}],[{"start":{"row":18,"column":20},"end":{"row":18,"column":21},"action":"remove","lines":["o"],"id":6}],[{"start":{"row":18,"column":19},"end":{"row":18,"column":20},"action":"remove","lines":["C"],"id":7}],[{"start":{"row":26,"column":16},"end":{"row":26,"column":27},"action":"remove","lines":["Deliverable"],"id":8}],[{"start":{"row":25,"column":17},"end":{"row":25,"column":28},"action":"remove","lines":["Deliverable"],"id":9}],[{"start":{"row":25,"column":0},"end":{"row":28,"column":0},"action":"remove","lines":["router.post('/add', function(req, res) {","  require('./add')(req, res)","})",""],"id":10}],[{"start":{"row":24,"column":0},"end":{"row":25,"column":0},"action":"remove","lines":["",""],"id":11}],[{"start":{"row":21,"column":14},"end":{"row":21,"column":20},"action":"remove","lines":["create"],"id":12},{"start":{"row":21,"column":14},"end":{"row":21,"column":15},"action":"insert","lines":["a"]}],[{"start":{"row":21,"column":15},"end":{"row":21,"column":16},"action":"insert","lines":["d"],"id":13}],[{"start":{"row":21,"column":16},"end":{"row":21,"column":17},"action":"insert","lines":["d"],"id":14}],[{"start":{"row":22,"column":13},"end":{"row":22,"column":19},"action":"remove","lines":["create"],"id":15},{"start":{"row":22,"column":13},"end":{"row":22,"column":14},"action":"insert","lines":["a"]}],[{"start":{"row":22,"column":14},"end":{"row":22,"column":15},"action":"insert","lines":["d"],"id":16}],[{"start":{"row":22,"column":15},"end":{"row":22,"column":16},"action":"insert","lines":["d"],"id":17}],[{"start":{"row":25,"column":20},"end":{"row":25,"column":31},"action":"remove","lines":["Deliverable"],"id":18}],[{"start":{"row":26,"column":13},"end":{"row":26,"column":26},"action":"remove","lines":["addDeliverabl"],"id":19},{"start":{"row":26,"column":13},"end":{"row":26,"column":14},"action":"insert","lines":["r"]}],[{"start":{"row":26,"column":14},"end":{"row":26,"column":15},"action":"insert","lines":["e"],"id":20}],[{"start":{"row":26,"column":15},"end":{"row":26,"column":16},"action":"insert","lines":["m"],"id":21}],[{"start":{"row":26,"column":16},"end":{"row":26,"column":17},"action":"insert","lines":["o"],"id":22}],[{"start":{"row":26,"column":17},"end":{"row":26,"column":18},"action":"insert","lines":["v"],"id":23}],[{"start":{"row":26,"column":18},"end":{"row":26,"column":19},"action":"insert","lines":["e"],"id":24}],[{"start":{"row":26,"column":18},"end":{"row":26,"column":19},"action":"remove","lines":["e"],"id":25}],[{"start":{"row":14,"column":22},"end":{"row":14,"column":23},"action":"remove","lines":["m"],"id":26}],[{"start":{"row":14,"column":21},"end":{"row":14,"column":22},"action":"remove","lines":["o"],"id":27}],[{"start":{"row":14,"column":20},"end":{"row":14,"column":21},"action":"remove","lines":["C"],"id":28}],[{"start":{"row":9,"column":0},"end":{"row":11,"column":2},"action":"remove","lines":["router.get('/', function(req, res) {","  res.render('dev')","})"],"id":29}],[{"start":{"row":8,"column":0},"end":{"row":9,"column":0},"action":"remove","lines":["",""],"id":30}],[{"start":{"row":5,"column":2},"end":{"row":5,"column":22},"action":"remove","lines":["NASSINGED CONTROLLER"],"id":31},{"start":{"row":5,"column":2},"end":{"row":5,"column":3},"action":"insert","lines":["D"]}],[{"start":{"row":5,"column":3},"end":{"row":5,"column":4},"action":"insert","lines":["E"],"id":32}],[{"start":{"row":5,"column":4},"end":{"row":5,"column":5},"action":"insert","lines":["L"],"id":33}],[{"start":{"row":5,"column":4},"end":{"row":5,"column":5},"action":"remove","lines":["L"],"id":34}],[{"start":{"row":5,"column":3},"end":{"row":5,"column":4},"action":"remove","lines":["E"],"id":35}],[{"start":{"row":5,"column":2},"end":{"row":5,"column":3},"action":"remove","lines":["D"],"id":36}],[{"start":{"row":5,"column":1},"end":{"row":5,"column":2},"action":"remove","lines":["U"],"id":37}],[{"start":{"row":5,"column":1},"end":{"row":5,"column":2},"action":"insert","lines":["D"],"id":38}],[{"start":{"row":5,"column":2},"end":{"row":5,"column":3},"action":"insert","lines":["E"],"id":39}],[{"start":{"row":5,"column":3},"end":{"row":5,"column":4},"action":"insert","lines":["L"],"id":40}],[{"start":{"row":5,"column":4},"end":{"row":5,"column":5},"action":"insert","lines":["I"],"id":41}],[{"start":{"row":5,"column":5},"end":{"row":5,"column":6},"action":"insert","lines":["E"],"id":42}],[{"start":{"row":5,"column":5},"end":{"row":5,"column":6},"action":"remove","lines":["E"],"id":43}],[{"start":{"row":5,"column":5},"end":{"row":5,"column":6},"action":"insert","lines":["V"],"id":44}],[{"start":{"row":5,"column":6},"end":{"row":5,"column":7},"action":"insert","lines":["E"],"id":45}],[{"start":{"row":5,"column":7},"end":{"row":5,"column":8},"action":"insert","lines":["R"],"id":46}],[{"start":{"row":5,"column":8},"end":{"row":5,"column":9},"action":"insert","lines":["A"],"id":47}],[{"start":{"row":5,"column":9},"end":{"row":5,"column":10},"action":"insert","lines":["B"],"id":48}],[{"start":{"row":5,"column":10},"end":{"row":5,"column":11},"action":"insert","lines":["L"],"id":49}],[{"start":{"row":5,"column":11},"end":{"row":5,"column":12},"action":"insert","lines":["E"],"id":50}],[{"start":{"row":5,"column":12},"end":{"row":5,"column":13},"action":"insert","lines":[" "],"id":51}],[{"start":{"row":5,"column":13},"end":{"row":5,"column":14},"action":"insert","lines":["C"],"id":52}],[{"start":{"row":5,"column":14},"end":{"row":5,"column":15},"action":"insert","lines":["O"],"id":53}],[{"start":{"row":5,"column":15},"end":{"row":5,"column":16},"action":"insert","lines":["N"],"id":54}],[{"start":{"row":5,"column":16},"end":{"row":5,"column":17},"action":"insert","lines":["T"],"id":55}],[{"start":{"row":5,"column":17},"end":{"row":5,"column":18},"action":"insert","lines":["R"],"id":56}],[{"start":{"row":5,"column":18},"end":{"row":5,"column":19},"action":"insert","lines":["O"],"id":57}],[{"start":{"row":5,"column":19},"end":{"row":5,"column":20},"action":"insert","lines":["L"],"id":58}],[{"start":{"row":5,"column":20},"end":{"row":5,"column":21},"action":"insert","lines":["L"],"id":59}],[{"start":{"row":5,"column":21},"end":{"row":5,"column":22},"action":"insert","lines":["E"],"id":60}],[{"start":{"row":5,"column":22},"end":{"row":5,"column":23},"action":"insert","lines":["R"],"id":61}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":23,"column":26},"end":{"row":23,"column":26},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1493746654046}