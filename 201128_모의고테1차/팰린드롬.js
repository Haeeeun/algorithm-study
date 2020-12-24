function solution(n, m){
    let answer = 0

    for(let i=n; i<=m; i++){
        answer += checkPalindrome(i);
    }

    return answer
}

function checkPalindrome(number){
    let isPalin = true;
    let number_array = String(number).split('');

    while(number_array.length > 1){
        if(number_array[0] != number_array[number_array.length-1]){
            isPalin = false;
        }
        number_array.shift();
        number_array.pop();
    }

    return isPalin? 1 : 0;
}