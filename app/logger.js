var winston = require('winston');
var winston_es = require( 'winston-elasticsearch');
var elastical = require( 'elastical');
var request = require('request');

var props = require('./props').props;
console.log(props);

//check if elastic search is available
request('http://' + props.elasticHost+ ':' + props.elasticPort,
		function(err, response, body) {
			if (err || response.statusCode != 200) {
				console.log('could not access elastcsearch at ' + props.elasticHost+ ':' + props.elasticPort);
			} else 
			console.log('logging to elastcsearch at ' + props.elasticHost+ ':' + props.elasticPort);
		});

//configure logging
var log = new winston.Logger({ 
  transports: [ new (winston.transports.File)({ filename: './logs/greeter.log' }),
		new winston_es({ 
		  level: 'info', 
		  client: new elastical.Client( props.elasticHost, { port: props.elasticPort }),
		  fireAndForget: true
		}) ]
});


log.level = 'info';

exports.log = log;
