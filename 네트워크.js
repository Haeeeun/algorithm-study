import assert from 'assert';
/*
    문제 분류: 완전 탐색 (BFS/DFS)
    문제 레벨: 프로그래머스 3

    문제 풀이 여부: False
    문제 풀이 날짜: 2020-12-22 (화)

    실패 정확성 테스트 케이스: 
    실패 효율성 테스트 케이스: 
*/
/*
    1. 최초 접근:
        n대의 컴퓨터에 대해 NxN 배열을 주는 것을 보니 인접 행렬이 떠오름.
        n대의 컴퓨터에 대해 완전 탐색을 하는게 효율적인가?
        for(n) bfs(1...n-1); 이거면 n^2 인데?
        일단 했다쳐도, 어떻게 총 섬의 개수를 계산할 수 있지?


    2. 최초 발상:
    +

    3. 코드 작성 시 주의한 조건
        컴퓨터 A 컴퓨터 B 간접 연결 정보 교환
        따라서 컴퓨터 A, B, C는 모두 같은 네트워크

        컴퓨터의 개수 n, 
        연결에 대한 정보가 담긴 2차원 배열 computers
        => 네트워크의 개수를 return

        각 컴퓨터는 0부터 n-1인 정수
        i, j번 컴퓨터 연결 => computers[i][j] === 1

*/

const solution = (n, computers) => {
    let label = 0;
    const visited = Array(n).fill(0);

    const dfs = (v) => {
        visited[v] = 1;
        for (let w = 0; w < n; w++) {
            if (computers[v][w] && !visited[w]) {
                dfs(w);
            }
        }
    };

    computers.forEach((_, i) => {
        if (!visited[i]) {
            // dfs 할 기회가 생길때마다
            dfs(i);
            label++;
        }
    });

    return label;
};

/*
3	[[1, 1, 0], [1, 1, 0], [0, 0, 1]]	2
3	[[1, 1, 0], [1, 1, 1], [0, 1, 1]]	1

어려운 문제라면, test case를 생각해내는 것이 엄청 중요한 것 같다.
*/
const tc = () => {
    assert.strictEqual(
        solution(3, [
            [1, 1, 0],
            [1, 1, 0],
            [0, 0, 1],
        ]),
        2
    );
    assert.strictEqual(
        solution(3, [
            [1, 1, 0],
            [1, 1, 1],
            [0, 1, 1],
        ]),
        1
    );
};

export default tc;
