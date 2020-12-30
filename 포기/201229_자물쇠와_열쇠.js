import assert from 'assert';
/*
    문제 분류: 
    문제 레벨: 프로그래머스 3

    문제 풀이 여부: False
    문제 풀이 날짜: 2020-12-29 (화)

    실패 정확성 테스트 케이스: 
    실패 효율성 테스트 케이스: 
*/
/*
    1. 최초 접근:
        +

    2. 최초 발상:
    +

    3. 코드 작성 시 주의한 조건
    +

    4. 실패 이유
    - 효율성 테스트:
        +

    - 정확성 테스트:
        +
*/
/*
잠겨있는 자물쇠는 격자 한 칸의 크기가 1 x 1인 N x N 크기의 정사각 격자 형태이고 
특이한 모양의 열쇠는 M x M 크기인 정사각 격자

자물쇠 열쇠 홈과 돌기
열쇠는 회전과 이동이 가능
딱 맞게 채우면 됨

제한사항
key는 M x M(3 ≤ M ≤ 20, M은 자연수)크기 2차원 배열입니다.
lock은 N x N(3 ≤ N ≤ 20, N은 자연수)크기 2차원 배열입니다.
M은 항상 N 이하입니다.
key와 lock의 원소는 0 또는 1로 이루어져 있습니다.
0은 홈 부분, 1은 돌기 부분을 나타냅니다.

*/
const solution = (key, lock) => {
    /*
    lock이 key보다 클 수 있다고 함. 어려운데, 중요도 있는 건 아니라고 생각함

    lock은 놓고, key를 4바퀴 돌리면 됨.

    돌리면서, merge 했을 때 (+로 연산하기) 다 1이면 true임.

    이 때, key의 경우, startIdx와 endIdx가 있음.

    [지금 생각이 드는건, 그냥 완전 탐색인 것 같음.]
    */
    for (let i = 0; i < lock.length; i++) {
        for (let j = 0; j < lock.length; j++) {
            // TODO 여기서 lock에 key를 끼워봐야 함.
        }
    }
};

const tc = () => {
    assert.strictEqual(
        solution(
            // 비교 순서: 원방향, 90도씩 오른쪽으로 (2가 몇 개인지 세서 더 좋은 방향을 구하는 게 가능한건지 모르겠음)
            // 어떻게 90도를 돌릴 건가? 2의 개수는 의미 없다고 생각함.
            // 돌린 다음엔, 각 방향으로 한 칸씩 움직이면서 확인한다.
            [
                [0, 0, 0],
                [1, 0, 0],
                [0, 1, 1],
            ],
            [
                [1, 1, 1],
                [1, 1, 0],
                [1, 0, 1],
            ]
        ),
        true
    );
};

export default tc;
