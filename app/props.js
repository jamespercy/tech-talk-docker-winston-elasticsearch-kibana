var fs = require('fs');
var props = JSON.parse(fs.readFileSync('./etc/app.properties', 'utf-8').toString());
	
props.name = (process.env.GREETER_NAME) ? process.env.GREETER_NAME : props.name;

props.host = (process.env.LB_HOST) ? process.env.LB_HOST : props.host;
props.port = (process.env.LB_PORT) ? process.env.LB_PORT : props.port;

console.log(JSON.stringify(props));

exports.props = props;
