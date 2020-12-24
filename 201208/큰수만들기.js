function solution(number, k) {
    let stack = [];
    const string = String(number);
    k = string.length - k;

    let maxIndex = 0;
    while(k !== 0){
        stack.push(-1);
        let temp;
        for(let i=maxIndex; i<=string.length-k; i++){
            if(string[i] > stack[stack.length-1]){
                stack.pop();
                stack.push(string[i]);
                temp = i;
                if(string[i] === '9') break;
            }
        }
        maxIndex = temp+1;
        k--;
    }

    return stack.join('');
}