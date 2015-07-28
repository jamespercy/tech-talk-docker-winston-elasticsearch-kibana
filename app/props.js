var fs = require('fs');
var props = JSON.parse(fs.readFileSync('./etc/app.properties', 'utf-8').toString());
	
props.name = process.env.GREETER_NAME;
console.log(JSON.stringify(props));

exports.props = props;