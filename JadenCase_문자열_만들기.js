import assert from 'assert';
/*
    문제 분류: [?]
    문제 레벨: 프로그래머스 2

    문제 풀이 여부: True
    문제 풀이 날짜: 2020-12-11 (금)
*/
/*
    1. 최초 접근:
        그냥 풀면 될 듯. 어떻게 하면 빠르게 풀 수 있을까?

    2. 최초 발상:
        1. lowercase로 만들기 - 어? 이건 한 번 혼자 도니까 비효율적임.
        
        1. for 로 돌기. 돌면서 이상한 숫자이면 flag 세움
        2. 플래그 세워진 상태에서 영문이 나오면 Uppercase, 아니면 lowercase
        3. 공백 이후 나온 문자는 Uppercase (숫자 등이면 효과 없음)
        4. 일반적인 경우 항상 lowercase


    3. 문제 풀이 후 반성:
        JS String에서 Char 접근은 C 스타일로 하면 매우 비효율적인 것 같다.
        다음에 문자열 문제를 풀 때 더 좋은 방법을 찾자. [ charCodeAt, fromCharCode 등 실수하기 쉬움 ]
*/
const A = 'A'.charCodeAt(0); // 65
const Z = 'Z'.charCodeAt(0); // 90
const a = 'a'.charCodeAt(0); // 97
const z = 'z'.charCodeAt(0); // 122
const isUpper = (char) => char.charCodeAt(0) >= A && char.charCodeAt(0) <= Z;
const isLower = (char) => char.charCodeAt(0) >= a && char.charCodeAt(0) <= z;
const isAlpha = (char) => char.charCodeAt(0) >= A && char.charCodeAt(0) <= z;
const lowerChar = (char) =>
    isUpper(char) ? String.fromCharCode(char.charCodeAt(0) - A + a) : char;
const upperChar = (char) =>
    isLower(char) ? String.fromCharCode(char.charCodeAt(0) - a + A) : char;

const solution = (str) => {
    /*
        1. for 로 돌기. 돌면서 이상한 숫자이면 flag 세움
        2. 플래그 세워진 상태에서 영문이 나오면 Uppercase, 아니면 lowercase
        3. 공백 이후 나온 문자는 Uppercase (숫자 등이면 효과 없음)
        4. 일반적인 경우 항상 lowercase

        5. 배열로 바꿔야겠다. 스트링 수정이 안 되니까.
    */
    if (str.length === 0) return '';

    const arr = [...str];
    arr[0] = upperChar(arr[0]);
    for (let i = 1; i < str.length; i++) {
        if (arr[i - 1] === ' ') arr[i] = upperChar(arr[i]);
        else if (!isAlpha(arr[i - 1]) && isAlpha(arr[i])) arr[i] = lowerChar(arr[i]);
        else arr[i] = lowerChar(arr[i]);
    }
    return arr.reduce((acc, cur) => acc + cur, '');
};

const tc = () => {
    assert.strictEqual(solution('3people unFollowed me'), '3people Unfollowed Me');
    assert.strictEqual(solution('for the last week'), 'For The Last Week');
};

export default tc;
