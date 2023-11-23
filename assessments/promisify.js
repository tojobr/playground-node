function promisify(callbackFunction) {
	return (...args) => {
		return new Promise((resolve) => {
			callbackFunction(...args, (error, result) => {
				if (error) {
					resolve(error)
				} else {
					resolve(result);
				}
			});
		});
	}
}

function callbackBased(callback) {
	setTimeout(() => {
		callback('Hello');
	}, 100);
}

function callbackBasedArgument(num, callback) {
	setTimeout(() => {
		callback(num * 2);
	}, 100);
}

async function testWithoutArgument() {
	const promisedBased = promisify(callbackBased);
	const functionType = promisedBased.constructor.name;
	if (functionType === 'AsyncFunction') {
		console.log('This function is asynchronous');
	} else {
		console.error('Error: this function is not asynchronous');
	}

	const result = await promisedBased();
	if (result === 'Hello') {
		console.log('It works with no arguments');
	} else {
		console.error('It does not work with no arguments');
	}
	return result;
}

async function testWithArgument(num) {
	const promisedBased = promisify(callbackBasedArgument);
	const result = await promisedBased(num);

	if (result === num * 2) {
		console.log('It works with any argument');
	} else {
		console.error('It does not work with any argument');
	}
	return result;
}

console.log('== test1 ==');
testWithoutArgument().then(console.log);

setTimeout(() => {
	console.log('== test2 ==');
	testWithArgument(4).then(console.log);
}, 200);
