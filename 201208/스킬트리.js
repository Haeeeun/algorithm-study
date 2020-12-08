function solution(skill, skill_trees) {
    var answer = 0;
    skill = skill.split('');
    skill_trees = skill_trees.map(element => element.split(''));

    skill_trees.forEach(skill_tree => {
        let testSkillArray = skill.map(element => element); // 깊은복사
        let isPossibleSkillTree = true;

        skill_tree.forEach((element,index) => {
            if(testSkillArray[0] === element){
                testSkillArray.shift();
            }
        })

        //testSkillArray 의 길이가 0 이거나 skill_tree 안에 남은 testSkillArray 요소와 같은 것이 없는 경우 answer ++
        if(testSkillArray.length === 0){
            answer++;
        } else {
            for(let i=0; i<testSkillArray.length; i++){
                for(let j=0; j<skill_tree.length; j++){
                    if(testSkillArray[i] === skill_tree[j]) isPossibleSkillTree = false;
                }
            }

            if(isPossibleSkillTree) answer++;
        }
    })

    return answer;
}


//다른 사람의 풀이
// function solution(skill, skill_trees) {
//     function isCorrect(n) {
//         let test = skill.split('');
//         for (var i = 0; i < n.length; i++) {
//             if (!skill.includes(n[i])) continue;
//             if (n[i] === test.shift()) continue;
//             return false;
//         }
//         return true;
//     }

//     return skill_trees.filter(isCorrect).length;
// }