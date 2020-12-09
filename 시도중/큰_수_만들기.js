import assert from 'assert';

/*
number = 1~1,000,000 '자리' 이하. (자리수)
k      = 1 <= k < number

Q. 100만자리인데 이따위 짓을 해도 되는걸까? 
A. NO, 그리고 100만 자리면 숫자 비교도 안 될듯 ㅋㅋ

O(n log n) 으로 가능함?

---
새로운 알고리즘

4랑 1을 비교해서 제거하는게 이득인걸 보는거야

배열을 어떻게 다루지? 어렵다.

4177252841
[ 0, 1번째 인덱스 비교 ]
(4, 1)

4_77252841
[ 0, 1번째 인덱스 비교 ]
(4, 7)

__77252841
[ 0, 1번째 인덱스 비교 ]
(7, 7)
[ 같으므로 다음으로 넘어감. ptr++ ]

__77_52841
[ 1, 2번째 인덱스 비교 ]
(5, 2)

__77_5_841

만약 여기서 하나 더 뺀다면?
777841
77584

오 신기하네 일단 되는거 같음. 해볼까?

98981111
=> 9981111 => 991111 => 9911 도 안됨. 11이 제거가 안 됨.

9911
9898
낫잖아. 이렇게는 못 풀지..

의미가 없네 이러면.. 그냥 운빨이잖아


---------

1. 주어진 순서 그대로 빼기만 한다

조인을 한다? 

*/
const solution = (number, k) => {
    const length = number.length;
    const numOfDigits = Array(10).fill(0);
    const ZERO = '0'.charCodeAt(0);
    const NUM = (i) => number.charCodeAt(i) - ZERO;
    for (let i = 0; i < length; i++) {
        numOfDigits[NUM(i)]++;
    }

    let ptr = 0;
    let left, right;
    while (k > 0 && ptr < length - 1) {
        left = number.charCodeAt(ptr);
        right = number.charCodeAt(ptr + 1);
        if (left > right) {
        }
        k--;
    }

    return buffer;
};

const tc = () => {
    // 아래의 이상한 edge 케이스는 k에 따라 혼동되므로 없을 거라고 예상
    // assert.strictEqual(solution('00001', 4), '1');
    // assert.strictEqual(solution('10000', 2), '100');
    // assert.strictEqual(solution('00000100', 2), '100');
    // assert.strictEqual(solution('00000010', 2), '10');

    // 처음 생각한 방식대로 풀면 풀리는 레벨 (작은것부터 앞에서부터 빼면 됨.)
    assert.strictEqual(solution('1924', 2), '94');
    assert.strictEqual(solution('1231234', 3), '3234');

    // TODO
    assert.strictEqual(solution('4177252841', 4), '775841');
};

export default tc;
