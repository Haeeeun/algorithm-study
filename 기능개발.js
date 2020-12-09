import assert from 'assert';
/*
    문제 분류: 스택/큐
    문제 레벨: 프로그래머스 2

    문제 풀이 여부: True
    문제 풀이 날짜: 2020-12-02 (수)
*/
/*
    1. 최초 접근:
        스택/큐라는 분류를 보고 스택이나 큐로 풀어야겠다... 

    2. 최초 발상:
    각 작업이 걸리는 시간을 미리 구해놓고, (ex) [ 7, 3, 9 ]
    가장 앞 값을 저장하고, 그 값보다 작은 값들이 이어지는 한 계속 숫자를 증가시킴
    큰 값이 나오면 거기서 멈추고, 해당 값을 가장 앞 값으로 활용
    전체를 순회할 때까지 반복

    3. 코드 작성 시 주의한 조건
    - 앞 기능 개발 100% 혹은 배포된 경우, 해당 기능 진도 100% 시 배포 가능
    - 뒷 기능이 먼저 개발될 수 있음
*/
const solution = (progresses, speeds) => {
    // 전체 작업의 개수
    let total_tasks = progresses.length;

    // 각 작업별로 완료되는 날짜를 계산해 배열로 저장
    const task_cost = progresses.map((p, i) => Math.ceil((100 - p) / speeds[i]));

    let start = 0; // 배포 주기가 되는 값 (ex) [7, 3, 9] => 0번째 배포주기가 되는값은 7, 이후에는 9
    const shedule = []; // 한 번에 배포되는 개수를 저장
    // 배포된 작업의 개수가 전체 개수가 될 때까지 순회
    while (start < total_tasks) {
        // (ex) 7 뒤의 3, 9, ...를 돌면서 7 이하이면 together++ (한 번에 배포되는 개수 계산)
        let together = 0;
        while (task_cost[start + together] <= task_cost[start]) together++;
        // 배포된 개수 배열에 추가
        // start에 together를 더한 idx는 다음 배포 주기가 되는 값. 이를 반복하면 됨.
        shedule.push(together);
        start += together;
    }
    return shedule;
};

const tc = () => {
    assert.deepStrictEqual(solution([93, 30, 55], [1, 30, 5]), [2, 1]);
    assert.deepStrictEqual(solution([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1]), [1, 3, 2]);
};

export default tc;
