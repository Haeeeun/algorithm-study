function solution(people, limit) {
    let answer = 0;
    let firstPerson;
    people.sort((a,b) => a-b);

    while(people.length !== 0){
        firstPerson = people.shift();
        answer++;

        while(people.length !== 0){
            if(firstPerson+people.pop() <= limit){
                break;
            }
            answer++;
        }
    }

    return answer;
}