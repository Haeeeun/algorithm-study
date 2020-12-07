function solution(people, limit) {
	let answer = 0;
	let peopleLength = people.length;
	people.sort((a,b) => b-a); //people 배열을 내림 차순으로 정렬

	for ( let i = 0 ; i < peopleLength; i++) {
		//제일 무거운사람과 제일 가벼운 사람의 합이 무게제한보다 작거나 같으면 peopleLength -1
		if (people[i] + people[peopleLength - 1] <= limit ) {
			peopleLength--;
		}
		answer++;
	}
	return answer;
}

solution([70, 50, 80, 50], 100);