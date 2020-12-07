function solution(skill, skill_trees) {
	var answer = 0;
	let skillArr = skill.split('');
	let len = skill_trees.length ;
	for(let i = 0; i < len; i++) {
		let currIdx = 0;
		let nextIdx = 0;
		for(let j = 0; j < skillArr.length; j++){
			currIdx = skill_trees[i].indexOf(skillArr[j]);
			nextIdx = skill_trees[i].indexOf(skillArr[j + 1]);
			if((currIdx !== -1 && nextIdx !== -1 && currIdx > nextIdx) || (currIdx === -1 &&  nextIdx !== -1)){
				break;
			}else {
				if(j === skillArr.length - 2){
					answer++;
					break;
				}
			}
		}
	}
	return answer;
}

solution("CBD", ["BACDE", "CBADF", "AECB", "BDA"]);