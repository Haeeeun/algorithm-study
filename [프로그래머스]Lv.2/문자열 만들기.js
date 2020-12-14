function solution(s) {
	var answer = '';
	let temp = s.split(" ");
	for (let i = 0; i < temp.length; i++) {
			if (temp[i] !== '') {
				temp[i] = temp[i].toLowerCase();
				temp[i] =	temp[i][0].toUpperCase() + temp[i].slice(1);
			}
	}
	answer = temp.join(' ');

	return answer;
};

solution("3people unFollowed me");