import assert from 'assert';
/*
    문제 분류: 그래프
    문제 레벨: 프로그래머스 3

    문제 풀이 여부: True
    문제 풀이 날짜: 2021-01-09 (토)
*/
/*
    BFS
*/
const solution = (n, vertex) => {
    const cost = Array(n + 1).fill(0);
    const adj = [];
    // [tc 7, 9] 다 0으로 fill 하지 말고 그냥 빈 객체로 하니까 abort 사라짐
    for (let i = 0; i <= n; i++) adj[i] = {};

    // 빈 객체니까, 1 아니면 undefined 이므로 0과 같은 효과
    vertex.forEach(([from, to]) => {
        adj[from][to] = 1;
        adj[to][from] = 1;
    });

    const q = [];
    let i;
    let max = 0;
    let max_cnt = 0;
    q.push(1);
    while (q.length) {
        i = q.shift();

        for (let j = 2; j <= n; j++) {
            // visited 없이도 미방문 확인 가능
            // 미방문 & 방문 가능
            if (cost[j] === 0 && adj[i][j]) {
                cost[j] = cost[i] + 1;
                // j 방문할 차례
                q.push(j);
                // max 구하고, cnt 세기
                if (cost[j] > max) {
                    max = cost[j];
                    max_cnt = 0;
                }
                if (max === cost[j]) max_cnt++;
            }
        }
    }

    console.log(cost);

    return max_cnt;
};

const tc = () => {
    // 1개만 있는 case
    assert.strictEqual(solution(2, [[1, 2]]), 1);

    assert.strictEqual(
        solution(6, [
            [1, 2],
            [2, 3],
            [3, 4],
            [4, 5],
            [5, 6],
        ]),
        1
    );

    assert.strictEqual(
        solution(6, [
            [1, 2],
            [1, 3],
            [1, 4],
            [1, 5],
            [1, 6],
        ]),
        5
    );

    // 예시로 주어진 case
    assert.strictEqual(
        solution(6, [
            [3, 6],
            [4, 3],
            [3, 2],
            [1, 3],
            [1, 2],
            [2, 4],
            [5, 2],
        ]),
        3
    );
};

export default tc;
