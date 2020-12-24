function solution(record) {
    let answer = [];
    let users = {};

    record.forEach(element => {
        element = element.split(' ');

        if(element[0] === 'Enter'){
            users[element[1]] = element[2];

            answer.push({
                id: element[1],
                state: 'enter'
            })
        } else if(element[0] === 'Leave'){
            answer.push({
                id: element[1],
                state: 'leave'
            })

        } else if(element[0] === 'Change'){
            users[element[1]] = element[2];
        }
    })

    answer = answer.map(element => {
        if(element.state === 'enter'){
            return users[element.id]+"님이 들어왔습니다."
        } else{
            return users[element.id]+"님이 나갔습니다."
        }
    })

    return answer;
}