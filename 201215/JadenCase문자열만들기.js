function solution(s) {
    s = s.split('').map((element, index) => {
        if(s[index-1] === ' '){
            return element.toUpperCase();
        } else{
            return element.toLowerCase();
        }
    })

    s[0] = s[0].toUpperCase();
    return s.join('');
}