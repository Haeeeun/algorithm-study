import assert from 'assert';

/*
[똑바로 조건을 확인하자]:

1. 앞 기능 개발 100% 혹은 배포된 경우, 해당 기능 진도 100% 시 배포 가능
2. 뒷 기능이 먼저 개발될 수 있음
3. 각 배포마다 개발되는 기능의 개수

4. 값 범위
- 전체 배열의 길이는 100 이하
- 작업 진도는 100 미만의 자연수
- 작업 속도는 100 이하의 자연수
*/
/*
    입출력 예 #1
    첫 번째 기능은 93% 완료되어 있고 하루에 1%씩 작업이 가능하므로 7일간 작업 후 배포가 가능합니다.
    두 번째 기능은 30%가 완료되어 있고 하루에 30%씩 작업이 가능하므로 3일간 작업 후 배포가 가능합니다. 
    하지만 이전 첫 번째 기능이 아직 완성된 상태가 아니기 때문에 첫 번째 기능이 배포되는 7일째 배포됩니다.
    세 번째 기능은 55%가 완료되어 있고 하루에 5%씩 작업이 가능하므로 9일간 작업 후 배포가 가능합니다.
    따라서 7일째에 2개의 기능, 9일째에 1개의 기능이 배포됩니다.

    입출력 예 #2
    모든 기능이 하루에 1%씩 작업이 가능하므로, 작업이 끝나기까지 남은 일수는 각각 5일, 10일, 1일, 1일, 20일, 1일입니다. 
    어떤 기능이 먼저 완성되었더라도 앞에 있는 모든 기능이 완성되지 않으면 배포가 불가능합니다.
    따라서 5일째에 1개의 기능, 10일째에 3개의 기능, 20일째에 2개의 기능이 배포됩니다.
*/
const solution = (progresses, speeds) => {
    const finish_schedule = progresses.map((p, i) =>
        Math.ceil((100 - p) / speeds[i])
    );
    let total_tasks = finish_schedule.length;
    let deployed = 0;
    const deploy_schedule = [];
    while (deployed < total_tasks) {
        let today = 0;
        while (finish_schedule[deployed + today] <= finish_schedule[deployed]) {
            today++;
        }
        deploy_schedule.push(today);
        deployed += today;
    }
    return deploy_schedule;
};

const tc = () => {
    assert.deepStrictEqual(solution([93, 30, 55], [1, 30, 5]), [2, 1]);
    assert.deepStrictEqual(
        solution([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1]),
        [1, 3, 2]
    );
};

export default tc;
