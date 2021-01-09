import assert from 'assert';
/*
    문제 분류: 정렬
    문제 레벨: 프로그래머스 2

    문제 풀이 여부: True
    문제 풀이 날짜: 2020-01-05 (화)
*/
/*
    1. 최초 접근:
        N 개의 요소 중 H개의 요소의 값이 H 이상이면 H-INDEX = H 어떻게 계산하는지 이해가 안 된다.

    2. 최초 발상:
        => 정렬하고, 순회하면서 arr[i] >= arr.length - i 이면 return i ?
        => 0 1 3 5 6
        => length = 5, i = 2, 순서는 3번째고, 남은 원소는 아직 안 넘어갔으니 3.
        => 안 넘어 간걸 치려면 arr.length - i 하면 i가 0부터 시작하니까 자동으로 해결됨
        => H = 3
        => == 으로 비교해야 할 듯. arr[i]=4인데 남은게 3이면 안 되니깐. 그러려면 arr[i] 4보다 작아야 됨.
        => 돌려봤는데 틀려서, 조건을 확인해보니 '이상'이었음. 등호이면 안 됨.

    3. 코드 작성 시 주의한 조건
        논문의 수는 5편 
        그중 3편의 논문은 3회 이상 인용
        인용이 이상이구나?
*/
const solution = (citations) => {
    if (citations.length === 1) return citations[0];
    // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // MDN: 기본 정렬 순서는 문자열의 유니코드 코드 포인트를 따릅니다
    // 기본값으로 정렬하는 경우 String으로 바꾸기 때문에 1, 10, 2 이런식
    // [1,10,2].sort() => [1,10,2]
    citations.sort((a, b) => a - b);
    if (citations[citations.length - 1] === 0) return 0;
    for (let i = 0; i < citations.length; i++)
        if (citations[i] >= citations.length - i) return citations.length - i;
};

const tc = () => {
    assert.strictEqual(solution([3, 0, 6, 1, 5]), 3);

    assert.strictEqual(solution([5, 4, 3, 2, 1]), 3);

    assert.strictEqual(solution([0, 1]), 1);

    assert.strictEqual(solution([0, 1]), 1);

    // TC 16 Candidates
    assert.strictEqual(solution([0]), 0);

    assert.strictEqual(solution([1]), 1);

    // TC 16 Exact
    assert.strictEqual(solution([0, 0, 0, 0, 0, 0, 0]), 0);
};

export default tc;
