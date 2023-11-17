const firstName = 'John';

exports.sayHello = function() {
  console.log(`Hello ${firstName}!`);
};

exports.sayGoodbye = function() {
  console.log(`Goodbye ${firstName}!`);
};

exports.sayHelloTo = function(name) {
	console.log(`Hello ${name}!`);
}

exports.firstName = firstName;