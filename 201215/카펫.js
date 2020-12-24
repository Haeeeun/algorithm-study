function solution(brown, yellow) {
    var answer = [];

    for(let i=1; i<=yellow; i++){
        if(yellow%i === 0){
            const yellow_x = yellow/i;
            const yellow_y = i;

            if(yellow_x < yellow_y) break;

            if(brown === yellow_x*2 + yellow_y*2 + 4){
                answer.push(yellow_x+2);
                answer.push(yellow_y+2)
            }

        }
    }

    return answer;
}