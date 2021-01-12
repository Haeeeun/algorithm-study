import assert from 'assert';
/*
    문제 분류: 그래프
    문제 레벨: 프로그래머스 3

    문제 풀이 여부: False
    문제 풀이 날짜: 2021-01-09 (토)

    실패 정확성 테스트 케이스: 
    실패 효율성 테스트 케이스: 
*/
/*
    1. 최초 접근:
        => 다익스트라: 모든 노드에 대해 최단 경로를 구하는 알고리즘
        => 모든 간선에 대해 값을 1로 주면 충분할 것으로 보임
        => 다익스트라 말고도 푸는 방법이 있을까?
        일단 이 발상으로도 풀리니까 해보자.

    2. 최초 발상:
    - 다익스트라를 어떻게 구현할까 하다가 간선=1 이니까 대충해보자 함.

    3. 코드 작성 시 주의한 조건
    1번 노드로부터 가장 멀리 떨어진 노드가 몇 개인가?

    4. 실패 이유
    - 정확성 테스트:
        전부 틀렸는데, 이유를 모르겠음. 마지막 3개는 abort 나는데 이유가 뭘까?
*/

const solution = (n, vertex) => {
    // 재밌는 점: Array(n+1).fill(0)이 한 번만 호출돼서, 한 배열을 모두가 참조하는 형태가 됨;
    // const adj = Array(n + 1).fill(Array(n + 1).fill(0));

    // 지도, cost, 방문 여부 배열 생성
    const adj = [];
    const cost = [];
    const visited = Array(n + 1).fill(0);

    // 지도 생성 및 cost 초기화
    for (let i = 0; i <= n; i++) {
        adj[i] = Array(n + 1).fill(0);
        cost[i] = Number.MAX_SAFE_INTEGER;
    }

    // 지도 초기화
    vertex.forEach(([from, to]) => {
        adj[from][to] = 1;
        adj[to][from] = 1;
    });

    cost[0] = 0; // 보기 좋으라고;
    cost[1] = 0; // 시작 노드 0으로 초기화

    for (let i = 1; i <= n; i++) {
        // 만약 방문 불가능이면, 방문하지 않음
        if (cost[i] === Number.MAX_SAFE_INTEGER) continue;
        visited[i] = true;
        // 어차피 가중치=1 이어서 min 구할 필요가 없음.
        // 전부 다 하면 됨.
        for (let j = 2; j <= n; j++) {
            // 이미 방문한 경우 (이미 최선의 경로 찾음)
            if (visited[j]) continue;

            // 방문 가능한 경우 (이번이 최선의 경로임)
            if (adj[i][j]) {
                // 현재 i를 방문한 상태임.
                cost[j] = cost[i] + adj[i][j];
                visited[j] = true;
            }
        }
    }

    console.log(cost);

    let max = cost[1];
    let cnt = 0;
    for (let i = 1; i <= n; i++) {
        if (max < cost[i]) {
            max = cost[i];
            cnt = 0;
        }
        if (max === cost[i]) cnt++;
    }
    return cnt;
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
