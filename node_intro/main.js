const { helpers, moreHelpers, evenMoreHelpers } = require('./helpers');
const { pets } = require('./models');

helpers.sayHi();

console.log('=====');
moreHelpers.sayHello();
moreHelpers.sayGoodbye();

console.log('=====');
evenMoreHelpers();

console.log('=====');
moreHelpers.sayHelloTo(pets.myPets.cat);