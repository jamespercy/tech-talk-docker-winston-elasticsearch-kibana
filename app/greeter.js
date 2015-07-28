var request = require('request');
var app = require('express')();

var props = require('./props').props;
var log = require('./logger').log;


app.get('/', function(req, res) {

	//initialise variables
	var id = assignId(req.headers['correlation-id']);
	var caller = (req.headers['caller']) ? req.headers['caller'] : 'a stranger';
	var count = (req.headers['count']) ? + req.headers['count'] + 1 : 1;

	function assignId(requestId) {
			console.log('checking id ' + requestId);
		return (requestId === undefined) ? '' + new Date().getTime() : requestId;
	}

	function handleResponse(err, response, body) {
		if (err) {
			log.error(JSON.stringify(err));
			return;
		}
	}
	function requestAGreeting(count, props, id) {
		log.info(props.name + ' is calling a new friend', {id : id, count: count, name: props.name});
		var options = {url: 'http://' + props.host + ':' + props.port,
					   headers : {'correlation-id' : id, 'caller' : props.name, 'count' : count}};
		request(options, handleResponse);
	}


	res.send('hi, my name is ' + props.name + ', I\'m going to greet someone else now');

	log.info(caller + ' said hi to ' + props.name, {id : id, name: props.name});
	
		//pass it on

	if (count <= props.maxCalls) {
		requestAGreeting(count, props, id);
	} else {
		log.info(props.name + ' says this has gone far enough! ', {id : id, count: count, name: props.name});
	}

});


function createServer() {
	var server = app.listen(3000, function () {
	  var host = server.address().address;
	  var port = server.address().port;
	  log.info(props.name + '\'s server started at http://%s:%s', host, port);
	});
};

createServer();