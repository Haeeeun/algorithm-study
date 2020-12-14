function solution(number, k) {
	var answer = '';
	let resultArr = [];
	let numberLength = number.length ;

	for (let i = 0; i < numberLength; i++) {
			let currnetNum = number[i];
			while (k > 0 && (resultArr[resultArr.length - 1] < currnetNum)) {
				resultArr.pop();
					k--;
			}
			resultArr.push(currnetNum);
	}
	if(k > 0) resultArr.splice(resultArr.length - k, k);
	answer = resultArr.join('');
	
	return answer;
}