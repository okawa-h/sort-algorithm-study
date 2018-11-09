(function() {

	const ARRAY_LENGTH = 500;
	let jResultlist;

	document.addEventListener('DOMContentLoaded',init,false);

	function init() {

		jResultlist = document.getElementById('result-list');
		let numberList = [];
		for (let i = 0; i < ARRAY_LENGTH; i++) {

			numberList[i] = Math.round( Math.random() * 1000 );

		}

		setResult('bubble',numberList,bubblesort);
		setResult('selection',numberList,selectionsort);
		setResult('insertion',numberList,insertionsort);
		setResult('shell',numberList,shellsort);
		setResult('quick',numberList,quicksort);

	}

	function bubblesort(list) {

		const length = list.length;

		for (let i = 0; i < length - 1; i++) {
			for (let l = length - 1; i < l; l--) {

				if (list[l] < list[l - 1]) {

					const target = list[l - 1];
					list[l - 1] = list[l];
					list[l] = target;

				}
				
			}
		}

		return list;

	}

	function selectionsort(list) {

		const length = list.length;

		for (let i = 0; i < length - 1; i++) {

			let min = i;
			for (let l = i + 1; l < length; l++) {
				if (list[l] < list[min]) min = l;
			}

			const target = list[i];
			list[i] = list[min];
			list[min] = target;
			
		}

		return list;

	}

	function insertionsort(list) {

		const length = list.length;

		for (let i = 1; i < length; i++) {

			let l = i;

			while ((0 < l) && (list[l] < list[l - 1])) {

				const target = list[l - 1];
				list[l - 1] = list[l];
				list[l] = target;
				l--;

			}

		}

		return list;

	}

	function shellsort(list) {

		const length = list.length;
		let counter = 4;

		while (0 < counter) {
			for (let i = 0; i < length; i++) {

				let index = i;
				let target = list[i];
				while ((counter <= index) && (target < list[index - counter])) {

					list[index] = list[index - counter];
					index = index - counter;

				}
				list[index] = target;

			}

			if (counter * .5 >= 0) {
				counter = counter * .5;
			} else if (counter == 1) {
				counter = 0;
			} else {
				counter = 1;
			}
		}

		return list;

	}

	function quicksort(list) {

		const length = list.length;
		if (length < 1) return list;

		let pivot = list[0];
		let lowList = [];
		let hightList = [];

		for (let i = 1; i < length; i++) {

			let target = list[i];
			if (target <= pivot) {
				lowList.push(target);
			} else {
				hightList.push(target);
			}

		}

		lowList = quicksort(lowList);
		hightList = quicksort(hightList);
		lowList.push(pivot);
		return lowList.concat(hightList);

	}

	function setResult(key,numberList,fun) {

		const startTime = Date.now();
		let resultList  = fun(numberList.concat());
		const endTime   = Date.now();

		jResultlist.innerHTML += [
			'<section>',
			'<h2>' + key + ' </h2>',
			'<p class="result"><span class="label">before</span><span class="value">[ ' + numberList.join(',') + ' ] </span></p>',
			'<p class="result"><span class="label">after</span><span class="value"> [ ' + resultList.join(',') + ' ] </span></p>',
			'<p class="result"><span class="label">time</span><span class="value"> ' + (endTime - startTime).toPrecision(3) + 'ms</span></p>',
			'<pre class="code"><code>' + getFunctionToText(fun) + '</code></pre>',
			'</section>'
		].join('');

	}

	function getFunctionToText(fun) {

		return fun.toString().replace(/\r?\n/g,'<br>').replace(/\s/g,'&nbsp;');

	}

})();