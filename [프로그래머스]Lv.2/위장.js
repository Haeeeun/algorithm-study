function solution(clothes) {
	var answer = 0;
	let clothesObj = {};
	for (let i = 0; i < clothes.length; i++) {
		if (clothesObj.hasOwnProperty(clothes[i][1])) {
			clothesObj[clothes[i][1]]++;
		} else {
			clothesObj[clothes[i][1]] = 1;
		}
	}

	Object.keys(clothesObj).forEach(function(key, val) {
		if(answer === 0){
			answer = clothesObj[key] + 1;
		}else {
			answer = answer * (clothesObj[key] + 1)
		}
	});

	return answer - 1;
}

solution([['yellow_hat', 'headgear'], ['blue_sunglasses', 'eyewear'], ['green_turban', 'headgear']]);