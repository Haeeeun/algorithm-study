function solution(priorities, location) {
	var answer = 0;
  let len = priorities.length;
	while (len > 0) {
		let idxOfTurn = priorities.indexOf(priorities[0]);
		let turn = priorities.shift();
			if (turn < Math.max.apply(null,priorities)) {
				priorities.push(turn);
				if (idxOfTurn === location) {
					location = priorities.length - 1;
					continue;
				}
			} else {
				answer += 1;
				if (idxOfTurn === location) {
					return answer;
				}
			}
			location -= 1;
	}	
}
solution([1, 1, 9, 1, 1, 1], 0);