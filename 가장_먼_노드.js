import assert from 'assert';
/*
    문제 분류: 그래프 (BFS 라고 명시는 안 했지만 BFS 문제. 다익스트라도 가능할 듯)
    문제 레벨: 프로그래머스 3

    문제 풀이 여부: True
    문제 풀이 날짜: 2021-01-12 (화)
*/
const solution = (n, vertex) => {
    // 1차원 N개 배열이었으나 지금 알고리즘에선 필요 없음.
    // 실제로 방문되는 정점 만큼만 저장됨.
    // 굳이 따지자면 O(N) 이긴 하지만 더 효율적
    const cost = {};

    // 처음의 자료구조: N*N 배열이어서 메모리 매우 크게 잡아먹음
    // 현재의 자료구조: HashMap으로 최소한의 메모리만 사용함
    const edges = {};
    for (let i = 0; i <= n; i++) edges[i] = [];
    vertex.forEach(([from, to]) => {
        edges[from].push(to);
        edges[to].push(from);
    });

    const q = [];
    let prev;
    let cur;
    let next;
    let max = 0;
    let max_cnt = 0;
    q.push([0, 1]);
    // 처음의 알고리즘: BFS - O(E*V). Queue 아이템마다 모든 Node를 다 순회함.
    // 현재의 알고리즘: BFS - O(E+V). 방문한 Edge는 Pop되므로 최소 순회가 보장됨.
    while (q.length > 0) {
        // 이전 코스트를 구할 방법이 없나?
        // 그래서 배열을 쓰는 건데 속상하다.
        [prev, cur] = q.shift();

        // 탐색 과정에서 중복으로 들어갈 수도 있더라.
        if (cost[cur]) continue;

        // cost 갱신
        cost[cur] = prev + 1;

        // max 구하고, cnt 세기
        // 이게 따로 한 번 안 돌아도 돼서 효율적
        if (cost[cur] > max) {
            max = cost[cur];
            max_cnt = 0;
        }
        if (max === cost[cur]) max_cnt++;

        // 친구들 모두 투입
        while (edges[cur].length > 0) {
            // pop 방식을 통해서 점점 더 빨라짐
            next = edges[cur].pop();

            // 매번 배열 인스턴스를 생성해서 오버헤드가 분명히 있긴 할 것임.
            // C언어 struct 였으면 훨씬 효과적일텐데...
            // Object도 고려해봤지만 별 차이 없을 것 같은게,
            // 둘 다 오버헤드가 큰 객체이기 때문. C 계열 빼면 다 그렇지..
            if (!cost[next]) q.push([cost[cur], next]);
        }
    }

    console.log(cost);

    return max_cnt;
};

const tc = () => {
    // 예시로 주어진 case
    assert.strictEqual(
        solution(6, [
            [1, 3],
            [1, 2],
            [2, 4],
            [3, 2],
            [3, 6],
            [4, 3],
            [5, 2],
        ]),
        3
    );

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
};

export default tc;
