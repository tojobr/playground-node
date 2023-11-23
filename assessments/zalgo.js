function sleep(milliseconds) {  
	return new Promise(resolve => setTimeout(resolve, milliseconds));  
}  

const cache = {};

/**
 * 
 * @param {*} text 
 * @param {*} callback 
 */
function getStringLength(text, callback) {

	if (cache[text]) {
		// callback(cache[text]); // IMPORTANT : it will show only "Text1 Length of string: 5"

		/**
		 * Instead of directly triggering the callback, we wrap it inside the process.nextTick().
		 * This defers the execution of the function until the next event loop phase.
		 */
		process.nextTick(function() {
			callback(cache[text]);
		});
	} else {
		setTimeout(() => {
			cache[text] = text.length;
			callback(text.length)
		}, 1000);
	}
}

/**
 * get length of current text
 * @param {*} text 
 * @returns 
 */
function calculateLength(text) {
	const listeners = []
	getStringLength(text, (value) => {
		listeners.forEach(listener => listener(value))
	});

	return {
		onDataReady: function(listener) {
			listeners.push(listener);
		}
	}
}

async function testLogic() {
	let text1 = calculateLength("hello");
	text1.onDataReady(data => {
		console.log("Text1 Length of string: " + data);
	});

	await sleep(2000);

	let text2 = calculateLength("hello");
	text2.onDataReady(data => {
		console.log("Text2 Length of string: " + data);
	});
}

testLogic();