import assert from 'assert';
/*
    문제 분류: BFS/DFS
    문제 레벨: 프로그래머스 3

    문제 풀이 여부: False
    문제 풀이 날짜: 12/29 (화)
*/
const solution = (tickets) => {
    // 경로를 저장
    const map = {};
    tickets.forEach(([src, dest]) => {
        if (!map[src]) map[src] = [];
        map[src].push(dest);
    });

    // 방문 가능 공항을 알파벳 오름차순 정렬
    Object.values(map).forEach((arr) => arr.sort((a, b) => (a > b ? 1 : -1)));

    // DFS로 풀면 공유 가능
    const routes = [];
    const visited = [];

    // 콜 스택을 이용해 문제를 풀자.
    // 종료 조건은
    // 우선 조건은 알파벳 순 방문이다.
    // DFS로 풀자. 그래야 알파벳 순으로 제낄 수 있고, for문도 안 돌아도 됨.
    const makeRoute = (from) => {
        // 1. 방문
        visited.push(from);

        // 2. 종료 조건
        if (visited.length === tickets.length + 1) return visited;

        // 3. 방문 가능한 경로 확인
        const next = (map[from] || []).filter((dest) => !routes.includes(`${from}_${dest}`));
        if (next.length === 0) {
            routes.pop(); // 마지막 원소 제거 (실패한 루트이니까)
            visited.pop();
            return false; // 실행 흐름을 끝내는 건 아님.
        }

        // 4. some은 truthy를 반환하면 루프가 종료되기 때문에 사용
        return next.some((dest) => {
            routes.push(`${from}_${dest}`);
            return makeRoute(dest);
        });
    };

    makeRoute('ICN');
    return visited;
};

const tc = () => {
    // 분노의 테스트 케이스.. 얘도 잘 되는데 ㅋㅋ... 모르겠다 ㄹㅇ
    assert.deepStrictEqual(
        solution([
            ['ICN', 'AAA'],
            ['ICN', 'BBB'],
            ['AAA', 'BBB'],
            ['AAA', 'ICN'],
            ['BBB', 'AAA'],
            ['BBB', 'CCC'],
            ['CCC', 'BBB'],
        ]),
        ['ICN', 'AAA', 'BBB', 'AAA', 'ICN', 'BBB', 'CCC', 'BBB']
    );

    // 기본 2
    assert.deepStrictEqual(
        solution([
            ['ICN', 'SFO'],
            ['ICN', 'ATL'],
            ['SFO', 'ATL'],
            ['ATL', 'ICN'],
            ['ATL', 'SFO'],
        ]),
        ['ICN', 'ATL', 'ICN', 'SFO', 'ATL', 'SFO']
    );
    // 기본 1
    assert.deepStrictEqual(
        solution([
            ['ICN', 'JFK'],
            ['HND', 'IAD'],
            ['JFK', 'HND'],
        ]),
        ['ICN', 'JFK', 'HND', 'IAD']
    );

    // 누가 해보라고 한 경로
    assert.deepStrictEqual(
        solution([
            ['ICN', 'A'],
            ['A', 'C'],
            ['A', 'D'],
            ['D', 'B'],
            ['B', 'A'],
        ]),
        ['ICN', 'A', 'D', 'B', 'A', 'C']
    );
    // 누가 해보라고 한 경로
    assert.deepStrictEqual(
        solution([
            ['ICN', 'A'],
            ['ICN', 'B'],
            ['B', 'ICN'],
        ]),
        ['ICN', 'B', 'ICN', 'A']
    );
    // 누가 해보라고 한 경로
    assert.deepStrictEqual(
        solution([
            ['ICN', 'A'],
            ['A', 'ICN'],
        ]),
        ['ICN', 'A', 'ICN']
    );
};

export default tc;
