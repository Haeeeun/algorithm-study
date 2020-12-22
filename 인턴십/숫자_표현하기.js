import assert from 'assert';

/*
    [1] N under 30
    [2] 내림차순 정렬임
    [3] (main, sub)
        (main, sub, 1)
        (main, ...1)

    [ex]
    5

    (5), 

    (4, 1), 

    (3, 2), 
    (3, 1, 1), 
    
    (2, 2, 1), 
    (2, 1, 1, 1),
    
    (1, 1, 1, 1, 1)
    => 7가지 방법

    @returns 개수
*/
const solution = (num) => {
    /*
    5 0
    => 0이면 끝.

    4 1
    => 1이면 끝
    
    3 2
    => 2이므로, 3보다 작으므로 성립
    => 2는 1보다 크므로 분할 가능 => 3 1 1

    2 3
    => 3이므로, 2보다 크므로 성립하지 않음
    => [c1] 3을 2로 뺀다 => 1남음 (1이므로 끝.)
    
    [2 2 1] (derived)
    => 이게 종료 조건인 이유가 있을까?


    1 4
    => 최대가 1이므로, 끝.

    */
};

const tc = () => {
    assert.strictEqual(solution(5), 7);
    assert.strictEqual(solution(10), 42);
};

export default tc;
