const solution = (brown, yellow) => {
	let answer = [];
	const width = brown + yellow;

	for (let vertical = 3; vertical <= width; vertical++) {
			const horizontal = width / vertical;
			const isInt = width % vertical;
			if (isInt === 0 && horizontal >= vertical && (horizontal - 2) * (vertical - 2) === yellow) {
					answer.push(horizontal);
					answer.push(vertical);
					break;
			}
	}
	return answer;
};

solution(10,2);
solution(8,1);
solution(24,24);

// function solution(brown, yellow) {
// 	var answer = [];
// 	let divideNum = parseInt(yellow / 8) + 3
// 	let horizontal = (brown + yellow) / divideNum;
// 	let vertical = (brown + yellow) / horizontal ;

// 	answer.push(horizontal);
// 	answer.push(vertical);
// 	console.log(answer);
// 	return answer;
// }
/*
*	- 카펫 조건 1.중앙은 노란색, 2.테두리 1줄은 갈색, 3. 가로 >= 세로
	- 노란색이 가운데 오려면, 갯수가 홀수 일 때는 가로길이가 홀 수, 짝수일 때는 가로길이가 짝수
	- 노란색이 8개부터 두 겹 가능 => 노란색이 4의 배수일 때 규칙 따름
	- 노란색이 4의 배수이면 층을 쌓다가, 가로길이가 세로길이보다 작으면 위의 한층을 가로로 붙여야함
	- 가로X2 + 2 = brown, 노란색 길이 + 2 = 가로길이
	- brown / 2 + 2 = 가로길이 + 세로 길이
	- yello의 갯수가 ~ 7 => 가로길이 = 전체갯수 /3, yello의 갯수가 8 ~ 15 => 가로길이 = 전체갯수 /4
 */
// function solution(brown, yellow) {
// 	var answer = [];

// 	for(let horizontal = yellow; horizontal >= 1; horizontal--){
// 		let vertical = Math.floor(yellow / horizontal);
// 			if(yellow % horizontal == 0 && ((horizontal + 2) * (vertical + 2) == (brown + yellow))){
// 				answer.push(horizontal + 2);
// 				answer.push(vertical + 2);
// 				break;
// 			}
// 	}
// 	return answer;
// }