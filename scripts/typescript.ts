function firstFunc(num1, num2) {
	return 10 + num1 + num2;
}

function secondFunc(num1, num2) {
	return num1 + num2 + 5;
}

function hash(num1, num2) {
	return num1 + "," + num2;
}

function memoized(func, serializer) {
	const cache = new Map();
	const memo = (...numbers) => {
		const hashedInput = serializer(...numbers);

		if (cache.get(hashedInput) === undefined) {
			console.log("Cache miss.");
			cache.set(hashedInput, func(...numbers));
		} else {
			console.log("Cache hit.");
		}

		return cache.get(hashedInput);
	};

	return memo;
}

const firstMemo = memoized(firstFunc, hash);
console.log(firstMemo(1, 2));
console.log(firstMemo(1, 2));
console.log(firstMemo(2, 1));

const secondMemo = memoized(secondFunc, hash);
console.log(secondMemo(1, 2));
console.log(secondMemo(1, 2));
console.log(secondMemo(2, 1));

/* let memo = memoized(func, serializer)
memo(1,2)
memo(1,3) */
