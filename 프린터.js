import assert from 'assert';
/*
    문제 분류: 스택/큐
    문제 레벨: 프로그래머스 2

    문제 풀이 여부: True
    문제 풀이 날짜: 2020-12-11 (금)
*/
/*
    1. 최초 접근:
        대충 알겠다. 한 번에 계산하는 방법이 있을까?
        그냥 큐로 시뮬레이션 하는게 맞을 것 같다.
        웬지 계산을 할 수 있을 것 같은데 복잡할 것 같고
        지금 시간이 별로 없다.

    2. 최초 발상:
        1. 큐로 시뮬레이션을 하는데, 지금 출력 대상이 location번 째의 문서인지 어떻게 알지?
        2. 잘 모르겠습니다...

    3. 코드 작성 시 주의한 조건
        1. 가장 앞 문서에서 시작함.
        2. 전체 문서 중 현재 문서보다 중요도가 높은 문서가 있는 경우 뒤로 다시 넣음
        3. 현재 문서가 가장 높은 경우 출력함
        4. location번째의 문서는 몇 번째로 인쇄가 되는지 반환

    4. 밥 먹고 와서 두 번째 발상:
        1. shift()를 쓰면 앞에서 뺄 수 있지만 O(n)이다. n^2 알고리즘이므로 별로이다.
        => beginIdx를 쓰고, 그냥 뒤에 추가만 하자.
        2. 내림차순 정렬을 하고, 원본 배열의 맨 앞 요소와 정렬된 요소를 비교해서 같으면 탈출 (스킬트리처럼) => 스택
           다르면 원본 배열의 요소는 맨 뒤에 추가.
        3. 어떻게 location번 째의 요소를 tracking할 것인가? Idx를 계산하면 될 것 같다.
           locationIdx +=

    5. 운이 좋았다. idx 계산이 그냥 한 번에 정답이 돼서 빠르게 풀 수 있었다. (평소라면 디버깅 좀 했을텐데)
*/
const solution = (priorities, location) => {
    const length = priorities.length; // 처음의 길이를 저장해야 함
    const sorted_desc = [...priorities].sort((a, b) => a - b); // 오름차순으로 정렬.

    let curLocationIdx = location;
    let remainingDocs = priorities.length;
    let i = 0;

    let curTask, curPriority;

    while (remainingDocs > 0) {
        curTask = priorities[i];
        curPriority = sorted_desc[remainingDocs - 1]; // '큐' 개념

        if (curTask == curPriority) {
            remainingDocs--;
            if (i == curLocationIdx) break;
        } else {
            if (i == curLocationIdx) curLocationIdx += remainingDocs;
            priorities.push(curTask);
        }
        i++;
    }
    return length - remainingDocs;
};

const tc = () => {
    assert.strictEqual(solution([2, 1, 3, 2], 2), 1);
    assert.strictEqual(solution([1, 1, 9, 1, 1, 1], 0), 5);
};

export default tc;
