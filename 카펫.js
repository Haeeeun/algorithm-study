import assert from 'assert';
/*
    문제 분류: 완전탐색
    문제 레벨: 프로그래머스 2

    문제 풀이 여부: True
    문제 풀이 날짜: 2020-12-11 (금)
*/
/*
    1. 최초 접근:
        완전 탐색이구나. 완전 탐색이 뭐지?
        그냥 다 탐색한다는 것임
        탐색을 한다는건 계산보다 이미 존재하는 대상을 찾는 것인듯

    2. 최초 발상:
    [1] 흠,, 브루트포스로 이걸 풀 수 있나? 어떻게 풀어야 할 지 감을 못 잡겠다.

    3. 코드 작성 시 주의한 조건
        중앙에는 노란색
        테두리 1줄은 갈색
        8 <= brown <= 5,000
        1 <= yello <= 2,000,000
        width >= height
        @returns [width, height];

    4. 풀면서 발견한 발상:
    [1] 3x3이 가장 작은 사이즈이다.
    [2] 생각보다 반복 횟수가 많지 않다.

    5. 다른 사람들이 제출한 답을 쭉 봤는데 나처럼 푼 사람을 단 한 명도 찾을 수 없었다.. 뭐지..?
    아마 이렇게 푸는게 가장 원시적이고 비효율적인 방법이라 생각조차 하지 않은듯하다..
*/
const solution = (brown, yello) => {
    let curBrown;
    let curYello;
    // yello >= 1 이므로, width >= 3, 즉, 3x3일때 yello=1 이므로.
    // brown <= 5,000 인데, height=1 일 때 width=5,000이면 brown=5,000이므로, width <= 5,000
    for (let width = 3; width < 5000; width++) {
        // yello >= 1 이므로, height >= 3
        for (let height = 3; height <= width; height++) {
            // 바깥쪽 한 줄 = 양쪽에 1줄 있고, 각 모서리 총 4개가 겹치므로, 4를 빼줌.
            curBrown = width * 2 + height * 2 - 4;
            // 전체 개수 - 바깥쪽 1줄 개수
            curYello = width * height - curBrown;
            if (curBrown == brown && curYello == yello) {
                return [width, height];
            }
        }
    }

    return 0;
};

const tc = () => {
    assert.deepStrictEqual(solution(10, 2), [4, 3]);
    assert.deepStrictEqual(solution(8, 1), [3, 3]);
    assert.deepStrictEqual(solution(24, 24), [8, 6]);
};

export default tc;
