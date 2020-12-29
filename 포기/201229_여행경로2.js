import assert from 'assert';
/*
    문제 분류: BFS/DFS
    문제 레벨: 프로그래머스 3

    문제 풀이 여부: False
    문제 풀이 날짜: 2020-12-24 (목) ~ 12-25 (금)
*/
/*
    1. 최초 접근/발상:
        항상 ICN에서 시작한다. ICN에서 갈 수 있는 경로가 있으면 모두 시도해본다.
        시도한 결과가 가장 긴 배열을 사용한다.
        만약 배열의 길이가 같은 경우가 있는 경우, 배열을 순회하면서 알파벳이 앞서는 애로 정렬한다.(배열을 정렬하기)

    2. 코드 작성 시 주의한 조건
        방문하는 공항 경로를 배열에 담아 return (v)
        주어진 항공권은 모두 사용해야 합니다. (v)
        만일 가능한 경로가 2개 이상일 경우 알파벳 순서가 앞서는 경로를 return 합니다. (v)
        => 경로를 저장해야 하는것 아닌가?

        모든 도시를 방문할 수 없는 경우는 주어지지 않습니다. (v)
*/
const solution = (tickets) => {
    let tickets_length = 0;

    // 경로를 저장하는 객체
    const map = {};
    tickets.forEach(([src, dest]) => {
        if (!map[src]) map[src] = [];
        map[src].push(dest);
        tickets_length++;
    });

    // 경로별 Id를 위한 카운터 변수
    let nextId = 0;

    // 결과 경로를 저장하는 객체. 반복 중 헷갈리지 않도록 id를 도입함.
    const routes = {};

    // visited
    const visited = {};

    const makeRoute = (id, from, cur) => {
        // 1. 방문 가능해서 이 함수가 실행됐으므로, 방문함 (from->cur)
        visit(id, from, cur);

        // 2. 방문 가능한 노드 확인 (없으면 종료)
        if (!map[cur]) return;
        const available = map[cur].filter((to) => !get_visited(id, cur, to));
        if (!available.length) return;

        // 3. 방문한 경로, 방문 여부 Clone
        // 굳이 이렇게 많이 만들 필요가 없는 것 같다. 남들은 다 그렇게 풀었기 때문에...
        for (let i = 1; i < available.length; i++) {
            routes[nextId] = [...routes[id]];
            visited[nextId] = { ...visited[id] };
            makeRoute(nextId++, cur, available[i]);
        }

        // 4. 첫 번째 방문 가능한 노드의 경우 그냥 방문 (마지막에 하는 이유: 방문 기록 유지하려고.)
        makeRoute(id, cur, available[0]);
    };

    // hash 대신 stringify 하자. 3차원 객체 -> 2차원으로 확 줄어듦
    const visit = (id, from, cur) => {
        if (!visited[id]) visited[id] = {};
        visited[id][`${from}_${cur}`] = true;
        routes[id].push(cur);
    };

    const get_visited = (id, from, to) => visited[id] && visited[id][`${from}_${to}`];

    // ICN에서 출발하면서 routes 초기화.
    // 문제 없음. 공항수는 3개 이상이기 때문.
    map['ICN'].forEach((cur) => {
        routes[nextId] = ['ICN'];
        makeRoute(nextId++, 'ICN', cur);
    });

    // routes 중 전부 순회한 경로만 complete 객체에 삽입
    // 티켓 개수보다 방문한 곳의 수가 1 많음.
    let complete = Object.values(routes).filter((route) => route.length - 1 === tickets_length);

    // 알파벳 순으로 정렬
    // 쉬울 줄 알았는데 어렵다 ...
    for (let i = 0; i < tickets_length && complete.length > 1; i++) {
        // 1. find optimal alphabet
        const cur_stage = complete.map((arr) => arr[i]);
        // 2. optimal alphabet이 아니면 제거 (해도 됨. 1개는 남으니까.)
        const [optimal] = cur_stage.sort();
        // 3. filter로 complete 배열 갱신
        complete = complete.filter((arr) => arr[i] === optimal);
    }
    return complete[0];
};

const tc = () => {
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
    // 기본 1
    assert.deepStrictEqual(
        solution([
            ['ICN', 'JFK'],
            ['HND', 'IAD'],
            ['JFK', 'HND'],
        ]),
        ['ICN', 'JFK', 'HND', 'IAD']
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
};

export default tc;
